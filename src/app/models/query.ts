export class Query {
  constructor(
    public customerId: string,
    public startDate: Date,
    public endDate: Date
  ) {}

  get deltaDays() {
    const millisecondsInADay = 86400000;
    const startDay = Math.floor(this.startDate.getTime() / millisecondsInADay);
    const endDay = Math.floor(this.endDate.getTime() / millisecondsInADay) + 1;
    return endDay - startDay;
  }

  static fromJSON(json) {
    return new Query(json.customerId, new Date(json.startDate), new Date(json.endDate));
  }
}
