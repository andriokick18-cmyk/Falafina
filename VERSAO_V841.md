# V841 — 18/07/2026 — 🏆 Ranking de volta ao menu + PÓDIO RPG

**Responsável:** Claude (correção de rumo pedida pelo Andrio: "o ranking
sumiu! ele é o mais importante — quem compra na Loja quer demonstrar no
ranking. Faça igual um RPG")
**Arquivos alterados:** index.html, sw.js

## O raciocínio (o Andrio está certo)
Na V837 eu enxuguei o menu de 11 → 4 abas e mandei o Ranking pra dentro
de "Progresso". Estratégia de RPG diz o contrário: o ranking é a
VITRINE SOCIAL — sem vitrine em destaque, comprar borda/pet/efeito
perde a graça, e sem desejo de vitrine a Loja não gira. Vitrine à vista
= economia girando = receita.

## O que mudou
1. **Menu: 5 abas** (padrão Duolingo) — 🏠 Início · 📚 Aulas ·
   🎮 Jogos · **🏆 Ranking** · 🪪 Perfil (ex-"Progresso"; os chips
   Perfil/Conquistas/Ranking continuam lá dentro)
2. **🏆 PÓDIO RPG no topo do ranking**: os 3 primeiros em cards de
   destaque — 👑 coroa no líder (card maior, fundo dourado), avatar com
   a MOLDURA equipada, PET ao lado do nome, EFEITO de ranking brilhando
   no card inteiro, título RPG (Gringo Honorário etc.) e o valor do
   placar. A lista segue do 4º lugar em diante.
3. Clique em qualquer card do pódio → perfil público (a vitrine
   completa do jogador). Placares alternativos (XP/Escalada/Desafios/
   Velocidade) reordenam o pódio.

## Testes executados (Chromium — 9 checagens, 0 erros de página)
Tabbar/sidebar com 5 abas incluindo Ranking ✓ · aba abre a tela e
destaca no menu ✓ · pódio com 3 cards e 👑 no líder ✓ · efeito comprado
(fx-fogo) visível no pódio ✓ · lista continua do 4º ✓ · clique no pódio
abre perfil público ✓ · placar Escalada reordena ✓ · chips do Perfil
intactos ✓.

sw.js: cache v28 → v29.
