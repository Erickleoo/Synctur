import { Cadastrados } from "../models/cadastrados.js";
import { Cadastrar } from "../models/cadastrar.js";
import { AtualizarEventListenerPacotes } from "../script.js";
import { CadastradosService } from "../services/cadastrados-services.js";
import { CadastrarView } from "../views/cadastrar-view.js";

export class CadastrarPacoteController {
  private inputNome: HTMLInputElement;
  private inputStatus: any;
  private inputData: HTMLInputElement;
  private textAreaDescricao: HTMLInputElement;
  private inputID: any;
  private cadastrados = new Cadastrados();
  private cadastrarView = new CadastrarView(".pacotes-cadastrados", true);
  private cadastradosService = new CadastradosService();

  constructor() {
    this.inputNome = document.querySelector(".input-nome-pacote") as HTMLInputElement;
    this.inputStatus = document.getElementsByName("status") as any;
    this.inputData = document.querySelector(".input-data-viagem") as HTMLInputElement;
    this.textAreaDescricao = document.querySelector(".pacote-descricao") as HTMLInputElement;
    this.cadastrarView.update(this.cadastrados);
  }

  public adiciona(): void {
    const cadastrar = Cadastrar.criaDe(
      this.inputNome.value,
      this.valorSelect(this.inputStatus),
      this.inputData.value,
      this.textAreaDescricao.value,
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

  protected dataTexto(data: Date): string {
    let dataString: string;
    let mes = (data.getMonth() < 10 ? "0" + data.getMonth().toString() : data.getMonth().toString())
    dataString = (data.getFullYear().toString() + "-"
      + mes + "-"
      + data.getDate().toString()
    )
    return dataString
  }

  public excluirItem(seletor: any) {
    this.cadastrados.excluir(seletor)
    AtualizarEventListenerPacotes(1000)
    this.cadastrarView.update(this.cadastrados)
  }

  public editar(etapa: number, seletor: string) {
    if (etapa == 1 && seletor) {
      const cadastrado = this.cadastrados.selecionar(seletor)
      this.inputNome.value = cadastrado.nome;
      this.textAreaDescricao.value = cadastrado.descricao;
      this.inputData.value = this.dataTexto(cadastrado.data);
      console.log("criar codigo do status")
    }
    else if (etapa == 2) {//gravar a informacao e excluir a anterior
      this.excluirItem(seletor)
      this.adiciona()
    }
    else {
      throw Error("MEtodo em editar nao encontrado")
    }
    AtualizarEventListenerPacotes(500)
    this.cadastrarView.update(this.cadastrados)
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
