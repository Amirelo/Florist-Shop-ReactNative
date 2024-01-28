class ProductModel {
    id: number|string;
    name: string;
    price: number;
    quantity: number;
    description: string;
    totalRating: number;
    categoryID: number;
    links: Array<string>;
    constructor(id:number|string ,name: string, price:number, quantity:number, description: string, totalRating: number, categoryID: number, links: Array<string>){
        this.id = id;
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