// React and libs
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';

// Components
import {
  CustomImage,
  CustomText,
  CustomView,
  ItemRow,
  RatingStars,
} from '../atoms';

// User Preferences
import themes from '../../themes/themes';

// Utilities
import {dateFormat} from '../../utils/Utils';
import { ReviewModel } from '../../models';

interface Props{
  data: ReviewModel
}

const ItemReview = (props:Props) => {
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );
  return (
    <CustomView
      style={{marginHorizontal: 20, marginTop: 20}}
      type="itemPadding"
      borderColor={themes[currentTheme].textSecondaryColor}>
      <CustomImage
        style={{position: 'absolute', top: -20, left: -20}}
        type="review_icon"
        source={
          props.data.userImage
            ? props.data.userImage
            : 'https://images.pexels.com/photos/19673995/pexels-photo-19673995/free-photo-of-brunette-woman-in-shadow-in-forest.jpeg'
        }
      />
      <CustomView style={{paddingLeft: '10%'}} backgroundColor={'#ffffff00'}>
        <ItemRow marginBottom={4}>
          <CustomText>{props.data.name}</CustomText>
          <CustomText>{dateFormat(props.data.date)}</CustomText>
        </ItemRow>
        <RatingStars totalRating={props.data.rating} />
        <CustomText type='subTitle'>{props.data.rating.toString()}</CustomText>
        <CustomText>{props.data.description}</CustomText>
        {props.data.images.length >0?
        <FlatList
          data={props.data.images}
          horizontal={true}
          contentContainerStyle={{gap: 8}}
          key={'#'}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <CustomImage type={'tabImage'} source={item} />
          )}
        />
        :<></>}
      </CustomView>
    </CustomView>
  );
};

export default ItemReview;
