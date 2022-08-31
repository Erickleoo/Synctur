export class MensagemView {
    constructor(seletor) {
        this.element = document.querySelector(seletor);
    }
    template(model) {
        return `
      
    `;
    }
    update(model) {
        const template = this.template(model);
        this.element.innerHTML = template;
    }
}
