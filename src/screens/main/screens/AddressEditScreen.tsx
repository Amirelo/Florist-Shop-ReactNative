import React from 'react';
import themes from '../../../themes/themes';
import {StyleSheet, View} from 'react-native';
import {CustomInput, OptionsPanel} from '../../../components/molecules';
import {CustomButton, CustomText} from '../../../components/atoms';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {AddressModel} from '../../../models';
import {SocialButton, TextButton} from '../../../components/molecules/buttons';
import * as road from '../../../data/roads.json';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {AddNewUserAddress, EditUserAddress} from '../MainService';
import {useSelector} from 'react-redux';

const AddressEdit = () => {
  const locationHCM = {
    '1': [
      'Bến Thành',
      'Bến Nghé',
      'Đa Kao',
      'Nguyễn Cư Trinh',
      'Nguyễn Thái Bình',
      'Tân Định',
      'Cô Giang',
      'Cầu Ông Lãnh',
      'Phạm Ngũ Lão',
      'Cầu Kho',
    ],
    '3': [
      '1',
      '2',
      '3',
      '4',
      '5',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      'Võ Thị Sáu',
    ],
    '4': [
      '1',
      '2',
      '3',
      '4',
      '6',
      '8',
      '9',
      '10',
      '13',
      '14',
      '15',
      '16',
      '18',
    ],
    '5': [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
    ],
    '6': [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
    ],
    '7': [
      'Phú Mỹ',
      'Phú Thuận',
      'Bình Thuận',
      'Tân Phong',
      'Tân Phú',
      'Tân Hưng',
      'Tân Kiểng',
      'Tân Quy',
      'Tân Thuận Đông',
      'Tân Thuận Tây',
    ],
    '8': [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
    ],
    '10': [
      '1',
      '2',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
    ],
    '11': [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
    ],
    '12': [
      'An Phú Đông',
      'Đông Hưng Thuận',
      'Tân Hưng Thuận',
      'Hiệp Thành',
      'Thới An',
      'Tân Thới Nhất',
      'Tân Thới Hiệp',
      'Tân Chánh Hiệp',
      'Thạnh Lộc',
      'Thạnh Xuân',
      'Trung Mỹ Tây',
    ],
    'Tân Bình': [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
    ],
    'Bình Tân': [
      'Hòa Thạnh',
      'Phú Thạnh',
      'Hiệp Tân',
      'Phú Trung',
      'Phú Thọ Hòa',
      'Sơn Kỳ',
      'Tân Quý',
      'Tân Sơn Nhì',
      'Tân Thành',
      'Tân Thới Hòa',
      'Tây Thạnh',
    ],
    'Bình Thạnh': [
      '1',
      '2',
      '3',
      '4',
      '5',
      '7',
      '8',
      '9',
      '10',
      '11',
      '13',
      '15',
      '17',
    ],
    'Tân Phú': [
      'An Lạc',
      'An Lạc A',
      'Bình Hưng Hòa',
      'Bình Hưng Hòa A',
      'Bình Hưng Hòa B',
      'Tân Tạo',
      'Tân Tạo A',
      'Bình Trị Đông A',
      'Bình Trị Đông B',
    ],
    'Gò Vấp': [
      '1',
      '2',
      '3',
      '5',
      '6',
      '7',
      '11',
      '12',
      '13',
      '14',
      '15',
      '17',
      '19',
      '21',
      '22',
      '24',
      '25',
      '26',
      '27',
      '28',
    ],
    'Phú Nhuận': [
      '1',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
    ],
  };

  // Fields
  const [streetNumber, setStreetNumber] = React.useState('');
  const [streetName, setStreetName] = React.useState('');
  const [ward, setWard] = React.useState('');
  const [district, setDistrict] = React.useState('');

  const [searchStreetName, setSearchStreetName] = React.useState('');

  const [streetNameActive, setStreetNameActive] = React.useState(false);
  const [wardActive, setWardActive] = React.useState(false);
  const [districtActive, setDistrictActive] = React.useState(false);

  // Initial
  const route = useRoute<RouteProp<any>>();
  const navigation = useNavigation<NavigationProp<any>>();
  const email = useSelector((store: any) => store.isLoggedIn.userEmail);

  const onOptionButtonPressed = (type: string) => {
    switch (type) {
      case 'DISTRICT':
        setDistrictActive(true);
        break;
      case 'WARD':
        setWardActive(true);
        break;
      case 'STREETNAME':
        setStreetNameActive(true);
        break;
    }
  };

  const onOptionItemSelected = (data: string, type: string) => {
    switch (type) {
      case 'DISTRICT':
        setDistrict(data);
        setDistrictActive(false);
        setWard('');
        setStreetName('');
        break;
      case 'WARD':
        setWard(data);
        setWardActive(false);
        break;
      case 'STREETNAME':
        setStreetName(data);
        setStreetNameActive(false);
        break;
    }
  };

  const checkFields = () => {
    if (
      streetNumber.length > 0 &&
      streetName.length > 0 &&
      ward.length > 0 &&
      district.length > 0
    ) {
      console.log('No Empty Fields');
      return true;
    }
    console.log('Fields cannot be empty');
    return false;
  };

  const onAddPressed = async () => {
    if (checkFields()) {
      const address = new AddressModel(
        '',
        streetNumber,
        streetName,
        ward,
        district,
        'HCM City',
      );
      await AddNewUserAddress(email, address);
      navigation.goBack();
    }
  };

  const onEditPressed = async () => {
    if (checkFields()) {
      const address = new AddressModel(
        '',
        streetNumber,
        streetName,
        ward,
        district,
        'HCM City',
      );
      await EditUserAddress(email, address);
      navigation.goBack();
    }
  };

  // Get data from route
  React.useEffect(() => {
    if (route.params?.item) {
      const address = route.params.item;
      setStreetNumber(address.streetNumber);
      setStreetName(address.street);
      setWard(address.ward);
      setDistrict(address.district);
    }
  }, []);

  return (
    <View style={{height: '100%'}}>
      <View style={styles.view}>
        <CustomText type="title" marginBottom={8}>
          City
        </CustomText>
        <TextButton
          type="tertiary"
          marginBottom={12}
          backgroundColor={'lightgray'}>
          Ho Chi Minh City
        </TextButton>

        <CustomText type="title" marginBottom={8}>
          District
        </CustomText>
        <TextButton
          type="tertiary"
          marginBottom={12}
          onPressed={() => onOptionButtonPressed('DISTRICT')}>
          {district ? 'District ' + district : 'District'}
        </TextButton>

        <CustomText type="title" marginBottom={8}>
          Ward
        </CustomText>
        <TextButton
          type="tertiary"
          marginBottom={12}
          onPressed={() => onOptionButtonPressed('WARD')}>
          {ward ? 'Ward ' + ward : 'Ward'}
        </TextButton>

        <CustomText type="title" marginBottom={8}>
          Street
        </CustomText>
        <TextButton
          type="tertiary"
          marginBottom={12}
          onPressed={() => {
            onOptionButtonPressed('STREETNAME');
          }}>
          {streetName ? 'Street ' + streetName : 'Street'}
        </TextButton>

        <CustomInput
          value={streetNumber}
          onChangeText={setStreetNumber}
          marginBottom={40}
          placeholder="Street number"></CustomInput>

        {route.params?.item ? (
          <TextButton type="primary" onPressed={onEditPressed}>Edit Address</TextButton>
        ) : (
          <TextButton type="primary" onPressed={onAddPressed}>
            Add New Address
          </TextButton>
        )}
      </View>
      {/* District Option */}
      {districtActive ? (
        <OptionsPanel
          setActive={setDistrictActive}
          title="District"
          maxHeight={'50%'}>
          {Object.entries(road.districts).map(([key, value]) => (
            <TextButton
              fontSize="subTitle"
              key={key}
              marginBottom={10}
              marginTop={10}
              onPressed={() => onOptionItemSelected(value.name, 'DISTRICT')}>
              {'District ' + value.name}
            </TextButton>
          ))}
        </OptionsPanel>
      ) : (
        <></>
      )}

      {/* Ward Option */}
      {wardActive ? (
        <OptionsPanel
          setActive={setWardActive}
          title="District"
          maxHeight={'50%'}>
          {district == '' ? (
            <CustomText>You need to select a district first</CustomText>
          ) : (
            road.districts
              .filter(data => data.name == district)[0]
              .wards.map(item => (
                <TextButton
                  fontSize="subTitle"
                  key={item.id}
                  marginBottom={10}
                  marginTop={10}
                  onPressed={() => onOptionItemSelected(item.name, 'WARD')}>
                  {'Ward ' + item.name}
                </TextButton>
              ))
          )}
        </OptionsPanel>
      ) : (
        <></>
      )}

      {/* Street Option */}
      {streetNameActive ? (
        <OptionsPanel
          setActive={setStreetNameActive}
          title="District"
          maxHeight={'50%'}>
          {district == '' ? (
            <CustomText>You need to select a district first</CustomText>
          ) : (
            <>
              <CustomInput
                value={searchStreetName}
                onChangeText={setSearchStreetName}
                icon={faSearch}
                marginBottom={12}
                placeholder={'Search'}
              />
              {road.districts
                .filter(data => data.name == district)[0]
                .streets.filter(item => item.name.includes(searchStreetName))
                .map(item => (
                  <TextButton
                    fontSize="subTitle"
                    key={item.id}
                    marginBottom={10}
                    marginTop={10}
                    onPressed={() =>
                      onOptionItemSelected(item.name, 'STREETNAME')
                    }>
                    {'Street ' + item.name}
                  </TextButton>
                ))}
            </>
          )}
        </OptionsPanel>
      ) : (
        <></>
      )}
    </View>
  );
};

export default AddressEdit;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  button: {
    backgroundColor: themes['defaultTheme'].primaryColor,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 7,
  },
});
