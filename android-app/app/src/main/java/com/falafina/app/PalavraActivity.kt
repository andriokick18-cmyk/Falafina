package com.falafina.app

import android.app.Activity
import android.app.KeyguardManager
import android.content.Intent
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.os.Build
import android.os.Bundle
import android.view.Gravity
import android.view.WindowManager
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView

/* O CARTÃO DA PALAVRA — aparece SOBRE a tela de bloqueio toda vez que a
   tela acende (igual ao sistema que o Andrio viu no print). Cada
   exibição avança pra próxima palavra do pool. */
class PalavraActivity : Activity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    if (Build.VERSION.SDK_INT >= 27) {
      setShowWhenLocked(true)
    } else {
      @Suppress("DEPRECATION")
      window.addFlags(WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED)
    }

    val prefs = getSharedPreferences("falafina", MODE_PRIVATE)
    val idx = prefs.getInt("pidx", 0)
    prefs.edit().putInt("pidx", idx + 1).apply()
    val w = Palavras.POOL[((idx % Palavras.POOL.size) + Palavras.POOL.size) % Palavras.POOL.size]

    val raiz = LinearLayout(this).apply {
      orientation = LinearLayout.VERTICAL
      gravity = Gravity.CENTER
      setBackgroundColor(Color.parseColor("#B321313A")) // véu escuro translúcido
      setPadding(dp(20), dp(20), dp(20), dp(20))
      setOnClickListener { finish() } // toque fora fecha
    }

    val card = LinearLayout(this).apply {
      orientation = LinearLayout.VERTICAL
      background = GradientDrawable().apply { setColor(Color.WHITE); cornerRadius = dp(22).toFloat() }
      setPadding(dp(22), dp(20), dp(22), dp(18))
    }
    card.addView(TextView(this).apply {
      text = "🦜 FalaFina · palavra da vez"
      textSize = 12f
      setTextColor(Color.parseColor("#5A6B74"))
      setTypeface(typeface, Typeface.BOLD)
    })
    card.addView(TextView(this).apply {
      text = w.en
      textSize = 40f
      setTypeface(typeface, Typeface.BOLD)
      setTextColor(Color.parseColor("#234A87"))
      setPadding(0, dp(6), 0, 0)
    })
    card.addView(TextView(this).apply {
      text = "🗣️ ${w.som}  ·  🇧🇷 ${w.pt}"
      textSize = 16f
      setTypeface(typeface, Typeface.BOLD)
      setTextColor(Color.parseColor("#8A6400"))
      setPadding(0, dp(2), 0, dp(10))
    })
    card.addView(TextView(this).apply {
      text = "“${w.fEn}”"
      textSize = 15f
      setTextColor(Color.parseColor("#21313A"))
    })
    card.addView(TextView(this).apply {
      text = w.fPt
      textSize = 13f
      setTextColor(Color.parseColor("#5A6B74"))
      setPadding(0, dp(2), 0, dp(14))
    })

    val botoes = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL }
    botoes.addView(Button(this).apply {
      text = "Fechar"
      setTextColor(Color.parseColor("#5A6B74"))
      background = GradientDrawable().apply {
        setColor(Color.parseColor("#EEEAE0")); cornerRadius = dp(12).toFloat()
      }
      layoutParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f)
        .apply { rightMargin = dp(8) }
      setOnClickListener { finish() }
    })
    botoes.addView(Button(this).apply {
      text = "Abrir FalaFina 🦜"
      setTextColor(Color.WHITE)
      background = GradientDrawable().apply {
        setColor(Color.parseColor("#00885F")); cornerRadius = dp(12).toFloat()
      }
      layoutParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f)
      setOnClickListener { abrirApp() }
    })
    card.addView(botoes)
    raiz.addView(card)
    setContentView(raiz)
  }

  private fun abrirApp() {
    val km = getSystemService(KEYGUARD_SERVICE) as KeyguardManager
    val abrir = {
      startActivity(
        Intent(this, com.google.androidbrowserhelper.trusted.LauncherActivity::class.java)
          .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      )
      finish()
    }
    if (Build.VERSION.SDK_INT >= 26 && km.isKeyguardLocked) {
      km.requestDismissKeyguard(this, object : KeyguardManager.KeyguardDismissCallback() {
        override fun onDismissSucceeded() { abrir() }
      })
    } else abrir()
  }

  private fun dp(v: Int): Int = (v * resources.displayMetrics.density).toInt()
}
