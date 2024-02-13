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
  if ((await checkCart(email, productRef)) == false) {
    await firestore()
      .collection('users')
      .doc(email)
      .collection('carts')
      .doc(productRef)
      .set({
        quantity: quantity,
      })
      .then(() => console.log('SERVICE: Add product to carts successful'))
      .catch(error => console.log('SERVICE: error saving cart:', error));
  } else {
    console.log('Product already in cart');
  }
};

// Get User Cart
export const getCart = async (email: string) => {
  const snapshots = await firestore()
    .collection('users')
    .doc(email)
    .collection('carts')
    .get();
  return snapshots.docs.map(doc => new CartModel(doc.id, doc.data().quantity));
};

// Check if product already in cart
export const checkCart = async (email: string, productRef: string) => {
  const res = await firestore()
    .collection('users')
    .doc(email)
    .collection('carts')
    .doc(productRef)
    .get();
  if (res.data()) {
    console.log('SERVICE-CHECKCART: found cart');
    return true;
  } else {
    console.log('SERVICE-CHECKCART: cart does not exist');
    return false;
  }
};

// Update Cart Quantity
export const updateCartQuantity = async (
  productID: string,
  amount: number,
  userEmail: string,
) => {
  firestore()
    .collection('users')
    .doc(userEmail)
    .collection('carts')
    .doc(productID)
    .update({
      quantity: firestore.FieldValue.increment(amount),
    })
    .then(() => {
      console.log('Update Cart Quantity success');
    })
    .catch((error: any) => {
      console.log('Update Cart Quantity Error:', error);
    });
};

// Delete cart
export const deleteCartItem = async (productID: string, email: string) => {
  return await firestore()
    .collection('users')
    .doc(email)
    .collection('carts')
    .doc(productID)
    .delete()
    .then(() => {
      console.log('SERVICE -Cart Item delete: successful');
      return true;
    })
    .catch((error: any) => {
      console.log('SERVICE - Cart Item Delete error:', error);
      return false;
    });
};

// Listener for change (Not Tested)
export const cartListener = async (userEmail: string) => {
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
