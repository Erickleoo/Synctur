import { CadastroDoDia } from "../interfaces/cadastro-do-dia.js";
import { Cadastrar } from "../models/cadastrar.js";

export class CadastradosService {

  public obterCadastradosSistema(): Promise<Cadastrar[]> {
    return fetch("https://62361b7feb166c26eb2f488a.mockapi.io/pacotes")
      .then(res => res.json())
      .then((dados: CadastroDoDia[]) => {
        return dados.map(dado => {
          return new Cadastrar(
            dado.nome,
            dado.status,
            new Date(dado.data),
            dado.descricao
          )
        })
      });
  }
}