package com.falafina.app

import android.app.Activity
import android.content.Intent
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import android.view.Gravity
import android.widget.Button
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.TextView
import android.widget.Toast

/* Portão do app: na 1ª vez explica e ativa o sistema da tela de bloqueio;
   depois manda direto pro FalaFina (motor do Chrome). A notificação do
   serviço traz a pessoa de volta pra cá quando quiser configurar. */
class PortaoActivity : Activity() {

  private val prefs by lazy { getSharedPreferences("falafina", MODE_PRIVATE) }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    val forcarConfig = intent.getBooleanExtra("config", false)
    if (prefs.getBoolean("configurado", false) && !forcarConfig) {
      ligarServicoSePreciso()
      abrirFalaFina()
      finish()
      return
    }
    montarTela()
  }

  override fun onResume() {
    super.onResume()
    // voltou da tela de permissão do Android? liga o serviço na hora
    if (temPermissaoSobreposicao() && prefs.getBoolean("querAtivar", false)) {
      prefs.edit().putBoolean("palavrasAtivas", true).putBoolean("querAtivar", false).apply()
      ligarServicoSePreciso()
      Toast.makeText(this, "📌 Pronto! Acenda a tela e veja a palavra 🎉", Toast.LENGTH_LONG).show()
      montarTela()
    }
  }

  private fun montarTela() {
    val raiz = LinearLayout(this).apply {
      orientation = LinearLayout.VERTICAL
      gravity = Gravity.CENTER_HORIZONTAL
      setBackgroundColor(Color.parseColor("#FFF8EE"))
      setPadding(dp(24), dp(48), dp(24), dp(24))
    }
    raiz.addView(TextView(this).apply {
      text = "🦜"
      textSize = 64f
      gravity = Gravity.CENTER
    })
    raiz.addView(TextView(this).apply {
      text = "FalaFina"
      textSize = 34f
      setTypeface(typeface, Typeface.BOLD)
      setTextColor(Color.parseColor("#00885F"))
      gravity = Gravity.CENTER
    })
    raiz.addView(TextView(this).apply {
      text = "Inglês para brasileiros — do zero até o trabalho H-2B/H-2A"
      textSize = 14f
      setTextColor(Color.parseColor("#5A6B74"))
      gravity = Gravity.CENTER
      setPadding(0, dp(4), 0, dp(28))
    })

    val ativas = prefs.getBoolean("palavrasAtivas", false) && temPermissaoSobreposicao()
    raiz.addView(cartao(
      if (ativas) "📌 Palavras na tela de bloqueio: ATIVADAS ✔"
      else "📌 Palavras na tela de bloqueio",
      if (ativas) "Toda vez que a tela do celular acender, aparece uma palavra nova de inglês com a pronúncia e uma frase. Sem esforço: você aprende só de olhar o celular."
      else "Toda vez que a tela acender, uma palavra nova de inglês aparece — com o som e uma frase. O Android vai pedir a permissão \"Sobrepor a outros apps\": é ela que deixa a palavra aparecer.",
      if (ativas) "✔ Ativado — desative na configuração do Android" else "🔛 ATIVAR AGORA",
      Color.parseColor("#2D5DA8")
    ) {
      if (Build.VERSION.SDK_INT >= 33 &&
        checkSelfPermission(android.Manifest.permission.POST_NOTIFICATIONS) != android.content.pm.PackageManager.PERMISSION_GRANTED) {
        requestPermissions(arrayOf(android.Manifest.permission.POST_NOTIFICATIONS), 1)
      }
      if (!temPermissaoSobreposicao()) {
        prefs.edit().putBoolean("querAtivar", true).apply()
        Toast.makeText(this, "Ative o FalaFina na lista e volte ⬅", Toast.LENGTH_LONG).show()
        startActivity(Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:$packageName")))
      } else {
        prefs.edit().putBoolean("palavrasAtivas", true).apply()
        ligarServicoSePreciso()
        Toast.makeText(this, "📌 Já está ativado! Acenda a tela e veja 🎉", Toast.LENGTH_LONG).show()
      }
    })

    raiz.addView(cartao(
      "🎓 Entrar no FalaFina",
      "Aulas, jogos, Modo Carreira, Simulador de Entrevista — o app completo.",
      "▶ ENTRAR",
      Color.parseColor("#00885F")
    ) {
      prefs.edit().putBoolean("configurado", true).apply()
      abrirFalaFina()
    })

    setContentView(ScrollView(this).apply { addView(raiz) })
  }

  private fun cartao(titulo: String, texto: String, botao: String, cor: Int, acao: () -> Unit): LinearLayout {
    val card = LinearLayout(this).apply {
      orientation = LinearLayout.VERTICAL
      background = GradientDrawable().apply {
        setColor(Color.WHITE)
        cornerRadius = dp(18).toFloat()
        setStroke(dp(2), Color.parseColor("#22314A20"))
      }
      setPadding(dp(18), dp(18), dp(18), dp(18))
      layoutParams = LinearLayout.LayoutParams(
        LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT
      ).apply { bottomMargin = dp(16) }
    }
    card.addView(TextView(this).apply {
      text = titulo; textSize = 18f
      setTypeface(typeface, Typeface.BOLD)
      setTextColor(Color.parseColor("#21313A"))
    })
    card.addView(TextView(this).apply {
      text = texto; textSize = 14f
      setTextColor(Color.parseColor("#5A6B74"))
      setPadding(0, dp(6), 0, dp(12))
    })
    card.addView(Button(this).apply {
      text = botao
      setTextColor(Color.WHITE)
      background = GradientDrawable().apply { setColor(cor); cornerRadius = dp(14).toFloat() }
      setOnClickListener { acao() }
    })
    return card
  }

  private fun temPermissaoSobreposicao(): Boolean = Settings.canDrawOverlays(this)

  private fun ligarServicoSePreciso() {
    if (!prefs.getBoolean("palavrasAtivas", false) || !temPermissaoSobreposicao()) return
    val i = Intent(this, PalavraService::class.java)
    if (Build.VERSION.SDK_INT >= 26) startForegroundService(i) else startService(i)
  }

  private fun abrirFalaFina() {
    startActivity(Intent(this, com.google.androidbrowserhelper.trusted.LauncherActivity::class.java))
  }

  private fun dp(v: Int): Int = (v * resources.displayMetrics.density).toInt()
}
