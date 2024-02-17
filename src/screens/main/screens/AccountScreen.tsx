import {ScrollView, StyleSheet, View} from 'react-native';
import {ItemAccount, ItemUser} from '../../../components/molecules';
import themes from '../../../themes/themes';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../redux/actions/LoginAction';
import {getUserInfo, googleLogout} from '../../auth/AuthService';
import lang from '../../../language/lang';
import React from 'react';
import {
  AddressModel,
  OrderModel,
  PromocodeModel,
  UserModel,
} from '../../../models';
import {
  getUserAddresses,
  getUserOrders,
  getUserPromoocodes,
} from '../MainService';
import { NAVIGATION_MAIN_ABOUTUS, NAVIGATION_MAIN_ADDRESS, NAVIGATION_MAIN_ORDER, NAVIGATION_MAIN_PROFILE, NAVIGATION_MAIN_PROMOCODES, NAVIGATION_MAIN_SETTINGS, NAVIGATION_MAIN_UPDATE_INFO } from '../../../constants/AppConstants';

const AccountScreen = () => {
  // Navigation and dispatch
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();
  const [user, setUser] = React.useState<UserModel>();
  const [userOrders, setUserOrders] = React.useState<Array<OrderModel>>([]);
  const [userPromocodes, setUserPromocodes] = React.useState<
    Array<PromocodeModel>
  >([]);
  const [userAddresses, setUserAddresses] = React.useState<Array<AddressModel>>(
    [],
  );
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
    // Get User Orders
    const orders: Array<OrderModel> = await getUserOrders(userEmail);
    console.log('User orders:', orders);
    setUserOrders(orders);

    // Get User Promocodes
    const promocodes: Array<PromocodeModel> = await getUserPromoocodes(
      userEmail,
    );
    setUserPromocodes(promocodes);

    // Get User Addresses
    const addresses: Array<AddressModel> = await getUserAddresses(userEmail);
    console.log(addresses)
    setUserAddresses(addresses);
  };

  // Logout on pressed
  const onLogoutPressed = async () => {
    (await googleLogout())
      ? dispatch(logout())
      : console.log('Something wrong');
  };

  // Navigate to profile screen when UserTab pressed
  const onUserTabPressed = () => {
    navigation.navigate(NAVIGATION_MAIN_PROFILE, {email: userEmail, user: user});
  };

  const onOrderTabPressed = () => {
    navigation.navigate(NAVIGATION_MAIN_ORDER, {userOrders: userOrders});
  };

  const onPromocodeTabPressed = () => {
    navigation.navigate(NAVIGATION_MAIN_PROMOCODES, {data: userPromocodes});
  };

  const onAddressTabPressed = () => {
    navigation.navigate(NAVIGATION_MAIN_ADDRESS, {data: userAddresses});
  }

  // Navigate to order screen
  const onTabPressed = (name: string) => {
    navigation.navigate(name, {user: user});
  };

  const onChangePasswordPressed = () => {
    navigation.navigate(NAVIGATION_MAIN_UPDATE_INFO, {type: 'EMAIL', data: ''});
  };

  React.useEffect(() => {
    console.log('User Email:', userEmail);
    console.log('User Info', userInfo);
    getInfo();
  }, []);

  React.useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  return (
    <ScrollView>
      <View style={styles.body}>
        <ItemUser
          username={userInfo.username}
          email={userEmail}
          source={
            user?.image
              ? user.image
              : 'https://images.pexels.com/photos/19933488/pexels-photo-19933488/free-photo-of-a-pastry-with-a-cup-of-coffee-on-a-table.jpeg'
          }
          marginTop={40}
          marginBottom={12}
          onPressed={onUserTabPressed}
        />
        <ItemAccount
          onPressed={() => onOrderTabPressed()}
          amount={userOrders.length}
          description={lang[langPref]['text_tab_order_description']}>
          {lang[langPref]['text_tab_order_title']}
        </ItemAccount>
        <ItemAccount
          onPressed={() => onAddressTabPressed()}
          amount={userAddresses.length}
          description={lang[langPref]['text_tab_address_description']}>
          {lang[langPref]['text_tab_address_title']}
        </ItemAccount>
        <ItemAccount
          onPressed={onPromocodeTabPressed}
          amount={userPromocodes.length}
          description={lang[langPref]['text_tab_promocodes_description']}>
          {lang[langPref]['text_tab_promocodes_title']}
        </ItemAccount>

        <ItemAccount
          onPressed={() => onTabPressed(NAVIGATION_MAIN_SETTINGS)}
          description={lang[langPref]['text_tab_setting_description']}>
          {lang[langPref]['text_tab_setting_title']}
        </ItemAccount>
        <ItemAccount
          onPressed={() => onTabPressed(NAVIGATION_MAIN_ABOUTUS)}
          description={lang[langPref]['text_tab_about_description']}>
          {lang[langPref]['text_tab_about_title']}
        </ItemAccount>
        <ItemAccount
          onPressed={onChangePasswordPressed}
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
