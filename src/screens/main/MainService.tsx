import firestore from '@react-native-firebase/firestore';
import {CategoryModel, ProductModel} from '../../models';
import { useSelector } from 'react-redux';

// Get all categories from server
export const getCategories = async () => {
  const snapshot = await firestore().collection('categories').get();
  return snapshot.docs.map(
    doc => new CategoryModel(doc.id, doc.data().name, doc.data().image),
  );
};

// Get all products from server
export const getProducts = async () => {
  const snapshot = await firestore().collection('products').get();
  return snapshot.docs.map(
    doc =>
      new ProductModel(
        doc.id,
        doc.data().name,
        doc.data().price,
        doc.data().quantity,
        doc.data().description,
        doc.data().totalRating,
        doc.data().categories,
        doc.data().images,
      ),
  );
};

export const getProductByID = async (id: string) => {
  const doc = await firestore().collection('products').doc(id).get();
  const res = new ProductModel(
    id,
    doc.data()!.name,
    doc.data()!.price,
    doc.data()!.quantity,
    doc.data()!.description,
    doc.data()!.totalRating,
    doc.data()!.categories,
    doc.data()!.images,
  );
  console.log('SERVICE GET PRODUCT:', res);
  return res;
};

export const updateCartQuantity = async (productID: string, action:string) => {
  const userEmail = useSelector((store:any) => store.isLoggedIn.userEmail)
  const path = 'carts.' + productID+'.quantity'
  action == 'INCREMENT' ?
  firestore().collection('users').doc(userEmail).update({
    carts:{
      productID: {
        quantity: firestore.FieldValue.increment(1)
      }
    }
  }) 
  : 
  action == ''?
  firestore().collection('users').doc(userEmail).update({
    carts:{
      productID: {
        quantity: firestore.FieldValue.increment(-1)
      }
    }
  }) 
  : console.log("SERVICE - Action not found")
}