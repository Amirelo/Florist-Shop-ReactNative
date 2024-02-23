import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as solid from '@fortawesome/free-solid-svg-icons';
import * as regular from '@fortawesome/free-regular-svg-icons';
import themes from '../../themes/themes';
import {CustomButton} from '.';
import { useSelector } from 'react-redux';

interface Props {
  totalRating: number;
  size?: number;
  onChanged?(amount: string): void;
}

const RatingStars = (props: Props) => {
  const currentTheme:keyof typeof themes = useSelector((store:any) => store.preference.theme)
  return (
    <View style={styles.rating}>
      <CustomButton
        onPressed={() => (props.onChanged ? props.onChanged('0.5') : '')}>
        <FontAwesomeIcon
          size={props.size ? props.size : 18}
          color={themes[currentTheme].warnColor}
          icon={
            props.totalRating >= 1
              ? solid.faStar
              : props.totalRating >= 0.5
              ? solid.faStarHalfAlt
              : regular.faStar
          }
        />
      </CustomButton>
      <FontAwesomeIcon
        size={props.size ? props.size : 18}
        color={themes[currentTheme].warnColor}
        icon={
          props.totalRating >= 2
            ? solid.faStar
            : props.totalRating >= 1.5
            ? solid.faStarHalfAlt
            : regular.faStar
        }
      />
      <FontAwesomeIcon
        size={props.size ? props.size : 18}
        color={themes[currentTheme].warnColor}
        icon={
          props.totalRating >= 3
            ? solid.faStar
            : props.totalRating >= 2.5
            ? solid.faStarHalfAlt
            : regular.faStar
        }
      />
      <FontAwesomeIcon
        size={props.size ? props.size : 18}
        color={themes[currentTheme].warnColor}
        icon={
          props.totalRating >= 4
            ? solid.faStar
            : props.totalRating >= 3.5
            ? solid.faStarHalfAlt
            : regular.faStar
        }
      />
      <FontAwesomeIcon
        size={props.size ? props.size : 18}
        color={themes[currentTheme].warnColor}
        icon={
          props.totalRating == 5
            ? solid.faStar
            : props.totalRating >= 4.5
            ? solid.faStarHalfAlt
            : regular.faStar
        }
      />
    </View>
  );
};

export default RatingStars;

const styles = StyleSheet.create({
  rating: {
    flexDirection: 'row',
  },
});
