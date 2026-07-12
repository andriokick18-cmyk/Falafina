# V819 — 12/07/2026 — Currículo Completo de Gramática (Nível 3 "Fluência")

**Responsável:** Claude (a pedido do Andrio)
**Arquivo alterado:** index.html (NIVEIS — nível n3)
**Baseado em:** estudo completo do livro *The Farlex Grammar Book: Complete
English Grammar Rules* (Peter Herring, 1013 páginas) + diagnóstico entregue
anteriormente (ver FalaFina_Curriculo_V819.md).

## O que mudou

O Nível 3 "Fluência" tinha 1 módulo só (phrasal verbs básicos). Agora tem
**32 módulos**, cobrindo do fim do A2 até C1, na ordem pedagógica correta:

**Base que faltava (A2/B1):** artigos (a/an/the), contáveis/incontáveis +
much/many/a lot/few/little, some/any/no, comparativos e superlativos,
question tags, preposições fixas (verbo/adjetivo + preposição), gerúndio ✕
infinitivo, voz passiva (presente/passado), orações relativas (who/which/
that/where/whose), ordem de advérbios, simulado de revisão B1.

**Intermediário (B1+/B2):** condicional zero e primeiro, segundo condicional,
discurso indireto (afirmações, perguntas e comandos), modais de dedução
(must/might/can't be), present perfect continuous, past perfect continuous,
voz passiva em todos os tempos, phrasal verbs avançados + idioms de
trabalho, simulado de revisão B2.

**Avançado (B2/C1):** terceiro condicional e condicional misto, subjuntivo,
inversão enfática, nominalização, conectores formais (however/moreover/
therefore/whereas), orações reduzidas com particípio, voz causativa
(have/get something done), registro formal ✕ informal, idioms avançados,
simulado final C1.

Cada módulo segue exatamente o mesmo formato dos que já existiam: intro,
XP, 5-6 cards bilíngues (com pronúncia escrita e exemplo de frase) e um
quiz de 4-5 perguntas. Todos os exemplos mantêm o foco em trabalho/H2B
(hotel, cozinha, paisagismo, entrevista, papelada) como você pediu.

## Números
- 31 módulos novos (ids n3m2 a n3m32), mais o que já existia (n3m1)
- 163 cards de vocabulário/gramática novos
- 131 perguntas de quiz novas
- Todo o conteúdo foi validado automaticamente (sintaxe JS, campos
  obrigatórios, índices de resposta certa do quiz) antes da entrega —
  zero erros encontrados.

## O que NÃO mudou (por decisão sua)
- Os 4 níveis continuam os mesmos (Primeiro Contato, Sobrevivência,
  Fundamentos Gramaticais, Fluência) — nada de nível novo separado.
- A trava de progresso (só libera o próximo módulo depois de concluir o
  anterior) já era genérica por posição no array — funciona automaticamente
  com os 32 módulos, não precisei mexer nela.
- O sistema de XP, revisão espaçada (SRS) e conquistas usa os mesmos campos
  de sempre (chave de SRS gerada automaticamente a partir do `en` de cada
  card) — os módulos novos entram no sistema de revisão sem configuração
  extra.

## Ponto de atenção
32 módulos num nível só é MUITO conteúdo (é dificuldade real de A2 até C1).
Vale considerar, numa próxima conversa, se faz sentido visualmente dividir
esse nível em sub-blocos dentro da própria tela de trilha (ex: "Fluência —
Fundamentos", "Fluência — Intermediário", "Fluência — Avançado") só como
agrupamento visual, sem criar nível novo de verdade — mas isso fica pra
quando você quiser.
