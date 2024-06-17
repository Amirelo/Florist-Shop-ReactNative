// React and libs
import React from 'react';
import {FlatList} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

// Constants
import {
  MSG_FIELDS_EMPTY,
  NAVIGATION_MAIN_ADDRESS_EDIT,
  NAVIGATION_MAIN_CART_DETAIL,
} from '../../../constants/AppConstants';

// Models
import {AddressModel, CartModel, ProductModel} from '../../../models';

// Services
import {getUserAddresses} from '../MainService';

// Components
import {
  CustomButton,
  CustomText,
  CustomView,
  Divider,
} from '../../../components/atoms';
import {CustomInput, OptionsPanel} from '../../../components/molecules';
import {TextButton} from '../../../components/molecules/buttons';

// User Preferences
import lang from '../../../language/lang';

// Utilities
import {addressFormat} from '../../../utils/Utils';
import { addMessage } from '../../../redux/actions/PreferenceAction';

const CartDelivery = () => {
  // Initial
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();
  const dispatch = useDispatch()
  const email = useSelector((store: any) => store.isLoggedIn.userEmail);
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  // Fields
  const [listAddresses, setListAddresses] = React.useState<Array<AddressModel>>(
    [],
  );
  const [listProducts, setListProducts] = React.useState<Array<ProductModel>>();
  const [listCarts, setListCarts] = React.useState<Array<CartModel>>();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [selectedAddress, setSelectedAddress] = React.useState<AddressModel>();
  const [total, setTotal] = React.useState(0);

  // Fields - option panel status
  const [optionActive, setOptionActive] = React.useState(false);

  // Get User Address
  const getAddresses = async () => {
    const addresses: Array<AddressModel> = await getUserAddresses(email);
    setListAddresses(addresses);
  };

  // Get data from route
  React.useEffect(() => {
    getAddresses();
    // Get carts from previous screen
    if (route.params?.carts) {
      setListCarts(route.params.carts);
    }
    // Get products from previous screen
    if (route.params?.products) {
      console.log(
        'CartDelivery - route found - products:',
        route.params.products,
      );
      setListProducts(route.params.products);
    }
    // Get totals from previous screen
    if (route.params?.total) {
      setTotal(route.params.total);
    }
  }, []);

  // Go to Cart Detail screen
  const onContinuePressed = () => {
    // Check if fields correct
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
      // Navigate - CartDetailScreen
      navigation.navigate(NAVIGATION_MAIN_CART_DETAIL, {
        carts: listCarts,
        total: total,
        products: listProducts,
        address: selectedAddress,
        phoneNumber: phoneNumber,
      });
    } else {
      dispatch(addMessage(MSG_FIELDS_EMPTY))
      console.log('Fields cannot be empty');
    }
  };

  // Show option panel (pick address)
  const onSelectPressed = () => {
    setOptionActive(true);
  };

  // Navigate - AddressEditScreen
  const onAddAddressPressed = () => {
    navigation.navigate(NAVIGATION_MAIN_ADDRESS_EDIT);
  };

  // Saved selected address into fields
  const onOptionPressed = (item: AddressModel) => {
    setSelectedAddress(item);
    setOptionActive(false);
  };

  // Update list on firestore 'addresses' collection change
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
        {/* Input - Phone Number */}
        <CustomInput
          placeholder={lang[langPref].edPhone}
          onChangeText={setPhoneNumber}
          keyboardType="numeric"
          marginBottom={20}
        />

        <CustomText type="title" marginBottom={8}>
          {lang[langPref].text_address}
        </CustomText>

        {/* Text - Selected Address */}
        <CustomText marginBottom={12} type="subTitle">
          {selectedAddress
            ? addressFormat(selectedAddress)
            : lang[langPref].text_address_none}
        </CustomText>
        <Divider />

        {/* Button - Select Address */}
        <TextButton
          type="tertiary"
          onPressed={onSelectPressed}
          marginBottom={20}>
          {lang[langPref].buttonSelectAddress}
        </TextButton>

        <CustomText alignSelf="center" type="subTitle" marginBottom={20}>
          {lang[langPref].text_or}
        </CustomText>

        {/* Button - Add New Address */}
        <TextButton
          type="tertiary"
          onPressed={onAddAddressPressed}
          marginBottom={20}>
          {lang[langPref].buttonNewAddress}
        </TextButton>

        {/* Button - Continue to CartDetail */}
        <TextButton type="primary" onPressed={onContinuePressed}>
          {lang[langPref].buttonContinue}
        </TextButton>
      </CustomView>

      {/* Option Panel - Address list */}
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
