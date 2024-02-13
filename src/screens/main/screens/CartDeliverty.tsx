import {NavigationProp, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {FlatList, StyleSheet, View} from 'react-native';
import {AddressModel, CartModel} from '../../../models';
import {CustomButton, CustomText, Divider} from '../../../components/atoms';
import themes from '../../../themes/themes';
import {CustomInput, OptionsPanel} from '../../../components/molecules';
import React from 'react';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const CartDelivery = () => {
  // Navigation
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();
  
  // Fields
  const addressList = new Array<AddressModel>();
  var cartList = Array<CartModel>();
  const [optionActive, setOptionActive] = React.useState(false);
  const [addActive, setAddActive] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState<AddressModel>(
    new AddressModel('', '', '', '', '', ''),
  );
  
  // Get total amount of price
  var total = route.params?.total? route.params.total : 0;

// Get data from route
    React.useEffect(()=>{
      if (route.params?.carts){
        cartList = route.params.carts
      }
    },[])

    // Go to Cart Detail screen
  const onContinuePressed = () => {
    navigation.navigate('CartDetail', {carts: cartList, total: total, address: selectedAddress});
  };

  // Show option panel (pick address)
  const onSelectPressed = () => {
    setOptionActive(true);
  };

  const onAddAddressPressed = () => {
    setAddActive(true);
  }

  // Saved selected address into fields
  const onOptionPressed = (item: AddressModel) => {
    setSelectedAddress(item);
    setOptionActive(false);
  };

  // Update part of address
  const onInfoChanged = (type: string, data: string) => {
    const newAddress = new AddressModel(
      '',
      selectedAddress.streetNumber,
      selectedAddress.street,
      selectedAddress.ward,
      selectedAddress.district,
      selectedAddress.city,
    );
    console.log(type);
    type == 'STREET'
      ? newAddress.setStreet(data)
      : type == 'STREETNUMBER'
      ? newAddress.setStreetNumber(data)
      : type == 'DISTRICT'
      ? newAddress.setDistrict(data)
      : type == 'WARD'
      ? newAddress.setWard(data)
      : newAddress.setCity(data);
    setSelectedAddress(newAddress);
  };

  var address = new AddressModel(
    1,
    '42',
    'No Trang Long',
    'Tan Son Nhi',
    'Binh Thanh',
    'HCM',
  );
  addressList.push(address);
  address = new AddressModel(
    2,
    '41',
    'No Trang Long',
    'Tan Son Nhi',
    'Binh Thanh',
    'HCM',
  );
  addressList.push(address);
  address = new AddressModel(
    3,
    '40',
    'No Trang Long',
    'Tan Son Nhi',
    'Binh Thanh',
    'HCM',
  );
  addressList.push(address);
  return (
    <View style={{height: '100%'}}>
      <View style={styles.view}>

        <CustomInput placeholder='Phone number' marginBottom={20}/>

        <CustomText type='title' marginBottom={8}>Address</CustomText>

        <CustomText marginBottom={12} type="subTitle">
          {selectedAddress
            ? selectedAddress.streetNumber +
              ' ' +
              selectedAddress.street +
              ', ' +
              selectedAddress.ward +
              ', ' +
              selectedAddress.district +
              ', ' +
              selectedAddress.city
            : 'No address selected'}
        </CustomText>
        <Divider />
        <CustomButton onPressed={onSelectPressed} style={styles.couponButton}>
          <CustomText>Select Address</CustomText>
        </CustomButton>

        <CustomText style={{textAlign: 'center'}} type="subTitle">
          Or
        </CustomText>

        <CustomButton onPressed={onAddAddressPressed} style={styles.couponButton}>
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
            data={addressList}
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
      {addActive ?
      <OptionsPanel title='New Address' setActive={setAddActive}>
      <CustomInput
          onChangeText={(text: string) => onInfoChanged('STREET', text)}
          marginBottom={8}
          placeholder="Street"></CustomInput>
        <CustomInput
          onChangeText={(text: string) => onInfoChanged('STREETNUMBER', text)}
          marginBottom={8}
          placeholder="Street number"></CustomInput>
        <CustomInput
          onChangeText={(text: string) => onInfoChanged('DISTRICT', text)}
          marginBottom={8}
          placeholder="District"></CustomInput>
        <CustomInput
          onChangeText={(text: string) => onInfoChanged('WARD', text)}
          marginBottom={8}
          placeholder="Ward"></CustomInput>
        <CustomInput
          onChangeText={(text: string) => onInfoChanged('CITY', text)}
          marginBottom={20}
          placeholder="City"></CustomInput>
        <CustomButton onPressed={onContinuePressed} style={styles.button}>
          <CustomText type="subTitle" color={'white'}>
            Continue
          </CustomText>
        </CustomButton>
      </OptionsPanel>
      :<></>}
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
