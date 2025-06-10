class DbArgs {
  private _args

  constructor() {
    this._args = [];
  }

  add (value, type) {
    const argIndex = this._args.length + 1;
    const fullType = `$${argIndex}::${type}`;
    this._args.push({ argIndex, value, fullType });
    return fullType;
  }
  
  toArray() {
    return this._args.map((a) => a.value);
  }

}

class DbBase {
  async execute(stmt, dbArgs) {
    const client = new Client(psqlConfig);
  }
}

class Db {
  constructor () {
    this.users = new UserDb();
  }
  async execute(stmt, dbArgs) {}
}
