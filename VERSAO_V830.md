# V830 — 16/07/2026 — 💰 Conversão da Semana Grátis: Primeiros Passos + Paywall 2.0

**Responsável:** Claude (modo "Próximo": decisão estratégica de dono)
**Arquivos alterados:** index.html, sw.js

## A tese (por que ESTA melhoria agora)
O funil do FalaFina é: entra pelo grupo → 7 dias grátis → paywall manual
via WhatsApp. Dois vazamentos:
1. **Ativação:** o aluno novo não tinha um caminho guiado na 1ª semana —
   e aluno que não cria hábito no trial não assina.
2. **Conversão:** o paywall era uma parede seca ("sua semana acabou")
   sem mostrar valor, sem urgência antes do fim, sem o progresso em jogo.
Aluno ativado + paywall que dói largar = mais Premium. Receita é isso.

## O que entrou

### 1. 🚀 Primeiros Passos (trilha de ativação, card na Home)
7 quests que apresentam o coração do app na primeira semana:
1. 🐣 Concluir a 1ª aula (🌻20) · 2. 📞 Fechar "A Agência" na Carreira
(🌻25) · 3. 🌻 Regar o Jardim (🌻20) · 4. 👂 Ouvir 5 áudios (🌻15) ·
5. 🔥 2 dias seguidos (🌻30) · 6. 🏆 Resgatar 3 desafios (🌻20) ·
7. ⭐ 300 XP (🌻50 + 🎁 2 baús). Total: 🌻 180 + 2 baús.
- Conclusão é COMPUTADA do progresso real (zero estado novo); resgate
  usa `p.resgates` (união no merge cliente/servidor — nunca se perde).
- Passo bloqueado mostra COMO fazer ("Aulas → primeira da trilha").
- Completou e resgatou os 7 → o card some (Home limpa pros veteranos).

### 2. ⏳ Banner de urgência no fim do trial (Home)
Faltando ≤2 dias: "ÚLTIMO DIA da sua semana grátis!" com o progresso da
pessoa (XP, sequência) e botão direto pro WhatsApp de ativação.
Converter ANTES da parede é mais barato que depois.

### 3. 👑 Paywall 2.0 (o momento da receita)
- Chama pelo nome: "Bia, não pare agora! 💚"
- Mostra O QUE ESTÁ EM JOGO: XP total, dias seguidos, palavras
  aprendidas e temporada da Carreira da própria pessoa
- Lista concreta do que o Premium inclui (aulas/jogos sem limite,
  revisão inteligente, Simulador H-2B/H-2A, suporte, novidades semanais)
- Reforço de confiança: "ativação na hora, sem cartão em site"
- Mantém: WhatsApp pré-preenchido, "já paguei — verificar", sair

### 4. sw.js: cache v17 → v18

## Testes executados (runtime, Chromium — 0 erros de página)
Usuário novo vê 0/7 com instruções ✓ · progresso real destrava resgates
(3 resgatáveis) ✓ · resgates pagam 🌻 (+70) e baús (+2) ✓ · contador
2/7 ✓ · tudo resgatado → card some ✓ · banner ÚLTIMO DIA no dia 6 ✓ ·
trial expirado cai no paywall ✓ · paywall com nome, progresso em jogo e
benefícios ✓.
