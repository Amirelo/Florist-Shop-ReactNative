import {FlatList, StyleSheet, View} from 'react-native';
import {ItemAddress} from '../../../components/molecules';
import {AddressModel} from '../../../models';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';

const AddressScreen = () => {
  // Navigation
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();

  // Fields
  const [listAddresses, setListAddresses] = React.useState<Array<AddressModel>>(
    [],
  );

  // Navigate to Address Edit Screen with address detail
  const onEditPressed = (item: AddressModel) => {
    navigation.navigate('AddressEdit', {item: item});
  };

  React.useEffect(() => {
    if (route.params?.data) {
      setListAddresses(route.params.data);
    }
  }, []);

  return (
    <View style={styles.view}>
      <FlatList
        data={listAddresses}
        style={{marginTop: 30}}
        contentContainerStyle={{gap: 16}}
        keyExtractor={item => item.id!.toString()}
        renderItem={({item}) => (
          <ItemAddress onPressed={() => onEditPressed(item)} item={item} />
        )}
      />
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
  },
});
