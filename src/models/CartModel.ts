import { ProductModel } from ".";

class CartModel {
    id: string| number;
    quantity: number;
    productID: number;
    
    constructor(id: string | number ,quantity: number ,productID: number){
        this.id = id;
        this.quantity = quantity;
        this.productID = productID;
    }

    setQuantity (quantity:number){
        this.quantity = quantity;
    }

}

export default CartModel;