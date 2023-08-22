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
    {title:"Agility",color:"#ffea00",flare:"Freedom of Movement",level:45},
    {title:"Strength",color:"#aeff00",flare:"Force of Will",level:8},
    {title:"Green-Thumb",color:"#4dff00",flare:"Plant & Animal Livestock",level:60},
    {title:"Cooking",color:"#00ff80",flare:"You Are What You Eat",level:50},
    {title:"Coding",color:"#00fffb",flare:"The Language of Logic",level:75},
    {title:"Gaming",color:"#0080ff",flare:"Endless Entertainment",level:15},
    {title:"Humanity",color:"#7700ff",flare:"Volunteering & The Arts",level:20},
  ]);

  const [trophyData,setTrophyData] = useState([
    {title:"Sisyphus' Prized Work",imgPath:"",tier:"epic",desc:"Go to the gym for  30 days straight without missing a single day.",unlocked:false},
    {title:"",imgPath:"",tier:"epic",desc:"Cook & Upload for 365 total meals.",unlocked:false},
    {title:"",imgPath:"",tier:"rare",desc:"Cook & Upload 25 different meal recipes.",unlocked:false},
    {title:"",imgPath:"",tier:"legendary",desc:"Make 1000 contributions to Github tracked through ARL.",unlocked:false},
    {title:"",imgPath:"",tier:"rare",desc:"Create & host your own domain name server. HTTPS required.",unlocked:false},
    {title:"",imgPath:"",tier:"",desc:"Play 50 different Steam games for 10 hours each.",unlocked:false},
    {title:"",imgPath:"",tier:"",desc:"Unlock 2,500 Steam achievements",unlocked:false},
    {title:"",imgPath:"",tier:"",desc:"Play 1,000 hours in Steam one year. Counter starts at the top of each year.",unlocked:false},
    {title:"Nature's Friend", imgPath:"", tier:"epic", desc:"Plant & Upload 100 plants of any shape or size.", unlocked:false},
    {title:"Globe Trotter", imgPath:"", tier:"legendary", desc:"Visit 10 different countries and check-in via ARL.", unlocked:false},
    {title:"Marathon Runner", imgPath:"", tier:"epic", desc:"Run or walk a total of 500 miles in a year.", unlocked:false},
    {title:"Artistic Soul", imgPath:"", tier:"rare", desc:"Visit & Check in at 20 different art museums and galleries.", unlocked:false},
    {title:"Social Butterfly", imgPath:"", tier:"epic", desc:"Attend & Check in at 150 different social events or meetups. Family and/or Friends", unlocked:false},
    {title:"Family Reunion", imgPath:"", tier:"legendary", desc:"Organize & Upload a family gathering with at least 15 members.", unlocked:false},
    {title:"",imgPath:"",tier:"epic",desc:"Take a roadtrip totaling at least 1000 miles over the course of one week.",unlocked:false},
    {title:"",imgPath:"",tier:"",desc:"",unlocked:false},
    {title:"",imgPath:"",tier:"",desc:"",unlocked:false},
    {title:"",imgPath:"",tier:"",desc:"",unlocked:false},
    {title:"",imgPath:"",tier:"",desc:"",unlocked:false},

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
