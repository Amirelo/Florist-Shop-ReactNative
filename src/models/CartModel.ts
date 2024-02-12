import { ProductModel } from ".";

class CartModel {
    id: string| number;
    quantity: number;
    
    constructor(id: string | number ,quantity: number){
        this.id = id;
        this.quantity = quantity;
    }

    setQuantity (quantity:number){
        this.quantity = quantity;
    }

}

export default CartModel;