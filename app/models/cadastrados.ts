import { Cadastrar } from "./cadastrar.js";

export class Cadastrados {
  private cadastrados: Cadastrar[] = [];

  public adiciona(cadastros: Cadastrar) {
    this.cadastrados.push(cadastros);
  }

  public lista(): Cadastrar[] {
    return this.cadastrados;
  }

  public excluir(seletor: string): void {
    let a = seletor.slice(8)
    let b = a
    let i: number = 0;
    this.cadastrados.map((data, index) => {
      if (data.id == b) {
        i = index
      }
    })
    this.cadastrados.splice(i, 1)
  }

  public selecionar(seletor: string): Cadastrar {
    let a = seletor.slice(7);
    let b = a;
    let i: number = 0;
    this.cadastrados.map((data, index) => {
      if (data.id == b) {
        i = index;
      }
    })
    console.log(i)
    return this.cadastrados[i]
  }

  public lastID(): string {
    let maiorId = this.cadastrados[0].id;
    this.cadastrados.map((data, index) => {
      if ((data.id) > maiorId) {
        maiorId = data.id;
      }
    })
    let maiorIdString = (maiorId + 1).toString()
    console.log("O maior ID Ã©:  " + maiorId)
    return maiorIdString;
  }
}