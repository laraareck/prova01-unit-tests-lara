const GerenciadorFinanceiro = require('../src/exemplo');

describe('GerenciadorFinanceiro', () => {

  test('deve criar uma conta com saldo inicial', () => {
    const conta = new GerenciadorFinanceiro(1000);

    expect(conta.saldo).toBe(1000);
    expect(conta.transacoes).toEqual([]);
    expect(conta.orcamentos).toEqual({});
  });

  // 1. depositar
  test('deve depositar valor positivo', () => {
    const conta = new GerenciadorFinanceiro(1000);

    expect(conta.depositar(500)).toBe(true);
    expect(conta.saldo).toBe(1500);
  });

  test('não deve depositar valor zero ou negativo', () => {
    const conta = new GerenciadorFinanceiro(1000);

    expect(conta.depositar(0)).toBe(false);
    expect(conta.depositar(-100)).toBe(false);
    expect(conta.saldo).toBe(1000);
  });

  // 2. sacar
  test('deve sacar quando houver saldo suficiente', () => {
    const conta = new GerenciadorFinanceiro(1000);

    expect(conta.sacar(300)).toBe(true);
    expect(conta.saldo).toBe(700);
  });

  test('não deve sacar valor inválido ou maior que o saldo', () => {
    const conta = new GerenciadorFinanceiro(1000);

    expect(conta.sacar(0)).toBe(false);
    expect(conta.sacar(-50)).toBe(false);
    expect(conta.sacar(1500)).toBe(false);
    expect(conta.saldo).toBe(1000);
  });

  // 3. adicionarTransacao
  test('deve adicionar uma transação válida', () => {
    const conta = new GerenciadorFinanceiro();

    expect(
      conta.adicionarTransacao(1, 'receita', 500, 'salário')
    ).toBe(true);

    expect(conta.transacoes).toEqual([
      {
        id: 1,
        tipo: 'receita',
        valor: 500,
        categoria: 'salário'
      }
    ]);
  });

  test('não deve adicionar transação inválida', () => {
    const conta = new GerenciadorFinanceiro();

    expect(conta.adicionarTransacao(0, 'receita', 100, 'salário')).toBe(false);
    expect(conta.adicionarTransacao(1, 'outro', 100, 'salário')).toBe(false);
    expect(conta.adicionarTransacao(2, 'receita', 0, 'salário')).toBe(false);
  });

  // 4. removerTransacao
  test('deve remover uma transação existente', () => {
    const conta = new GerenciadorFinanceiro();

    conta.adicionarTransacao(1, 'despesa', 100, 'comida');

    expect(conta.removerTransacao(1)).toBe(true);
    expect(conta.transacoes).toEqual([]);
  });

  test('deve retornar false ao remover transação inexistente', () => {
    const conta = new GerenciadorFinanceiro();

    expect(conta.removerTransacao(999)).toBe(false);
  });

  // 5. definirOrcamento
  test('deve definir um orçamento', () => {
    const conta = new GerenciadorFinanceiro();

    expect(conta.definirOrcamento('comida', 500)).toBe(true);
    expect(conta.orcamentos.comida).toBe(500);
  });

  test('não deve aceitar orçamento negativo', () => {
    const conta = new GerenciadorFinanceiro();

    expect(conta.definirOrcamento('comida', -100)).toBe(false);
  });

  // 6. calcularTotalPorCategoria
  test('deve calcular despesas de uma categoria', () => {
    const conta = new GerenciadorFinanceiro();

    conta.adicionarTransacao(1, 'despesa', 100, 'comida');
    conta.adicionarTransacao(2, 'despesa', 200, 'comida');
    conta.adicionarTransacao(3, 'despesa', 50, 'transporte');
    conta.adicionarTransacao(4, 'receita', 500, 'comida');

    expect(conta.calcularTotalPorCategoria('comida')).toBe(300);
  });

  // 7. estourouOrcamento
  test('deve verificar orçamento estourado', () => {
    const conta = new GerenciadorFinanceiro();

    conta.definirOrcamento('comida', 200);
    conta.adicionarTransacao(1, 'despesa', 300, 'comida');

    expect(conta.estourouOrcamento('comida')).toBe(true);
  });

  test('deve retornar false quando orçamento não estiver estourado', () => {
    const conta = new GerenciadorFinanceiro();

    conta.definirOrcamento('comida', 500);
    conta.adicionarTransacao(1, 'despesa', 300, 'comida');

    expect(conta.estourouOrcamento('comida')).toBe(false);
  });

  // 8. calcularTotalReceitas
  test('deve calcular total de receitas', () => {
    const conta = new GerenciadorFinanceiro();

    conta.adicionarTransacao(1, 'receita', 500, 'salário');
    conta.adicionarTransacao(2, 'receita', 300, 'freelance');

    expect(conta.calcularTotalReceitas()).toBe(800);
  });

  // 9. calcularTotalDespesas
  test('deve calcular total de despesas', () => {
    const conta = new GerenciadorFinanceiro();

    conta.adicionarTransacao(1, 'despesa', 200, 'comida');
    conta.adicionarTransacao(2, 'despesa', 100, 'transporte');

    expect(conta.calcularTotalDespesas()).toBe(300);
  });

  // 10. calcularSaldoLiquido
  test('deve calcular saldo líquido', () => {
    const conta = new GerenciadorFinanceiro();

    conta.adicionarTransacao(1, 'receita', 1000, 'salário');
    conta.adicionarTransacao(2, 'despesa', 300, 'comida');

    expect(conta.calcularSaldoLiquido()).toBe(700);
  });

  // 11. calcularTaxaDePoupanca
  test('deve calcular taxa de poupança', () => {
    const conta = new GerenciadorFinanceiro();

    conta.adicionarTransacao(1, 'receita', 1000, 'salário');
    conta.adicionarTransacao(2, 'despesa', 250, 'comida');

    expect(conta.calcularTaxaDePoupanca()).toBe(75);
  });

  test('deve retornar zero quando não houver receitas', () => {
    const conta = new GerenciadorFinanceiro();

    expect(conta.calcularTaxaDePoupanca()).toBe(0);
  });

  // 12. simularRendimento
  test('deve calcular rendimento', () => {
    const conta = new GerenciadorFinanceiro(1000);

    expect(conta.simularRendimento(10, 2)).toBeCloseTo(1210);
  });

  test('deve retornar zero para taxa ou anos negativos', () => {
    const conta = new GerenciadorFinanceiro(1000);

    expect(conta.simularRendimento(-10, 2)).toBe(0);
    expect(conta.simularRendimento(10, -2)).toBe(0);
  });

  // 13. filtrarTransacoesMaioresQue
  test('deve filtrar transações maiores que o valor', () => {
    const conta = new GerenciadorFinanceiro();

    conta.adicionarTransacao(1, 'despesa', 100, 'comida');
    conta.adicionarTransacao(2, 'despesa', 500, 'eletrônicos');

    const resultado = conta.filtrarTransacoesMaioresQue(200);

    expect(resultado).toHaveLength(1);
    expect(resultado[0].valor).toBe(500);
  });

  // 14. buscarTransacaoPorId
  test('deve buscar transação pelo ID', () => {
    const conta = new GerenciadorFinanceiro();

    conta.adicionarTransacao(1, 'despesa', 100, 'comida');

    expect(conta.buscarTransacaoPorId(1)).toEqual({
      id: 1,
      tipo: 'despesa',
      valor: 100,
      categoria: 'comida'
    });
  });

  test('deve retornar null se não encontrar transação', () => {
    const conta = new GerenciadorFinanceiro();

    expect(conta.buscarTransacaoPorId(999)).toBeNull();
  });

  // 15. validarTransacao
  test('deve validar transação correta', () => {
    const conta = new GerenciadorFinanceiro();

    expect(
      conta.validarTransacao({
        id: 1,
        tipo: 'receita',
        valor: 500,
        categoria: 'salário'
      })
    ).toBe(true);
  });

  test('deve rejeitar transação inválida', () => {
    const conta = new GerenciadorFinanceiro();

    expect(conta.validarTransacao(null)).toBe(false);

    expect(
      conta.validarTransacao({
        id: 1,
        tipo: 'outro',
        valor: 100,
        categoria: 'teste'
      })
    ).toBe(false);
  });

  // 16. resetarConta
  test('deve resetar a conta', () => {
    const conta = new GerenciadorFinanceiro(1000);

    conta.adicionarTransacao(1, 'despesa', 100, 'comida');
    conta.definirOrcamento('comida', 200);

    expect(conta.resetarConta()).toBe(true);
    expect(conta.saldo).toBe(0);
    expect(conta.transacoes).toEqual([]);
    expect(conta.orcamentos).toEqual({});
  });

  // 17. podeComprar
  test('deve verificar se pode realizar uma compra', () => {
    const conta = new GerenciadorFinanceiro(1000);

    expect(conta.podeComprar(500)).toBe(true);
    expect(conta.podeComprar(1000)).toBe(true);
    expect(conta.podeComprar(1500)).toBe(false);
    expect(conta.podeComprar(0)).toBe(false);
  });

  // 18. converterSaldo
  test('deve converter o saldo', () => {
    const conta = new GerenciadorFinanceiro(1000);

    expect(conta.converterSaldo(2)).toBe(2000);
  });

  test('deve retornar zero para taxa inválida', () => {
    const conta = new GerenciadorFinanceiro(1000);

    expect(conta.converterSaldo(0)).toBe(0);
    expect(conta.converterSaldo(-1)).toBe(0);
  });

  // 19. obterCategoriaMaisCara
  test('deve encontrar a categoria da maior despesa', () => {
    const conta = new GerenciadorFinanceiro();

    conta.adicionarTransacao(1, 'despesa', 100, 'comida');
    conta.adicionarTransacao(2, 'despesa', 500, 'eletrônicos');
    conta.adicionarTransacao(3, 'despesa', 200, 'transporte');

    expect(conta.obterCategoriaMaisCara()).toBe('eletrônicos');
  });

  test('deve retornar null quando não houver despesas', () => {
    const conta = new GerenciadorFinanceiro();

    expect(conta.obterCategoriaMaisCara()).toBeNull();
  });

  // 20. obterTotalDeTransacoes
  test('deve contar as transações', () => {
    const conta = new GerenciadorFinanceiro();

    conta.adicionarTransacao(1, 'receita', 500, 'salário');
    conta.adicionarTransacao(2, 'despesa', 100, 'comida');

    expect(conta.obterTotalDeTransacoes()).toBe(2);
  });

});