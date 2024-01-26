import {ScrollView, StyleSheet, View} from 'react-native';
import {CustomButton, CustomText, ItemRow} from '../../../components/atoms';
import {ItemProduct} from '../../../components/molecules';
import themes from '../../../themes/themes';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faColumns} from '@fortawesome/free-solid-svg-icons';

const OrderDetailScreen = () => {
  return (
    <ScrollView>
      <View style={styles.view}>
        <ItemRow>
          <CustomText marginBottom={20} type="title">
            General Info
          </CustomText>
          <FontAwesomeIcon size={24} icon={faColumns} />
        </ItemRow>
        <ItemRow marginBottom={8}>
          <CustomText>Order ID</CustomText>
          <CustomText>1</CustomText>
        </ItemRow>
        <ItemRow marginBottom={8}>
          <CustomText>Order date</CustomText>
          <CustomText>22/1/2024</CustomText>
        </ItemRow>
        <ItemRow marginBottom={30}>
          <CustomText>Status</CustomText>
          <CustomText>Completed</CustomText>
        </ItemRow>

        <ItemRow>
          <CustomText marginBottom={20} type="title">
            Products
          </CustomText>
          <FontAwesomeIcon size={24} icon={faColumns} />
        </ItemRow>

        <ItemRow marginBottom={30}>
          <CustomText>Total Price</CustomText>
          <CustomText>$290</CustomText>
        </ItemRow>

        <CustomButton style={styles.button}>
          <CustomText type="subTitle" color={'white'}>
            Cancel Order
          </CustomText>
        </CustomButton>

        <CustomButton style={[styles.button, styles.review]}>
          <CustomText type="subTitle" color={'white'}>
            Write a review
          </CustomText>
        </CustomButton>
      </View>
    </ScrollView>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  button: {
    paddingVertical: 12,
    width: '60%',
    borderRadius: 7,
    backgroundColor: themes['defaultTheme'].errorcolor,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  review: {
    backgroundColor: themes['defaultTheme'].warnColor,
  },
});
