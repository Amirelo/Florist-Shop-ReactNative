// React and libs
import React from 'react';
import {FlatList} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';

// Models
import {PromocodeModel} from '../../../models';

// Components
import {CustomText, CustomView} from '../../../components/atoms';
import {ItemPromocode} from '../../../components/molecules';

// User Preferences
import lang from '../../../language/lang';

const PromocodeScreen = () => {
  // Fields
  const [listPromos, setListPromos] = React.useState<Array<PromocodeModel>>();

  // Initial
  const route = useRoute<RouteProp<any>>();
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  // Get promocodes from params and sort by endDate
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
        {/* List - promocodes */}
        {listPromos && listPromos.length > 0 ? (
          <FlatList
            contentContainerStyle={{gap: 16}}
            data={listPromos}
            keyExtractor={item => item.id}
            renderItem={({item}) => <ItemPromocode item={item} />}
          />
        ) : (
          // Show empty if no promocodes found
          <>
            <CustomText type="title" alignSelf="center" marginBottom={20}>
              {lang[langPref].text_promos_none}
            </CustomText>
          </>
        )}
      </CustomView>
    </CustomView>
  );
};

export default PromocodeScreen;
