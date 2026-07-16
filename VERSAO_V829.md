# V829 — 16/07/2026 — 🆘 NINGUÉM FICA TRAVADO: missões do dia e 1ª aula sempre concluíveis

**Responsável:** Claude (relatos REAIS do grupo do WhatsApp: "não consigo
finalizar a primeira aula" / "E agora? Faço o quê, gente???")
**Arquivos alterados:** index.html, sw.js

## As 3 causas raiz encontradas

### 1. "Praticar pronúncia 3x" era IMPOSSÍVEL em muitos aparelhos
iPhone/Safari, Firefox e o navegador interno do WhatsApp (por onde a
comunidade abre o site!) não têm SpeechRecognition — o 🎤 nem aparece.
Missão eternamente 0/3 → "Desafio Surpresa" também impossível.
**Correção:** sem mic, a missão vira **"Ouvir 5 áudios no 🔊"**
(cada toque no alto-falante conta — novo contador `stats.audio`).
Desafio único "FalaFina Fluente" vira "Ouvinte de Elite" (30 áudios).
Toasts de dica também se adaptam.

### 2. "Concluir 1 aula" só contava a PRIMEIRA conclusão da vida
Quem refazia uma aula já concluída via o contador travado em 0/1
(exatamente o print da Patricia). **Correção:** TODA conclusão de quiz
conta pra missão do dia; refazer aula agora dá +15 XP de revisão.

### 3. Quiz da aula podia virar loop sem saída
Pergunta errada volta pra fila até acertar (100% obrigatório) e as
perguntas "escolha o que você OUVIU" eram impossíveis em navegador sem
voz. **Correções:**
- Navegador sem voz → perguntas de escuta ficam FORA do quiz da aula
  e o gerador não cria o tipo "o que você ouviu".
- **💡 Ajuda do Fininho:** errou a mesma pergunta 2x → a dica aparece
  ANTES de responder na próxima vez (em múltipla escolha, montar frase
  e digitar). Rigor continua, mas sempre há saída.

## Também nesta versão
- **Jardim de Palavras sem mic:** modo FALAR agora tem "🗣️ Falei em voz
  alta ✔" que registra progresso real (antes a palavra NUNCA florescia
  sem microfone); modo OUVIR sem áudio mostra o 🗣️ COMO SOA escrito.
- **Ditado sem áudio:** explica o motivo e sugere abrir no Chrome
  (antes só quebrava a experiência).
- **Aviso na Home** quando o navegador não tem voz: como abrir no
  Chrome/Safari a partir do WhatsApp.
- Checks de `speechSynthesis` endurecidos (truthiness, não `in window`).
- sw.js: cache v16 → v17.

## Testes executados (runtime, Chromium — 0 erros de página)
**Cenário navegador SEM voz/mic (WhatsApp):** aviso na Home ✓ · missão
vira "Ouvir 5 áudios" ✓ · desafios adaptados ✓ · quiz da 1ª aula sem
perguntas de escuta ✓ · Ditado bloqueado com explicação ✓.
**Cenário Chrome normal:** missão de pronúncia normal ✓ · sem aviso ✓ ·
refazer aula conta (0→1) ✓ · 🔊 conta áudio (0→1) ✓ · Ajuda do Fininho
após 2 erros (unitário e fluxo real com fila) ✓.
**Regressão:** varredura completa das 11 áreas, jogos, revisão e loja ✓.
