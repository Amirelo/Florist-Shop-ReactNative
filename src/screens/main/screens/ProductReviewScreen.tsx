// React and libs
import React from 'react';
import {FlatList} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';

// Constants
import {NAVIGATION_MAIN_PRODUCT_REVIEW_EDIT} from '../../../constants/AppConstants';

// Models
import {ProductModel, ReviewModel} from '../../../models';

// Services
import {getProductReviews} from '../MainService';

// Components
import {CustomView} from '../../../components/atoms';

// User Preferences
import themes from '../../../themes/themes';

// Utilities
import {ItemReview} from '../../../components/molecules';
import {TextButton} from '../../../components/molecules/buttons';

const ProductReviewScreen = () => {
  // Initials
  const route = useRoute<RouteProp<any>>();
  const navigation = useNavigation<NavigationProp<any>>();

  // Fields
  const [selectedProduct, setSelectedProduct] = React.useState<
    Array<ProductModel>
  >([]);
  const [listReviews, setListReviews] = React.useState<Array<ReviewModel>>([]);

  // Get data from server
  const getData = async () => {
    if (route.params?.data) {
      setSelectedProduct(route.params.data);
      const product: ProductModel = route.params.data;
      const data = await getProductReviews(product.id);
      setListReviews(data);
    }
  };

  // Navigate - ProductReviewEditScreen
  const onWritePresed = () => {
    navigation.navigate(NAVIGATION_MAIN_PRODUCT_REVIEW_EDIT, {
      data: {product: route.params!.data},
    });
  };

  // Get data from route
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <CustomView type="fullscreen">
      <CustomView type="body">
        {/* Button - write review */}
        <TextButton onPressed={onWritePresed} type="primary" marginBottom={20}>
          Write a review
        </TextButton>

        {/* List - reviews */}
        <FlatList
          key={'#'}
          data={listReviews}
          keyExtractor={item => item.id}
          renderItem={({item}) => <ItemReview data={item} />}
        />
      </CustomView>
    </CustomView>
  );
};

export default ProductReviewScreen;
