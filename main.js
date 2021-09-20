const brain = require("brain.js");
const { irisDB } = require("./handle_data");
const { trainData } = require("./handle_data");
const { testData } = require("./handle_data");


// provide optional config object (or undefined). Defaults shown.
const config = {
    errorThresh: 0.0005,
    hiddenLayers: [4], // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
    iterations: 1000,
    learningRate: 0.3
  };
  
  // create a simple feed forward neural network with backpropagation
  const net = new brain.NeuralNetwork(config);
  const stats = net.train(trainData)
  console.log(stats)
  const result = net.run([5.4,3.4,1.5,0.4]);
  console.log(result);

