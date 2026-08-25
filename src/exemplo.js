class GerenciadorFinanceiro {
  constructor(saldoInicial = 0) {
    this.saldo = saldoInicial;
    this.transacoes = [];
    this.orcamentos = {}; // { categoria: limite }
  }

  // 1. Adicionar saldo
  depositar(valor) {
    if (valor <= 0) return false;
    this.saldo += valor;
    return true;
  }

  // 2. Retirar saldo
  sacar(valor) {
    if (valor <= 0 || valor > this.saldo) return false;
    this.saldo -= valor;
    return true;
  }

  // 3. Registrar nova transação
  adicionarTransacao(id, tipo, valor, categoria) {
    if (!id || valor <= 0 || !['receita', 'despesa'].includes(tipo)) return false;
    this.transacoes.push({ id, tipo, valor, categoria });
    return true;
  }

  // 4. Remover uma transação existente
  removerTransacao(id) {
    const index = this.transacoes.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.transacoes.splice(index, 1);
    return true;
  }

  // 5. Definir teto de gastos para uma categoria
  definirOrcamento(categoria, limite) {
    if (limite < 0) return false;
    this.orcamentos[categoria] = limite;
    return true;
  }

  // 6. Somar todas as despesas de uma categoria específica
  calcularTotalPorCategoria(categoria) {
    return this.transacoes
      .filter(t => t.tipo === 'despesa' && t.categoria === categoria)
      .reduce((soma, t) => soma + t.valor, 0);
  }

  // 7. Verificar se os gastos passaram do limite definido
  estourouOrcamento(categoria) {
    const limite = this.orcamentos[categoria];
    if (!limite) return false;
    return this.calcularTotalPorCategoria(categoria) > limite;
  }

  // 8. Somar todas as receitas registradas
  calcularTotalReceitas() {
    return this.transacoes
      .filter(t => t.tipo === 'receita')
      .reduce((soma, t) => soma + t.valor, 0);
  }

  // 9. Somar todas as despesas registradas
  calcularTotalDespesas() {
    return this.transacoes
      .filter(t => t.tipo === 'despesa')
      .reduce((soma, t) => soma + t.valor, 0);
  }

  // 10. Obter saldo final cruzando receitas e despesas
  calcularSaldoLiquido() {
    return this.calcularTotalReceitas() - this.calcularTotalDespesas();
  }

  // 11. Calcular a porcentagem que sobrou da receita
  calcularTaxaDePoupanca() {
    const receitas = this.calcularTotalReceitas();
    if (receitas === 0) return 0;
    const salvo = this.calcularSaldoLiquido();
    return salvo > 0 ? (salvo / receitas) * 100 : 0;
  }

  // 12. Simular rendimento de juros compostos sobre o saldo atual
  simularRendimento(taxaAnual, anos) {
    if (taxaAnual < 0 || anos < 0) return 0;
    const principal = this.saldo;
    const taxaDecimal = taxaAnual / 100;
    return principal * Math.pow(1 + taxaDecimal, anos);
  }

  // 13. Filtrar transações acima de um valor específico
  filtrarTransacoesMaioresQue(valor) {
    return this.transacoes.filter(t => t.valor > valor);
  }

  // 14. Buscar uma transação por ID
  buscarTransacaoPorId(id) {
    return this.transacoes.find(t => t.id === id) || null;
  }

  // 15. Validar se uma transação possui todos os campos corretos
  validarTransacao(transacao) {
    if (!transacao) return false;
    const { id, tipo, valor, categoria } = transacao;
    return !!(id && (tipo === 'receita' || tipo === 'despesa') && valor > 0 && categoria);
  }

  // 16. Limpar todo o histórico e zerar o saldo
  resetarConta() {
    this.saldo = 0;
    this.transacoes = [];
    this.orcamentos = {};
    return true;
  }

  // 17. Verificar se a conta tem saldo suficiente para uma compra futura
  podeComprar(valorCompra) {
    return valorCompra > 0 && this.saldo >= valorCompra;
  }

  // 18. Converter o saldo atual para outra moeda fictícia baseado em uma taxa
  converterSaldo(taxaConversao) {
    if (taxaConversao <= 0) return 0;
    return this.saldo * taxaConversao;
  }

  // 19. Descobrir qual categoria teve a maior despesa única
  obterCategoriaMaisCara() {
    const despesas = this.transacoes.filter(t => t.tipo === 'despesa');
    if (despesas.length === 0) return null;
    const maiorDespesa = despesas.reduce((maior, atual) => atual.valor > maior.valor ? atual : maior);
    return maiorDespesa.categoria;
  }

  // 20. Contar quantas transações existem no histórico
  obterTotalDeTransacoes() {
    return this.transacoes.length;
  }
}