import { CadastrarPacoteController } from "./controllers/cadastrar-controller.js";

const controller = new CadastrarPacoteController();

// Evento do tipo submit onde ao ser clicado adiciona os itens digitados no site.
const form = document.querySelector(".form");
if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();
    controller.adiciona();
  })
}
else {
  throw Error("Não foi possível inicializar a aplicação!")
}

// Função responsávem por atualizar os eventos de editar e excluir nos pacotes.
export function AtualizarEventListenerPacotes(milisecons: number) {
  setTimeout(() => {
    let tamanho = document.querySelectorAll(".button-excluir");

    for (let i = 0; i < tamanho.length; i++) {
      let id = tamanho[i].getAttribute("value") as string;
      let seletor = "#editar" + id.toString();
      document.querySelector(seletor)?.addEventListener("click", () => {
        controller.editar(1, seletor);
      })

      let seletor1 = "#excluir" + id.toString();
      document.querySelector(seletor1)?.addEventListener('click', () => {
        controller.excluirItem(seletor1);
      })
    }
  }, milisecons)
}


// Função responsável por colocar os dados importados da API no site.
window.onload = () => {
  controller.importaDados()
  AtualizarEventListenerPacotes(1000)
}
