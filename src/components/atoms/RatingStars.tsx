// React and libs
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as solid from '@fortawesome/free-solid-svg-icons';
import * as regular from '@fortawesome/free-regular-svg-icons';

// Components
import {CustomButton} from '.';

// User Preferences
import themes from '../../themes/themes';

interface Props {
  totalRating: number;
  size?: number;
  onChanged?(amount: string): void;
}

const RatingStars = (props: Props) => {
  // Get seleceted theme
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );
  return (
    <View style={styles.rating}>
      {/* Star - 1 */}
      <CustomButton
        onPressed={() => (props.onChanged ? props.onChanged('1') : '')}>
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

      {/* Star - 2 */}
      <CustomButton
        onPressed={() => (props.onChanged ? props.onChanged('2') : '')}>
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
      </CustomButton>

      {/* Star - 3 */}
      <CustomButton
        onPressed={() => (props.onChanged ? props.onChanged('3') : '')}>
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
      </CustomButton>

      {/* Star - 4 */}
      <CustomButton
        onPressed={() => (props.onChanged ? props.onChanged('4') : '')}>
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
      </CustomButton>

      {/* Star -5 */}
      <CustomButton
        onPressed={() => (props.onChanged ? props.onChanged('5') : '')}>
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
      </CustomButton>
    </View>
  );
};

export default RatingStars;

const styles = StyleSheet.create({
  rating: {
    flexDirection: 'row',
  },
});
