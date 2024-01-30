class PromocodeModel {
  id: number | string;
  title: string;
  description: string;
  effect: string;
  amount: number;
  image: string;
  status: boolean;
  constructor(
    id: number | string,
    title: string,
    description: string,
    effect: string,
    amount: number,
    image: string,
    status: boolean,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.effect = effect;
    this.amount = amount;
    this.image = image;
    this.status = status;
  }
}

export default PromocodeModel;
