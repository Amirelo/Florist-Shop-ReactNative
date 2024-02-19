import firestore from '@react-native-firebase/firestore';
import {
  AddressModel,
  CartModel,
  CategoryModel,
  OrderModel,
  ProductModel,
  PromocodeModel,
} from '../../models';

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
        doc.data()!.colors,
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
    doc.data()!.colors,
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
        snapshot.data().discountRef,
        snapshot.data().productPrices,
        snapshot.data().productsQuantity,
        snapshot.data().total,
        snapshot.data().orderDate,
        snapshot.data().products,
        snapshot.data().address,
        snapshot.data().phoneNumber,
      ),
  );
};

// Add Order
export const AddUserOrder = async (order: OrderModel, email: string) => {
  var currentdate = new Date();
  var year = currentdate.getFullYear();
  var month =
    currentdate.getMonth() + 1 < 10
      ? '0' + (currentdate.getMonth() + 1)
      : currentdate.getMonth() + 1;
  var day =
    currentdate.getDay() < 10
      ? '0' + currentdate.getDay()
      : currentdate.getDay();
  var date: string = year.toString() + month.toString() + day.toString();
  console.log('SERVICE - Add User Order - current date:', date);
  console.log('SERVICE - Add User Order - order:', order);
  return await firestore()
    .collection('users')
    .doc(email)
    .collection('orders')
    .add({
      status: 'PENDING',
      discountRef: order.discountRef,
      productsPrice: order.productsPrice,
      productsQuantity: order.productsQuantity,
      total: order.total,
      orderDate: date,
      products: order.products,
      address: order.address,
      phoneNumber: order.phoneNumber,
    })
    .then(async () => {
      console.log('SERVICE - Add User Order: success');
      if (order.discountRef.length > 0) {
        await applyOrderPromocode(email, order.discountRef);
      }
      order.products.forEach(async item => {
        await reduceItemQuantity(item.id, item.quantity);
      });

      return true;
    })
    .catch(error => {
      console.log('SERVICE - Add User Order:', error);
      return false;
    });
};

// Remove promocode after using in order
export const applyOrderPromocode = async (email: string, promoID: string) => {
  await firestore()
    .collection('users')
    .doc(email)
    .collection('promocodes')
    .doc(promoID)
    .update({
      status: 'USED',
    })
    .then(() => {
      console.log('SERVICE - Apply Order Promo: success');
    })
    .catch(error => {
      console.log('SERVICE - Apply Order Promo error:', error);
    });
};

// Reduce item quantity
export const reduceItemQuantity = async (productID: string, amount: number) => {
  await firestore()
    .collection('products')
    .doc(productID)
    .update({
      quantity: firestore.FieldValue.increment(-amount),
    })
    .then(() => {
      console.log('SERVICE - Product quantity decreased success:', productID);
    })
    .catch(error => {
      console.log('SERVICE - Product quantity decreased failed:', error);
    });
};

// Add product id to cart
export const AddCart = async (
  productRef: string,
  quantity: number,
  email: string,
) => {
  if ((await checkCart(email, productRef)) == false) {
    return await firestore()
      .collection('users')
      .doc(email)
      .collection('carts')
      .doc(productRef)
      .set({
        quantity: quantity,
      })
      .then(() => {
        console.log('SERVICE: Add product to carts successful');
        return true;
      })
      .catch(error => {
        console.log('SERVICE: error saving cart:', error);
        return false;
      });
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
      console.log('SERVICE - Update Cart Quantity success');
    })
    .catch((error: any) => {
      console.log('SERVICE - Update Cart Quantity Error:', error);
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

// Delete all cart item
export const deleteCart = async (email: string) => {
  try {
    const carts = await firestore()
      .collection('users')
      .doc(email)
      .collection('carts')
      .get();
    carts.docs.forEach(item => {
      item.ref.delete();
    });
    console.log('SERVICE - Delete Cart: Success');
    return true;
  } catch (error) {
    console.log('SERVICE - Delete Cart Error:', error);
    return false;
  }
};

// Get User Addresses
export const getUserAddresses = async (email: string) => {
  const querySnapshot = await firestore()
    .collection('users')
    .doc(email)
    .collection('addresses')
    .get();
  return querySnapshot.docs.map(snapshot => {
    const data = snapshot.data();
    return new AddressModel(
      snapshot.id,
      data.streetNumber,
      data.street,
      data.ward,
      data.district,
      data.city,
    );
  });
};

// Add new address
export const AddNewUserAddress = async (
  email: string,
  address: AddressModel,
) => {
  await firestore()
    .collection('users')
    .doc(email)
    .collection('addresses')
    .add({
      streetNumber: address.streetNumber,
      street: address.street,
      ward: address.ward,
      district: address.district,
      city: address.city,
    })
    .then(() => {
      console.log('SERVICE - Add new Adress: Success');
    })
    .catch(error => {
      console.log('SERVICE - Error Add new Adress:', error);
    });
};

// Add new address
export const EditUserAddress = async (email: string, address: AddressModel) => {
  await firestore()
    .collection('users')
    .doc(email)
    .collection('addresses')
    .doc(address.id)
    .update({
      streetNumber: address.streetNumber,
      street: address.street,
      ward: address.ward,
      district: address.district,
      city: address.city,
    })
    .then(() => {
      console.log('SERVICE - Edit Adress: Success');
    })
    .catch(error => {
      console.log('SERVICE - Error Edit Adress:', error);
    });
};

// Delete User Address
export const deleteUserAddress = async (email: string, addressID: string) => {
  const res = await firestore()
    .collection('users')
    .doc(email)
    .collection('addresses')
    .doc(addressID)
    .delete()
    .then(() => {
      console.log('SERVICE - User Address Delete: Success');
    })
    .catch(error => {
      console.log('SERVICE - User Address Delete Fail: ', error);
    });
};

// Get User Promocodes
export const getUserPromoocodes = async (email: string) => {
  const querySnapshot = await firestore()
    .collection('users')
    .doc(email)
    .collection('promocodes')
    .get();
  return querySnapshot.docs.map(snapshot => {
    const data = snapshot.data();
    return new PromocodeModel(
      snapshot.id,
      data.title,
      data.description,
      data.effect,
      data.amount,
      data.image,
      data.endDate,
      data.status,
    );
  });
};
