class Headquarters {
    constructor(lines, coluns) {
        this.lines = lines;  // linhas 
        this.coluns = coluns;  // colunas

        this.data = []; // Dados finais da Matriz

        for (let i = 0; i < lines; i++) {
            let arr = []
            for (let j = 0; j < coluns; j++) {
                arr.push(0)
            }
            this.data.push(arr);
        }
    }

    //-------Funções Diversas----------

    // Array para Matriz
    static arrayToheadquarters(arr) {
        let headquarters = new Headquarters(arr.length, 1);
        headquarters.map((elm, i, j) => {
            return arr[i];
        })
        return headquarters;
    }

    // Matriz para Array
    static headquartersToArray(obj) {
        let arr = []
        obj.map((elm, i, j) => {
            arr.push(elm);
        })
        return arr;
    }


    print() {
        console.table(this.data);
    }

    // metodo para colocar os valores aleatoriamente
    randomize() {
        this.map((elm, i, j) => {
            return Math.random() * 2 - 1;
        });
    }
   
    static map(A, func) {
        let headquarters = new Headquarters(A.lines, A.coluns);

        headquarters.data = A.data.map((arr, i) => {
            return arr.map((num, j) => {
                return func(num, i, j);
            })
        })

        return headquarters;
    }

    map(func) {

        this.data = this.data.map((arr, i) => {
            return arr.map((num, j) => {
                return func(num, i, j);
            })
        })

        return this;
    }
    
    // Operação da Matriz Transposta 
    static transpose(A){
        var headquarters = new Headquarters(A.coluns, A.lines);
        headquarters.map((num,i,j) => {
            return A.data[j][i];
        });
        return headquarters;
    }

    // Operações Estáticas Matriz x Escalar 
    
    static escalar_multiply(A, escalar) {
        var headquarters = new Headquarters(A.lines, A.coluns);

        headquarters.map((num, i, j) => {
            return A.data[i][j] * escalar;
        });

        return headquarters;
    }
    
    // Operações Estáticas Matriz x Matriz

    static hadamard(A, B) {
        var headquarters = new Headquarters(A.lines, A.coluns);

        headquarters.map((num, i, j) => {
            return A.data[i][j] * B.data[i][j]
        });

        return headquarters;
    }
    
    // Adicao das duas Matrizes
    static add(A, B) {
        var headquarters = new Headquarters(A.lines, A.coluns);

        headquarters.map((num, i, j) => {
            return A.data[i][j] + B.data[i][j]
        });

        return headquarters;
    }

    // Subtração das duas Matrizes
    static subtract(A, B) {
        var headquarters = new Headquarters(A.lines, A.coluns);

        headquarters.map((num, i, j) => {
            return A.data[i][j] - B.data[i][j]
        });

        return headquarters;
    }

    // Multiplicação das duas Matrizes
    static multiply(A, B) {
        var headquarters = new Headquarters(A.lines, B.coluns);

        headquarters.map((num, i, j) => {
            let sum = 0
            for (let k = 0; k < A.coluns; k++) {
                let elm1 = A.data[i][k];
                let elm2 = B.data[k][j];
                sum += elm1 * elm2;
            }
            
            return sum;
        })

        return headquarters;
    }
}