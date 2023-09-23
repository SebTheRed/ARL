/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import React from 'react';
import type {PropsWithChildren} from 'react';
import { Animated, Easing } from 'react-native';
import { NavigationContainer, StackActions,} from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import Skills from './Pages/Skills/Skills';
import SkillsPage from './Pages/Skills/SkillsPage'
import Stats from './Pages/Profile/Stats';
import Map from './Pages/Map/Map';
import Profile from './Pages/Profile/Profile';
import EditProfile from './Pages/Profile/EditProfile'
import Trophies from './Pages/Trophies/Trophies'
import HeaderBar from './Overlays/HeaderBar';
import ProfilePicModal from './Pages/Profile/ProfPicModal'
import { useState } from 'react';
import styles from './styles';
import Feed from './Pages/Feed/Feed';
import Login from './Pages/Login/Login'
import SignUp from './Pages/Login/SignUp';
import HamburgerBar from './Pages/HamburgerParts/HamburgerBar';
import TrophyGrading from './Pages/HamburgerParts/TrophyGrading';
import Search from './Pages/HamburgerParts/Search';
import Friends from './Pages/HamburgerParts/Friends';
import Notifications from './Pages/HamburgerParts/Notifications';
import Streak from './Pages/HamburgerParts/Streak'
import AdminComponent from './Utilities/AdminComponent';
import { UIDProvider } from './Contexts/UIDContext';
import { FeedProvider } from './Contexts/FeedContext';
import {CurrentEventProvider} from './Contexts/CurrentEventContext'
import {ProfilePageUIDProvider} from './Contexts/ProfilePageUID'
import {CurrentTraitStatProvider} from './Contexts/CurrentTraitStat'
import {LastPageProvider} from './Contexts/LastPageContext'
import {HamburgerBarProvider} from './Contexts/HamburgerBarContext'
import { FriendsProvider } from './Contexts/FriendsContext';
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
// import Geolocation from '@react-native-community/geolocation';
import BottomBar from './Overlays/BottomBar';
import { useEffect, } from 'react';
import { useUID } from './Contexts/UIDContext';
import ExperienceUploader from './Pages/Skills/ExperienceUploader';
import {db} from './Firebase/firebase'
import {UserDataProvider, useUserData} from './Contexts/UserDataContext';
import UserPassPopup from './Pages/Profile/UserPassPopup';
import { GameRulesProvider } from './Contexts/GameRules';
const Stack = createStackNavigator();
const SkillStack = createStackNavigator();
const AuthStack = createStackNavigator();
const ProfileStack = createStackNavigator()
type RootStackParamList = {
  Profile: undefined;
  Map: undefined;
  Skills: undefined;
  Stats: undefined;
  Trophies: undefined;
};


////// COMPONENT FUNCTION BEGINNING //////
function AppMain(): JSX.Element {
  const [isWaitingUserData,setIsWaitingUserData] = useState(false)
  // const [userGeoData,setUserGeoData] = useState({})
  const [arrayOPlaces, setArrayOPlaces] = useState({
    parks:[],
    gyms:[],
    restaurants:[],
  })
  
  
  // useEffect(()=>{
  // Geolocation.getCurrentPosition(info => {
  //   console.log(info.coords.latitude, info.coords.longitude);
  //   console.log("coords received")
  //   setUserGeoData({latitude:info.coords.latitude, longitude:info.coords.longitude})
  //   // fetchPlaces(info.coords.latitude, info.coords.longitude)
  // });
  // },[])
  





const SkillsNav = () => {
  return(
    <SkillStack.Navigator initialRouteName='SkillsMain' screenOptions={{ headerShown: false,cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,}}>
      <SkillStack.Screen name="SkillsMain" component={Skills} />
      <SkillStack.Screen name="Family" component={SkillsPage} />
      <SkillStack.Screen name="Friends" component={SkillsPage} />
      <SkillStack.Screen name="Fitness" component={SkillsPage} />
      <SkillStack.Screen name="Earthcraft" component={SkillsPage} />
      <SkillStack.Screen name="Cooking" component={SkillsPage} />
      <SkillStack.Screen name="Technology" component={SkillsPage} />
      <SkillStack.Screen name="Games" component={SkillsPage} />
      <SkillStack.Screen name="Language" component={SkillsPage} />
      <SkillStack.Screen name="Humanity" component={SkillsPage} />
      <SkillStack.Screen name="ExperienceUploader" component={ExperienceUploader}/>
    </SkillStack.Navigator>
  )
  
}


const AuthApp = ()=>{
  const {userData}:any = useUserData()
  // console.log("authapp, ", userData)
  if (Object.values(userData).length>0) {
    return(
      <GameRulesProvider>
        <HeaderBar />
          <Stack.Navigator initialRouteName='Admin' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Skills" component={SkillsNav} />
            <Stack.Screen name="Trophies" component={Trophies} />
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="Feed" component={Feed} />
            <Stack.Screen name="ProfileStack" component={ProfilePages} />
            <Stack.Screen name="UserStats" component={Stats} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="TrophyGrading" component={TrophyGrading} />
            <Stack.Screen name="Friends" component={Friends} />
            <Stack.Screen name="Streak" component={Streak} />
            <Stack.Screen name="Admin" component={AdminComponent} />
          </Stack.Navigator>
        <HamburgerBar />
        <BottomBar/>
      </GameRulesProvider>
    )
  } else {
    return(
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
          <Text style={{fontSize:40,color:"#fff"}}>LOADING...</Text>
        </ScrollView>
    )
  }
}

const ProfilePages = () => {
  return(
    <ProfileStack.Navigator initialRouteName='Profile' screenOptions={{headerShown:false}}>
      <ProfileStack.Screen name="Profile"  component={Profile} />
      <ProfileStack.Screen name="EditProfile" component={EditProfile} />
      <ProfileStack.Screen name="UserPassPopup" component={UserPassPopup} />
      <ProfileStack.Screen name="ProfileStats" component={Stats} />
    </ProfileStack.Navigator>
  )
}

  return(

    <LastPageProvider>
      <UIDProvider>
      
      <FriendsProvider>
        <UserDataProvider>
          <ProfilePageUIDProvider>
          <CurrentEventProvider>
            <FeedProvider>
              <CurrentTraitStatProvider>
              <HamburgerBarProvider>
                <SafeAreaView style={styles.backgroundStyle}>
                  <NavigationContainer >
                    <AuthStack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
                      <AuthStack.Screen name="Login" component={Login}/>
                      <AuthStack.Screen name="AuthedApp" component={AuthApp} />
                      <AuthStack.Screen name="SignUp" component={SignUp} />
                    </AuthStack.Navigator>
                  </NavigationContainer>
                </SafeAreaView>
              </HamburgerBarProvider>
              </CurrentTraitStatProvider>
            </FeedProvider>
          </CurrentEventProvider>
          </ProfilePageUIDProvider>
        </UserDataProvider>
      </FriendsProvider>
      </UIDProvider>
    </LastPageProvider>
    
  )
}



export default AppMain;


  
  // const apiKey = 'AIzaSyARFSBf48RxnNhBWxtQZbCGEhlLm9yfvCk';
  // const fetchPlaces = async (latitude, longitude) => {
  //   console.log(latitude,longitude)
  //   const parkUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=2000&type=park&key=${apiKey}`;
  //   const gymUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=2000&type=gym&key=${apiKey}`;
  //   const restaurantUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=2000&type=restaurant&key=${apiKey}`;
  //   const theaterUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=2000&type=coffee&key=${apiKey}`;
  //   // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=nature_reserve&key=${apiKey}`;
  //   // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=&key=${apiKey}`;
  //   const parkResponse = await fetch(parkUrl);
  //   const parkData = await parkResponse.json();

  //   const gymResponse = await fetch(gymUrl);
  //   const gymData = await gymResponse.json();

  //   const restaurantReponse = await fetch(restaurantUrl);
  //   const restauarantData = await restaurantReponse.json();

  //   const coffeeResponse = await fetch(theaterUrl);
  //   const coffeeData = await coffeeResponse.json();

  //   let assembler = {
  //     parks:parkData.results,
  //     gyms:gymData.results,
  //     restaurants:restauarantData.results,
  //     coffee:coffeeData.results,
  //   }

  //   setArrayOPlaces(assembler)
  //   // return data.results; // This will be an array of places
  // };