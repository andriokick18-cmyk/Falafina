# V822 — 13/07/2026 — Aba JOGOS: Game Hub + Learning Engine + Ditado Relâmpago

**Responsável:** Claude (a partir do Prompt Master do Andrio, com autonomia)
**Arquivos alterados:** index.html, server.js

## Decisões de produto que tomei (com a autonomia que você deu)

**Mantidos e diferenciados (não removidos):** os 6 modos existentes JÁ tinham
mecânicas distintas por baixo (Carreira = progressão infinita; Escalada =
corrida sem erro com timer e risco; Simulador = diálogo com avaliação por
pontos-chave; Infinito = repetição espaçada; Pronúncia = microfone; Caça aos
Erros = fila de erros). O problema real era (a) a VITRINE (cards estáticos
iguais) e (b) nenhuma inteligência ligando os jogos. Ataquei essas duas coisas
em vez de reescrever jogos que funcionam — não-regressão em primeiro lugar.

**Renomeado:** Prática → 🎮 Jogos (sidebar, tabbar, títulos). Rotas internas
mantidas ("pratica") pra zero risco de regressão. "Treino Infinito" →
"Revisão Infinita" (nome que diz o que o jogo faz).

**NÃO implementei nesta versão (decisão consciente, não esquecimento):**
IA generativa em tempo real (custo/segurança — o motor combinatório atende),
sotaques múltiplos (a API de voz do navegador não dá controle confiável),
temporadas/eventos e amigos (exigem trabalho de servidor que merece versão
própria), e Knowledge Tracing bayesiano (overengineering pro volume atual de
dados — a engine leve abaixo captura 80% do valor com 5% da complexidade).

## 1. 🧠 FalaFina Learning Engine (leve)
Camada central compartilhada por TODOS os jogos. Cada jogo registra
tentativas por habilidade (👂 Listening, 🗣️ Speaking, 🔤 Vocabulário,
🧩 Gramática, ⚡ Velocidade). A engine:
- calcula domínio por habilidade (só opina com 5+ tentativas — sem chute);
- identifica o ponto fraco real (abaixo de 80%) ou a habilidade menos
  treinada, e recomenda o jogo certo pra ela;
- registra uso de cada jogo (telemetria educacional local, zero
  privacidade violada — nada novo sai do aparelho além do sync normal).
Contadores monotônicos → merge por máximo no servidor (nada se perde).
Hooks instalados em: Carreira (grammar/listening), Escalada (speed),
Revisão Infinita (vocab), Pronúncia (speaking), Simulador (vocab),
Ditado (listening/speed).

## 2. 👂 DITADO RELÂMPAGO — jogo novo com mecânica própria
Listening puro, a maior dor do público H-2B: você OUVE (sem ler nada) e
escreve o que ouviu. 3 vidas, combo, bônus de velocidade, frases vindas
das aulas que o aluno JÁ concluiu (comprehensible input + retrieval).
Aceita 80% das palavras certas (tolerância a typo). Iniciante sem aula
concluída usa a 1ª aula como banco.

## 3. 🎮 Game Hub (a nova cara da aba)
- Herói clicável do Modo Carreira com nível atual (jogo principal);
- "🦜 Fininho recomenda": recomendação personalizada pela engine, com o
  porquê ("seu Listening está em 62% e precisa de reforço");
- Missões de hoje (as 3 metas diárias que já existiam, agora aqui);
- Grade de jogos com identidade: ícone, cor própria, habilidade que
  treina e quantas vezes já jogou;
- Painel "Suas habilidades" com barras de domínio que se preenchem
  conforme joga;
- "Continuar de onde parou" (último jogo aberto).

## 4. ⏱️ Timer educacional no Simulador de Entrevista
Opcional (checkbox, desligado por padrão — acessibilidade primeiro).
Pressão PROGRESSIVA de verdade: começa com 60s por pergunta e cai 4s a
cada 3 respostas dominadas (piso de 20s). Estourar o tempo NUNCA pune:
vira o fluxo "vamos aprender essa" com a resposta modelo. Contador fica
fixo no topo do chat e pulsa em vermelho nos últimos 10s.

## 5. 👂 Listening dentro do Modo Carreira
Do tier intermediário em diante, ~30% das perguntas chegam SÓ POR ÁUDIO
(texto escondido atrás do botão de ajuda) — o mesmo jogo passa a treinar
o ouvido, e essas respostas alimentam a habilidade Listening na engine.

## Testes executados
Sintaxe JS validada (node --check) após cada fase; engine testada em
runtime (domínio null com poucos dados ✓, recomendação ✓ — inclusive
achei e corrigi um bug em que uma habilidade forte a 100% era recomendada
como "reforço"); ids do DOM verificados sem duplicatas reais; merge do
servidor validado.
