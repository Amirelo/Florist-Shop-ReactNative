import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen, ExploreScreen} from './screens';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faCompass} from '@fortawesome/free-solid-svg-icons';
import themes from '../../themes/themes';
import lang from '../../language/lang';

const tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <NavigationContainer>
      <tab.Navigator initialRouteName="Home">
        <tab.Screen
          options={{
            headerTitle: lang['en'].appBarHome,
            headerTitleAlign:'center',
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon size={size} color={color} icon={faHome} />
            ),
            tabBarActiveTintColor: themes['defaultTheme'].primaryColor
          }}
          name="Home"
          component={HomeScreen}
        />
        <tab.Screen
        options={{
          headerTitleAlign:'center',
          tabBarIcon: ({color,size}) => (
            <FontAwesomeIcon size={size} color={color} icon={faCompass}/>
          ),
          tabBarActiveTintColor: themes['defaultTheme'].primaryColor,
        }}
         name="Explore" 
         component={ExploreScreen} />
      </tab.Navigator>
    </NavigationContainer>
  );
};

export default MainTab;
