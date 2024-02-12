import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {PromocodeModel} from '../../../models';
import {ItemPromocode} from '../../../components/molecules';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';

const PromocodeScreen = () => {
  // Fields
  const [listPromos, setListPromos] = React.useState<Array<PromocodeModel>>()
  
  // Initial
  const route = useRoute<RouteProp<any>>()

  React.useEffect(()=>{
    if (route.params?.user){
      const user = route.params.user
      const promocodes: Array<PromocodeModel> = user.promocodes
      setListPromos(promocodes)
      console.log('User Promocodes:', promocodes)
    }
  },[])


  return (
    <View style={styles.view}>
      <FlatList
        contentContainerStyle={{gap: 16}}
        data={listPromos}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ItemPromocode item={item} />}
      />
    </View>
  );
};

export default PromocodeScreen;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
    paddingTop: 30,
  },
});
