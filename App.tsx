import {View} from 'react-native';
import React from 'react';
//import DashBoard from './src/DashBoard';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import Home from './src';
import Savedata from './src/Extracompo/Savedata';
import Store from './src/Extracompo/Store';
import ReduxProvider from './src/redux/provider';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ReduxProvider>
      <View style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="store">
            <Stack.Screen name="store" component={Store} />
            <Stack.Screen name="savedata" component={Savedata} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </ReduxProvider>
  );
};

export default App;

{
  /* <Stack.Navigator initialRouteName="dashBoard">
  <Stack.Screen name="Home" component={Home} />
  <Stack.Screen name="dashBoard" component={DashBoard} />
</Stack.Navigator> */
}
