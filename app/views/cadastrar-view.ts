import { CadastrarPacoteController } from "../controllers/cadastrar-controller.js";
import { Cadastrados } from "../models/cadastrados.js";
import { View } from "./view.js";


export class CadastrarView extends View<Cadastrados> {

  protected template(model: Cadastrados): string {
    return `
      ${model.lista().map(cadastrar => {
      return ` 
    <div class="pacote-cadastrado-container">
      <div class="pacote-cadastrado-informacoes">
        <h3 class="titulo-pacote-cadastrado">${cadastrar.id}-${cadastrar.nome}</h3>
        <p class="paragrafo-pacote-cadastrado">${cadastrar.descricao}</p>
        <small class="data-pacote-cadastrado">Data da viagem: ${this.formatarData(cadastrar.data)}</small>
        <br>
        <small class="data-pacote-cadastrado">Status: ${cadastrar.status}</small>
        <div class="buttons-pacotete-cadastrado">
          <button value="${cadastrar.id}" class="button-editar cor-3" id="editar${cadastrar.id}">Editar</button>
          <button value="${cadastrar.id}" class="button-excluir cor-4" id="excluir${cadastrar.id}">Excluir</button>
        </div>
      </div>
    </div>
    `
    }).join("")}
    `
  }

  private formatarData(data: Date): string {
    return new Intl.DateTimeFormat().format(data)
  }
} 