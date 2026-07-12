# V818 — 12/07/2026 — Sistema de Baús + Girassóis + Efeitos Vivos

**Responsável:** Claude (a pedido do Andrio)
**Arquivos alterados:** index.html, server.js

## O que mudou

### 1. Moeda renomeada: 🌱 Sementes → 🌻 Girassóis
Trocado em todos os lugares onde a moeda aparece (carteira, loja, toasts,
conquistas, economia da Escalada). Não mexi em textos que usavam "🌱" com
outro sentido (nível "do zero", vaga de estufa/viveiro) nem no nome interno
de variável `ultimoDiaSemente` (invisível pro usuário).

### 2. Baú Diário Grátis (1x por dia)
- Ao logar, se ainda não abriu hoje, aparece um pop-up com um baú fechado.
- Toque no baú → animação de abertura → prêmio revelado.
- Também acessível a qualquer momento pela Loja → aba 🎁 Baús, ou pelo
  banner na tela Início.

### 3. Tabela de chances (por baú, grátis ou comprado)
| Prêmio | Peso | Chance aprox. |
|---|---|---|
| 🌻 10 | 3000 | ~29,5% |
| 🌻 20 | 2500 | ~24,6% |
| 🌻 50 | 2000 | ~19,7% |
| 🌻 100 | 1500 | ~14,8% |
| 🌻 150 | 800 | ~7,9% |
| 🌻 200 | 300 | ~3,0% (≈10x mais raro que o comum) |
| 🖼️ Borda de avatar aleatória (nunca a de nível máximo "Coroa Imortal") | 30 | ~0,3% (≈100x mais raro) |
| ✨ Efeito de ranking aleatório (nunca o de nível máximo "Trono Imortal") | 15 | ~0,15% (≈200x mais raro) |

Se o jogador já tiver TODAS as bordas/efeitos elegíveis, o baú vira um
bônus de girassóis (nunca "baú vazio").

### 4. Compra de baús (loja → aba 🎁 Baús)
Pacotes: 10 por R$4,90 · 50 por R$14,90 · 100 por R$22,90 · 200 por
R$29,90 (melhor custo-benefício — em 200 baús a chance de sair PELO MENOS
1 borda é de ~45%, e de PELO MENOS 1 efeito é de ~26%: vale a pena tentar,
mas não é garantido, do jeito que um baú de verdade deveria funcionar).

**Pagamento:** ainda manual pelo WhatsApp (mesmo fluxo já usado pro
Premium) — não implementei gateway de pagamento automático porque isso é
uma decisão maior de arquitetura/custo que prefiro alinhar com você antes.
Assim que o aluno confirma o pagamento, credite os baús comprados abrindo
esta URL no navegador (troque SUACHAVE pela sua ADMIN_CHAVE do Render):

```
https://SEU-SITE.onrender.com/api/creditar-baus?chave=SUACHAVE&email=aluno@email.com&qtd=200
```

### 5. Abertura em lote (10 em 10)
Estoque de baús comprados abre em grade de até 10 por vez, com cada baú
revelando seu prêmio com animação e brilho pela raridade, e um resumo no
final (girassóis, bordas e efeitos ganhos naquela leva).

### 6. Efeitos visuais completamente refeitos
- **Bug corrigido:** as bordas de avatar giratórias (Selva, Fogo, Elétrica,
  Aurora, Galáxia, Coroa Imortal) tinham a animação de rotação CANCELADA
  por uma regra CSS posterior que sobrescrevia a propriedade `animation` —
  por isso ficavam "paradas", só com uma leve variação de matiz. Eram
  três camadas de efeito planejadas e só uma sobrevivia.
- Reescrevi como camadas que rodam juntas: giro do gradiente + brilho
  pulsante por fora (`::before` com blur) + detalhes extras (coroa
  flutuando na Coroa Imortal, estrelinha piscando na Galáxia).
- Os **efeitos de ranking** (Brilho Verde, Neon Azul, Fogo, Raios, Aurora,
  Névoa, Arco-Íris, Trono...) existiam no código mas praticamente sem
  vida (só cor de borda estática). Agora têm glow pulsante, faixas
  animadas, ícones piscando/flutuando e degradês correndo — visíveis
  também dentro da própria Loja, na pré-visualização de cada efeito.
- Novo sistema de cores por raridade nos baús (comum → incomum → raro →
  épico → lendário → mítico), cada um com seu brilho/animação.

### 7. Início (Home)
Adicionado um banner de baú na tela Início (mostra "seu baú grátis está
esperando" ou o estoque atual), sem remover nada do que já existia. A
tela Início já reunia os atalhos que geram XP (aula do dia, exercícios,
pronúncia, link pra desafios) — não mexi na navegação principal (Aulas,
Prática, Desafios continuam como abas próprias) porque isso mudaria a
estrutura de navegação de forma mais ampla do que o pedido detalhava; se
você quiser, na próxima versão posso desenhar a fusão completa dessas
abas dentro da Início.

## Dados — nada se perde
Tudo trafega pelo mesmo mecanismo de sincronização já existente:
- `cosmeticos.ganhas` (girassóis) já era monotônico — só cresce.
- `cosmeticos.tem` (bordas/efeitos possuídos) já era união — nunca
  remove, só soma.
- Novo `cosmeticos.baus.comprados` e `.abertos`: mesmo padrão monotônico
  (só crescem). `ultimoGratis` usa a data mais recente entre os dois
  lados na hora de mesclar.
- Atualizei o `mesclarProgresso` do server.js pra incluir esse novo campo
  — sem isso, o merge do servidor ia jogar fora os baús comprados/abertos
  a cada sincronização.
