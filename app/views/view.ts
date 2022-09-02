export abstract class View<T> {

  protected elemento: HTMLElement;
  private escapar = false;

  constructor(seletor: string, escapar?: boolean) {
    const elemento = document.querySelector(seletor);
    if (elemento) {
      this.elemento = elemento as HTMLElement;
    }
    else {
      throw Error(`Seletor ${seletor} não existe no DOM. Verifique!`)
    }
    if (escapar) {
      this.escapar = escapar;
    }
  }

  // Metodo não deixa o usuário digitar uma tag script pra tentar colher informações do site.
  public update(model: T): void {
    let template = this.template(model);
    if (this.escapar) {
      template = template.replace(/<script>[\s\S]*?<\/script>/, '');
    }
    this.elemento.innerHTML = template;
  }

  // Metodo abstrato que será implementado por outra classe
  protected abstract template(model: T): string;
}