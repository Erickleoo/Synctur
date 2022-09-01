import { CadastrarPacoteController } from "./controllers/cadastrar-controller.js";

const controller = new CadastrarPacoteController();

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

export function AtualizarEventListenerPacotes(milisecons: number) {
  setTimeout(() => {
    let tamanho = document.querySelectorAll(".button-excluir")

    for (let i = 1; i < tamanho.length + 1; i++) {
      let seletor = "#editar" + i.toString()
      document.querySelector(seletor)?.addEventListener("click", () => {
        controller.editar(1, seletor);
      })

      let seletor1 = "#excluir" + i.toString();
      document.querySelector(seletor1)?.addEventListener('click', () => {
        controller.excluirItem(seletor1);
      })
    }
  }, milisecons)
}

window.onload = () => {
  controller.importaDados()
  AtualizarEventListenerPacotes(3000)
}
