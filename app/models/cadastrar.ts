export class Cadastrar {
  constructor(
    private _nome: string,
    private _status: string,
    private _data: Date,
    private _descricao: string
  ) { }

  get nome(): string {
    return this._nome;
  }

  get status(): string {
    return this._status;
  }

  get data(): Date {
    return this._data;
  }

  get descricao(): string {
    return this._descricao;
  }

  public static criaDe(nomeString: string, statusString: string, dataString: string, descricaoString: string): Cadastrar {
    const nomePacote = nomeString;
    const status = statusString;
    const exp = /-/g;
    const data = new Date(dataString.replace(exp, '/'));
    const textArea = descricaoString;

    return new Cadastrar(nomePacote, status, data, textArea);
  }


}