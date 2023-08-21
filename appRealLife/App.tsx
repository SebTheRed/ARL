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
import { useState } from 'react';
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

  const [skillsList,setSkillsList] = useState([
    {title:"Family",color:"#ff0000",flare:"The Highest Priority",level:99},
    {title:"Friends",color:"#ff8400",flare:"Making & Keeping Them",level:12},
    {title:"Finance",color:"#ffea00",flare:"Money Can Buy Happiness",level:60},
    {title:"Agility",color:"#aeff00",flare:"Freedom of Movement",level:45},
    {title:"Strength",color:"#4dff00",flare:"Force of Will",level:8},
    {title:"Coding",color:"#00ff80",flare:"The Language of Logic",level:75},
    {title:"Gaming",color:"#00fffb",flare:"Endless Entertainment",level:15},
    {title:"Cooking",color:"#0080ff",flare:"You Are What You Eat",level:50},
    {title:"Humanity",color:"#7700ff",flare:"Volunteering & The Arts",level:20},
  ]);

  const [trophyData,setTrophyData] = useState([
    {title:"Sisyphus' Prized Work",imgPath:"",desc:"Go to the gym for  30 days straight without missing a single day.",unlocked:false},
    {title:"",imgPath:"",desc:"",unlocked:false},
    {title:"",imgPath:"",desc:"",unlocked:false},
    {title:"",imgPath:"",desc:"",unlocked:false},
    {title:"",imgPath:"",desc:"",unlocked:false},
    {title:"",imgPath:"",desc:"",unlocked:false},
    {title:"",imgPath:"",desc:"",unlocked:false},
    {title:"",imgPath:"",desc:"",unlocked:false},
    {title:"",imgPath:"",desc:"",unlocked:false},
    {title:"",imgPath:"",desc:"",unlocked:false},
    {title:"",imgPath:"",desc:"",unlocked:false},
    {title:"",imgPath:"",desc:"",unlocked:false},
    {title:"",imgPath:"",desc:"",unlocked:false},

  ])





  // const isDarkMode = useColorScheme() === 'dark';
  return (
<SafeAreaView style={styles.backgroundStyle}>
  <NavigationContainer>
      <HeaderBar />
      <Stack.Navigator initialRouteName='Skills' 
                        screenOptions={{ headerShown: false }}>
          <Stack.Screen 
              name="Skills" 
              component={Skills}
              initialParams={{ skillsList: skillsList }}
          />
          <Stack.Screen name="Stats" component={Stats} />
          <Stack.Screen name="Trophies" initialParams={{trophyData: trophyData}} component={Trophies} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
      <BottomBar/>
  </NavigationContainer>
</SafeAreaView>
  );
}



export default App;
