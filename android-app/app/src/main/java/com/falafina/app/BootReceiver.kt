package com.falafina.app

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build
import android.provider.Settings

/* Celular reiniciou → religa o serviço das palavras sozinho. */
class BootReceiver : BroadcastReceiver() {
  override fun onReceive(ctx: Context, intent: Intent) {
    if (intent.action != Intent.ACTION_BOOT_COMPLETED) return
    val prefs = ctx.getSharedPreferences("falafina", Context.MODE_PRIVATE)
    if (!prefs.getBoolean("palavrasAtivas", false)) return
    if (!Settings.canDrawOverlays(ctx)) return
    val i = Intent(ctx, PalavraService::class.java)
    if (Build.VERSION.SDK_INT >= 26) ctx.startForegroundService(i) else ctx.startService(i)
  }
}
