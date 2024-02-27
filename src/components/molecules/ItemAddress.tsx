// React and libs
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

// Models
import {AddressModel} from '../../models';

// Components
import {CustomText, CustomView, Divider, ItemRow} from '../atoms';
import {TextButton} from './buttons';

// User Preferences
import themes from '../../themes/themes';
import lang from '../../language/lang';

// Utilities
import {addressFormat} from '../../utils/Utils';

interface Props {
  item: AddressModel;
  onEditPressed?(): void;
  onDeletePressed?(): void;
}

const ItemAddress = (props: Props) => {
  // Get selected theme and language
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );
  return (
    <CustomView
      type={'itemPadding'}
      backgroundColor={themes[currentTheme].tertiaryColor}>
      <CustomText type={'subTitle'} marginBottom={12} fontWeight="bold">
        {addressFormat(props.item)}
      </CustomText>
      <Divider marginBottom={8} />

      <ItemRow marginBottom={8}>
        <CustomText type="subTitle">
          {lang[langPref].text_street_number}
        </CustomText>
        <CustomText>{props.item.streetNumber + ''}</CustomText>
      </ItemRow>
      <Divider marginBottom={8} />
      <ItemRow marginBottom={8}>
        <CustomText type="subTitle">{lang[langPref].text_street}</CustomText>
        <CustomText>{props.item.street + ''}</CustomText>
      </ItemRow>
      <Divider marginBottom={8} />
      <ItemRow marginBottom={8}>
        <CustomText type="subTitle">{lang[langPref].text_ward}</CustomText>
        <CustomText>{props.item.ward + ''}</CustomText>
      </ItemRow>
      <Divider marginBottom={8} />
      <ItemRow marginBottom={12}>
        <CustomText type="subTitle">{lang[langPref].text_city}</CustomText>
        <CustomText>{props.item.city + ''}</CustomText>
      </ItemRow>
      <ItemRow>
        <TextButton
          alignSelf="flex-start"
          type="primary"
          backgroundColor={themes[currentTheme].errorcolor}
          onPressed={props.onDeletePressed}>
          {lang[langPref].buttonDelete}
        </TextButton>
        <TextButton
          alignSelf="flex-end"
          type="primary"
          onPressed={props.onEditPressed}>
          {lang[langPref].buttonEdit}
        </TextButton>
      </ItemRow>
    </CustomView>
  );
};

export default ItemAddress;

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 7,
  },
  button: {
    alignSelf: 'flex-end',
    backgroundColor: themes['defaultTheme'].primaryColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 7,
  },
});
