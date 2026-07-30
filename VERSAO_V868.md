# V868 — 27/07/2026 — 📱 Aba Ranking de volta no celular (tabbar sumia)

**Responsável:** Claude (bug do Andrio com print: "entrei em modo celular
e não aparece a aba ranking pra todos conseguirem ver o ranking")
**Arquivos alterados:** index.html, sw.js

## 🐛 Causa raiz (investigada com reprodução real)
A aba Ranking SEMPRE existiu na tabbar — o problema é que a tabbar
INTEIRA sumia no celular:
1. O cabeçalho (← Voltar + ? + pills 🔥/XP/trial/☁️ + avatar) somava
   ~530px e o flex não quebrava linha
2. O layout estourava a largura do viewport (412px → 539px)
3. O Chrome do celular dava ZOOM-OUT pra caber, esticando o viewport de
   layout — e a tabbar (position:fixed; bottom:0) ia parar ABAIXO da
   dobra visível: invisível
4. Bônus: quando visível, o botão "📲 Baixar o aplicativo" (z-index 80)
   cobria as abas Ranking/Perfil

## ✅ Conserto em 3 camadas
- **Trava permanente**: `html, body { overflow-x: clip }` — NENHUM
  conteúdo consegue mais alargar o viewport do celular (proteção
  contra qualquer tela futura que estourar)
- **Cabeçalho responsivo** (≤600px): quebra em 2 linhas, pills
  compactas (.76rem), título menor, Voltar menor
- **Botão do app**: no celular sobe pra `bottom: 76px + safe-area` —
  nunca mais cobre a tabbar

## Testes executados (Chromium mobile 412px e 360px, login real)
Largura do documento = viewport exato (412/360, sem estouro) ✓ · tabbar
visível com as 5 abas (Início/Aulas/Jogos/🏆 Ranking/Perfil) ✓ · toque
na aba Ranking abre tela-ranking ✓ · botão "Baixar o aplicativo" não
sobrepõe a tabbar ✓ · cabeçalho em 2 linhas sem corte ✓ ·
`node --check` ✓.

sw.js: cache v54 → v55.
