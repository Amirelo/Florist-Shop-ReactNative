import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {
  HomeScreen,
  ExploreScreen,
  CartScreen,
  AccountScreen,
  ProfileScreen,
  UpdateInfoScreen,
  OrderScreen,
  OrderDetailScreen,
  AddressScreen,
  AddressEdit,
  PromocodeScreen,
  AboutUsScreen,
  CartDelivery,
  CartDetail,
  SettingScreen,
  ProductFilterScreen,
} from './screens';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faCompass,
  faCartShopping,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import themes from '../../themes/themes';
import lang from '../../language/lang';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductDetailScreen from './screens/ProductDetailScreen';
import {useSelector} from 'react-redux';
import {
  NAVIGATION_BOTTOM_TAB_ACCOUNT,
  NAVIGATION_BOTTOM_TAB_CART,
  NAVIGATION_BOTTOM_TAB_EXPLORE,
  NAVIGATION_BOTTOM_TAB_HOME,
  NAVIGATION_MAIN_ABOUTUS,
  NAVIGATION_MAIN_ADDRESS,
  NAVIGATION_MAIN_ADDRESS_EDIT,
  NAVIGATION_MAIN_CART_DELIVERY,
  NAVIGATION_MAIN_CART_DETAIL,
  NAVIGATION_MAIN_ORDER,
  NAVIGATION_MAIN_ORDER_DETAIL,
  NAVIGATION_MAIN_PRODUCT_DETAIL,
  NAVIGATION_MAIN_PRODUCT_FILTER,
  NAVIGATION_MAIN_PROFILE,
  NAVIGATION_MAIN_PROMOCODES,
  NAVIGATION_MAIN_SETTINGS,
  NAVIGATION_MAIN_UPDATE_INFO,
} from '../../constants/AppConstants';

const tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="hometab">
        <Stack.Screen
          options={{headerShown: false}}
          name="hometab"
          component={MainTab}
        />
        <Stack.Screen
          options={{title: 'Product Details'}}
          name={NAVIGATION_MAIN_PRODUCT_DETAIL}
          component={ProductDetailScreen}
        />
        <Stack.Screen
        options={{title: 'Profile'}}
          name={NAVIGATION_MAIN_PROFILE}
          component={ProfileScreen}
        />
        <Stack.Screen
        options={{title: 'Update User Info'}}
          name={NAVIGATION_MAIN_UPDATE_INFO}
          component={UpdateInfoScreen}
        />
        <Stack.Screen
        options={{title: 'Orders'}} name={NAVIGATION_MAIN_ORDER} component={OrderScreen} />
        <Stack.Screen
        options={{title: 'Order Details'}}
          name={NAVIGATION_MAIN_ORDER_DETAIL}
          component={OrderDetailScreen}
        />
        <Stack.Screen
        options={{title: 'Address'}}
          name={NAVIGATION_MAIN_ADDRESS}
          component={AddressScreen}
        />
        <Stack.Screen
          options={{title: 'Edit Address'}}
          name={NAVIGATION_MAIN_ADDRESS_EDIT}
          component={AddressEdit}
        />
        <Stack.Screen
        options={{title: 'Promocodes'}}
          name={NAVIGATION_MAIN_PROMOCODES}
          component={PromocodeScreen}
        />
        <Stack.Screen
        options={{title: 'About Us'}}
          name={NAVIGATION_MAIN_ABOUTUS}
          component={AboutUsScreen}
        />
        <Stack.Screen
        options={{title: 'Product Filter'}}
          name={NAVIGATION_MAIN_PRODUCT_FILTER}
          component={ProductFilterScreen}
        />
        <Stack.Screen
          options={{title: 'Cart Delivery'}}
          name={NAVIGATION_MAIN_CART_DELIVERY}
          component={CartDelivery}
        />
        <Stack.Screen
          options={{title: 'Cart Detail'}}
          name={NAVIGATION_MAIN_CART_DETAIL}
          component={CartDetail}
        />
        <Stack.Screen
        options={{title: 'Settings'}}
          name={NAVIGATION_MAIN_SETTINGS}
          component={SettingScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainTab = () => {
  // Saved language
  const langPref: keyof typeof lang = useSelector(
    (store: any) => store.preference.language,
  );
  return (
    <tab.Navigator initialRouteName={NAVIGATION_BOTTOM_TAB_HOME}>
      <tab.Screen
        options={{
          tabBarLabel: lang[langPref]['bottomTab_home'],
          headerShown: false,
          headerTitle: lang['en'].appBarHome,
          headerTitleAlign: 'center',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon size={size} color={color} icon={faHome} />
          ),
          tabBarActiveTintColor: themes['defaultTheme'].primaryColor,
        }}
        name={NAVIGATION_BOTTOM_TAB_HOME}
        component={HomeScreen}
      />
      <tab.Screen
        options={{
          tabBarLabel: lang[langPref]['bottomTab_explore'],
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon size={size} color={color} icon={faCompass} />
          ),
          tabBarActiveTintColor: themes['defaultTheme'].primaryColor,
        }}
        name={NAVIGATION_BOTTOM_TAB_EXPLORE}
        component={ExploreScreen}
      />
      <tab.Screen
        options={{
          tabBarLabel: lang[langPref]['bottomTab_cart'],
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({size, color}) => (
            <FontAwesomeIcon size={size} color={color} icon={faCartShopping} />
          ),
          tabBarActiveTintColor: themes['defaultTheme'].primaryColor,
        }}
        name={NAVIGATION_BOTTOM_TAB_CART}
        component={CartScreen}
      />

      <tab.Screen
        options={{
          tabBarLabel: lang[langPref]['bottomTab_account'],
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({size, color}) => (
            <FontAwesomeIcon size={size} color={color} icon={faUser} />
          ),
          tabBarActiveTintColor: themes['defaultTheme'].primaryColor,
        }}
        name={NAVIGATION_BOTTOM_TAB_ACCOUNT}
        component={AccountScreen}
      />
    </tab.Navigator>
  );
};

export default MainNavigation;
