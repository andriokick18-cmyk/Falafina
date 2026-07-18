# V844 — 18/07/2026 — 📲 APP ANDROID NATIVO: o sistema do print, de verdade

**Responsável:** Claude (pedido do Andrio: "quero igual ao sistema do
print" — palavra sobre a tela de bloqueio a CADA acendida de tela)
**Arquivos:** android-app/** (projeto Android completo),
.github/workflows/android.yml (compilação automática do APK)

## Por que app nativo
Palavra a cada desbloqueio SÓ é possível com app nativo — site/PWA não
tem permissão de desenhar sobre a tela de bloqueio. Agora o FalaFina tem
os dois: o site (que continua sendo o produto principal) e o APK.

## Arquitetura do app (Kotlin, zero appcompat, mínimo e sólido)
- **PortaoActivity** — 1ª abertura: explica e ativa o sistema (pede a
  permissão "Sobrepor a outros apps", que é a chave de tudo, + permissão
  de notificação no Android 13+). Depois: vai direto pro FalaFina.
- **Trusted Web Activity** (androidbrowserhelper) — o site roda DENTRO
  do app no motor do Chrome: áudio, microfone, push, conta — tudo real.
- **PalavraService** — serviço em 1º plano (notificação discreta) que
  escuta a TELA ACENDER (SCREEN_ON não pode ir no manifesto).
- **PalavraActivity** — o cartão: véu translúcido + palavra GRANDE +
  🗣️ como soa + 🇧🇷 significado + frase EN/PT + [Fechar] [Abrir FalaFina]
  (com requestDismissKeyguard). `showWhenLocked` = aparece SOBRE o
  bloqueio. Cada acendida avança o índice → **palavra nova toda vez**.
- **BootReceiver** — religa o serviço quando o celular reinicia.
- **Palavras.kt** — GERADO do PALAVRA_DIA_POOL do index.html (48
  palavras, fonte única; extrator em python descrito abaixo).

Compat: minSdk 24 (Android 7+), target 34; RECEIVER_NOT_EXPORTED no 13+;
FGS specialUse no 14; permissão de sobreposição isenta a restrição de
abrir activity em background (mesma técnica dos apps do gênero).

## Compilação automática (GitHub Actions)
Push na main tocando android-app/** → compila o APK e publica na
release fixa **"apk"** do repositório:
**github.com/andriokick18-cmyk/Falafina/releases** → FalaFina.apk
(instalar: baixar no celular → permitir fonte desconhecida → abrir).
Atualização de versão: desinstalar e instalar o novo (assinatura debug).

## Regenerar Palavras.kt quando o pool crescer
`python3` no repo: extrai `PALAVRA_DIA_POOL` do index.html e regrava
android-app/.../Palavras.kt (mesmo script da V844, ver histórico git).

## Estado do teste
Código revisado e compilação disparada no GitHub Actions (resultado do
build na aba Actions). O comportamento na tela de bloqueio precisa de
celular físico — roteiro: instalar APK → ATIVAR → conceder sobreposição
→ bloquear → acender a tela → cartão com a palavra aparece; cada
acendida mostra a próxima palavra.

## Roadmap do app
- Assinatura de release fixa + assetlinks.json (tira a barra de URL)
- Play Store (conta de desenvolvedor US$ 25, uma vez)
- Sons no cartão (TTS nativo) e botão de favoritar palavra
