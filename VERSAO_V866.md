# V866 — 27/07/2026 — 🏠 Aventura na Home + 💾 Continuar de onde parou

**Responsável:** Claude (ciclo C do "tudo até o limite": retenção + acesso)
**Arquivos alterados:** index.html, sw.js

## 🏠 Banner da Aventura na página inicial
- Banner dourado escuro logo abaixo do arcade: herói de um lado, o CHEFE
  do seu mapa atual do outro, "JOGAR ▶" pulsando
- Mostra progresso VIVO: elemento + número do mapa atual e quantos baús
  secretos você já achou — o banner evolui com o jogador
- Clique passa pelo fluxo normal (tutorial na 1ª vez, depois direto)

## 💾 Save de mapa: "▶ CONTINUAR"
- Todo mapa que você entra vira `aventura.ultimoMapa` (salvo na nuvem)
- A tela de mapas ganhou o botão verde "▶ CONTINUAR — Mapa X 🔥 Fogo"
  no topo: um toque e você está de volta onde parou (padrão de RPG:
  nunca fazer o jogador procurar onde estava)

## Testes executados (Chromium mobile, servidor real)
Regressão v1.1 completa ✓ · banner na Home com "Mapa 1 — Planta" ✓ ·
clique → tutorial → tela de mapas ✓ · jogar mapa 3 → sair → botão
"CONTINUAR — Mapa 3 🔥 Fogo" ✓ · continuar entra no mapa 3 ✓ · banner da
Home atualiza pra "Mapa 3" ✓ · `node --check` ✓.

sw.js: cache v52 → v53.
