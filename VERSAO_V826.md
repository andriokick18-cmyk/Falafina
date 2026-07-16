# V826 — 16/07/2026 — 🗺️ Guia de Áreas: cada tela explica onde você está e o que está treinando

**Responsável:** Claude
**Arquivos alterados:** index.html, sw.js

## O problema
O app cresceu muito (aulas, 8 jogos, revisão, desafios, loja...) e quem
chega novo não sabia o que era cada área, nem o que estava praticando ao
clicar. Como o site é o treino principal de quem estuda pro caminho
H-2B/H-2A, cada nome e explicação precisa dizer NA HORA o que a pessoa
ganha ali.

## O que entrou

### 1. Faixa "Você está em..." (verde, topo de cada área)
Toda área agora abre com uma faixa dizendo o nome da área e o que se
treina nela, com um botão **?** que abre a explicação completa.
Áreas cobertas: Jogos de Treino, Desafios, Revisão da Memória,
Conquistas, Loja, Comunidade, Meu Perfil, Configurações (+ "?" nos
cabeçalhos de Aulas/Trilha e Ranking, que já tinham texto próprio).

### 2. Botão "?" no cabeçalho (toda tela logada)
Ao lado do título da página. Toca → explica a área atual em 2–4 passos
(o que é, o que treina, como pontuar, ligação com H-2B/H-2A).

### 3. 🗺️ Mapa do FalaFina
Modal com TODAS as 11 áreas explicadas em uma olhada + **glossário
H-2B/H-2A** (o que é cada visto e as 4 etapas de conversa em inglês:
agência → empregador → consulado → chegada). Acessível pelo "?" de
qualquer guia e pelo link "O que é cada área?" na Home.

### 4. Nomes que dizem o que a pessoa pratica
- Rota "Jogos" → **"Jogos de Treino"**; "Revisão" → **"Revisão da Memória"**
- Jogo "Entrevista" → **"Simulador de Entrevista"**; "Pronúncia" →
  **"Treino de Pronúncia"**
- Habilidades em português: Listening → **Escuta**, Speaking → **Fala**
  (com nome em inglês e descrição no tooltip das barras)
- Descrições dos 8 jogos reescritas dizendo O QUE se treina
  ("Treine o OUVIDO: escute a frase e escreva o que ouviu...")
- Atalhos da Home ("Tudo que você pode praticar") ganharam legenda em
  cada botão ("ensaie a entrevista H-2B/H-2A falando inglês" etc.)

### 5. Infra
- `AREAS_GUIA` (dados) + `faixaArea()`, `abrirGuiaArea()`, `abrirMapaApp()`
- Listener delegado único para todos os `[data-guia]` (funciona em
  conteúdo re-renderizado, sem religar handlers)
- sw.js: cache v13 → v14

## Testes executados (runtime, Chromium)
Navegação pelas 11 rotas sem erro de página ✓ · faixa "Você está em"
presente nas 8 áreas dinâmicas ✓ · "?" do topo abre o guia da área
atual ✓ · Mapa lista 11 áreas + glossário H-2X ✓ · clique num item do
mapa abre o guia daquela área ✓ · "?" da faixa verde funciona ✓ ·
atalhos da Home com legenda ✓ · sintaxe JS completa (node --check) ✓.

Observação pré-existente (não é desta versão): em telas ~420px o título
no cabeçalho fica espremido pelas pills de XP/streak — a faixa verde
compensa mostrando a área dentro do conteúdo.
