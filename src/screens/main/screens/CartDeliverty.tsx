import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {FlatList, StyleSheet, View} from 'react-native';
import {AddressModel, CartModel, ProductModel} from '../../../models';
import {CustomButton, CustomText, Divider} from '../../../components/atoms';
import themes from '../../../themes/themes';
import {CustomInput, OptionsPanel} from '../../../components/molecules';
import React from 'react';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import {addressFormat} from '../../../utils/Utils';
import {getUserAddresses} from '../MainService';
import {useSelector} from 'react-redux';

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
  const [listProducts, setListProducts] = React.useState<Array<ProductModel>>()
  const [listCarts, setListCarts] = React.useState<Array<CartModel>>()
  const [total, setTotal] = React.useState(0)

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
    if (route.params?.products){
      console.log('CartDelivery - route found - products:', route.params.products)
      setListProducts(route.params.products)
    }
    if (route.params?.total){
      setTotal(route.params.total)
    }
  }, []);

  // Go to Cart Detail screen
  const onContinuePressed = () => {
    if (
      phoneNumber != null &&
      selectedAddress != null &&
      phoneNumber.length == 10
    ) {
      console.log('CartDelivery - passing route - carts:', listCarts)
      console.log('CartDelivery - passing route - total:', total)
      console.log('CartDelivery - passing route - products:', listProducts)
      console.log('CartDelivery - passing route - address:', selectedAddress)
      navigation.navigate('CartDetail', {
        carts: listCarts,
        total: total,
        products: listProducts,
        address: selectedAddress,
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
    navigation.navigate('AddressEdit');
  };

  // Saved selected address into fields
  const onOptionPressed = (item: AddressModel) => {
    setSelectedAddress(item);
    setOptionActive(false);
  };

  return (
    <View style={{height: '100%'}}>
      <View style={styles.view}>
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
        <CustomButton onPressed={onSelectPressed} style={styles.couponButton}>
          <CustomText>Select Address</CustomText>
        </CustomButton>

        <CustomText style={{textAlign: 'center'}} type="subTitle">
          Or
        </CustomText>

        <CustomButton
          onPressed={onAddAddressPressed}
          style={styles.couponButton}>
          <CustomText>Add New Address</CustomText>
        </CustomButton>

        <CustomButton onPressed={onContinuePressed} style={styles.button}>
          <CustomText type="subTitle" color={'white'}>
            Continue
          </CustomText>
        </CustomButton>
      </View>
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
    </View>
  );
};

export default CartDelivery;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  couponButton: {
    marginTop: 20,
    marginBottom: 20,
    height: 48,
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: 'white',
    borderColor: themes['defaultTheme'].textSecondaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: themes['defaultTheme'].primaryColor,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 7,
  },
});
