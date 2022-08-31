export class Cadastrar {
    constructor(_nome, _status, _data, _descricao) {
        this._nome = _nome;
        this._status = _status;
        this._data = _data;
        this._descricao = _descricao;
    }
    get nome() {
        return this._nome;
    }
    set nome(_nome) {
        this._nome = _nome;
    }
    get status() {
        return this._status;
    }
    set status(_status) {
        this._status = _status;
    }
    get data() {
        return this._data;
    }
    set data(_data) {
        this._data = _data;
    }
    get descricao() {
        return this._descricao;
    }
    set descricao(_descricao) {
        this._descricao = _descricao;
    }
    static criaDe(nomeString, statusString, dataString, descricaoString) {
        const nomePacote = nomeString;
        const status = statusString;
        const exp = /-/g;
        const data = new Date(dataString.replace(exp, '/'));
        const textArea = descricaoString;
        return new Cadastrar(nomePacote, status, data, textArea);
    }
}
