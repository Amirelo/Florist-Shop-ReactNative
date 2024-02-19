class ProductModel {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  totalRating: number;
  categories: Array<string>;
  images: Array<string>;
  colors: Array<String>;
  constructor(
    id: string,
    name: string,
    price: number,
    quantity: number,
    description: string,
    totalRating: number,
    categories: Array<string>,
    images: Array<string>,
    colors: Array<String>,
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
    this.totalRating = totalRating;
    this.categories = categories;
    this.images = images;
    this.colors = colors;
  }
}

export default ProductModel;
