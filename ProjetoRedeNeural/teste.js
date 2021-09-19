var train = true;

class Teste{
     newSetup() {
   
        nn = new NeuralNetwork(2, 3, 1);
        console.log(nn.predict([1,1]));
    
        // XOR Problem
        dataset = {
            inputs:
                [[1, 1],
                [1, 0],
                [0, 1],
                [0, 0]],
            outputs:
                [[0],
                [1],
                [1],
                [0]]
        }
    }
    
    drawio() {
        if (train) {
            for (var i = 0; i < 10000; i++) {
                var index = floor(random(4));
                nn.train(dataset.inputs[index], dataset.outputs[index]);
            }
            if (nn.predict([0, 0])[0] < 0.04 && nn.predict([1, 0])[0] > 0.98) {
                train = false;
                console.log("terminou");
                console.log("terminou");
                console.log("terminou");
            }
        }
    }
    drwaio();


}



