import {Alert, FlatList, StyleSheet, View} from 'react-native';
import {ItemAddress} from '../../../components/molecules';
import {AddressModel} from '../../../models';
import firestore from '@react-native-firebase/firestore';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import {CustomText} from '../../../components/atoms';
import TextButton from '../../../components/molecules/buttons/TextButton';
import {useSelector} from 'react-redux';
import {deleteUserAddress} from '../MainService';
import { addressFormat } from '../../../utils/Utils';

const AddressScreen = () => {
  // Navigation
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();

  // Fields
  const [listAddresses, setListAddresses] = React.useState<Array<AddressModel>>(
    [],
  );

  const email = useSelector((store: any) => store.isLoggedIn.userEmail);

  // Navigate to Address Edit Screen with address detail
  const onEditPressed = (item: AddressModel) => {
    navigation.navigate('AddressEdit', {item: item});
  };

  const onDeletePressed = (item: AddressModel) => {
    Alert.alert(
      'Delete address: '+addressFormat(item),
      'Are you sure you want to delete? This action cannot be redo',
      [{text: 'Delete', onPress: () => deleteUserAddress(email, item.id+'')},{text: 'Cancel', onPress: () => console.log('Pressed')}],
    );
  };

  const onAddNewPressed = () => {
    navigation.navigate('AddressEdit');
  };

  React.useEffect(() => {
    if (route.params?.data) {
      setListAddresses(route.params.data);
      console.log(route.params?.data);
    }
  }, []);

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
    <View style={styles.view}>
      <TextButton type="primary" onPressed={onAddNewPressed}>
        Add New Address
      </TextButton>
      {listAddresses.length > 0 ? (
        <FlatList
          data={listAddresses}
          style={{paddingTop: 30, marginTop: 20}}
          contentContainerStyle={{gap: 16}}
          keyExtractor={item => item.id!.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <ItemAddress
              item={item}
              onEditPressed={() => onEditPressed(item)}
              onDeletePressed={() => onDeletePressed(item)}
            />
          )}
        />
      ) : (
        <>
          <CustomText type="title" alignSelf="center" marginBottom={20}>
            No Address
          </CustomText>
          <TextButton type="primary" onPressed={onAddNewPressed}>
            Add New Address
          </TextButton>
        </>
      )}
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
    paddingTop: 20,
    flex:1
  },
});
