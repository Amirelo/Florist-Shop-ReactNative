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
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="UpdateInfo" component={UpdateInfoScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />
        <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
        <Stack.Screen name="Address" component={AddressScreen} />
        <Stack.Screen options={{title: 'Edit Address'}} name="AddressEdit" component={AddressEdit} />
        <Stack.Screen name="Promo" component={PromocodeScreen} />
        <Stack.Screen name="About" component={AboutUsScreen} />
        <Stack.Screen name="Filter" component={ProductFilterScreen} />
        <Stack.Screen
          name="CartDeli"
          options={{title: 'Cart Delivery'}}
          component={CartDelivery}
        />
        <Stack.Screen
          name="CartDetail"
          options={{title: 'Cart Detail'}}
          component={CartDetail}
        />
        <Stack.Screen name="Settings" component={SettingScreen} />
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
    <tab.Navigator initialRouteName="Home">
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
        name={'Home'}
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
        name={'Explore'}
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
        name={'Cart'}
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
        name={'Account'}
        component={AccountScreen}
      />
    </tab.Navigator>
  );
};

export default MainNavigation;
