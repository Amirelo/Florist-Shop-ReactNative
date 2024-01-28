class PromocodeModel {
  id: number | string;
  title: string;
  description: string;
  effect: string;
  image: string;
  constructor(
    id: number | string,
    title: string,
    description: string,
    effect: string,
    image: string,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.effect = effect;
    this.image = image;
  }
}

export default PromocodeModel;
