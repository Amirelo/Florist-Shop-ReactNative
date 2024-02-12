import {ScrollView, StyleSheet, View} from 'react-native';
import {ItemAccount, ItemUser} from '../../../components/molecules';
import themes from '../../../themes/themes';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../redux/actions/LoginAction';
import {getUserInfo, googleLogout} from '../../auth/AuthService';
import lang from '../../../language/lang';
import React from 'react';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {OrderModel, UserModel} from '../../../models';
import { getUserOrders } from '../MainService';

const AccountScreen = () => {
  // Navigation and dispatch
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();
  const [user, setUser] = React.useState<
    FirebaseFirestoreTypes.DocumentData | undefined
  >({});
  const [userOrders, setUserOrders] = React.useState<Array<OrderModel>>([])

  // Saved language
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );
  // User email
  const userEmail = useSelector((store: any) => store.isLoggedIn.userEmail);
  const userInfo: UserModel = useSelector(
    (store: any) => store.isLoggedIn.userInfo,
  );

  // Get User Info
  const getInfo = async () => {
    const info: FirebaseFirestoreTypes.DocumentData | undefined =
      await getUserInfo(userEmail);
    setUser(info);
    console.log('User:', info);

    const orders = await getUserOrders(userEmail);
    console.log('User orders:',orders)
    setUserOrders(orders)
  };

  // Logout on pressed
  const onLogoutPressed = async () => {
    (await googleLogout())
      ? dispatch(logout())
      : console.log('Something wrong');
  };

  // Navigate to profile screen when UserTab pressed
  const onUserTabPressed = () => {
    navigation.navigate('Profile', {email: userEmail, user: user});
  };

  const onOrderTabPressed = () => {
    navigation.navigate('Order', {userOrders: userOrders});
  }

  // Navigate to order screen
  const onTabPressed = (name: string) => {
    navigation.navigate(name, {user: user});
  };

  React.useEffect(() => {
    console.log('User Email:', userEmail);
    console.log('User Info', userInfo);
    getInfo();
  }, []);

  return (
    <ScrollView>
      <View style={styles.body}>
        <ItemUser
          username={user!.username}
          email={userEmail}
          source={user!.image}
          marginTop={40}
          marginBottom={12}
          onPressed={onUserTabPressed}
        />
        <ItemAccount
          onPressed={() => onOrderTabPressed()}
          amount={userOrders!.length}
          description={lang[langPref]['text_tab_order_description']}>
          {lang[langPref]['text_tab_order_title']}
        </ItemAccount>
        <ItemAccount
          onPressed={() => onTabPressed('Address')}
          amount={userInfo.addresses!.length}
          description={lang[langPref]['text_tab_address_description']}>
          {lang[langPref]['text_tab_address_title']}
        </ItemAccount>
        <ItemAccount
          onPressed={() => onTabPressed('Promo')}
          amount={userInfo.promocodes!.length}
          description={lang[langPref]['text_tab_promocodes_description']}>
          {lang[langPref]['text_tab_promocodes_title']}
        </ItemAccount>

        <ItemAccount
          onPressed={() => onTabPressed('Settings')}
          description={lang[langPref]['text_tab_setting_description']}>
          {lang[langPref]['text_tab_setting_title']}
        </ItemAccount>
        <ItemAccount
          onPressed={() => onTabPressed('About')}
          description={lang[langPref]['text_tab_about_description']}>
          {lang[langPref]['text_tab_about_title']}
        </ItemAccount>
        <ItemAccount
          color={themes['defaultTheme'].errorcolor}
          description={lang[langPref]['text_tab_changePass_description']}>
          {lang[langPref]['text_tab_changePass_title']}
        </ItemAccount>
        <ItemAccount
          onPressed={onLogoutPressed}
          color={themes['defaultTheme'].errorcolor}
          description={lang[langPref]['text_tab_logout_description']}>
          {lang[langPref]['text_tab_logout_title']}
        </ItemAccount>
      </View>
    </ScrollView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
  },
});
