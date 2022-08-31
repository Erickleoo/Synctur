import { Cadastrados } from "../models/cadastrados.js";
import { Cadastrar } from "../models/cadastrar.js";
import { CadastradosService } from "../services/cadastrados-services.js";
import { CadastrarView } from "../views/cadastrar-view.js";
export class CadastrarPacoteController {
    constructor() {
        this.cadastrados = new Cadastrados();
        this.cadastrarView = new CadastrarView(".pacotes-cadastrados", true);
        this.cadastradosService = new CadastradosService();
        this.inputNome = document.querySelector(".input-nome-pacote");
        this.inputStatus = document.getElementsByName("status");
        this.inputData = document.querySelector(".input-data-viagem");
        this.textAreaDescricao = document.querySelector(".pacote-descricao");
        this.cadastrarView.update(this.cadastrados);
        this.importaDados();
    }
    adiciona() {
        const cadastrar = Cadastrar.criaDe(this.inputNome.value, this.valorSelect(this.inputStatus), this.inputData.value, this.textAreaDescricao.value);
        if (!this.validacaoData(cadastrar.data)) {
            alert("Somente é possível adicionar pacotes com uma data superior que a atual!");
            return;
        }
        this.cadastrados.adiciona(cadastrar);
        this.limparFormulario();
        this.atualizaView();
    }
    importaDados() {
        this.cadastradosService
            .obterCadastradosSistema()
            .then(cadastrosDoDia => {
            for (let cadastrar of cadastrosDoDia) {
                this.cadastrados.adiciona(cadastrar);
            }
            this.cadastrarView.update(this.cadastrados);
        });
    }
    limparFormulario() {
        this.inputNome.value = '';
        this.inputStatus.value = '';
        this.inputData.value = '';
        this.textAreaDescricao.value = '';
        this.inputNome.focus();
    }
    atualizaView() {
        this.cadastrarView.update(this.cadastrados);
    }
    validacaoData(inputdata) {
        let data = new Date();
        return data < inputdata;
    }
    valorSelect(status) {
        status = this.inputStatus;
        for (let i = 0; i < status.length; i++) {
            if (status[i].checked) {
                return status = status[i].value;
            }
        }
        return status;
    }
}
