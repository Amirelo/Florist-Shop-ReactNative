// React and libs
import React from 'react';
import {NavigationProp, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';

// Models
import {ProductModel, ReviewModel, UserModel} from '../../../models';

// Services
import {AddUserReview, checkUserReview} from '../MainService';

// Components
import {
  CustomText,
  CustomView,
  ItemRow,
  RatingStars,
} from '../../../components/atoms';
import {CustomInput, ItemPick} from '../../../components/molecules';
import {TextButton} from '../../../components/molecules/buttons';
import { NAVIGATION_MAIN_PRODUCT_REVIEW } from '../../../constants/AppConstants';

const ProductReviewEditScreen = () => {
  // Initials
  const route = useRoute<RouteProp<any>>();
  const navigation = useNavigation<NavigationProp<any>>();
  const userEmail = useSelector((store: any) => store.isLoggedIn.userEmail);
  const userInfo: UserModel = useSelector(
    (store: any) => store.isLoggedIn.userInfo,
  );

  // Fields
  const [rating, setRating] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [images, setImages] = React.useState<Array<string>>([]);
  const [isAnonymous, setIsAnonymous] = React.useState(false);
  const [product, setProduct] = React.useState<ProductModel>();
  const [isAdd, setIsAdd] = React.useState(false);

  const onAddPresed = async() => {
    if (rating != null && description != null) {
      const review = new ReviewModel(
        '',
        userInfo.username!,
        userInfo.image!,
        Number(rating),
        '',
        description,
        images,
      );

      await AddUserReview(product!.id, userEmail, userInfo.image!, review)
      navigation.navigate(NAVIGATION_MAIN_PRODUCT_REVIEW)
    }
  };

  const getData = async () => {
    if (route.params?.data) {
      setProduct(route.params.data.product);

      const res = await checkUserReview(
        route.params.data.product.id,
        userEmail,
      );
      setRating( res ? res.rating.toString() : '0')
      setDescription(res ? res.description : '')
      setIsAdd(res ? true : false);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <CustomView type="fullscreen">
      <CustomView type="body">
        <CustomInput
          placeholder="Reviews"
          multiLine={true}
          value={description}
          onChangeText={setDescription}
          marginBottom={20}></CustomInput>

        <CustomText type="title" marginBottom={20}>
          Rating
        </CustomText>
        <ItemRow marginBottom={20}>
          <CustomInput
            value={rating}
            onChangeText={setRating}
            hideTitle={true}
            placeholder="Rating"
            width={'20%'}
          />
          <RatingStars
            onChanged={amount => setRating(amount)}
            totalRating={Number(rating)}
            size={24}
          />
        </ItemRow>

        <ItemPick
          onPressed={(title, status) => setIsAnonymous(status)}
          status={isAnonymous}
          marginBottom={20}>
          Anonymous review
        </ItemPick>

        {isAdd ? (
          <TextButton onPressed={onAddPresed} type="primary">
            Edit
          </TextButton>
        ) : (
          <TextButton onPressed={onAddPresed} type="primary">
            Add
          </TextButton>
        )}
      </CustomView>
    </CustomView>
  );
};

export default ProductReviewEditScreen;
