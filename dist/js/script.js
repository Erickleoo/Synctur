import { CadastrarPacoteController } from "./controllers/cadastrar-controller.js";
const controller = new CadastrarPacoteController();
const form = document.querySelector(".form");
if (form) {
    form.addEventListener("submit", event => {
        event.preventDefault();
        controller.adiciona();
    });
}
else {
    throw Error("Não foi possível inicializar a aplicação!");
}
export function AtualizarEventListenerPacotes(milisecons) {
    setTimeout(() => {
        var _a, _b;
        let tamanho = document.querySelectorAll(".button-excluir");
        for (let i = 1; i < tamanho.length + 1; i++) {
            let seletor = "#editar" + i.toString();
            (_a = document.querySelector(seletor)) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
                controller.editar(1, seletor);
            });
            let seletor1 = "#excluir" + i.toString();
            (_b = document.querySelector(seletor1)) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                controller.excluirItem(seletor1);
            });
        }
    }, milisecons);
}
window.onload = () => {
    controller.importaDados();
    AtualizarEventListenerPacotes(3000);
};
