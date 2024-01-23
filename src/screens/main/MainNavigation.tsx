import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen, ExploreScreen} from './screens';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faCompass} from '@fortawesome/free-solid-svg-icons';
import themes from '../../themes/themes';
import lang from '../../language/lang';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductDetailScreen from './screens/ProductDetailScreen';

const tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return(
  <NavigationContainer>
    <Stack.Navigator initialRouteName='hometab'>
      <Stack.Screen options={{headerShown:false}} name="hometab" component={MainTab} />
      <Stack.Screen name="product detail" component={ProductDetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  )
};

const MainTab = () => {
  return (
    <tab.Navigator initialRouteName="Home">
      <tab.Screen
        options={{
          headerTitle: lang['en'].appBarHome,
          headerTitleAlign: 'center',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon size={size} color={color} icon={faHome} />
          ),
          tabBarActiveTintColor: themes['defaultTheme'].primaryColor,
        }}
        name="Home"
        component={HomeScreen}
      />
      <tab.Screen
        options={{
          headerTitleAlign: 'center',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon size={size} color={color} icon={faCompass} />
          ),
          tabBarActiveTintColor: themes['defaultTheme'].primaryColor,
        }}
        name="Explore"
        component={ExploreScreen}
      />
    </tab.Navigator>
  );
};

export default MainNavigation;
