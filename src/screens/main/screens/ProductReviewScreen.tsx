// React and libs
import React from 'react';
import {FlatList} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';

// Models
import {ProductModel, ReviewModel} from '../../../models';

// Services
import {getProductReviews} from '../MainService';

// Components
import {
  CustomImage,
  CustomText,
  CustomView,
  ItemRow,
  RatingStars,
} from '../../../components/atoms';

// User Preferences
import themes from '../../../themes/themes';

// Utilities
import {dateFormat} from '../../../utils/Utils';
import {ItemReview} from '../../../components/molecules';

const ProductReviewScreen = () => {
  // Initials
  const route = useRoute<RouteProp<any>>();
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );

  // Fields
  const [selectedProduct, setSelectedProduct] = React.useState<
    Array<ProductModel>
  >([]);
  const [listReviews, setListReviews] = React.useState<Array<ReviewModel>>([]);

  const tempList = [
    'https://images.pexels.com/photos/20324592/pexels-photo-20324592/free-photo-of-coffee-beans-in-small-bowl-on-wood-background.jpeg',
    'https://images.pexels.com/photos/20328920/pexels-photo-20328920/free-photo-of-a-kangaroo-is-standing-in-the-grass-near-a-road.jpeg',
    'https://images.pexels.com/photos/20315644/pexels-photo-20315644/free-photo-of-summer-garden-leaf-blur.jpeg',
  ];

  const getData = async () => {
    if (route.params?.data) {
      setSelectedProduct(route.params.data);
      const product: ProductModel = route.params.data;
      const data = await getProductReviews(product.id);
      setListReviews(data);
    }
  };

  // Get data from route
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <CustomView type="fullscreen">
      <CustomView type="body">
        <CustomText>Review screen</CustomText>

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
