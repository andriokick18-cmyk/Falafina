# V859 — 26/07/2026 — 🕹️ Arcade FalaFina: 3 jogos novos + pets de verdade

**Responsável:** Claude (pedido do Andrio: "CRIE MAIS 3 JOGOS DIFERENTES E
DEIXE NA PAGINA INICIAL DO MESMO JEITO. UM JOGO DE MEMÓRIA QUE ENSINA
INGLÊS com níveis — palavras, mais difícil frases. USE TODOS OS PACKS. OS
OUTROS 2 VOCÊ ESCOLHE!" + "arrume a loja com os packs novos" + 16 packs
Kenney novos enviados, incluindo Cube Pets)
**Arquivos alterados:** index.html, sw.js, sprites/pet-*.png (12 novos)

## 🃏 Memória Mágica (o pedido) — habilidade: Vocabulário
- Cartas de madeira com estrela de pixel no verso, flip 3D
- Níveis: 🌱 Fácil (4 pares de palavras) · 🌿 Médio (6 pares) ·
  🌳 Difícil (6 pares de FRASES inteiras, do pool da Palavra do Dia)
- Par certo é FALADO em inglês; erros contam; ⭐⭐⭐ por poucos erros
- XP por par (bônus no nível frase), ENGINE vocab por tentativa

## 👾 Invasão dos Monstrinhos (escolha 1) — habilidade: Velocidade
- 3 monstros do pico-8 caem do céu com plaquinhas de palavras em inglês;
  derrube o da tradução certa ANTES de aterrissar — a queda acelera a
  cada onda (10 ondas, 3 corações, shake/explosão de estrelas)

## 👂 Eco da Caverna (escolha 2) — habilidade: Escuta
- O monstro da caverna "ecoa" uma palavra (áudio real via voz nativa);
  4 opções escritas — escolha o que OUVIU; 10 ecos por corrida
- Sem áudio no aparelho? Mostra o COMO SOA escrito (degrada bem)

## 🏠 Na Home, do mesmo jeito da Masmorra
Grid de 3 mini-cards escuros logo abaixo do card da Masmorra, cada um com
seu MINI-PREVIEW ANIMADO em canvas (carta virando, monstro caindo, ondas
sonoras) — um único loop desenha os 3 e para sozinho ao sair da Home.

## 🐾 Loja: pets com sprites de VERDADE (pack Cube Pets do Andrio)
- Os 9 pets emoji viraram bichinhos renderizados do pack (pintinho,
  lagarta, raposa, macaco, panda, tigre, leão, cervo, elefante) + 4 pets
  NOVOS no catálogo: Miss Miau 🐱, Buddy 🐶, Gelinho 🐧
- Nomes/descrições atualizados pro bicho real (Sábio agora é o panda;
  o lendário é o Elefante Ancestral — "memória de elefante")
- petHTML já suportava img → pets aparecem com sprite em TODO lugar:
  ranking, perfil, Home e vitrine da Loja

## Testes executados (Node + Chromium, servidor real)
3 cards arcade na Home ✓ Memória: seleção de nível → 8 cartas → jogo
resolvido → tela de estrelas ✓ Invasão: canvas + 2 ondas (1 acerto/1
erro) avançando ✓ Eco: 4 opções, acerto avança rodada ✓ Loja Pets: 12
sprites do pack renderizando com raridades ✓ zero erros de página ✓.

sw.js: cache v45 → v46.
