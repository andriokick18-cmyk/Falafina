# V849 — 25/07/2026 — 🤖 Comprovante conferido SOZINHO + 🔑 conta admin fixa do Andrio

**Responsável:** Claude (pedido direto do Andrio: "adicione minha conta adm
como andrio.kick18@gmail.com [...] sempre vou logar usando isso" + "o próprio
programa se identificar que o que tá escrito no comprovante está com o valor
correto e também data correta, ele ativa a vip da pessoa e se for falso eu
desativo ao verificar o painel adm")
**Arquivos alterados:** index.html, server.js, package.json, sw.js

## 🔑 Conta admin fixa (andrio.kick18@gmail.com)
- A conta do dono é criada/consertada **em todo boot do servidor** — mesmo
  que o banco de contas suma, o login do Andrio volta a funcionar sozinho
- Ela nasce com `admin: true` e **VIP pra sempre** (até ~2126)
- Logou com ela no app → a **aba 🔑 Admin aparece na barra lateral e entra
  sozinha** (a própria senha da conta vira a chave do painel — nada de
  digitar ADMIN_CHAVE). Pra qualquer outra conta, a aba nem aparece
- O `/admin` (página separada) também aceita agora a **senha do admin**
  direto no campo de chave, além da ADMIN_CHAVE do Render (que segue valendo)
- ⚠️ Senha fixa no código por enquanto — foi o combinado ("futuramente
  colocamos mais segurança")

## 🤖 Verificação AUTOMÁTICA do comprovante Pix (OCR)
A pessoa envia o print → o servidor **lê o texto da imagem** (tesseract.js,
português) e confere as duas regras do Andrio:
1. **Valor correto**: o valor do plano (ex.: R$ 30) precisa aparecer no
   comprovante (aceita "R$ 30,00", "30,00", "30.00", "R$ 30")
2. **Data correta**: o comprovante precisa ser de até 3 dias atrás (lê
   25/07/2026 · 25/07/26 · 2026-07-25 · "25 de julho de 2026" · "25 JUL 2026")

- **Bateu tudo → VIP ativa NA HORA**, sem esperar ninguém. O app avisa o
  aluno ("👑 Comprovante conferido — seu VIP está ATIVO!") e o painel do
  Andrio ganha uma seção destacada **"🔔 Ativados automaticamente —
  confira"** com os botões **👍 Conferi, tudo certo** e **🚫 Falso —
  revogar VIP** (revogar tira exatamente os dias daquele pedido)
- **Não bateu → fica PENDENTE** como sempre, com o motivo escrito no
  painel (ex.: "valor lido (R$ 10,00) ≠ R$ 30" · "data do comprovante não
  é recente" · "nenhum valor legível no print")
- **Comprovante repetido nunca aprova sozinho** (hash da imagem comparado
  com todos os pedidos anteriores)
- Se o Andrio tiver o push ligado na conta admin, chega **notificação no
  celular** a cada pedido (auto-aprovado ou pendente)
- Blindado: OCR roda em fila (1 por vez), com teto de 90s, e o
  `errorHandler` impede que erro do worker derrube o servidor. Sem o
  tesseract instalado, NADA quebra — todo pedido cai na aprovação manual,
  como antes
- Os dados de idioma vêm juntos no `npm install`
  (`@tesseract.js-data/por`) — produção não depende de CDN externo

## 💬 Clareza grátis × VIP (usabilidade)
- A tela de compra ganhou o comparativo lado a lado: **🎁 Grátis** (entra
  todo dia, 5 tarefas e 40 XP por dia) × **👑 VIP** (tudo ilimitado)
- Textos atualizados: o site explica que o comprovante é conferido na hora
  e o VIP pode ativar sozinho

## Regras de acesso (resumo pro Andrio)
- **Grátis (trial de 7 dias):** app inteiro liberado
- **Grátis (depois do trial):** continua entrando em tudo, mas com 5
  tarefas/dia e teto de 40 XP/dia
- **VIP pago:** tudo ilimitado pelo período do plano (30d/R$30, 60d/R$50)
- **Admin:** VIP eterno + painel de pedidos/alunos

## Testes executados (Node + Chromium, servidor real)
`node --check` em server.js, sw.js e no script do index.html ✓ · boot cria
a conta admin ✓ · login andrio.kick18@gmail.com/8480054 → `admin:true` +
VIP até 2126 ✓ · `/api/admin/dados` com senha crua, com senhaHash e com
chave errada (403) ✓ · comprovante REAL gerado no Chromium (R$ 30,00,
data de hoje) → OCR lê → **pedido auto-aprovado em ~1s** → +30 dias VIP ✓ ·
comprovante de R$ 10 → pendente "valor lido ≠ R$ 30" ✓ · data velha →
pendente "não é recente" ✓ · mesmo print de novo → pendente "comprovante
repetido" ✓ · revogar remove o VIP ✓ · conferir tira do destaque ✓ · sem
tesseract instalado o servidor sobe e cai no fluxo manual ✓ · navegador:
admin loga e a aba Admin aparece e entra sozinha ✓ · usuário comum NÃO vê
a aba ✓ · compra completa pela interface (upload do print → enviar → VIP
acende sozinho na tela do aluno) ✓ · `/admin` com senha 8480054: aprovar
manual e revogar com cliques reais, zero erros de página ✓.

sw.js: cache v35 → v36.
