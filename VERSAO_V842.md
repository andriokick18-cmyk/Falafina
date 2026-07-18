# V842 — 18/07/2026 — 📲 Botão "Baixar App Android" na barra esquerda

**Responsável:** Claude (pedido direto do Andrio)
**Arquivos alterados:** index.html, sw.js

## O que entrou
- **Botão-aba azul em destaque** na barra esquerda, abaixo do menu:
  "📲 Baixar App Android"
- Fluxo de instalação UNIFICADO numa função só (`instalarApp()`) usada
  pelos 3 pontos: botão novo da barra, banner flutuante e Configurações
  - Com prompt nativo disponível (Chrome/Android): abre a instalação
    de verdade em 1 toque
  - Sem prompt (iPhone/desktop): instruções passo a passo, mencionando
    o bônus da 📌 Palavra do Dia na tela de bloqueio
  - Já instalado: avisa "Você JÁ está no aplicativo 🎉"

## Sobre o push da tela de bloqueio (pergunta do Andrio)
O código está PRONTO e testado (V840), mas o sandbox de desenvolvimento
não tem rede pra checar o servidor ao vivo. Teste de 30 segundos:
abrir https://falafina.onrender.com/api/push/chave no navegador —
- Se aparecer `"ok":true` + publicKey → push LIGADO ✔
- Se aparecer "web-push não instalado" → no Render: Settings →
  Build Command = `npm install` → salvar (redeploya sozinho)
Depois: ativar o 🔔 no card da Palavra do Dia no celular e disparar
https://falafina.onrender.com/api/push/testar?chave=SUA_ADMIN_CHAVE

## Testes executados (Chromium — 4 checagens, 0 erros)
Botão visível e destacado em azul na barra ✓ · clique abre instruções
quando não há prompt nativo ✓ · Configurações usa o mesmo fluxo ✓.

sw.js: cache v29 → v30.
