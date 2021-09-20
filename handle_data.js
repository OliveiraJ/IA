const fs = require('fs');


var irisDB=[];
var trainData = [];
var testData = [];

// Lê o arquivo iris.data e guarda os dados dentro da array dataByLine
var rawData = fs.readFileSync("./database/iris.data","utf-8");
var dataByLine = rawData.split("\n"); //quebra o texto a cada '/n', salvando cada linha como uma posição do array

function convertData(dataByLine){
    for(let i = 0; i<dataByLine.length;i++){
        let input = [];
        let output;
        data = dataByLine[i];
        slice = data.split(",");
        for(let i = 0; i<slice.length-1;i++){
            input[i] = parseFloat(slice[i]);
        };
        if(slice[4]=="Iris-setosa"){
            output = 0
        }else if (slice[4]=="Iris-versicolor"){
            output = 0.5
        }else if (slice[4]=="Iris-virginica"){
            output = 1
        }
        irisDB[i] = {
            input: input,
            output: output
        }
    }
}

function splitData(irisDB) {
    for(let i=0; i<(irisDB.length*0.8);i++){
        trainData[i] = irisDB[i];
    };

    for(let i=0; i<irisDB.length-(irisDB.length*0.8);i++){
        testData[i] = irisDB[i];
    };
};

convertData(dataByLine);
splitData(irisDB);

module.exports= {
    irisDB,
    trainData,
    testData,
    dataByLine
};
