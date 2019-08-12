export class Recipient {

  constructor(
    public name: string,
    public email: string
  ) {}

  static fromJSON(json) {
    return new Recipient(json.name, json.email);
  }

}

export class TotalPrice {

  constructor(
    public currency: string,
    public amount: number
  ) {}

  static fromJSON(json) {
    return new TotalPrice(json.currency, json.amount);
  }

}

export class Item {

  constructor(
    public id: string,
    public name: string,
    public quantity: number,
    public totalPrice: TotalPrice
  ) {}

  static fromJSON(json) {
    return new Item(
      json.id,
      json.name,
      json.quantity,
      TotalPrice.fromJSON(json.total_price)
    );
  }

}

export class Delivery {
  constructor(
    public courier: string,
    public method: string
  ) {}

  static fromJSON(json) {
    return new Delivery(json.courier, json.method);
  }

}

export class ChargeCustomer {

  constructor(
    public currency: string,
    public totalPrice: number
  ) {}

  static fromJSON(json) {
    return new ChargeCustomer(json.currency, json.total_price);
  }

}

export class Order {

  constructor(
    public id: string,
    public recipient: Recipient,
    public createdAt: Date,
    public items: Item[],
    public delivery: Delivery,
    public chargeCustomer: ChargeCustomer
  ) {}

  get totalPrice() {
    const currencies = {};
    for (const item of this.items) {
      const currency = item.totalPrice.currency;
      const amount = +item.totalPrice.amount;
      if (!currencies[currency]) { currencies[currency] = 0; }
      currencies[currency] += amount;
    }
    const result = Object.keys(currencies).sort().map(key => new TotalPrice(key, currencies[key]));
    return result;
  }

  static fromJSON(json) {
    return new Order(
      json.id,
      Recipient.fromJSON(json.recipient),
      new Date(json.created_at),
      json.items.map(item => Item.fromJSON(item)),
      Delivery.fromJSON(json.delivery),
      ChargeCustomer.fromJSON(json.charge_customer)
    );
  }

}
