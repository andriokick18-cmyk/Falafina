# V834 — 17/07/2026 — 🚑 HOTFIX: botão "Fazer o desafio" escondido em conta nova no celular

**Responsável:** Claude (relato real via WhatsApp: "chega no final [da aula]
e não aparece o botão" — conta da filha, nova; a do pai, antiga, funcionava)
**Arquivos alterados:** index.html, sw.js

## A causa raiz (guerra de camadas / z-index)
No celular, três elementos fixos disputavam o rodapé da tela:
- Botão "Fazer o desafio" (`.rodape-licao`): **z-index 40**, colado no fundo
- Barra de menu (`.tabbar`): **z-index 60** → cobria o botão
- Banner "📲 Baixar o aplicativo" (`.pwa-flutuante`): **z-index 80** → por
  cima de tudo — e ele SÓ aparece pra quem nunca o fechou (aparelho/conta
  nova!). Por isso contas antigas funcionavam e novas não.
Reproduzido no Chromium 412px: `document.elementFromPoint` no centro do
botão devolvia `pwaBaixar` — o toque nunca chegava no botão.

## A correção
1. `.rodape-licao` sobe pra **z-index 70** (acima da tabbar)
2. No celular (shell logado), o rodapé fica **acima da tabbar**
   (`bottom: calc(58px + safe-area)`) — nada mais engole o botão
3. O banner "Baixar o aplicativo" **some durante a aula e o quiz**
   (classe `.fora-da-licao` alternada no `irPara`) e volta nas outras telas

## Testes executados (Chromium, 0 erros de página)
Cenário exato do relato (conta nova de criança + banner PWA ativo):
- celular 412px: botão visível E clicável ✓ · clique real abre o quiz ✓ ·
  banner some na aula ✓ · banner volta fora da aula ✓
- desktop 1280px: mesmos 4 checks ✓

sw.js: cache v21 → v22 (v21 = V833 Indicação Premiada, mesma remessa).
