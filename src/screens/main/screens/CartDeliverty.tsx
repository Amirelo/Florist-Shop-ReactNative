import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {AddressModel} from '../../../models';
import {CustomButton, CustomText, Divider} from '../../../components/atoms';
import themes from '../../../themes/themes';
import {CustomInput, OptionsPanel} from '../../../components/molecules';
import React from 'react';

const CartDelivery = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const addressList = new Array<AddressModel>();

  const [optionActive, setOptionActive] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState<AddressModel>();

  const onSelectPressed = () => {
    setOptionActive(true);
  };

  const onOptionPressed = (item: AddressModel) => {
    setSelectedAddress(item)
    setOptionActive(false);
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
        <CustomText marginBottom={12} type='subTitle'>
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

        <CustomText style={{textAlign:'center'}} type='subTitle'>Or</CustomText>

        <CustomInput marginBottom={8} placeholder="Street">
          </CustomInput>
          <CustomInput marginBottom={8} placeholder="Street number">
          </CustomInput>
          <CustomInput marginBottom={8} placeholder="District">
          </CustomInput>
          <CustomInput marginBottom={8} placeholder="Ward">
          </CustomInput>
          <CustomInput marginBottom={20} placeholder="City">
          </CustomInput>
          <CustomButton style={styles.button}><CustomText type='subTitle' color={'white'}>Continue</CustomText></CustomButton>
      </View>
      {optionActive ? (
        <OptionsPanel setActive={setOptionActive} title="Address">
          <FlatList
            data={addressList}
            keyExtractor={item => item.id.toString()}
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
  button:{
    backgroundColor:themes['defaultTheme'].primaryColor,
    alignItems:'center',
    paddingVertical: 16,
    borderRadius:7
}
});
