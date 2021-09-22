const tf = require("@tensorflow/tfjs");
const iris = require("./dataset/iris.json");
const irisTesting = require("./dataset/iris-testing.json");

// Convertendo e formatando os dados de modo que o TensorFlow entenda
// Criando a matriz de treinamento
const trainingData = tf.tensor2d(iris.map((item) => [
  item.sepal_length, item.sepal_width, item.petal_length, item.petal_width
]));

// Criando a matriz de testagem
const testingData = tf.tensor2d(irisTesting.map((item) => [
  item.sepal_length, item.sepal_width, item.petal_length, item.petal_width
]));

// Devido ao formato dos dados, fez-se necessária uma abstração de modo que cada categoria de Iris tenha uma
// sequência única de números: 
// ---> Se Setosa => [1,0,0]
// ---> Se Virginica => [0,1,0]
// ---> Se Versicolor => [0,0,1]
// Sabe-se que a rede não retornará valores exatos, devido ao erro associado e que pode ser reduzido à medida
// que mais ciclos de treinamento são efetuados, entretando espera-se que valores muito próximos de 1 sejam 
// retornados, nossa resposta então apresentando o seguinte formato: 
//
//          [[0.9823902, 0.0005666, 0.021004 ]
//          [0.0044029, 0.8809505, 0.1331011]
//          [0.0174013, 0.0252673, 0.963178 ]]
// Como podemos notar, na primeira linha o valor que mais se aproxima de 1 é o item na posição [1,1] sendo portanto
// uma Setosa, já na segunda linha o valor mais próxima de 1 seria o valor [2,2] nos informando que se trata de uma 
// Virginica e por último na posição [3,3], o formato do resultado nos remete a uma Versicolor. 
// Tal resultado foi obtido após 100 iterações (épocas), possui 97% de precisão e um erro de 0.012497891671955585 
// e uma taxa de aprendizagem de 0.06 definida pelos autores, dados esses retornados pelo próprio TensorFlow.

// Criando a matriz de saída
const outputData = tf.tensor2d(iris.map((item) => [
  item.species === "setosa" ? 1 : 0,
  item.species === "virginica" ? 1 : 0,
  item.species === "versicolor" ? 1 : 0
]))

// A função de ativação escolhida foi a Sigmoid, uma vez que a mesma se encaixa de forma bastante satisfatṕria
// em problemas de classificação, sendo então a melhor opção a ser adotada

// Criando o modelo
const model = tf.sequential();
model.add(tf.layers.dense({
  inputShape: [4],
  activation: "sigmoid",
  units: 5
}))
model.add(tf.layers.dense({
  inputShape: [5],
  activation: "sigmoid",
  units: 3
}))
model.add(tf.layers.dense({
  activation: "sigmoid",
  units: 3
}))

// Ao compilar o modelo o TensorFlow recomenda a utilização do ADAM como algoritimo de otimização, sendo então este
// o escolhido e como padrão para o mesmo a Taxa de aprendizagem definida foi 0.001, esta sugerida pelo próprio paper
// do Adam (ADAM: A Method for Stochastic Optimization, Diederik P. Kingma, Jimmy Ba), que pode ser encontrado no link:
// https://arxiv.org/pdf/1412.6980.pdf.

model.compile({optimizer: tf.train.adam(.001), loss: "meanSquaredError", metrics: ["accuracy"]})

const startTime = Date.now();

// Então é feito o treinamento do modelo, como argumento temos primeiramente a primeira matriz com os dados de treinamento
// em seguida a matriz de saída, permitindo ao algoritimo então o processo de backpropagation e por último a quantidade de
// épocas ou iterações feitas no processo de treinamento. O valor escolhido foi de 10000, a traxa de aprendizagem
// (learning rate) é suficientemente pequena para que poucas épocas não sejam suficiente para a aprendizagem, exigindo
// então um maior número de iterações, mas permitindo ao algoritmo mais precisão ao fim do seu treinamento, ficando ao
// encargo do usuário encontrar um balanço que permita um uso aceitavel de tempo e poder computacional, ao mesmo tempo em 
// em que mantém uma boa precisão. Como exemplo, nos testes feitos o treinamento levou por volta de 2 minutos com os
// parâmetros de 10000 épocas e uma taxa de aprendizagem de 0.001 com o uso do ADAM.
model.fit(trainingData, outputData, {epochs:5000})


// Por fim é feita a testagem do modelo, sendo possível conferir o tempo levado, mas também o processo de aprendizagem a cada
// iteração.
.then((history) => {
  
  // Retire o comentário da linha abaixo para ver o passo a passo da aprendizagem.
  //console.log(history)
  console.log("Tempo de aprendizagem: ", Date.now() - startTime,"ms")
  model.predict(testingData).print() // Saída esperada [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
})
