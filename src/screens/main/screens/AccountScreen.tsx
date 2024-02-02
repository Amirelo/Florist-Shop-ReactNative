import {StyleSheet, View} from 'react-native';
import {ItemAccount, ItemUser} from '../../../components/molecules';
import themes from '../../../themes/themes';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {logout} from '../../../redux/actions/LoginAction';
import {googleLogout} from '../../auth/AuthService';
import {langText} from '../../../utils/Utils';

const AccountScreen = () => {
  // Navigation and dispatch
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();

  // Logout on pressed
  const onLogoutPressed = async () => {
    (await googleLogout())
      ? dispatch(logout())
      : console.log('Something wrong');
  };

  // Navigate to profile screen when UserTab pressed
  const onUserTabPressed = () => {
    navigation.navigate('Profile');
  };

  // Navigate to order screen
  const onTabPressed = (name: string) => {
    navigation.navigate(name);
  };

  return (
    <View style={styles.body}>
      <ItemUser
        username={'Miron'}
        email={'miron@gmail.com'}
        source="https://images.pexels.com/photos/19899425/pexels-photo-19899425/free-photo-of-mt-machhapuchree.jpeg"
        marginTop={40}
        marginBottom={12}
        onPressed={onUserTabPressed}
      />
      <ItemAccount
        onPressed={() => onTabPressed('Order')}
        description={langText('text_tab_order_description')}>
        {langText('text_tab_order_title')}
      </ItemAccount>
      <ItemAccount
        onPressed={() => onTabPressed('Address')}
        description={langText('text_tab_address_description')}>
        {langText('text_tab_address_title')}
      </ItemAccount>
      <ItemAccount
        onPressed={() => onTabPressed('Promo')}
        description={langText('text_tab_promocodes_description')}>
        {langText('text_tab_promocodes_title')}
      </ItemAccount>
      <ItemAccount
        onPressed={() => onTabPressed('About')}
        description={langText('text_tab_about_description')}>
        {langText('text_tab_about_title')}
      </ItemAccount>
      <ItemAccount
        color={themes['defaultTheme'].errorcolor}
        description={langText('text_tab_changePass_description')}>
        {langText('text_tab_changePass_title')}
      </ItemAccount>
      <ItemAccount
        onPressed={onLogoutPressed}
        color={themes['defaultTheme'].errorcolor}
        description={langText('text_tab_logout_description')}>
        {langText('text_tab_logout_title')}
      </ItemAccount>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
  },
});
