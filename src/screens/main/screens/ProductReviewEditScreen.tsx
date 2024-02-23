// React and libs
import React from 'react';

// Components
import {CustomText, CustomView, ItemRow, RatingStars} from '../../../components/atoms';
import {CustomInput} from '../../../components/molecules';

const ProductReviewEditScreen = () => {
  const [rating, setRating] = React.useState('');
  return (
    <CustomView type="fullscreen">
      <CustomView type="body">
        <CustomInput
          placeholder="Reviews"
          multiLine={true}
          marginBottom={20}></CustomInput>

    <CustomText type='title' marginBottom={20}>Rating</CustomText>
        <ItemRow>
          <CustomInput value={rating} onChangeText={setRating} hideTitle={true} placeholder="Rating" width={'20%'} />
          <RatingStars onChanged={(amount) => setRating(amount)} totalRating={Number(rating)} size={24} />
        </ItemRow>
      </CustomView>
    </CustomView>
  );
};

export default ProductReviewEditScreen;
