import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your screen components
import Mainpage from './src/components/screens/Mainpage';
import AddItems from './src/components/screens/additems';
import MyWardrobe from './src/components/screens/mywardrobe';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Mainpage" component={Mainpage} />
      <Tab.Screen name="AddItems" component={AddItems} />
      <Tab.Screen name="mywardrobe" component={mywardrobe} />
      {/* Add other screens you want in the bottom tab navigator */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
