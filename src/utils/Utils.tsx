// React and libs
import {Dimensions} from 'react-native';

// Models
import {AddressModel} from '../models';

// User Preferences
import lang from '../language/lang';

// Format price
export const priceFormat = (price: number, langPref: keyof typeof lang) => {
  var result = '';
  if (langPref == 'vn') {
    var formattingPrice = price.toString();
    while (formattingPrice.length > 3) {
      result =
        formattingPrice.substring(
          formattingPrice.length - 3,
          formattingPrice.length,
        ) +
        (result.length > 0 ? '.' : '') +
        result;
      formattingPrice = formattingPrice.slice(0, formattingPrice.length - 3);
      console.log(formattingPrice);
    }
    result = formattingPrice + '.' + result + 'đ';
  } else if (langPref == 'en') {
    result = '$' + (price * 0.000041).toFixed(2);
  }
  return result;
};

// Format date
export const dateFormat = (date: string) => {
  var year = date.slice(0, 4);
  var month = date.slice(4, 6);
  var day = date.slice(6, 8);
  var format = day + '/' + month + '/' + year;
  return format;
};

// Format address
export const addressFormat = (address: AddressModel) => {
  return (
    address.streetNumber +
    ' đường ' +
    address.street +
    ', Q.' +
    address.ward +
    ', P.' +
    address.district +
    ', ' +
    address.city
  );
};

// Format promocode description
export const promoEffectFormat = (effect: string, amount: number) => {
  const discount =
    effect == '%' ? 'get ' + amount + '% off' : 'price decrease by ' + amount;
  return discount;
};

// Device width and height
export const deviceWidth = Dimensions.get('screen').width;
export const deviceHeight = Dimensions.get('screen').height;
