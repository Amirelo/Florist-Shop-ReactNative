import { ProductModel } from "."

const orderStatus = ['PENDING','PREPARING','PACKING', 'DELIVERING', 'COMPLETED','CANCEL']

class OrderModel{
    id: number;
    status: string;
    amount: number;
    totalPrice: number;
    orderDate: string;
    products: Array<ProductModel>;
    constructor(id:number, status: string, amount:number, totalPrice:number, orderDate:string, products: Array<ProductModel>){
        this.id = id;
        this.status = status;
        this.amount = amount;
        this.totalPrice = totalPrice;
        this.orderDate = orderDate;
        this.products = products
    }
}

export default OrderModel;