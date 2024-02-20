// React and libs
import React from 'react';
import {Alert, FlatList} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

// Constants
import {NAVIGATION_MAIN_ADDRESS_EDIT} from '../../../constants/AppConstants';

// Services
import {deleteUserAddress} from '../MainService';

// Models
import {AddressModel} from '../../../models';

// Components
import {CustomText, CustomView} from '../../../components/atoms';
import {ItemAddress} from '../../../components/molecules';
import {TextButton} from '../../../components/molecules/buttons';

// User Preferences
import lang from '../../../language/lang';

// Utilities
import {addressFormat} from '../../../utils/Utils';

const AddressScreen = () => {
  // Initial
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );
  const email = useSelector((store: any) => store.isLoggedIn.userEmail);

  // Fields
  const [listAddresses, setListAddresses] = React.useState<Array<AddressModel>>(
    [],
  );

  // Navigate - AddressEditScreen
  // Data: address detail
  const onEditPressed = (item: AddressModel) => {
    navigation.navigate(NAVIGATION_MAIN_ADDRESS_EDIT, {item: item});
  };

  // Delete cart in Firestore
  const onDeletePressed = (item: AddressModel) => {
    Alert.alert(
      'Delete address: ' + addressFormat(item),
      'Are you sure you want to delete? This action cannot be redo',
      [
        {text: 'Delete', onPress: () => deleteUserAddress(email, item.id + '')},
        {text: 'Cancel', onPress: () => console.log('Pressed')},
      ],
    );
  };

  // Navigate - AddressEditScreen
  const onAddNewPressed = () => {
    navigation.navigate(NAVIGATION_MAIN_ADDRESS_EDIT);
  };

  // Get address list from ProfileScreen
  React.useEffect(() => {
    if (route.params?.data) {
      setListAddresses(route.params.data);
      console.log(route.params?.data);
    }
  }, []);

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
        {/* Button - Add New */}

        {listAddresses.length > 0 ? (
          <>
            {/* Button - Add New Address */}
            <TextButton
              type="primary"
              onPressed={onAddNewPressed}
              marginBottom={20}>
              {lang[langPref].buttonNewAddress}
            </TextButton>

            {/* List - User Address */}
            <FlatList
              key={'#'}
              data={listAddresses}
              //horizontal={true}
              contentContainerStyle={{gap: 16}}
              keyExtractor={item => item.id!}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <ItemAddress
                  item={item}
                  onEditPressed={() => onEditPressed(item)}
                  onDeletePressed={() => onDeletePressed(item)}
                />
              )}
            />
          </>
        ) : (
          <>
            <CustomText type="title" alignSelf="center" marginBottom={20}>
              {lang[langPref].text_address_empty}
            </CustomText>
            {/* Button - Add New Address */}
            <TextButton type="primary" onPressed={onAddNewPressed}>
              {lang[langPref].buttonNewAddress}
            </TextButton>
          </>
        )}
      </CustomView>
    </CustomView>
  );
};

export default AddressScreen;
