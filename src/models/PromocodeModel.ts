class PromocodeModel {
  id: string;
  title: string;
  description: string;
  effect: string;
  amount: number;
  image: string;
  endDate: string;
  status: boolean;
  constructor(
    id: string,
    title: string,
    description: string,
    effect: string,
    amount: number,
    image: string,
    endDate: string,
    status: boolean,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.effect = effect;
    this.amount = amount;
    this.image = image;
    this.endDate = endDate;
    this.status = status;
  }
}

export default PromocodeModel;
