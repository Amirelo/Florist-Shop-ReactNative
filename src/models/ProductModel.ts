class ProductModel {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  totalRating: number;
  categories: Array<string>;
  images: Array<string>;
  constructor(
    id: string,
    name: string,
    price: number,
    quantity: number,
    description: string,
    totalRating: number,
    categories: Array<string>,
    images: Array<string>,
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
    this.totalRating = totalRating;
    this.categories = categories;
    this.images = images;
  }
}

export default ProductModel;
