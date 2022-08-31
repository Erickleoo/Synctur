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
}
