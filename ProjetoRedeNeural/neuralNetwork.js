// FUNCAO SIGMOID
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}
// DERIVADA DA FUNCAO SIGMOID
function dsigmoid(x){
    return x * (1-x); 
}

// REDE NEURAL
class NeuralNetwork {
    constructor(i_nodes, h_nodes, o_nodes) {
        //Nós das entradas
        this.i_nodes = i_nodes;
        //Nós dos ocultos
        this.h_nodes = h_nodes;
        //Nós das saidas
        this.o_nodes = o_nodes;
        
        // bias que é o valor arbitrario para a soma
        this.bias_ih = new Headquarters(this.h_nodes, 1);
        this.bias_ih.randomize();
        this.bias_ho = new Headquarters(this.o_nodes, 1);
        this.bias_ho.randomize();

        // pesos das entradas até as ocultas
        this.weigths_ih = new Headquarters(this.h_nodes, this.i_nodes);
        this.weigths_ih.randomize()
        // pesos das ocultas até as saidas
        this.weigths_ho = new Headquarters(this.o_nodes, this.h_nodes)
        this.weigths_ho.randomize()
        

        this.learning_rate = 0.1;
    }

    train(arr,target) {
        // ENTRADA -> OCULTO
        let input = Headquarters.arrayToheadquarters(arr);
        let hidden = Headquarters.multiply(this.weigths_ih, input);
        hidden = Headquarters.add(hidden, this.bias_ih);

        hidden.map(sigmoid)

        // OCULTA -> SAIDA
        // DERIVADA(Sigmoid) = SAIDA * (1- SAIDA)
        let output = Headquarters.multiply(this.weigths_ho, hidden);
        output = Headquarters.add(output, this.bias_ho);
        output.map(sigmoid);

        // --------BACKPROPAGATION------------

        // SAIDA -> OCULTA
        let expected = Headquarters.arrayToheadquarters(target);
        let output_error = Headquarters.subtract(expected,output);
        let d_output = Headquarters.map(output,dsigmoid);
        let hidden_T = Headquarters.transpose(hidden);

        let gradient = Headquarters.hadamard(d_output,output_error);
        gradient = Headquarters.escalar_multiply(gradient,this.learning_rate);
        
        // AJUSTE DE Bias DA SAIDA-> OCULTA
        this.bias_ho = Headquarters.add(this.bias_ho, gradient);
        // AJUSTE DE PESOS DA  SAIDA-> OCULTA
        let weigths_ho_deltas = Headquarters.multiply(gradient,hidden_T);
        this.weigths_ho = Headquarters.add(this.weigths_ho,weigths_ho_deltas);

        // OCULTA -> ENTRADA
        let weigths_ho_T = Headquarters.transpose(this.weigths_ho);
        let hidden_error = Headquarters.multiply(weigths_ho_T,output_error);
        let d_hidden = Headquarters.map(hidden,dsigmoid);
        let input_T = Headquarters.transpose(input);

        let gradient_H = Headquarters.hadamard(d_hidden,hidden_error);
        gradient_H = Headquarters.escalar_multiply(gradient_H, this.learning_rate);

        // AJUSTE DE Bias SAIDA-> OCULTA
        this.bias_ih = Headquarters.add(this.bias_ih, gradient_H);
        // AJUSTE DE PESOS DA OCULTA -> ENTRADA
        let weigths_ih_deltas = Headquarters.multiply(gradient_H, input_T);
        this.weigths_ih = Headquarters.add(this.weigths_ih, weigths_ih_deltas);
    }

    // PREVISAO DA SAIDA
    predict(arr){
        // ENTRADA -> OCULTA
        let input = Headquarters.arrayToheadquarters(arr);

        let hidden = Headquarters.multiply(this.weigths_ih, input);
        hidden = Headquarters.add(hidden, this.bias_ih);

        hidden.map(sigmoid);

        // OCULTA -> SAIDA
        let output = Headquarters.multiply(this.weigths_ho, hidden);
        output = Headquarters.add(output, this.bias_ho);
        output.map(sigmoid);
        output = Headquarters.headquartersToArray(output);

        return output;
    }
}