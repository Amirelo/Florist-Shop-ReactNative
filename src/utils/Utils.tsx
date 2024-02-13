import {useSelector} from 'react-redux';
import lang from '../language/lang';
import {Dimensions} from 'react-native';
import {AddressModel} from '../models';

export const priceFormat = (price: number, langPref: keyof typeof lang) => {
  var result;
  langPref == 'vn'
    ? (result = price.toFixed(2) + 'đ')
    : (result = '$' + (price * 0.000041).toFixed(2));
  console.log('Price Format Result:', result);
  return result;
};

export const dateFormat = (date: string) => {
  var year = date.slice(0, 4);
  var month = date.slice(4, 6);
  var day = date.slice(6, 8);
  var format = day + '/' + month + '/' + year;
  return format;
};

export const addressFormat = (address: AddressModel) => {
  return (
    address.streetNumber +
    ' ' +
    address.street +
    ', ' +
    address.ward +
    ', ' +
    address.district +
    ', ' +
    address.city
  );
};

export const deviceWidth = Dimensions.get('screen').width;
export const deviceHeight = Dimensions.get('screen').height;
