import {useSelector} from 'react-redux';
import lang from '../language/lang';
import {Dimensions} from 'react-native';

var langPref: keyof typeof lang = useSelector(
  (store: any) => store.preference.language,
);

export const langText = (text: keyof (typeof lang)['en']) => {
  var currentLang = lang[langPref];
  return currentLang ? currentLang[text] : lang['en'][text];
};

export const priceFormat = (price: string) => {
  var result;
  langPref == 'vn' ? (result = price + 'đ') : (result = '$' + price);

  return result;
};

export const dateFormat = (date: string) => {
  var year = date.slice(0, 4);
  var month = date.slice(4, 6);
  var day = date.slice(6, 8);
  var format = day + '/' + month + '/' + year;
  return format;
};

export const deviceWidth = Dimensions.get('screen').width;
export const deviceHeight = Dimensions.get('screen').height;
