import React from 'react';
import {Image, ImageProps, ImageStyle, StyleProp, StyleSheet} from 'react-native';
import themes from '../../themes/themes';

interface Props {
  source: string;
  type?: keyof typeof styles;
  resizeMode?: ImageProps['resizeMode']
  marginTop?: number;
  marginBottom?: number;
  marginRight?: number;
}

const CustomImage = (props: Props) => {
  const selectedStyle = props.type ? props.type : 'default';
  return (
    <Image
      style={
        [
          styles[selectedStyle],
          {
            resizeMode: props.resizeMode ? props.resizeMode : 'cover',
            marginTop: props.marginTop,
            marginBottom: props.marginBottom,
            marginRight:props.marginRight,
          },
        ] as ImageStyle
      }
      source={{uri: props.source}}
    />
  );
};

export default CustomImage;

const styles = StyleSheet.create({
  default: {
    width: 50,
    height: 50,
  },
  icon: {
    width: 24,
    height: 24,
  },
  category: {
    width: 70,
    height: 70,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: themes['defaultTheme'].primaryColor,
  },
  itemBig: {
    width: 311,
    height: 237,
    borderRadius: 7,
  },
  item: {
    width: 144,
    height: 101,
    borderRadius: 14,
  },
  productDetail: {
    width: '100%',
    height: 350,
  },
  tabImage:{
    width:72,
    height:72,
    borderRadius: 7
  },
  cart:{
    width:94,
    height: 76,
    borderRadius: 7,
  },
  profile:{
    width: 100,
    height: 100,
    borderRadius: 7,
    alignSelf:'center'
  },
  itemProductLong:{
    height:'auto',
    width:120,
    borderRadius: 7,
  },
  match_parent:{
    width:'100%',
    height:'100%'
  }
});
