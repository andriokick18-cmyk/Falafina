# V820 — 12/07/2026 — Modo Carreira (infinito) + Motor Combinatório + Sidebar + Perfil Público

**Responsável:** Claude (a pedido do Andrio)
**Arquivos alterados:** index.html, server.js

## 1. 🧗 Modo Carreira — NOVO, é o principal
Progressão **BASE** que nunca reseta — diferente da Escalada (que tem o
modo "pulo" com risco de queda pro nível 1). No Modo Carreira, cada
resposta forte SOBE de nível pra sempre; uma resposta fraca não desce
nada, só não avança. Quanto mais alto o nível, mais difícil fica:
- Nível 1-9: iniciante, ajuda visível, perguntas diretas.
- Nível 10-29: intermediário, perguntas compostas, follow-up ocasional.
- Nível 30+: avançado, ajuda escondida por padrão, follow-up mais frequente.

XP por nível escala com a fórmula `12 + nível×1,2` (limitado a 500), o
maior XP de qualquer atividade do app — é o "modo principal" que você
pediu. Também dá girassóis. Estado gravado em `carreira.nivel` (monotônico
— o servidor mescla sempre pelo MAIOR, nunca perde nível).

## 2. Motor combinatório de perguntas infinitas (sem IA, sem custo)
Construí um gerador que combina:
- **5 etapas** (recrutador, empregador, consulado, chegada, no-trabalho) —
  liberadas progressivamente conforme o nível sobe.
- **22 vagas** com vocabulário próprio (ferramentas/tarefas reais de cada
  trabalho), a mesma lista de vagas do Simulador de Entrevista.
- **~30 modelos de pergunta** em 3 níveis de dificuldade, cada um com
  espaço pra encaixar o vocabulário da vaga.
- **Aberturas de cenário** (12 variações) que trocam o contexto da mesma
  pergunta-base.
- **Follow-ups** (perguntas bônus) que aparecem mais nos níveis avançados.

Isso multiplica em milhares de combinações possíveis — não é IA generativa
(não tem custo por chamada, funciona 100% offline), é matemática de
combinação: etapas × vagas × modelos × aberturas. Testei gerando dezenas
de perguntas em sequência pra garantir variedade real.

**Personalização por perfil:** se a pessoa já escolheu a vaga no perfil
(H2B/H2A), o gerador usa o vocabulário daquela vaga na maioria das vezes;
senão, varia entre todas.

## 3. Início (Home) mostra TUDO
Adicionei uma seção "🎯 Tudo que você pode praticar" com atalho direto pra
cada modo: Simulador, Treino Infinito, Escalada, Pronúncia, Caça aos Erros,
Aulas, Desafios, Revisão, Conquistas e Loja — tudo em um clique, sem
precisar entrar na aba Prática primeiro. O Modo Carreira ganhou um card de
destaque próprio, com o nível atual sempre visível.

## 4. Barra lateral (sidebar)
- **🛍️ Loja** agora tem atalho fixo na esquerda.
- **💬 Grupo do WhatsApp** fixo logo abaixo da Loja, sempre visível, com
  destaque verde e uma pulsação sutil pra chamar atenção (sem ser
  irritante) — abre o link do grupo direto.

## 5. Perfil público — clique no nome do Ranking
Clicar em qualquer pessoa do ranking (mundial ou local) abre um perfil
com: avatar com a borda equipada, título por XP, mascote equipado, XP
total, dias seguidos, recorde da Escalada, nível do Modo Carreira,
desafios resgatados, e a grade de medalhas conquistadas (reaproveitei o
sistema de Conquistas que já existia, agora funciona tanto pro seu perfil
quanto pro de qualquer outra pessoa). Não mostra o que a pessoa comprou
na Loja além do que já está equipado (isso é público de qualquer forma,
já aparecia no ranking) — respeitando sua decisão de manter só isso
visível.

**Mudança no servidor:** o endpoint `/api/ranking` agora manda um resumo
compacto de cada pessoa (contagens, não os dados brutos) pra montar esse
perfil sem expor a árvore inteira de progresso de ninguém.

## 6. Auditoria de XP — o que já estava garantido
Revisei todo o app: Aulas (XP do módulo), Escalada (XP + bônus relâmpago),
Treino Infinito (XP contínuo), Revisão em todas as abas — Inteligente,
Palavras, Erros, Favoritos — (15 XP por sessão), Simulador de Entrevista
(XP por resposta) e Desafios (XP + girassóis) já garantiam XP
corretamente. O único modo sem XP próprio era porque não existia ainda —
o Modo Carreira, que resolvi agora.

## 7. Pequena correção de honestidade
O card da Escalada dizia "Errou, desce" — mas conferindo o código, isso só
acontece no modo "pulo" (arriscar um nível bem à frente); no dia a dia
normal, errar não derruba de nível. Corrigi o texto pra não prometer algo
que o sistema não faz.

## Pontos que ficaram para uma próxima conversa
- O motor combinatório é rico, mas ainda vai gerar, ocasionalmente, uma
  combinação um pouco estranha (ex.: um vocabulário de "condição" tentando
  encaixar num modelo que fala de "ferramenta quebrando"). Dá pra refinar
  categorizando melhor o vocabulário por tipo (ferramenta física vs.
  conceito) — funcional hoje, mas não 100% "redondo" em toda combinação.
- "Tempo de aprendizado" no perfil público está representado por dias
  seguidos e XP total (não existe um contador de minutos/horas no sistema
  hoje) — se você quiser um relógio de verdade, é um recurso novo pra
  planejar.
