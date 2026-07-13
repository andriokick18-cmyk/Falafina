# V823 — 13/07/2026 — Auditoria de Consistência dos Jogos (4 correções)

**Responsável:** Claude (pergunta do Andrio: "esses jogos têm consistência?")
**Arquivo alterado:** index.html

Resposta honesta: tinham 4 inconsistências reais. Todas corrigidas e testadas.

## 1. GRAVE — "Yes" sozinho subia de nível no Modo Carreira
Visível no seu próprio print: a avaliação por palavra-chave aceitava uma
resposta de 1 palavra como "resposta forte". Agora, produção livre exige
FRASE de verdade (3+ palavras) pra subir de nível — resposta de 1-2
palavras que cobre o ponto-chave vira "parcial", com XP reduzido e a
instrução explícita: "numa entrevista de verdade, responda com uma frase
completa". Coerente com o objetivo pedagógico (produzir frases, não
palavras soltas).

## 2. Timer da Entrevista vazava ao encerrar no meio da pergunta
Se o aluno apertasse "Encerrar" com o cronômetro rodando, o timer
continuava vivo em segundo plano. Agora encerrarSim() para o timer.

## 3. Hub dizia que Entrevista treina Speaking, mas registrava Vocabulário
A etiqueta do jogo no Hub e a habilidade registrada na Learning Engine
não batiam. Alinhado: Entrevista registra Speaking (produção), como o
Hub promete.

## 4. Ditado Relâmpago punia resposta CERTA
Quem ouvia "I'm ready" e escrevia "I am ready" (a mesma coisa!) errava,
porque a normalização removia o apóstrofo e "im" ≠ "am". Agora contrações
são expandidas dos dois lados (I'm=I am, don't=do not, we're=we are,
I'll=I will, I've=I have, I'd=I would) — testado em runtime, passou.
Bônus: o distrator do modo iniciante "Can you repeat the question,
please?" era uma resposta LEGÍTIMA na vida real — marcar como errada
ensinaria errado. Trocado por uma opção claramente ruim.

## Consistências verificadas e OK (sem mudança)
- XP: escala por jogo é intencional (Carreira > demais, é o modo
  principal); girassóis = XP/3 na Carreira, padrão mantido.
- Engine: contadores monotônicos, merge por máximo no servidor ✓.
- Progressão da Carreira nunca desce ✓; Escalada só desce no modo pulo ✓.
- Anti-repetição de perguntas ✓ (janela das últimas 4).
