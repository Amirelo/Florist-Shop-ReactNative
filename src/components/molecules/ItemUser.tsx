import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomImage, CustomText} from '../atoms';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';

interface Props {
  source?: string;
  username?: String;
  email?: String;
  marginTop?: number;
  marginBottom?: number;
}

const ItemUser = (props: Props) => {
  return (
    <View
      style={[
        styles.view,
        {
          marginTop: props.marginTop,
          marginBottom: props.marginBottom ? props.marginBottom : 12,
        },
      ]}>
      <View style={styles.body}>
        <CustomImage type="tabImage" marginRight={8} source={props.source!} />
        <View>
          <CustomText type="title" marginBottom={4}>
            {props.username + ''}
          </CustomText>
          <CustomText>{props.email + ''}</CustomText>
        </View>
      </View>
      <FontAwesomeIcon icon={faChevronRight} />
    </View>
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
  },
  icon: {
    marginRight: 18,
  },
});
