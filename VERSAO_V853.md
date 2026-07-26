# V853 — 26/07/2026 — 🖼️ Redesenho RPG, Aba 1: BORDAS de avatar (fim do "girando ridículo")

**Responsável:** Claude (pedido direto do Andrio: "melhore todos efeitos de
bordas girando é muito ridículo, ja falei pesquisa na Internet algo de
designer rpg, todo site nao apenas alguma coisas — faça aba por aba
completa; quando eu falar próxima você faz outra até acabar")
**Arquivos alterados:** index.html, sw.js

## Pesquisa feita (como pedido)
Referências levantadas na internet de frames de avatar de RPG/MMO
(coleções de game UI estilo Hearthstone/LoL/MMO mobile + técnicas de
shine/glint em CSS). A linguagem visual desses frames profissionais:
- **Metal com relevo** — luz vinda de cima, sombra embaixo (bevel), nunca
  cor chapada
- **Progressão de material** simples→luxo (madeira → bronze → prata →
  ouro → temas mágicos → lendário ornamentado)
- **Gemas cravadas** nos pontos cardeais do anel
- **Ornamento/coroa** só no tier máximo
- **Vida SEM rotação**: glint (brilho varrendo de vez em quando), halo
  respirando, faíscas subindo, estrelas cintilando

## Bugs graves do design antigo (achados no redesenho)
- `avbGira` girava o **wrapper inteiro** — a FOTO da pessoa girava junto
  com a borda (por isso o "ridículo")
- `avbBrilhoSuave` aplicava `filter:brightness` no wrapper — **clareava a
  foto** da pessoa a cada pulso
Regra nova gravada em comentário: nunca transform/filter no `.avb`.

## As 10 bordas refeitas
| Borda | Design novo |
|---|---|
| 🪵 Madeira | anel entalhado com veios (repeating-conic), estático e sereno |
| 🥉 Bronze | metal batido com 4 rebites em relevo + glint ocasional |
| 🥈 Prata | prata polida, glint de espelho frequente |
| 🥇 Ouro | relevo dourado com 4 RUBIS cravados + halo quente respirando |
| 🌿 Selva | cipó com orvalho, cores deslizando devagar (drift, não rotação) |
| 🔥 Chama Viva | brasa incandescente (rachaduras de fogo) + FAGULHAS SUBINDO |
| ⚡ Tempestade | aço escuro, filete neon interno, arco elétrico estalando em rajadas |
| 🌌 Aurora | cortina de cores deslizando lentamente |
| 🌠 Galáxia | espaço profundo com estrelas de verdade cintilando fora de fase |
| 👑 Coroa Imortal | ouro duplo, 8 gemas alternadas (rubi/esmeralda/safira/ametista), coroa flutuando |

## Técnica (o que faz parecer "de jogo")
- Glint/fagulhas/cintilos acontecem numa camada **mascarada em anel**
  (`mask: radial-gradient`) — o brilho varre SÓ o metal, nunca passa por
  cima do rosto da pessoa
- Engaste: linha escura onde a foto "assenta" no metal + bevel
  (luz em cima/sombra embaixo) em todas as bordas
- Só `transform/opacity/background-position` nas animações (barato em
  GPU, roda liso em celular fraco)
- Anel mais grosso (3px → 5px; lendária 6px) — as molduras têm presença
- Descrições da Loja atualizadas pro que cada borda realmente é

## Fluxo de trabalho combinado
Este é o item 1 do redesenho **aba por aba** do site inteiro. Quando o
Andrio disser "próxima", a próxima aba recebe o mesmo tratamento
(pesquisa → redesenho completo → teste → deploy).

## Testes executados (Node + Chromium, servidor real)
`node --check` no script ✓ · Loja/aba Bordas com as 10 novas molduras no
palco escuro: madeira/bronze/prata/ouro/selva/fogo/elétrica/aurora/
galáxia/imortal renderizando com gemas e rebites visíveis ✓ · duas
capturas com 1,5s de intervalo confirmam glint andando sem a foto girar
✓ · raridades Comum/Raro/Épico/Lendário da V852 seguem funcionando ✓ ·
zero erros de JavaScript de página.

sw.js: cache v39 → v40.
