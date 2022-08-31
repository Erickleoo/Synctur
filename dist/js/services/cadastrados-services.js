import { Cadastrar } from "../models/cadastrar.js";
export class CadastradosService {
    obterCadastradosSistema() {
        return fetch("https://62361b7feb166c26eb2f488a.mockapi.io/pacotes")
            .then(res => res.json())
            .then((dados) => {
            return dados.map(dado => {
                return new Cadastrar(dado.nome, dado.status, new Date(dado.data), dado.descricao);
            });
        });
    }
}
