# V848 — 19/07/2026 — 🔑 Aba Admin dentro do app + 👑 Perfil/Ranking com mais vida

**Responsável:** Claude (pedido direto do Andrio: "minha conta ainda não
está como adm, não estou vendo aba de adm para aceitar pedidos de
compras" + "esse perfil que abre aqui no ranking deve ter mais vida,
mais elementos... melhore todas as bordas de avatar, efeitos de
ranking... com o top sendo o rei todo desenhado e bonito")
**Arquivos alterados:** index.html, sw.js

## 🔑 Aba Admin dentro do app (o pedido mais urgente)
O `/admin` sempre existiu, mas era uma URL separada que exigia digitar
a `ADMIN_CHAVE` — por isso o Andrio não achava nenhuma "aba de admin"
no app. Agora tem uma **aba "🔑 Admin" de verdade no menu lateral**,
igual Início/Aulas/Ranking/Loja:

- Primeira vez: pede a `ADMIN_CHAVE` (a mesma configurada no Render),
  depois fica salva no aparelho
- Dentro da aba: estatísticas rápidas, **pedidos de compra Pix
  pendentes com a miniatura do comprovante** e botões ✅ Aprovar / ❌
  Rejeitar, lista de alunos com busca e os botões 👑 +30/+90/+365 dias,
  **👑 VIP pra sempre** e 🎁 Baús — tudo sem sair do FalaFina
- Continua protegido exatamente como antes (só quem tem a chave
  entra) — só ficou fácil de achar

## 👑 Perfil do ranking com muito mais vida
- O modal que abre ao clicar em alguém no Ranking ganhou um **banner
  de destaque** no topo (antes era só o avatar solto): fundo temático
  por posição — **1º lugar = tratamento de Rei** (moldura dourada,
  raios de sol girando atrás, coroa animada, selo "👑 1º lugar — Rei do
  Ranking"), 2º = prata, 3º = bronze
- O efeito de ranking equipado pela pessoa (fogo, aurora, trono...)
  agora aparece NO PRÓPRIO banner, não numa linha separada e discreta
  como antes
- O pódio do Ranking (top 3) ganhou o mesmo tratamento — o 1º lugar
  agora tem moldura dourada pulsante, raios girando atrás da carta e
  coroa animada bem maior, bem mais "coroação de rei" do que antes

## 🖼️ Bordas de avatar melhoradas
Madeira e Bronze (as duas primeiras bordas, que antes eram estáticas)
agora também brilham e têm degradê animado, no mesmo padrão vivo das
bordas mais caras — a progressão fica mais bonita do começo ao fim.

> Nota sincera: não foi possível literalmente "baixar ícones da
> internet" — o FalaFina é um app de arquivo único, sem dependências
> externas, pensado pra funcionar até offline; usar imagens de fora
> quebraria isso (link caído = ícone quebrado pro aluno) e a rede
> daqui não tem acesso confiável pra isso de forma seletiva. Em vez
> disso, todo o "mais vida" foi feito com CSS/animação — mesmo
> resultado visual, sem depender de nada de fora.

## Testes executados (Chromium)
Aba Admin: clique no menu lateral abre a tela ✓ · chave errada mostra
erro e não entra ✓ · chave certa carrega o painel ✓ · pedido de
compra semeado aparece com miniatura ✓ · clique em Aprovar ativa o
VIP e some da lista de pendentes ✓ · clique em "VIP pra sempre" ativa
Premium até 2126 ✓ · busca por nome/e-mail filtra a lista ✓ · zero
erros de página.
Perfil/Ranking: modal do 1º lugar mostra classe `tier-rei` + o efeito
equipado da pessoa ✓ · 2º lugar mostra `tier-prata` ✓ · pódio com 3
contas locais mostra o 1º lugar com moldura dourada, raios e coroa
✓ · zero erros de página (com screenshot conferido visualmente).

sw.js: cache v34 → v35.
