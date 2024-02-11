import { ProductModel } from ".";

class CartModel {
    id: string| number;
    quantity: number;
    productID: string;
    
    constructor(id: string | number ,quantity: number ,productID: string){
        this.id = id;
        this.quantity = quantity;
        this.productID = productID;
    }

    setQuantity (quantity:number){
        this.quantity = quantity;
    }

}

export default CartModel;