// React and libs
import React from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

// Models
import {AddressModel} from '../../../models';

// Services
import {AddNewUserAddress, EditUserAddress} from '../MainService';

// Components
import {CustomText, CustomView} from '../../../components/atoms';
import {CustomInput, OptionsPanel} from '../../../components/molecules';
import {TextButton} from '../../../components/molecules/buttons';

// User Preferences
import lang from '../../../language/lang';
import themes from '../../../themes/themes';

// Road data
import * as road from '../../../data/roads.json';
import { addMessage } from '../../../redux/actions/PreferenceAction';
import { MSG_ADDRESS_NEW, MSG_ADDRESS_UPDATE, MSG_FIELDS_EMPTY } from '../../../constants/AppConstants';

const AddressEdit = () => {
  // NOTE: there will be delay when opening street option panel due to the amount of data

  // Initial
  const route = useRoute<RouteProp<any>>();
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<any>>();
  const email = useSelector((store: any) => store.isLoggedIn.userEmail);
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );

  // Fields - data
  const [streetNumber, setStreetNumber] = React.useState('');
  const [streetName, setStreetName] = React.useState('');
  const [ward, setWard] = React.useState('');
  const [district, setDistrict] = React.useState('');

  // Field - Search string
  const [searchStreetName, setSearchStreetName] = React.useState('');

  // Field - Option Panel status
  const [streetNameActive, setStreetNameActive] = React.useState(false);
  const [wardActive, setWardActive] = React.useState(false);
  const [districtActive, setDistrictActive] = React.useState(false);

  // Activate Option Panel based on type
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

  // Set data based on type
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

  // Check if empty
  const checkFields = () => {
    if (
      streetNumber.length > 0 &&
      streetName.length > 0 &&
      ward.length > 0 &&
      district.length > 0
    ) {
      
      return true;
    }
    dispatch(addMessage(MSG_FIELDS_EMPTY))
    console.log('Fields cannot be empty');
    return false;
  };

  // Add address to Firestore
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
      dispatch(addMessage(MSG_ADDRESS_NEW))
      await AddNewUserAddress(email, address);
      navigation.goBack();
    }
  };

  // Edit Address on Firestore
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
      dispatch(addMessage(MSG_ADDRESS_UPDATE))
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
    <CustomView type="fullscreen">
      <CustomView type="itemPadding">
        {/* City */}
        <CustomText type="title" marginBottom={8}>
          {lang[langPref].text_city}
        </CustomText>
        <TextButton
          type="tertiary"
          marginBottom={12}
          backgroundColor={themes[currentTheme].textSecondaryColor}>
          Ho Chi Minh City
        </TextButton>

        {/* District */}
        <CustomText type="title" marginBottom={8}>
          {lang[langPref].text_district}
        </CustomText>
        <TextButton
          type="tertiary"
          marginBottom={12}
          onPressed={() => onOptionButtonPressed('DISTRICT')}>
          {district}
        </TextButton>

        {/* Ward */}
        <CustomText type="title" marginBottom={8}>
          {lang[langPref].text_ward}
        </CustomText>
        <TextButton
          type="tertiary"
          marginBottom={12}
          onPressed={() => onOptionButtonPressed('WARD')}>
          {ward}
        </TextButton>

        {/* Street Name */}
        <CustomText type="title" marginBottom={8}>
          {lang[langPref].text_street}
        </CustomText>
        <TextButton
          type="tertiary"
          marginBottom={12}
          onPressed={() => {
            onOptionButtonPressed('STREETNAME');
          }}>
          {streetName}
        </TextButton>

        {/* Street Number */}
        <CustomInput
          value={streetNumber}
          onChangeText={setStreetNumber}
          marginBottom={40}
          placeholder={lang[langPref].text_street_number}></CustomInput>

        {/* Display Edit Button if User pass data through navigation */}
        {route.params?.item ? (
          <TextButton type="primary" onPressed={onEditPressed}>
            {lang[langPref].buttonEditAddress}
          </TextButton>
        ) : (
          <TextButton type="primary" onPressed={onAddPressed}>
            {lang[langPref].buttonNewAddress}
          </TextButton>
        )}
      </CustomView>

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
    </CustomView>
  );
};

export default AddressEdit;
