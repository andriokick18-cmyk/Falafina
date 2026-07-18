package com.falafina.app

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.provider.Settings

/* Tela acendeu → mostra o cartão da palavra (se a permissão de
   sobreposição estiver concedida — ela é o que autoriza abrir a
   tela por cima do bloqueio no Android 10+). */
class TelaReceiver : BroadcastReceiver() {
  override fun onReceive(ctx: Context, intent: Intent) {
    if (intent.action != Intent.ACTION_SCREEN_ON) return
    val prefs = ctx.getSharedPreferences("falafina", Context.MODE_PRIVATE)
    if (!prefs.getBoolean("palavrasAtivas", false)) return
    if (!Settings.canDrawOverlays(ctx)) return
    ctx.startActivity(
      Intent(ctx, PalavraActivity::class.java)
        .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS)
    )
  }
}
