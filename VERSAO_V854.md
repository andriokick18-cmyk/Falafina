# V854 — 26/07/2026 — 🏰 Home RPG (Aba 2) + 🔑 dois e-mails de admin

**Responsável:** Claude (pedidos diretos do Andrio: "próxima grande mudança"
no redesenho aba por aba + "andrio.usa2026@gmail.com é o email do adm...
outro e-mail não consegue ver a página adm, ela nem existe pra quem não é adm")
**Arquivos alterados:** index.html, server.js, sw.js

## 🔑 Admin: dois e-mails do Andrio, invisível pro resto
- **andrio.kick18@gmail.com** — semeada em todo boot com a senha fixa
  combinada (como antes)
- **andrio.usa2026@gmail.com** — a conta pessoal do Andrio: MANTÉM a
  própria senha; ganha `admin:true` + VIP eterno automaticamente (no boot
  se já existir, no cadastro se for criada, ou no primeiro login)
- O `senhaHash` de QUALQUER conta admin vale como chave nas rotas
  `/api/admin/*` (é o que a aba usa sozinha)
- **A página Admin nem existe pra quem não é admin**: sem tela de chave,
  sem pista — a rota redireciona direto pra Home. Botão da barra lateral
  continua oculto pra não-admins

## 🏰 Home viroou hub de RPG (Aba 2 do redesenho)
- **Painel de personagem no topo**: o card "Olá, fulano!" virou o
  ESTANDARTE PESSOAL do jogador — mesmo sistema-célula do Ranking
  (básico neutro sem compra; skin colorida + partículas se tiver
  Estandarte equipado), com haste, escudo do tier, avatar com a borda
  equipada, pet, título por XP e selo do tier
- **Barra de XP de RPG**: "NÍVEL X · n/350 XP" com preenchimento dourado
  brilhante — progressão visível de jogo
- **Fichas de status**: 🔥 sequência, 🌻 girassóis, 🛡️ protetores e selo
  Premium/trial em chips de pergaminho
- **"SEU PRÓXIMO PASSO" → "⚔️ SUA MISSÃO AGORA"**: pergaminho com espada
  cravada no topo do estandarte
- **"Hoje no FalaFina" → "📜 Quadro de Missões de hoje"**: tábua de
  madeira com ripas, missões em pergaminhos com SELO de cera (! vira ✓
  verde ao completar) — mesmos cliques/ações de antes
- Partículas do motor RPGFX rodam no estandarte pessoal da Home quando
  há skin equipada (compra aparece em TODA tela, não só no Ranking)

## Testes executados (Node + Chromium, servidor real)
Servidor: registrar usa2026 com senha própria → `admin:true` + VIP eterno
✓ · entrar → admin ✓ · `/api/admin/dados` com senhaHash da usa2026 ✓ ·
com senhaHash da kick18 (continua valendo) ✓ · chave errada 403 ✓.
Home: conta SEM estandarte → painel básico neutro + quadro com 3 missões
✓ · conta COM Estandarte em Chamas → painel inteiro tematizado fogo ✓ ·
`node --check` ✓ · zero erros de página.

sw.js: cache v40 → v41.
