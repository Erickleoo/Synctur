import { Cadastrar } from "./cadastrar.js";

export class Cadastrados {
  private cadastrados: Cadastrar[] = [];

  public adiciona(cadastros: Cadastrar) {
    this.cadastrados.push(cadastros);
  }

  public lista(): Cadastrar[] {
    return this.cadastrados;
  }
}