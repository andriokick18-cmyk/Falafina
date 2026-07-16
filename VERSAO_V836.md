# V836 — 17/07/2026 — 🌻 Jardim Tranche 2: corpus de 420 → 780 palavras

**Responsável:** Claude (modo "Próximo" — o próximo passo previsto na V825:
"expandir = concatenar tranches no array, a engine escala sozinha")
**Arquivos alterados:** index.html, sw.js

## A tese
Com a mecânica polida (V826–V835), a alavanca de valor agora é CONTEÚDO —
é o que o aluno consome todo dia e o que sustenta anos de uso. A matemática
da V825: cada palavra = 4 modos × ~5 exposições espaçadas. +360 palavras
≈ +7.200 interações ≈ +60-80 horas de estudo só desta tranche.

## O que entrou — Tranche 2: 360 palavras em 18 bandas
Pessoas e família · Tempo (minuto→férias) · Verbos essenciais 2
(feel/keep/meet/win...) · Verbos de trabalho (load/stack/sweep/mow...) ·
Cozinha (boil/chop/slice + utensílios) · Comida 2 (butter/sauce/garlic...) ·
Ferramentas 2 (drill/wrench/forklift/cement...) · **Segurança do trabalho**
(danger/goggles/first aid/wet floor — vocabulário que EVITA acidente) ·
Hotel/limpeza 2 (lobby/bleach/stain...) · Fazenda/natureza (crop/soil/
cattle-adjacentes...) · Roupas · Sentimentos (homesick/proud/nervous...) ·
Celular/tecnologia (password/charger/wifi...) · Dinheiro 2 (cash/loan/
raise/afford...) · Trabalho 2 (payday/clock in/foreman/promotion...) ·
Casa nos EUA (landlord/lease/outlet...) · Conectores (because/until/
although...) · Frases úteis 2 (right away/take a break/see you later...)

Formato idêntico ao corpus original: [en, pt, som] com a pronúncia
escrita nas convenções da casa (h→"r": house=ráus; th; -tion→chon...).

## Segurança do progresso
- Append no FIM do array: o progresso do Jardim é indexado por posição
  (`p.lexico[idx]`) — **nenhum índice antigo muda**, ninguém perde planta
- Validado por script: **780 itens, 0 duplicatas (case-insensitive),
  0 malformados**, índice 0 = "time" e 5 = "work" intactos
- Tutorial do Jardim agora mostra o total DINAMICAMENTE
  (`${LEX_CORPUS.length} sementes`) — nunca mais fica desatualizado

## Testes executados (script + Chromium — 0 erros de página)
Corpus 780/0 dups/0 malformados ✓ · progresso antigo preservado (caixas
do idx 0 e 5 intactas) ✓ · sessão de rega abre e gera exercícios ✓ ·
tutorial diz "780 sementes" ✓ · 3 exercícios respondidos sem erro ✓.

sw.js: cache v23 → v24.
