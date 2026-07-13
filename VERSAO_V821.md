# V821 — 12/07/2026 — Modo Carreira ensina antes de cobrar (iniciantes)

**Responsável:** Claude (a pedido do Andrio, a partir de um print do app)
**Arquivo alterado:** index.html

## O problema
No print que você mandou, o Modo Carreira jogava o aluno direto numa
pergunta de entrevista em inglês, esperando uma resposta livre por
digitação — sem ensinar nada antes. Pra quem está começando (nível 1-5),
isso é assustador: a pessoa não tem repertório pra "montar" a frase do
zero. Além disso, a mesma pergunta ("Can you work weekends and
holidays?") repetiu logo em seguida — o motor sorteava sem checar
repetição.

## O que mudou

### 1. Níveis 1-5 agora ENSINAM antes de perguntar
Abaixo do nível 6, antes mesmo de esperar uma resposta, o Modo Carreira
mostra uma caixa amarela "💡 Pra responder bem, sua fala precisa ter:"
com os pontos-chave da resposta ideal — a mesma informação que antes só
aparecia DEPOIS de errar.

### 2. Níveis 1-5 viram reconhecimento (múltipla escolha), não produção livre
Em vez de digitar do zero, a pessoa escolhe entre 3 opções (1 certa + 2
erradas genéricas, embaralhadas) — pedagogicamente isso é reconhecimento,
que vem ANTES de produção livre em qualquer método de ensino de idiomas.
Acertar ainda sobe de nível e dá XP normalmente. A partir do nível 6, o
modo volta a ser produção livre (digitar/falar), exatamente como já
funcionava.

### 3. Nunca mais a mesma pergunta duas vezes seguidas
O gerador agora guarda as últimas perguntas mostradas e sorteia de novo
se cair repetida (até 6 tentativas) — testei gerando 15 perguntas em
sequência no nível 2 e nenhuma repetiu consecutivamente.

## Por que só até o nível 6
Mantive a transição suave: reconhecimento (níveis 1-5) → produção livre
com ajuda visível (níveis 6-9) → produção livre com ajuda escondida por
padrão (níveis 10+, como já era). Isso segue a mesma lógica pedagógica
usada nas Aulas — nunca cobra uma habilidade antes de ensiná-la.
