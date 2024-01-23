class ProductModel {
    name: string;
    price: number;
    quantity: number;
    description: string;
    totalRating: number;
    categoryID: number;
    links: Array<string>;
    constructor(name: string, price:number, quantity:number, description: string, totalRating: number, categoryID: number, links: Array<string>){
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.totalRating = totalRating;
        this.categoryID = categoryID;
        this.links = links;
    }
}

export default ProductModel;