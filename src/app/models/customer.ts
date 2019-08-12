export class Customer {

  constructor(
    public id: string,
    public name: string,
    public email: string
  ) {}

  static fromJSON(json) {
    return new Customer(json.id, json.name, json.email);
  }

}
