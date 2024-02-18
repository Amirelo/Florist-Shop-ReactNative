import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {FlatList, StyleSheet, View} from 'react-native';
import {AddressModel, CartModel, ProductModel} from '../../../models';
import {
  CustomButton,
  CustomText,
  CustomView,
  Divider,
} from '../../../components/atoms';
import themes from '../../../themes/themes';
import {CustomInput, OptionsPanel} from '../../../components/molecules';
import React from 'react';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import {addressFormat} from '../../../utils/Utils';
import {getUserAddresses} from '../MainService';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {
  NAVIGATION_MAIN_ADDRESS_EDIT,
  NAVIGATION_MAIN_CART_DETAIL,
} from '../../../constants/AppConstants';
import {TextButton} from '../../../components/molecules/buttons';

const CartDelivery = () => {
  // Navigation
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();
  const email = useSelector((store: any) => store.isLoggedIn.userEmail);

  // Fields

  const [optionActive, setOptionActive] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState<AddressModel>();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [listAddresses, setListAddresses] = React.useState<Array<AddressModel>>(
    [],
  );
  const [listProducts, setListProducts] = React.useState<Array<ProductModel>>();
  const [listCarts, setListCarts] = React.useState<Array<CartModel>>();
  const [total, setTotal] = React.useState(0);

  // Get total price

  const getAddresses = async () => {
    const addresses: Array<AddressModel> = await getUserAddresses(email);
    setListAddresses(addresses);
  };

  // Get data from route
  React.useEffect(() => {
    getAddresses();
    if (route.params?.carts) {
      setListCarts(route.params.carts);
    }
    if (route.params?.products) {
      console.log(
        'CartDelivery - route found - products:',
        route.params.products,
      );
      setListProducts(route.params.products);
    }
    if (route.params?.total) {
      setTotal(route.params.total);
    }
  }, []);

  // Go to Cart Detail screen
  const onContinuePressed = () => {
    if (
      phoneNumber != null &&
      selectedAddress != null &&
      phoneNumber.length == 10
    ) {
      console.log('CartDelivery - passing route - carts:', listCarts);
      console.log('CartDelivery - passing route - total:', total);
      console.log('CartDelivery - passing route - products:', listProducts);
      console.log('CartDelivery - passing route - address:', selectedAddress);
      console.log('CartDelivery - passing route - phone number:', phoneNumber);
      navigation.navigate(NAVIGATION_MAIN_CART_DETAIL, {
        carts: listCarts,
        total: total,
        products: listProducts,
        address: selectedAddress,
        phoneNumber: phoneNumber,
      });
    } else {
      console.log('Fields cannot be empty');
    }
  };

  // Show option panel (pick address)
  const onSelectPressed = () => {
    setOptionActive(true);
  };

  const onAddAddressPressed = () => {
    navigation.navigate(NAVIGATION_MAIN_ADDRESS_EDIT);
  };

  // Saved selected address into fields
  const onOptionPressed = (item: AddressModel) => {
    setSelectedAddress(item);
    setOptionActive(false);
  };

  React.useEffect(() => {
    firestore()
      .collection('users')
      .doc(email)
      .collection('addresses')
      .onSnapshot(querySnapshot => {
        setListAddresses([]);
        querySnapshot.docs.map(item => {
          const address = new AddressModel(
            item.id,
            item.data().streetNumber,
            item.data().street,
            item.data().ward,
            item.data().district,
            item.data().city,
          );
          setListAddresses(prev => [...prev, address]);
        });
      });
  }, []);

  return (
    <CustomView type="fullscreen">
      <CustomView type="body">
        <CustomInput
          placeholder="Phone number"
          onChangeText={setPhoneNumber}
          keyboardType="numeric"
          marginBottom={20}
        />

        <CustomText type="title" marginBottom={8}>
          Address
        </CustomText>

        <CustomText marginBottom={12} type="subTitle">
          {selectedAddress
            ? addressFormat(selectedAddress)
            : 'No address selected'}
        </CustomText>
        <Divider />

        <TextButton
          type="tertiary"
          onPressed={onSelectPressed}
          marginBottom={20}>
          Select Address
        </TextButton>

        <CustomText alignSelf='center' type="subTitle" marginBottom={20}>
          Or
        </CustomText>

        <TextButton
          type="tertiary"
          onPressed={onAddAddressPressed}
          marginBottom={20}>
          Add New Address
        </TextButton>

            <TextButton type='primary' onPressed={onContinuePressed}>Continue</TextButton>
      </CustomView>
      {optionActive ? (
        <OptionsPanel setActive={setOptionActive} title="Address">
          <FlatList
            scrollEnabled={false}
            data={listAddresses}
            keyExtractor={item => item.id!.toString()}
            renderItem={({item}) => (
              <CustomButton onPressed={() => onOptionPressed(item)}>
                <CustomText type="subTitle" marginBottom={12}>
                  {item.streetNumber +
                    ' ' +
                    item.street +
                    ', ' +
                    item.ward +
                    ', ' +
                    item.district +
                    ', ' +
                    item.city}
                </CustomText>
              </CustomButton>
            )}
          />
        </OptionsPanel>
      ) : (
        <></>
      )}
    </CustomView>
  );
};

export default CartDelivery;