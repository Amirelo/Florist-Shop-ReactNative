// React and libs
import React from 'react';
import {ScrollView} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

// Constants
import {
  NAVIGATION_MAIN_ABOUTUS,
  NAVIGATION_MAIN_ADDRESS,
  NAVIGATION_MAIN_ORDER,
  NAVIGATION_MAIN_PROFILE,
  NAVIGATION_MAIN_PROMOCODES,
  NAVIGATION_MAIN_SETTINGS,
  NAVIGATION_MAIN_UPDATE_INFO,
} from '../../../constants/AppConstants';

// Models
import {
  AddressModel,
  OrderModel,
  PromocodeModel,
  UserModel,
} from '../../../models';

// Service
import {
  getUserAddresses,
  getUserOrders,
  getUserPromoocodes,
} from '../MainService';
import {googleLogout} from '../../auth/AuthService';

// Redux
import {logout} from '../../../redux/actions/LoginAction';

// Components
import {CustomView} from '../../../components/atoms';
import {ItemAccount, ItemUser} from '../../../components/molecules';

// User Preferences
import lang from '../../../language/lang';
import themes from '../../../themes/themes';

const AccountScreen = () => {
  // Initials
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();

  // Fields
  const [user, setUser] = React.useState<UserModel>();
  const [userOrders, setUserOrders] = React.useState<Array<OrderModel>>([]);
  const [userPromocodes, setUserPromocodes] = React.useState<
    Array<PromocodeModel>
  >([]);
  const [userAddresses, setUserAddresses] = React.useState<Array<AddressModel>>(
    [],
  );

  // Get Saved Language
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );

  // Get Saved User Email
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
    console.log(addresses);
    setUserAddresses(addresses);
  };

  // Logout on pressed
  const onLogoutPressed = async () => {
    (await googleLogout())
      ? dispatch(logout())
      : console.log('Something wrong');
  };

  // Navigate - ProfileScreen
  const onUserTabPressed = () => {
    navigation.navigate(NAVIGATION_MAIN_PROFILE, {
      email: userEmail,
      user: user,
    });
  };

  // Navigate - OrderScreen
  const onOrderTabPressed = () => {
    navigation.navigate(NAVIGATION_MAIN_ORDER, {userOrders: userOrders});
  };

  // Navigate - PromocodeScreen
  const onPromocodeTabPressed = () => {
    navigation.navigate(NAVIGATION_MAIN_PROMOCODES, {data: userPromocodes});
  };

  // Navigate - AddressScreen
  const onAddressTabPressed = () => {
    navigation.navigate(NAVIGATION_MAIN_ADDRESS, {data: userAddresses});
  };

  // Navigate - OrderScreen
  const onTabPressed = (name: string) => {
    navigation.navigate(name, {user: user});
  };

  // Navigate - UpdateInfoScreen
  const onChangePasswordPressed = () => {
    navigation.navigate(NAVIGATION_MAIN_UPDATE_INFO, {type: 'EMAIL', data: ''});
  };

  // Log User Email and Info
  React.useEffect(() => {
    console.log('User Email:', userEmail);
    console.log('User Info', userInfo);
    getInfo();
  }, []);

  // Saved User to useState when found
  React.useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  return (
    <CustomView type="fullscreen">
      <ScrollView>
        <CustomView type="body">
          {/* User Profile */}
          <ItemUser
            username={userInfo.username}
            email={userEmail}
            source={
              user?.image
                ? user.image
                : 'https://images.pexels.com/photos/19933488/pexels-photo-19933488/free-photo-of-a-pastry-with-a-cup-of-coffee-on-a-table.jpeg'
            }
            marginBottom={12}
            onPressed={onUserTabPressed}
          />
          {/* User Order */}
          <ItemAccount
            onPressed={() => onOrderTabPressed()}
            amount={userOrders.length}
            description={lang[langPref].text_tab_order_description}>
            {lang[langPref].text_tab_order_title}
          </ItemAccount>

          {/* User Address */}
          <ItemAccount
            onPressed={() => onAddressTabPressed()}
            amount={userAddresses.length}
            description={lang[langPref].text_tab_address_description}>
            {lang[langPref].text_tab_address_title}
          </ItemAccount>

          {/* User Promocodes */}
          <ItemAccount
            onPressed={onPromocodeTabPressed}
            amount={userPromocodes.length}
            description={lang[langPref].text_tab_promocodes_description}>
            {lang[langPref].text_tab_promocodes_title}
          </ItemAccount>

          {/* User Settings */}
          <ItemAccount
            onPressed={() => onTabPressed(NAVIGATION_MAIN_SETTINGS)}
            description={lang[langPref].text_tab_setting_description}>
            {lang[langPref].text_tab_setting_title}
          </ItemAccount>

          {/* About Developer */}
          <ItemAccount
            onPressed={() => onTabPressed(NAVIGATION_MAIN_ABOUTUS)}
            description={lang[langPref].text_tab_about_description}>
            {lang[langPref].text_tab_about_title}
          </ItemAccount>

          {/* Change User Password */}
          <ItemAccount
            onPressed={onChangePasswordPressed}
            color={themes['defaultTheme'].errorcolor}
            description={lang[langPref].text_tab_changePass_description}>
            {lang[langPref].text_tab_changePass_title}
          </ItemAccount>

          {/* Logout */}
          <ItemAccount
            onPressed={onLogoutPressed}
            color={themes['defaultTheme'].errorcolor}
            description={lang[langPref].text_tab_logout_description}>
            {lang[langPref].text_tab_logout_title}
          </ItemAccount>
        </CustomView>
      </ScrollView>
    </CustomView>
  );
};

export default AccountScreen;
