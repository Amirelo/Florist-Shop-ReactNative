import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as solid from '@fortawesome/free-solid-svg-icons';
import * as regular from '@fortawesome/free-regular-svg-icons';
import themes from '../../themes/themes';

interface Props {
  totalRating: number;
}

const RatingStars = (props: Props) => {
  return (
    <View style={styles.rating}>
      <FontAwesomeIcon
        size={18}
        color={themes['defaultTheme'].warnColor}
        icon={props.totalRating >= 1 ? solid.faStar : regular.faStar}
      />
      <FontAwesomeIcon
        size={18}
        color={themes['defaultTheme'].warnColor}
        icon={props.totalRating >= 2 ? solid.faStar : regular.faStar}
      />
      <FontAwesomeIcon
        size={18}
        color={themes['defaultTheme'].warnColor}
        icon={props.totalRating >= 3 ? solid.faStar : regular.faStar}
      />
      <FontAwesomeIcon
        size={18}
        color={themes['defaultTheme'].warnColor}
        icon={props.totalRating >= 4 ? solid.faStar : regular.faStar}
      />
      <FontAwesomeIcon
        size={18}
        color={themes['defaultTheme'].warnColor}
        icon={props.totalRating == 5 ? solid.faStar : regular.faStar}
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
