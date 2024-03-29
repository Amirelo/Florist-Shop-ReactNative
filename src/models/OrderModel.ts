import {CartModel, ProductModel} from '.';

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
  discountRef: string;
  productsPrice: number;
  productsQuantity: number;
  total: number;
  orderDate: string;
  products: Array<CartModel>;
  address: string;
  phoneNumber:string;
  constructor(
    id: string,
    status: string,
    discountRef: string,
    productsPrice: number,
    productsQuantity: number,
    total: number,
    orderDate: string,
    products: Array<CartModel>,
    address:string,
    phoneNumber: string
  ) {
    this.id = id;
    this.status = status;
    this.discountRef = discountRef;
    this.productsPrice = productsPrice;
    this.productsQuantity = productsQuantity;
    this.total = total;
    this.orderDate = orderDate;
    this.products = products;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }
}

export default OrderModel;
