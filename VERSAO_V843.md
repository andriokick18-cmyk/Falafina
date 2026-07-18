# V843 — 18/07/2026 — 📌 Palavra da VEZ: muda o dia todo (correção de visão do Andrio)

**Responsável:** Claude (Andrio: "não quero palavra por dia — guardou o
celular, pegou de novo, tem OUTRA palavra. Muda sempre, a todo momento")
**Arquivos alterados:** index.html, server.js, sw.js

## A verdade técnica (registrada)
Trocar a palavra A CADA DESBLOQUEIO literal = só app nativo Android
(widget de tela de bloqueio). Site/PWA não tem esse poder — fica no
roadmap. Esta versão chega o mais perto possível na web:

## O que mudou
1. **Tela de bloqueio: palavra troca de 2 em 2 horas (8h–22h Brasília)**
   — cada envio usa a MESMA tag de notificação, então a nova SUBSTITUI a
   anterior EM SILÊNCIO (sem buzinar toda hora). A pessoa pega o celular
   → a palavra na notificação é outra. 7 palavras diferentes por dia.
2. **No app: troca a cada VOLTA** — guardou o celular / trocou de app e
   voltou → `visibilitychange` gira a palavra NA HORA e a Home
   re-renderiza. Esse é o "muda a todo momento" dentro do app.
3. **App e notificação sincronizados**: os dois calculam a palavra pela
   mesma fatia de 2h — o que está na tela de bloqueio é o que o app
   mostra ao abrir.
4. Rebatizada: "Palavra do Dia" → **"📌 Palavra da Vez · MUDA O DIA
   TODO"** (card, botão do push, Configurações, texto de compartilhar).

## Testes executados (servidor Node real + Chromium — 0 erros)
Servidor calcula a palavra da fatia e /api/push/testar responde ✓ ·
card renomeado ✓ · app retorna a MESMA palavra da fatia do servidor
("challenge" nos dois) ✓ · sair e voltar troca a palavra na hora
(challenge → success) e a Home re-renderiza ✓.

sw.js: cache v30 → v31.
