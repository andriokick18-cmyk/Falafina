# V837 — 17/07/2026 — ✂️ A GRANDE SIMPLIFICAÇÃO: menu 11 → 4 abas, zero clique morto

**Responsável:** Claude (nova ordem do Andrio: "você decide tudo — site o
mais resumido possível, não consigo fazer nada nesse site, clico e não
me mostra nada")
**Arquivos alterados:** index.html, sw.js

## O diagnóstico do dono
11 áreas no menu = paralisia de escolha. O Duolingo, líder mundial,
tem 4. E o pecado capital: cliques que davam em tela vazia ou toast
("Conclua uma aula primeiro 😉") — o famoso "cliquei e não aconteceu
nada". NADA foi apagado por baixo: as telas continuam existindo, mas
acessadas de dentro do fluxo, sem poluir o menu.

## 1. Menu: 11 → 4 abas
**🏠 Início · 📚 Aulas · 🎮 Jogos · 📊 Progresso** (celular e desktop)
- **Progresso** = Perfil + Conquistas + Ranking num lugar só, com
  abinhas (chips) pra trocar entre os três
- Desafios → vive no Início ("🏆 Desafios" + missões do dia)
- Revisão → vive no "Estudar agora" do Início e nos Jogos (Revisão
  Infinita / Caça aos Erros)
- Comunidade → botão do WhatsApp na lateral + botão no Progresso
- Loja → link no Início, botão no Progresso e item na lateral

## 2. Home enxuta (menos é mais vontade de usar)
- SAIU: grade de 10 atalhos (redundante com as abas) e mini-ranking
  (vive no Progresso)
- FICOU o essencial: SEU PRÓXIMO PASSO (o botão que decide sozinho) ·
  missões de hoje · Modo Carreira · Primeiros Passos (só novatos) ·
  baú do dia · dica — e uma linha compacta de links (Desafios ·
  Convidar · Grupo · Loja · Guia)

## 3. ZERO clique morto (a regra nova da casa)
Todo clique leva pra uma AÇÃO DE VERDADE, mesmo pra quem nunca fez nada:
- Missão "Fazer 10 exercícios" → abre o QUIZ na hora (Revisão Infinita
  funciona do zero — antes caía numa tela de revisão vazia)
- Missão de pronúncia/áudio → abre a AULA (onde estão os 🔊/🎤 — antes
  caía em "Conclua uma aula primeiro")
- Jogo Pronúncia sem aula concluída → vai pra aula com aviso
- Caça aos Erros sem erros → "Você ainda não tem erros 🎉" e vira
  Revisão Infinita
- Desafios "Treinar agora" idem

## Testes executados (Chromium — 22 checagens, 0 erros de página)
4 abas no celular e desktop ✓ · Progresso abre perfil com 3 chips e os
chips navegam ✓ · aba ativa correta em telas fora do menu (Desafios →
Início, Ranking → Progresso) ✓ · os 3 cliques de missão abrem quiz/aula
NA HORA com conta zerada ✓ · Pronúncia/Caça aos Erros sem conteúdo caem
em ação real ✓ · rotas jogos/loja/carreira/aulas/comunidade renderizam ✓.

sw.js: cache v24 → v25.
