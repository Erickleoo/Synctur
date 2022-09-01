import { Cadastrados } from "../models/cadastrados.js";
import { Cadastrar } from "../models/cadastrar.js";
import { AtualizarEventListenerPacotes } from "../script.js";
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
        this.inputID = document.querySelector(".input-id");
        this.cadastrarView.update(this.cadastrados);
    }
    adiciona() {
        const cadastrar = Cadastrar.criaDe(this.inputNome.value, this.valorSelect(this.inputStatus), this.inputData.value, this.textAreaDescricao.value, this.inputID.value);
        if (!this.validacaoData(cadastrar.data)) {
            alert("Somente é possível adicionar pacotes com uma data superior que a atual!");
            return;
        }
        this.cadastrados.adiciona(cadastrar);
        this.limparFormulario();
        this.atualizaView();
        AtualizarEventListenerPacotes(500);
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
        this.inputID.value = '';
        this.inputNome.focus();
    }
    dataTexto(data) {
        let dataString;
        let mes = (data.getMonth() < 10 ? "0" + data.getMonth().toString() : data.getMonth().toString());
        let dia = (data.getDate() < 10 ? "0" + data.getDate().toString() : data.getDate().toString());
        dataString = (data.getFullYear().toString() + "-"
            + mes + "-"
            + dia);
        return dataString;
    }
    excluirItem(seletor) {
        this.cadastrados.excluir(seletor);
        AtualizarEventListenerPacotes(500);
        this.cadastrarView.update(this.cadastrados);
    }
    editar(etapa, seletor) {
        window.scrollTo(0, 0);
        if (etapa == 1 && seletor) {
            const cadastrado = this.cadastrados.selecionar(seletor);
            this.inputNome.value = cadastrado.nome;
            this.textAreaDescricao.value = cadastrado.descricao;
            this.inputData.value = this.dataTexto(cadastrado.data);
            this.inputID.value = cadastrado.id;
            console.log("criar codigo do status");
        }
        else if (etapa == 2) {
            this.adiciona();
        }
        else {
            throw Error("MEtodo em editar nao encontrado");
        }
        this.excluirItem(seletor);
        AtualizarEventListenerPacotes(500);
        this.cadastrarView.update(this.cadastrados);
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
