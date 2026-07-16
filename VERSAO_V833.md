# V833 — 16/07/2026 — 📣 Indicação Premiada: crescimento composto pelos próprios alunos

**Responsável:** Claude (modo "Próximo")
**Arquivos alterados:** index.html, server.js, sw.js

## A tese
A V832 deu o megafone (botões de convite). A V833 dá o MOTIVO: recompensa
dos dois lados. Cada aluno satisfeito agora tem interesse próprio em
trazer o amigo — o loop de crescimento clássico que faz app crescer sem
gastar em anúncio.

## Como funciona
1. O aluno convida (botões 📣 da V832) — a mensagem agora termina com:
   *"No cadastro, escreve meu e-mail em 'Quem te indicou' que NÓS DOIS
   ganhamos baús e girassóis!"*
2. O amigo cria a conta e preenche o campo novo **"📣 Quem te indicou?
   (opcional)"**.
3. O servidor valida e credita NA HORA:
   - Quem chegou: 🎁 1 baú + 🌻 50 (aparece já no toast de boas-vindas)
   - Quem indicou: 🎁 2 baús + 🌻 100 (chega na próxima sincronização)

## Blindagens
- Auto-indicação não credita; e-mail inexistente é ignorado em silêncio
- Teto de 100 indicações creditadas por conta (anti-farm)
- Carteira monotônica (ganhas/comprados só crescem) → o crédito
  sobrevive a QUALQUER sincronização, igual ao fluxo de baús comprados
- `indicadoPor` fica registrado na conta (auditável no Painel do Dono)
- Cadastro offline: o campo fica guardado e sobe quando conectar

## Integrações
- **Painel do Dono (/admin):** cada aluno mostra "📣 N indicou" e a API
  admin devolve `indicacoes` + `indicadoPor` — dá pra ver quem são seus
  embaixadores (e recompensá-los com baús manuais!)
- **Comunidade:** card explica a Indicação Premiada
- **Cadastro:** explica o prêmio dos dois lados embaixo do campo

## Testes executados (servidor local + Chromium — 0 erros)
Registro do padrinho ✓ · afilhado com indicadoPor: resposta com
`indicacao`, carteira 🌻50 + 🎁1 ✓ · padrinho creditado 🌻100 + 🎁2 e
contador 📣1 ✓ · auto-indicação NÃO credita ✓ · indicador inexistente
ignorado ✓ · fluxo pela interface real: campo no formulário, toast de
presente, saldo local instantâneo (🌻50/🎁1), convite ensina a indicação
com o e-mail da pessoa, padrinho acumula (🎁4, 📣2) ✓ · sintaxe ✓.
