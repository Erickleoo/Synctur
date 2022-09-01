export class Cadastrar {
  constructor(
    private _nome: string,
    private _status: string,
    private _data: Date,
    private _descricao: string,
    private _id: string
  ) { }

  get nome(): string {
    return this._nome;
  }

  set nome(_nome: string) {
    this._nome = _nome
  }

  get status(): string {
    return this._status;
  }

  set status(_status) {
    this._status = _status
  }

  get data(): Date {
    return this._data;
  }

  set data(_data: Date) {
    this._data = _data
  }

  get descricao(): string {
    return this._descricao;
  }

  set descricao(_descricao: string) {
    this._descricao = _descricao
  }

  get id(): string {
    return this._id;
  }


  public static criaDe(nomeString: string, statusString: string, dataString: string, descricaoString: string): Cadastrar {
    const nomePacote = nomeString;
    const status = statusString;
    const exp = /-/g;
    const data = new Date(dataString.replace(exp, '/'));
    const textArea = descricaoString;
    const id = "1"

    return new Cadastrar(nomePacote, status, data, textArea, id);
  }
}
