import {StyleSheet, View} from 'react-native';
import {ItemAccount, ItemUser} from '../../../components/molecules';
import themes from '../../../themes/themes';

const AccountScreen = () => {
  return (
    <View style={styles.body}>
      <ItemUser
        username={'Miron'}
        email={'miron@gmail.com'}
        source="https://images.pexels.com/photos/19899425/pexels-photo-19899425/free-photo-of-mt-machhapuchree.jpeg"
        marginTop={40}
        marginBottom={12}
      />
      <ItemAccount>Order</ItemAccount>
      <ItemAccount>Shipping Address</ItemAccount>
      <ItemAccount>Promocodes</ItemAccount>
      <ItemAccount color={themes['defaultTheme'].errorcolor}>Change Password</ItemAccount>
      <ItemAccount color={themes['defaultTheme'].errorcolor}>Logout</ItemAccount>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
  },
});
