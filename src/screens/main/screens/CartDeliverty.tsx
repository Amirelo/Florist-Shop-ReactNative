import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {FlatList, StyleSheet, View} from 'react-native';
import {AddressModel, CartModel} from '../../../models';
import {CustomButton, CustomText, Divider} from '../../../components/atoms';
import themes from '../../../themes/themes';
import {CustomInput, OptionsPanel} from '../../../components/molecules';
import React from 'react';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import {addressFormat} from '../../../utils/Utils';
import { getUserAddresses } from '../MainService';
import { useSelector } from 'react-redux';

const CartDelivery = () => {
  // Navigation
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();
  const email = useSelector((store:any) => store.isLoggedIn.userEmail)

  // Fields
  var cartList = Array<CartModel>();
  const [optionActive, setOptionActive] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState<AddressModel>();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [listAddresses, setListAddresses] = React.useState<Array<AddressModel>>([]);

  // Get total amount of price
  var total = route.params?.total ? route.params.total : 0;

  const getAddresses = async() =>{
    const addresses:Array<AddressModel> = await getUserAddresses(email)
    setListAddresses(addresses)
  }

  // Get data from route
  React.useEffect(() => {
    getAddresses()
    if (route.params?.carts) {
      cartList = route.params.carts;
    }
  }, []);

  // Go to Cart Detail screen
  const onContinuePressed = () => {
    if (
      phoneNumber != null &&
      selectedAddress != null &&
      phoneNumber.length == 10
    ) {
      navigation.navigate('CartDetail', {
        carts: cartList,
        total: total,
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
        <CustomInput placeholder="Phone number" onChangeText={setPhoneNumber} marginBottom={20} />

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
