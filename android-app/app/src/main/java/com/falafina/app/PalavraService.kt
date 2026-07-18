package com.falafina.app

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Intent
import android.content.IntentFilter
import android.os.Build
import android.os.IBinder

/* Serviço leve que fica escutando a TELA ACENDER. Receiver de
   SCREEN_ON não pode ir no manifesto (regra do Android) — por isso o
   serviço em primeiro plano com uma notificação discreta e fixa. */
class PalavraService : Service() {

  private var receiver: TelaReceiver? = null

  override fun onCreate() {
    super.onCreate()
    criarCanal()
    startForeground(1, notificacao())
    receiver = TelaReceiver()
    val filtro = IntentFilter(Intent.ACTION_SCREEN_ON)
    if (Build.VERSION.SDK_INT >= 33) {
      registerReceiver(receiver, filtro, RECEIVER_NOT_EXPORTED)
    } else {
      registerReceiver(receiver, filtro)
    }
  }

  override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int = START_STICKY

  override fun onDestroy() {
    receiver?.let { runCatching { unregisterReceiver(it) } }
    receiver = null
    super.onDestroy()
  }

  override fun onBind(intent: Intent?): IBinder? = null

  private fun criarCanal() {
    if (Build.VERSION.SDK_INT < 26) return
    val nm = getSystemService(NOTIFICATION_SERVICE) as NotificationManager
    nm.createNotificationChannel(
      NotificationChannel("palavras", "Palavras na tela de bloqueio", NotificationManager.IMPORTANCE_MIN)
    )
  }

  private fun notificacao(): Notification {
    val abrirConfig = PendingIntent.getActivity(
      this, 0,
      Intent(this, PortaoActivity::class.java).putExtra("config", true),
      PendingIntent.FLAG_IMMUTABLE
    )
    val b = if (Build.VERSION.SDK_INT >= 26)
      Notification.Builder(this, "palavras")
    else @Suppress("DEPRECATION") Notification.Builder(this)
    return b
      .setSmallIcon(android.R.drawable.ic_dialog_info)
      .setContentTitle("📌 Palavras de inglês ativas")
      .setContentText("Acenda a tela e aprenda — toque para configurar")
      .setOngoing(true)
      .setContentIntent(abrirConfig)
      .build()
  }
}
