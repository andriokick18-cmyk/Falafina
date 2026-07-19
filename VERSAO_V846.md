# V846 — 19/07/2026 — 🎁 Modo Grátis Limitado + 👑 Comprar VIP (Pix + comprovante)

**Responsável:** Claude (ordens diretas do Andrio, dono do produto — várias
pedidas seguidas nesta rodada, resumidas abaixo).
**Arquivos alterados:** index.html, server.js, sw.js

## 🎁 Modo Grátis Limitado — ninguém mais fica travado na porta
Print do Andrio: quando o grátis acaba, a pessoa batia numa parede
("Não pare agora!") sem conseguir nem entrar no app. Trocado por:

- `ffGate()` **nunca mais bloqueia** navegação — quem perdeu o grátis
  entra no app inteiro, sempre
- Só que sem Premium/VIP, a conta ganha uma cota bem pequena por dia:
  **5 tarefas** (aula, jogo, revisão, carreira, simulador, jardim,
  ditado) e **teto de 40 XP/dia** — pouco XP, acesso total, como o
  Andrio pediu ("pouca xp mas acesso total ao apk")
- Bateu a cota? Toast avisando quantas tarefas sobraram e abre a tela
  de Comprar VIP sozinha — sem parede, só um convite

## 👑 Comprar VIP — Pix manual + comprovante + aprovação do Andrio
Pedido do Andrio: "adiciona o sistema todo de pagamento para o pix
[...] a pessoa deve tirar print do comprovante e upar na compra, ai
chega pra mim analisar". A tela de paywall virou uma tela de compra:

1. Escolhe o plano (1 mês / 3 meses / 1 ano — **preços de exemplo,
   editáveis** em `FF_PLANOS_VIP` no index.html)
2. Vê a chave Pix (`53981453496` — Andrio Kickhofel) com botão de
   copiar
3. Tira o print do comprovante e faz upload — compressão automática no
   navegador (retângulo, até 1000px, não corta como a foto de perfil)
4. Envia — cria um **pedido de compra** no servidor, com o comprovante
   anexado
5. O Andrio abre o `/admin`, vê o pedido com a imagem do comprovante,
   aprova em 1 clique (ativa o VIP na hora) ou rejeita

Um botão grande **"👑 QUERO SER VIP"** aparece na Home pra quem ainda
não é VIP, como pedido ("um botão grande que você vai criar com todo
cadastro de compra completa"). Todos os outros botões de Premium do
app (barra lateral, Comunidade, banner da Home) agora abrem essa
mesma tela.

## /admin — painel de pedidos + VIP permanente
- Nova seção **"💳 Pedidos de compra Pix"** no `/admin`: lista os
  pendentes com nome, e-mail, plano, valor, data e a **miniatura do
  comprovante** (clicável pra ver em tamanho real) — só o Andrio vê
  isso, protegido pela `ADMIN_CHAVE` de sempre
- Botões **✅ Aprovar** (ativa o VIP pelos dias do plano) e **❌
  Rejeitar** por pedido
- Novo botão **"👑 VIP pra sempre"** em cada conta da lista — clique
  único que dá Premium até o ano de 2126 (na prática, eterno). O
  Andrio usa esse botão na própria conta pra satisfazer "adm tem vip
  pra sempre"

## 🐛 Bug corrigido de quebra
Ao mexer nos botões do `/admin`, achamos um bug **que já existia antes
desta versão**: o escape de aspas dentro do HTML gerado (`\'` numa
string dentro de outra string dentro do template) estava com o número
errado de barras invertidas — isso quebrava o parser de JavaScript do
navegador silenciosamente, e o painel `/admin` **nunca executava
nenhum botão de ação** (nem os de Premium/Baús antigos) quando
carregado de verdade num navegador (só "parecia" funcionar porque
ninguém tinha testado clicando de fato). Corrigido e testado com
clique real via Chromium — todos os botões do painel (Premium,
Baús, Aprovar, Rejeitar, VIP pra sempre) funcionam agora.

## Testes executados (Node + Chromium, servidor real)
`node --check` em index.html e server.js (incluindo o HTML/JS do
`/admin` avaliado de verdade, não só o texto-fonte) ✓ · cadastro real
→ trial forçado a vencido → `emModoGratisLimitado()` true ✓ · 5
tarefas liberadas, 6ª e 7ª bloqueadas ✓ · XP trava em 40/dia mesmo
chamando `registrarAtividade(100)` duas vezes ✓ · upload de
comprovante fake → `POST /api/pedidos/criar` → aparece no `/admin` →
clique real em "✅ Aprovar" → `premiumAte` atualizado na conta ✓ ·
clique real em "❌ Rejeitar" ✓ · clique real em "👑 VIP pra sempre" →
Premium até 2126 ✓ · comprovante inválido/grande demais rejeitado
(400) ✓ · senha errada rejeitada (401) ✓ · painel `/admin` carrega
(200) e renderiza sem erros de página ✓.

sw.js: cache v32 → v33.
