/*
  A função myCounter possui dois loops aninhados que inserem valores dentro de um array.
  Como podemos perceber, eles vão adicionando valores ao array até sua condição de parada.
  Corrija o código abaixo para que a função retorne o array correto.

  Parâmetros:
  - Nenhum.

  Comportamento:
  myCounter() // Retorna: [0, 2, 3, 1, 2, 3, 2, 2, 3, 3, 2, 3];
*/

const myCounter = () => {
  var myArray = [];
  for (var index = 0; index <= 3; index += 1) {
    myArray.push(index);
    for (var aux = 2; aux <= 3; aux += 1) {
      myArray.push(aux);
    }
  }
  return myArray;
};

module.exports = myCounter;
