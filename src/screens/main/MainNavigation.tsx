import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import { HomeScreen, ExploreScreen } from './screens';

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
