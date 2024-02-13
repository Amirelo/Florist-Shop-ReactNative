import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomButton, CustomImage, CustomText} from '../atoms';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';

interface Props {
  source?: string;
  username?: String;
  email?: String;
  marginTop?: number;
  marginBottom?: number;
  onPressed?(): void;
}

const ItemUser = (props: Props) => {
  return (
    <CustomButton
    onPressed={props.onPressed}
      style={[
        styles.view,
        {
          marginTop: props.marginTop,
          marginBottom: props.marginBottom ? props.marginBottom : 12,
        },
      ]}>
      <View style={styles.body}>
        {/* User Image */}
        <CustomImage type="tabImage" marginRight={8} source={props.source!} />
        <View style={{width:'70%'}}>
          {/* Email */}
          <CustomText maxLines={1} type="subTitle" marginBottom={4}>
            {props.email + ''}
          </CustomText>
          {/* Username */}
          <CustomText>{props.username + ''}</CustomText>
        </View>
      </View>
      <FontAwesomeIcon icon={faChevronRight} />
    </CustomButton>
  );
};

export default ItemUser;

const styles = StyleSheet.create({
  view: {
    height: 94,
    borderRadius: 7,
    padding: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    width:'100%'
  },
  icon: {
    marginRight: 18,
  },
});
