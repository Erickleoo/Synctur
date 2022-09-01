import { View } from "./view.js";
export class CadastrarView extends View {
    template(model) {
        return `
      ${model.lista().map(cadastrar => {
            return ` 
    <div class="pacote-cadastrado-container">
      <div class="pacote-cadastrado-informacoes">
        <h3 class="titulo-pacote-cadastrado">${cadastrar.nome}</h3>
        <p class="paragrafo-pacote-cadastrado">${cadastrar.descricao}</p>
        <small class="data-pacote-cadastrado">Data da viagem: ${this.formatarData(cadastrar.data)}</small>
        <br>
        <small class="data-pacote-cadastrado">Status: ${cadastrar.status}</small>
        <div class="buttons-pacotete-cadastrado">
          <button class="button-editar cor-3" id="editar${cadastrar.id}">Editar</button>
          <button class="button-excluir cor-4" id="excluir${cadastrar.id}">Excluir</button>
        </div>
      </div>
    </div>
    `;
        }).join("")}
    `;
    }
    formatarData(data) {
        return new Intl.DateTimeFormat().format(data);
    }
}
