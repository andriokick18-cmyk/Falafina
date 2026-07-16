# V832 — 16/07/2026 — 📣 Crescimento via WhatsApp: cartão de link + convites com orgulho

**Responsável:** Claude (modo "Próximo")
**Arquivos alterados:** index.html, sw.js

## A tese
O canal de aquisição do FalaFina É o WhatsApp (grupo + boca a boca).
Mas o link compartilhado aparecia PELADO — sem imagem, sem descrição —
e o app não tinha nenhum botão de convite. Cada aluno orgulhoso do
próprio progresso é um vendedor; faltava dar o megafone.

## O que entrou

### 1. Cartão bonito no compartilhamento (Open Graph)
Meta tags og:/twitter: no head — agora TODO link do FalaFina colado no
WhatsApp/Facebook mostra o mascote, o título e a chamada ("Inglês do
zero + treino de entrevista H-2B/H-2A por voz. Comece grátis!").
Mais cliques no mesmo compartilhamento, custo zero.

### 2. 📣 Convidar um amigo (com progresso REAL na mensagem)
`textoConvite()` monta a mensagem com as conquistas da própria pessoa
("Eu já fiz 850 XP e estudei 6 dias seguidos por lá!") + link do app.
Usa o compartilhar nativo do celular (navigator.share); sem ele, abre
o WhatsApp com a mensagem pronta (wa.me). Botões nos pontos de orgulho:
- Home — "📣 Chamar um amigo pra competir" (embaixo do ranking)
- Comunidade — "📣 Convidar um amigo pro FalaFina"
- Meu Perfil — "📣 Convidar amigo"
- Modo Carreira — no balão de TEMPORADA CONCLUÍDA ("Contar essa
  vitória pros amigos") — o momento de maior orgulho do app

### 3. Agradecimento sem farm
Primeiro convite do dia paga 🌻 5 (guardado em `ultimoConviteDia`);
cliques repetidos no mesmo dia não pagam de novo.

### 4. sw.js: cache v19 → v20

## Testes executados (runtime, Chromium — 0 erros de página)
og:image absoluto + og:title/description ✓ · textoConvite cita o XP
real (850) e o link ✓ · botões na Home/Comunidade/Meu Perfil ✓ ·
clique abre wa.me com a mensagem (fallback sem navigator.share) ✓ ·
🌻5 só no 1º convite do dia (2º = 0) ✓ · sintaxe JS ✓.

## Nota pro Andrio
O og:image usa https://falafina.onrender.com/icon-512.png — se um dia
o domínio mudar, atualize as meta tags e FF_URL_APP no index.html.
