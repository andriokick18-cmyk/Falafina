# V852 — 26/07/2026 — 🚩 Sistema-célula COMPRA = USO: Estandarte só pra quem compra

**Responsável:** Claude (pedido direto do Andrio, com prints da Loja ao vivo:
"todo sistema da loja esta falho nao tem identidade, tudo que for comprado
deve ser melhor e mais desenhado que os que são inicial... voce deixou o
ranking hoje ja cheio de efeitos, mas esses efeitos só vai ter se a pessoa
comprar os efeitos na loja entende? então reestruture todo o sistema...
me entregue o sistema como se fosse uma celula")
**Arquivos alterados:** index.html, sw.js

## O erro de design que esta versão corrige
As versões V850/V851 davam o estandarte medieval colorido DE GRAÇA pra
todo mundo (pela faixa de XP). Resultado: o Ranking já nascia "cheio de
efeitos" e os itens comprados na Loja não valiam nada visualmente. O
Andrio pegou o problema na hora.

## ⚖️ A regra de ouro agora (a célula)
1. **Sem compra → card BÁSICO.** Pergaminho neutro, moldura discreta,
   escudo do tier em metal cinza (o tier de XP continua sendo conquistado
   estudando — mas em versão sóbria). Zero partícula, zero runa, zero
   brilho, zero rabicho, zero shader.
2. **Comprou um 🚩 Estandarte na Loja → card COMPLETO.** O pano ganha as
   cores da skin comprada, partículas temáticas (brasas, aurora, raios,
   cosmos…), runas brilhando, rabicho, reflexo cinematográfico e o shader
   WebGL no perfil. Em TODOS os lugares: lista, pódio e perfil aberto.
3. **O ciclo se fecha sozinho:** quem está no modo básico vê uma faixa no
   topo do Ranking ("Seu card está no modo básico — os coloridos são
   Estandartes da Loja") que leva DIRETO pra aba de compra, no exato
   lugar onde os compradores estão brilhando.

## 🛍️ Loja com identidade — raridade visual
- A aba "✨ Efeitos" virou **"🚩 Estandartes"** — os 10 itens ganharam
  nomes e descrições de estandarte (Estandarte da Selva, Estandarte em
  Chamas, Céu Estrelado, Trono Imortal…)
- Todo item de Bordas/Pets/Estandartes agora tem **raridade**: Comum
  (< 🌻2.000) · Raro (< 🌻8.000) · Épico (< 🌻18.000+) · Lendário (com
  requisito de nível). **O próprio card do item na Loja fica mais
  desenhado conforme a raridade**: comum é simples; raro tem brilho azul;
  épico tem moldura roxa animada; lendário tem moldura dourada fluindo —
  "tudo que for comprado deve ser melhor e mais desenhado que o inicial"
- Vitrine escura (palco) continua mostrando o item REAL animado, e o
  selo ✔ EQUIPADO marca o que está em uso

## Testes executados (Node + Chromium, servidor real)
`node --check` no script do index.html ✓ · Ranking com 13 contas: 9 cards
básicos (sem compra) + 4 estandartes coloridos (efeito equipado) —
contraste visível na mesma tela ✓ · faixa "modo básico" aparece pra quem
não tem Estandarte e leva pra aba 🚩 Estandartes da Loja (telaAtual =
tela-loja, lojaAba = efeito confirmados) ✓ · perfil de quem NÃO comprou =
banner limpo sem shader/partícula; perfil de quem comprou (Aurora/Fogo) =
estandarte completo ✓ · Loja: raridades Comum/Raro/Épico/Lendário com
molduras crescentes + tags ✓ · zero erros de JavaScript de página.

sw.js: cache v38 → v39.
