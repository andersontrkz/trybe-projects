const answerPhone = require('../src/asyncJest');
/*
A função answerPhone recebe um parâmetro boleano.
Dependendo do parâmetro o retorno da função varia, veja a função no arquivo 'src/asyncJest.js'

Complete o código abaixo para testar as situações em que
a função recebe como parâmetro true e false, respectivamente.

ATENÇÃO!!! Edite apenas este arquivo. Não altere os arquivos da pasta 'src'.
*/

// console.log(answerPhone(true));
// console.log(answerPhone(false));

// **SOURCE** https://jestjs.io/pt-BR/docs/asynchronous
describe('o retorno do telefonema', () => {
  const errorMessage = Error('Infelizmente não podemos atender...');

  test('atende', () => {
    expect(answerPhone(true)).resolves.toEqual('Oi!');
  });
  test('ocupado', () => {
    expect(answerPhone(false)).rejects.toEqual(errorMessage);
  });
});
