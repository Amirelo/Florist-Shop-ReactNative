import firestore from '@react-native-firebase/firestore';
import {CartModel, CategoryModel, OrderModel, ProductModel} from '../../models';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';

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

// Get product by product ID
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

// Get User Order by Email
export const getUserOrders = async (email: string) => {
  const querySnapshot = await firestore()
    .collection('users')
    .doc(email)
    .collection('orders')
    .get();
  console.log('SERVICE GET USER ORDERS:', querySnapshot.docs);
  return querySnapshot.docs.map(
    snapshot =>
      new OrderModel(
        snapshot.id,
        snapshot.data().status,
        snapshot.data().quantity,
        snapshot.data().discountRef,
        snapshot.data().productPrices,
        snapshot.data().productsQuantity,
        snapshot.data().total,
        snapshot.data().orderDate,
        snapshot.data().products,
      ),
  );
};

// Add product id to cart
export const AddCart = async (
  productRef: string,
  quantity: number,
  email: string,
) => {
  const res = await firestore()
    .collection('users')
    .doc(email)
    .collection('carts')
    .doc(productRef)
    .set({
      quantity: quantity,
    })
    .then(() => console.log('SERVICE: Add product to carts successful'))
    .catch(error => console.log('SERVICE: error saving cart:', error));
};

export const getCart = async (email: string) => {
  const snapshots = await firestore()
    .collection('users')
    .doc(email)
    .collection('carts')
    .get();
  return snapshots.docs.map(doc => new CartModel(doc.id, doc.data().quantity));
};

// Update Cart Quantity (not tested)
export const updateCartQuantity = async (productID: string, action: string) => {
  const userEmail = useSelector((store: any) => store.isLoggedIn.userEmail);
  const path = 'carts.' + productID + '.quantity';
  action == 'INCREMENT'
    ? firestore()
        .collection('users')
        .doc(userEmail)
        .update({
          carts: {
            productID: {
              quantity: firestore.FieldValue.increment(1),
            },
          },
        })
    : action == 'DECREMENT'
    ? firestore()
        .collection('users')
        .doc(userEmail)
        .update({
          carts: {
            productID: {
              quantity: firestore.FieldValue.increment(-1),
            },
          },
        })
    : console.log('SERVICE - Action not found');
};

// Listener for change (Not Tested)
export const cartListener = () => {
  const userEmail = useSelector((store: any) => store.isLoggedIn.userEmail);
  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(userEmail)
      .onSnapshot(documentSnapshot => {
        console.log('User data changed:', documentSnapshot.data());
      });
    return () => subscriber();
  }, [userEmail]);
};
