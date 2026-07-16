# V827 — 16/07/2026 — 🎯 Aulas com guia visível + Desafios que levam pro treino certo

**Responsável:** Claude (auditoria pós-deploy da V826, com screenshots reais do site no ar)
**Arquivos alterados:** index.html, sw.js

## O que motivou
Prints do site em produção mostraram dois pontos:
1. A tela de **Aulas** ficou sem explicação — o shell esconde o cabeçalho
   antigo da trilha (`#tela-trilha > .cabecalho-trilha{display:none}`),
   então a edição da V826 naquele cabeçalho nunca aparecia.
2. Nos **Desafios**, quem ainda não bateu a meta via um botão
   "Continuar" desativado — clicava e não acontecia nada.

## O que entrou

### 1. Faixa-guia nas Aulas (agora visível de verdade)
`faixaArea("aulas")` renderizada DENTRO de `#trilhaConteudo` (o miolo que
o shell mostra), com o "?" abrindo o guia completo da área.

### 2. Desafios acionáveis: "Treinar agora ▶"
Meta em aberto → botão azul que LEVA direto pro treino que conta pra
aquela meta (campo `vai` em cada desafio):
- Complete 1 aula / Sequência de Fogo / Surpresa → próxima aula
- Faça 10 exercícios / Corrida contra o tempo → Revisão Inteligente
- Pratique pronúncia / FalaFina Fluente → cards com 🎤
- Mestre da Gramática → Modo Carreira
- Ouvido Atento → Ditado Relâmpago
- Pronto pra Entrevista → Simulador de Entrevista
Meta batida → "Resgatar 🎁" (como antes). Resgatado → "Concluído! 🔥".

### 3. sw.js: cache v14 → v15

## Testes executados (runtime, Chromium — 38 checagens, 0 erros de página)
11 rotas + guia "?" de cada uma ✓ · faixa visível nas Aulas ✓ · aula
abre → quiz abre → resposta aceita ✓ · os 8 jogos abrem (carreira,
entrevista, ditado, jardim, escalada, pronúncia, infinito, erros) ✓ ·
entrevista inicia e faz pergunta ✓ · 10 botões "Treinar agora" e o de
entrevista leva ao simulador ✓ · 5 abas da Revisão ✓ · 5 abas da Loja ✓ ·
mapa lista 11 áreas ✓ · deslogado cai na landing ✓ · sintaxe JS ✓.
