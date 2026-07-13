# V825 — 13/07/2026 — 🌻 Jardim de Palavras: corpus lexical + domínio em 4 modos

**Responsável:** Claude (o "próximo grande passo" da análise de longevidade)
**Arquivos alterados:** index.html, server.js

## O que é
A resposta estrutural ao diagnóstico do V823/análise: o app tinha ~350
itens de vocabulário e nenhum sistema que exigisse dominar cada palavra
de verdade. Agora existe a arquitetura que sustenta anos:

**Cada palavra é uma planta que cresce em 4 MODOS:**
- 👁️ L — reconhecer LENDO (vê a palavra → escolhe o sentido)
- 👂 O — reconhecer OUVINDO (só áudio → escolhe o sentido)
- ✍️ E — produzir ESCREVENDO (vê o sentido → digita em inglês)
- 🎤 F — produzir FALANDO (microfone)

Os modos destravam em ESCADA (L→O→E→F) — pedagogia real: reconhecimento
antes de produção. Cada modo tem caixa SRS própria (0→3, sobe no acerto,
desce no erro, com intervalos de 0/1/3/7 dias). Palavra FLORESCE quando
os 4 modos chegam à caixa 2+ (dá +🌻10). Máximo de 12 mudas crescendo ao
mesmo tempo — sem afogar o iniciante.

## Corpus — Tranche 1: 420 palavras
Ordenadas por frequência real de uso + vocabulário de trabalho H-2B/H-2A
(ferramentas, cozinha, hotel, documentos, corpo/saúde, clima, direções,
phrasal verbs essenciais). Formato compacto [en, pt, som]. Zero
duplicatas (validado por script). **Expandir = concatenar tranches no
array — a engine escala sozinha, sem tocar em código.**

## A matemática da longevidade
420 palavras × 4 modos × ~5 exposições espaçadas ≈ **8.400 interações ≈
70-90 horas** só desta tranche. Com as tranches 2-4 (caminho pra 2.000+
palavras), passa de 400 horas — é o eixo que sustenta 1-3 anos, como
prometido na análise. Floridas ainda reaparecem de vez em quando pra não
enferrujar.

## Integração
- Card no Hub (🌻, treina Vocabulário) + tutorial de 1ª vez + "?"
- Alimenta a Learning Engine: L/E→vocab, O→listening, F→speaking
- Visual do canteiro: as 12 mudas ativas com estágio (🌰🌱🌿🌾🌻)
- Merge no servidor: caixas por MÁXIMO por modo — progresso nunca se perde
- XP por exercício + girassóis ao florescer

## Testes executados (runtime)
Sessão inicial só traz modo Leitura (escada) ✓ · acerto sobe caixa e
destrava próximo modo ✓ · erro desce caixa ✓ · limite de 12 mudas ✓ ·
corpus 420 itens, 0 duplicatas, 0 malformados ✓ · sintaxe JS completa ✓.
