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
  private inputID: HTMLInputElement;
  private cadastrados = new Cadastrados();
  private cadastrarView = new CadastrarView(".pacotes-cadastrados", true);
  private cadastradosService = new CadastradosService();

  constructor() {
    this.inputNome = document.querySelector(".input-nome-pacote") as HTMLInputElement;
    this.inputStatus = document.getElementsByName("status") as any;
    this.inputData = document.querySelector(".input-data-viagem") as HTMLInputElement;
    this.textAreaDescricao = document.querySelector(".pacote-descricao") as HTMLInputElement;
    this.inputID = document.querySelector(".input-id") as HTMLInputElement;
    this.cadastrarView.update(this.cadastrados);
  }

  // Metodo pra adicionar o valor dos inputs nos itens cadastrados
  public adiciona(): void {
    const cadastrar = Cadastrar.criaDe(
      this.inputNome.value,
      this.valorSelect(this.inputStatus),
      this.inputData.value,
      this.textAreaDescricao.value,
      this.inputID.value
    );
    if (!this.validacaoData(cadastrar.data)) {
      alert("Somente é possível adicionar pacotes com uma data superior que a atual!");
      return;
    }
    this.cadastrados.adiciona(cadastrar);
    this.limparFormulario();
    this.atualizaView();
    AtualizarEventListenerPacotes(500)
  }

  // Metodo pra importar os dados da API
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

  // Metodo pra limpar o formulário após o usuário cadastrar o item.
  private limparFormulario(): void {
    this.inputNome.value = '';
    this.inputStatus.value = '';
    this.inputData.value = '';
    this.textAreaDescricao.value = '';
    this.inputID.value = '';
    this.inputNome.focus();
  }

  // Metodo pra transformar a data em string
  protected dataTexto(data: Date): string {
    let dataString: string;
    let mes = (data.getMonth() < 10 ? "0" + data.getMonth().toString() : data.getMonth().toString())
    let dia = (data.getDate() < 10 ? "0" + data.getDate().toString() : data.getDate().toString())
    dataString = (data.getFullYear().toString() + "-"
      + mes + "-"
      + dia
    )
    return dataString
  }

  // Metodo pra excluir os itens
  public excluirItem(seletor: any) {
    this.cadastrados.excluir(seletor)
    AtualizarEventListenerPacotes(500)
    this.cadastrarView.update(this.cadastrados)
  }

  // Metodo pra editar os itens
  public editar(etapa: number, seletor: string) {
    window.scrollTo(0, 0)
    if (etapa == 1 && seletor) {
      const cadastrado = this.cadastrados.selecionar(seletor)
      this.inputNome.value = cadastrado.nome;
      this.textAreaDescricao.value = cadastrado.descricao;
      this.inputData.value = this.dataTexto(cadastrado.data);
      this.inputID.value = cadastrado.id;
    }
    else if (etapa == 2) {
      console.log("Etapa 2")
    }
    else {
      throw Error("Metodo em editar nao encontrado")
    }
    this.excluirItem(seletor)
    AtualizarEventListenerPacotes(500)
    this.cadastrarView.update(this.cadastrados)
  }

  // Metodo pra atualizar os itens cadastrados
  private atualizaView(): void {
    this.cadastrarView.update(this.cadastrados);
  }

  // Metodo pra validar a data pra somente um dia a frente do atual
  private validacaoData(inputdata: any) {
    let data = new Date();
    return data < inputdata;
  }

  // Metodo pra pegar o valor do checkbox
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
