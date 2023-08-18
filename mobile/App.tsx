/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import { Animated, Easing } from 'react-native';
import { NavigationContainer, StackActions} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Skills from './Pages/Skills';
import Stats from './Pages/Stats';
import Map from './Pages/Map';
import Profile from './Pages/Profile';
import Trophies from './Pages/Trophies'
import HeaderBar from './Overlays/HeaderBar';
import styles from './styles';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import BottomBar from './Overlays/BottomBar';
const Stack = createStackNavigator();
type RootStackParamList = {
  Profile: undefined;
  Map: undefined;
  Skills: undefined;
  Stats: undefined;
  Trophies: undefined;
};






////// COMPONENT FUNCTION BEGINNING //////
function App(): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      
      <NavigationContainer >
        {/* <HeaderBar /> */}
        <Stack.Navigator  initialRouteName='Skills' 
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="Skills" component={Skills} />
          <Stack.Screen name="Stats" component={Stats} />
          <Stack.Screen name="Trophies" component={Trophies} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
        <BottomBar/>
      </NavigationContainer>
    </SafeAreaView>
  );
}



export default App;
