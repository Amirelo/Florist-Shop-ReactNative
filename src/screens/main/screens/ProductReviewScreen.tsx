// React and libs
import React from 'react';
import {FlatList} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';

// Models
import { ProductModel } from '../../../models';

// Services
import { getProductReviews } from '../MainService';

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

const ProductReviewScreen = () => {
  // Initials
  const route = useRoute<RouteProp<any>>();
  const currentTheme: keyof typeof themes = useSelector(
    (store: any) => store.preference.theme,
  );

  // Fields
  const [selectedProduct, setSelectedProduct] = React.useState<Array<ProductModel>>([]);
  const [listComments, setListComments] = React.useState<Array<ReviewModel>>([]);

  const tempList = [
    'https://images.pexels.com/photos/20324592/pexels-photo-20324592/free-photo-of-coffee-beans-in-small-bowl-on-wood-background.jpeg',
    'https://images.pexels.com/photos/20328920/pexels-photo-20328920/free-photo-of-a-kangaroo-is-standing-in-the-grass-near-a-road.jpeg',
    'https://images.pexels.com/photos/20315644/pexels-photo-20315644/free-photo-of-summer-garden-leaf-blur.jpeg',
  ];


  const getData = async() => {
    if (route.params?.data) {
      setSelectedProduct(route.params.data)
      const product: ProductModel = route.params.data
      const data = await getProductReviews(product.id)
      setListComments(data)

    }
  }

  // Get data from route
  React.useEffect(()=>{ 
    getData()
  },[])

  return (
    <CustomView type="fullscreen">
      <CustomView type="body">
        <CustomText>Review screen</CustomText>

        <CustomView
          style={{marginHorizontal: 20, marginTop: 20}}
          type="itemPadding"
          borderColor={themes[currentTheme].textSecondaryColor}>
          <CustomImage
            style={{position: 'absolute', top: -20, left: -20}}
            type="review_icon"
            source="https://images.pexels.com/photos/19673995/pexels-photo-19673995/free-photo-of-brunette-woman-in-shadow-in-forest.jpeg"
          />
          <CustomView
            style={{paddingLeft: '10%'}}
            backgroundColor={'#ffffff00'}>
            <ItemRow marginBottom={4}>
              <CustomText>Name</CustomText>
              <CustomText>{dateFormat('20240202')}</CustomText>
            </ItemRow>
            <RatingStars totalRating={3} />
            <CustomText>Description</CustomText>
            <FlatList
              data={tempList}
              horizontal={true}
              contentContainerStyle={{gap: 8}}
              key={'#'}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <CustomImage type={'tabImage'} source={item} />
              )}
            />
          </CustomView>
        </CustomView>
      </CustomView>
    </CustomView>
  );
};

export default ProductReviewScreen;
