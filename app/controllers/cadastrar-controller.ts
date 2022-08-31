import { Cadastrados } from "../models/cadastrados.js";
import { Cadastrar } from "../models/cadastrar.js";
import { CadastradosService } from "../services/cadastrados-services.js";
import { CadastrarView } from "../views/cadastrar-view.js";

export class CadastrarPacoteController {
  private inputNome: HTMLInputElement;
  private inputStatus: any;
  private inputData: HTMLInputElement;
  private textAreaDescricao: HTMLInputElement;
  private cadastrados = new Cadastrados();
  private cadastrarView = new CadastrarView(".pacotes-cadastrados", true);
  private cadastradosService = new CadastradosService();

  constructor() {
    this.inputNome = document.querySelector(".input-nome-pacote") as HTMLInputElement;
    this.inputStatus = document.getElementsByName("status") as any;
    this.inputData = document.querySelector(".input-data-viagem") as HTMLInputElement;
    this.textAreaDescricao = document.querySelector(".pacote-descricao") as HTMLInputElement;
    this.cadastrarView.update(this.cadastrados);
    this.importaDados()
  }

  public adiciona(): void {
    const cadastrar = Cadastrar.criaDe(
      this.inputNome.value,
      this.valorSelect(this.inputStatus),
      this.inputData.value,
      this.textAreaDescricao.value
    );
    if (!this.validacaoData(cadastrar.data)) {
      alert("Somente é possível adicionar pacotes com uma data superior que a atual!");
      return;
    }
    this.cadastrados.adiciona(cadastrar);
    this.limparFormulario();
    this.atualizaView();
  }

  public importaDados(): void {
    this.cadastradosService
      .obterCadastradosSistema()
      .then(cadastrosDoDia => {
        for (let cadastrar of cadastrosDoDia) {
          this.cadastrados.adiciona(cadastrar);
        }
        this.cadastrarView.update(this.cadastrados);
      });
  }

  private limparFormulario(): void {
    this.inputNome.value = '';
    this.inputStatus.value = '';
    this.inputData.value = '';
    this.textAreaDescricao.value = '';
    this.inputNome.focus();
  }

  private atualizaView(): void {
    this.cadastrarView.update(this.cadastrados);
  }

  private validacaoData(inputdata: any) {
    let data = new Date();
    return data < inputdata;
  }

  private valorSelect(status: any): string {
    status = this.inputStatus;
    for (let i = 0; i < status.length; i++) {
      if (status[i].checked) {
        return status = status[i].value
      }
    }
    return status
  }
}