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
import Skills from './Pages/Skills/Skills';
import SkillsPage from './Pages/Skills/SkillsPage'
import Stats from './Pages/Stats';
import Map from './Pages/Map';
import Profile from './Pages/Profile';
import Trophies from './Pages/Trophies/Trophies'
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
const SkillStack = createStackNavigator();
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
    {title:"Earthcraft",color:"#4dff00",flare:"Plants, Animals, Nature",level:60},
    {title:"Cooking",color:"#00ff80",flare:"You Are What You Eat",level:50},
    {title:"Coding",color:"#00fffb",flare:"The Language of Logic",level:75},
    {title:"Gaming",color:"#0080ff",flare:"Endless Entertainment",level:15},
    {title:"Reading",color:"#7700ff",flare:"Ink on Paper Imagination",level:10},
    {title:"Humanity",color:"#bf00ff",flare:"Volunteering & The Arts",level:20},
  ]);

  const [trophyData,setTrophyData] = useState([
    {title:"Titan of Steel",progressQTY:21,imgPath:require('./IconBin/TrophyPNG/goblet1.png'),tier:"Bronze",desc:"Go to the gym for 21 days straight without missing a single day.",unlocked:false},
    {title:"Uphill Battle",progressQTY:100,imgPath:require('./IconBin/TrophyPNG/gem1.png'),tier:"Silver",desc:"Go to the gym for at least 100 days out of the year. Counter starts Jan 1.",unlocked:false},
    {title:"Progress of Pain",progressQTY:200,imgPath:require('./IconBin/TrophyPNG/number1.png'),tier:"Gold",desc:"Go to the gym for at least 200 days of the year. Counter starts and ends Jan 1.",unlocked:false},
    {title:"Sisyphus' Prized Work",progressQTY:1000,imgPath:require('./IconBin/TrophyPNG/pedistal1.png'),tier:"Gold",desc:"Log into ARL at the gym 1,000 times.",unlocked:false},
    {title:"Marathon's March",progressQTY:1000, imgPath:require('./IconBin/TrophyPNG/gem2.png'), tier:"Silver", desc:"Run or walk a total of 1,000 miles tracked in ARL.", unlocked:false},
    {title:"Martial Master",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/elegant2.png'),tier:"Silver",desc:"Earn a new belt in a martial art. Any rank-up counts.",unlocked:false},
    {title:"26.2",progressQTY:1, imgPath:require('./IconBin/TrophyPNG/gem3.png'), tier:"Gold", desc:"Run and complete a Marathon", unlocked:false},
    {title:"Powerhouse",progressQTY:1, imgPath:require('./IconBin/TrophyPNG/simple1.png'), tier:"Gold", desc:"Lift & Upload a combined weight of 25,000 lbs in under an hour. Any lift counts.", unlocked:false},
    {title:"Resolution Revolution I",progressQTY:365,imgPath:require('./IconBin/TrophyPNG/star1.png'),tier:"Silver",desc:"Log 365 exercises into ARL",unlocked:false},

    {title:"Resolution Revolution II",progressQTY:365,imgPath:require('./IconBin/TrophyPNG/star3.png'),tier:"Silver",desc:"Cook & Log 365 total dinners.",unlocked:false},
    {title:'Grandma Would Be Proud',progressQTY:1000,imgPath:require('./IconBin/TrophyPNG/simple3.png'),tier:"Gold",desc:"Cook & Log 1,000 total meals.",unlocked:false},
    {title:"Cooking Contributor",progressQTY:25,imgPath:require('./IconBin/TrophyPNG/shield1.png'),tier:"Silver",desc:"Cook & Upload 25 different meal recipes.",unlocked:false},
    {title:"Family Feast",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/star2.png'),tier:"Bronze",desc:"Cook & Upload a holiday dinner with at least 6 family members in attendance.",unlocked:false},

    {title:"Numb Fingers",progressQTY:1000,imgPath:require('./IconBin/TrophyPNG/elegant3.png'),tier:"Gold",desc:"Make 1000 contributions to Github tracked through ARL.",unlocked:false},
    {title:"Bearing FAANGs",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/star4.png'),tier:"Silver",desc:"Make an app for the iOS and Google Play store.",unlocked:false},
    {title:"Internet Property",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/person4.png'),tier:"Bronze",desc:"Create & host your own domain name server. HTTPS required.",unlocked:false},
    {title:"Digital Playground",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/gear.png'),tier:"Silver",desc:"Develop & release your own game onto Steam, The Web, or both App Stores",unlocked:false},
    {title:"Core Contributor",progressQTY:10, imgPath:require('./IconBin/TrophyPNG/simple4.png'), tier:"Bronze", desc:"Contribute to 10 different open-source projects.", unlocked:false},

    {title:"Gamer with Taste",progressQTY:50,imgPath:require('./IconBin/TrophyPNG/simple5.png'),tier:"Bronze",desc:"Play 50 different Steam games for 10 hours each.",unlocked:false},
    {title:"Above & Beyond",progressQTY:2500,imgPath:require('./IconBin/TrophyPNG/shield2.png'),tier:"Gold",desc:"Unlock 2,500 Steam achievements",unlocked:false},
    {title:"The Grind",progressQTY:1000,imgPath:require('./IconBin/TrophyPNG/gem4.png'),tier:"Silver",desc:"Play 1,000 hours in Steam one year. Counter starts Jan 1",unlocked:false},
    {title:"Gotta Go Fast",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/number2.png'),tier:"Gold",desc:'Hold the world record in any video game that is considered "speed-runable"',unlocked:false},
    {title:"Cant Stop Wont Stop",progressQTY:24,imgPath:require('./IconBin/TrophyPNG/gem5.png'),tier:"Bronze",desc:"Play a single game for 24 hours straight.",unlocked:false},

    {title:"Lightfoot Traveler",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/elegant4.png'),tier:"Bronze",desc:"Visit any foreign country.",unlocked:false},
    {title:"Globe Trotter",progressQTY:10, imgPath:require('./IconBin/TrophyPNG/simple6.png'), tier:"Gold", desc:"Visit 10 different countries and check-in via ARL.", unlocked:false},
    {title:"Artistic Soul",progressQTY:20, imgPath:require('./IconBin/TrophyPNG/gem6.png'), tier:"Bronze", desc:"Visit & Check in at 20 different art museums and galleries.", unlocked:false},
    {title:"Social Butterfly",progressQTY:150, imgPath:require('./IconBin/TrophyPNG/mirror2.png'), tier:"Silver", desc:"Attend & Check in at 150 different social events or meetups. Family and/or Friends", unlocked:false},
    {title:"All Abord",progressQTY:1000,imgPath:require('./IconBin/TrophyPNG/steering1.png'),tier:"Silver",desc:"Take a roadtrip totaling at least 1,000 miles over the course of one week.",unlocked:false},

    {title:"Family Reunion",progressQTY:1, imgPath:require('./IconBin/TrophyPNG/star5.png'), tier:"Gold", desc:"Organize & Upload a family reunion with at least 15 members.", unlocked:false},
    {title:"Ring Ring",progressQTY:100, imgPath:require('./IconBin/TrophyPNG/pedistal2.png'), tier:"Bronze", desc:"Make 100 calls to close friends or loved ones.", unlocked:false},
    {title:"Game of Life",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/simple3.png'),tier:"Bronze",desc:"Host a family game night with 3 generations present.",unlocked:false},
    {title:"Clean Leader",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/star6.png'),tier:"Bronze",desc:"Host a family cleanup of the entire house.",unlocked:false},

    {title:"Hands of Bronze",progressQTY:100, imgPath:require('./IconBin/TrophyPNG/gem7.png'), tier:"Bronze", desc:"Volunteer for 100+ hours in community service.", unlocked:false},
    {title:"Eyes of Silver",progressQTY:50, imgPath:require('./IconBin/TrophyPNG/star7.png'), tier:"Silver", desc:"Create & Upload 50 physical pieces of art that you have created.", unlocked:false},
    {title:"Voice of Gold",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/person1.png'),tier:"Gold",desc:"Act in a play or perform live music, on a stage in front of an audience.",unlocked:false},
    {title:"Decoration of Space",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/gem8.png'),tier:"Silver",desc:"Create & Display a piece of physical art at a public art gallery.",unlocked:false},
    {title:"Decoration of Time",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/star8.png'),tier:"Silver",desc:"Upload an album of at least 12 songs into Soundcloud",unlocked:false},

    {title:"Lost in Nature",progressQTY:15,imgPath:require('./IconBin/TrophyPNG/goblet3.png'),tier:"Bronze",desc:"Hike 15 different non-vehicle trails.",unlocked:false},
    {title:"Finding Nature",progressQTY:100,imgPath:require('./IconBin/TrophyPNG/star9.png'),tier:"Silver",desc:"Hike 100 miles on non-vehicle trails.",unlocked:false},
    {title:"Chief Trailfoot",progressQTY:500,imgPath:require('./IconBin/TrophyPNG/star10.png'),tier:"Gold",desc:"Hike 500 miles on non-vehicle trails.",unlocked:false},
    {title:"Butcher & Shepherd",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/shield3.png'),tier:"Gold",desc:"Construct & maintain your own animal livestock collection of at least 12 animals.",unlocked:false},
    {title:"Of The Earth",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/shield4.png'),tier:"Bronze",desc:"Plant & harvest from a vegetable garden of at least 4 species.",unlocked:false},
    {title:"Nature's Friend",progressQTY:25, imgPath:require('./IconBin/TrophyPNG/person2.png'), tier:"Bronze", desc:"Plant & Upload 25 unique species plants of any shape or size.", unlocked:false},
    {title:"Nature's Steward",progressQTY:100, imgPath:require('./IconBin/TrophyPNG/person3.png'), tier:"Silver", desc:"Plant & Upload 100 unique species plants of any shape or size.", unlocked:false},
    {title:"Off The Pipeline",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/star9.png'),tier:"Silver",desc:"Construct & Upload a functioning rainwater collection system.",unlocked:false},
    // {title:"Save The Bees",imgPath:require('./IconBin/TrophyPNG/trophyAndMedal.png'),tier:"Silver",desc:"Set up & Maintain a small beekeeping hive.",unlocked:false},
    // {title:"Earth's Beautiful Surface",imgPath:"",tier:"Bronze",desc:"Participate in an environmental cleanup drive.",unlocked:false},
    // {title:"Earth's Amazing People",imgPath:"",tier:"Gold",desc:"Organize an environmental cleanup drive.",unlocked:false},

  ])

  const [playerData,setPlayerData] = useState({
    userName:"SebTheRed",

  })


const SkillsNav = () => {
  return(
    <SkillStack.Navigator initialRouteName='Skills' screenOptions={{ headerShown: false }}>
      <SkillStack.Screen name="Skills" component={Skills} initialParams={{ skillsList: skillsList }}/>
      <SkillStack.Screen name="Family" initialParams={{skillData:skillsList[0]}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Friends" initialParams={{skillData:skillsList[1]}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Agility" initialParams={{skillData:skillsList[2]}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Strength" initialParams={{skillData:skillsList[3]}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Earthcraft" initialParams={{skillData:skillsList[4]}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Cooking" initialParams={{skillData:skillsList[5]}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Coding" initialParams={{skillData:skillsList[6]}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Gaming" initialParams={{skillData:skillsList[7]}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Reading" initialParams={{skillData:skillsList[8]}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Humanity" initialParams={{skillData:skillsList[9]}} component={SkillsPage} ></SkillStack.Screen>
    </SkillStack.Navigator>
  )
  
}


  // const isDarkMode = useColorScheme() === 'dark';
  return (
<SafeAreaView style={styles.backgroundStyle}>
  <NavigationContainer>
      <HeaderBar />
      <Stack.Navigator initialRouteName='Skills' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Skills" component={SkillsNav} />
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
