export class Cadastrados {
    constructor() {
        this.cadastrados = [];
    }
    adiciona(cadastros) {
        this.cadastrados.push(cadastros);
    }
    lista() {
        return this.cadastrados;
    }
    excluir(seletor) {
        let a = seletor.slice(8);
        let b = a;
        let i = 0;
        this.cadastrados.map((data, index) => {
            if (data.id == b) {
                i = index;
            }
        });
        this.cadastrados.splice(i, 1);
    }
    selecionar(seletor) {
        let a = seletor.slice(7);
        let b = a;
        let i = 0;
        this.cadastrados.map((data, index) => {
            if (data.id == b) {
                i = index;
            }
        });
        console.log(i);
        return this.cadastrados[i];
    }
    lastID() {
        let maiorId = this.cadastrados[0].id;
        this.cadastrados.map((data, index) => {
            if ((data.id) > maiorId) {
                maiorId = data.id;
            }
        });
        let maiorIdString = (maiorId + 1).toString();
        console.log("O maior ID Ã©:  " + maiorId);
        return maiorIdString;
    }
}
