import {ProductModel} from '.';

class CartModel {
  id: string;
  quantity: number;

  constructor(id: string, quantity: number) {
    this.id = id;
    this.quantity = quantity;
  }

  setQuantity(quantity: number) {
    this.quantity = quantity;
  }
}

export default CartModel;
