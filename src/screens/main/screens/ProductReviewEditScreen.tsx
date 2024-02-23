// React and libs
import React from 'react';

// Components
import {CustomText, CustomView, ItemRow, RatingStars} from '../../../components/atoms';
import {CustomInput} from '../../../components/molecules';
import { TextButton } from '../../../components/molecules/buttons';

const ProductReviewEditScreen = () => {
  const [rating, setRating] = React.useState('');

  const onEditPressed = () => {

  }

  const onAddPresed = () => {
    
  }

  return (
    <CustomView type="fullscreen">
      <CustomView type="body">
        <CustomInput
          placeholder="Reviews"
          multiLine={true}
          marginBottom={20}></CustomInput>

    <CustomText type='title' marginBottom={20}>Rating</CustomText>
        <ItemRow marginBottom={20}>
          <CustomInput value={rating} onChangeText={setRating} hideTitle={true} placeholder="Rating" width={'20%'} />
          <RatingStars onChanged={(amount) => setRating(amount)} totalRating={Number(rating)} size={24} />
        </ItemRow>

        <TextButton type='primary'>Edit</TextButton>
      </CustomView>
    </CustomView>
  );
};

export default ProductReviewEditScreen;
