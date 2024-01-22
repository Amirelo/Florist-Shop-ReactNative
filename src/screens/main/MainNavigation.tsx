import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen';
import ExploreScreen from '../ExploreScreen';
import {NavigationContainer} from '@react-navigation/native';

const tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <NavigationContainer>
      <tab.Navigator>
        <tab.Screen name="Home" component={HomeScreen} />
        <tab.Screen name="Explore" component={ExploreScreen} />
      </tab.Navigator>
    </NavigationContainer>
  );
};

export default MainTab;
