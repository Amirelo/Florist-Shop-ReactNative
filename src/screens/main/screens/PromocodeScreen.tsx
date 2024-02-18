import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {PromocodeModel} from '../../../models';
import {ItemPromocode} from '../../../components/molecules';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {CustomText, CustomView} from '../../../components/atoms';

const PromocodeScreen = () => {
  // Fields
  const [listPromos, setListPromos] = React.useState<Array<PromocodeModel>>();

  // Initial
  const route = useRoute<RouteProp<any>>();

  React.useEffect(() => {
    if (route.params?.data) {
      const promocodes: Array<PromocodeModel> = route.params.data;
      var sortedList =
        promocodes.length > 0
          ? promocodes.sort((a: PromocodeModel, b: PromocodeModel) =>
              a.endDate.localeCompare(b.endDate),
            )
          : promocodes;
      setListPromos(sortedList);
      console.log('User Promocodes:', promocodes);
    }
  }, []);

  return (
    <CustomView type="fullscreen">
      <CustomView type="body">
        {listPromos && listPromos.length > 0 ? (
          <FlatList
            contentContainerStyle={{gap: 16}}
            data={listPromos}
            keyExtractor={item => item.id}
            renderItem={({item}) => <ItemPromocode item={item} />}
          />
        ) : (
          <>
          <CustomText type="title" alignSelf="center" marginBottom={20}>
            No Available Promocodes
          </CustomText>
        </>
        )}
      </CustomView>
    </CustomView>
  );
};

export default PromocodeScreen;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
    paddingTop: 30,
  },
});
