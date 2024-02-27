// React and libs
import React from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';

// Constants
import {NAVIGATION_MAIN_PRODUCT_REVIEW} from '../../../constants/AppConstants';

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

  // Add review
  const onAddPresed = async () => {
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
      await AddUserReview(
        product!.id,
        userEmail,
        userInfo.image!,
        review,
        isAnonymous,
      );
      navigation.navigate(NAVIGATION_MAIN_PRODUCT_REVIEW);
    }
  };

  // Get data from route and check if user has written a review for this product
  const getData = async () => {
    if (route.params?.data) {
      setProduct(route.params.data.product);

      const res = await checkUserReview(
        route.params.data.product.id,
        userEmail,
      );
      setRating(res ? res.rating.toString() : '0');
      setDescription(res ? res.description : '');
      setIsAdd(res ? true : false);
    }
  };

  // Run at beginning
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <CustomView type="fullscreen">
      <CustomView type="body">
        {/* Review / Description */}
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
          {/* Rating - input */}
          <CustomInput
            value={rating}
            onChangeText={setRating}
            hideTitle={true}
            placeholder="Rating"
            width={'20%'}
          />
          {/* Rating - stars */}
          <RatingStars
            onChanged={amount => setRating(amount)}
            totalRating={Number(rating)}
            size={24}
          />
        </ItemRow>

        {/* Anonymous - hide username and image */}
        <ItemPick
          onPressed={(title, status) => setIsAnonymous(status)}
          status={isAnonymous}
          marginBottom={20}>
          Anonymous review
        </ItemPick>

        {/* Button - Add/Edit review */}
        <TextButton onPressed={onAddPresed} type="primary">
          {isAdd ? 'Add' : 'Edit'}
        </TextButton>
      </CustomView>
    </CustomView>
  );
};

export default ProductReviewEditScreen;
