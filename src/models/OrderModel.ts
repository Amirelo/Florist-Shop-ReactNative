import {ProductModel} from '.';

const orderStatus = [
  'PENDING',
  'PREPARING',
  'PACKING',
  'DELIVERING',
  'COMPLETED',
  'CANCEL',
];

class OrderModel {
  id: string;
  status: string;
  quantity: number;
  discountRef: string;
  productsPrice: number;
  productsQuantity: number;
  total: number;
  orderDate: string;
  products: Array<any>;
  constructor(
    id: string,
    status: string,
    quantity: number,
    discountRef: string,
    productsPrice: number,
    productsQuantity: number,
    total: number,
    orderDate: string,
    products: Array<any>,
  ) {
    this.id = id;
    this.status = status;
    this.quantity = quantity;
    this.discountRef = discountRef;
    this.productsPrice = productsPrice;
    this.productsQuantity = productsQuantity;
    this.total = total;
    this.orderDate = orderDate;
    this.products = products;
  }
}

export default OrderModel;
