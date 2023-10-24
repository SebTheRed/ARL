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
import { useState, useEffect } from 'react';
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
import Tutorial from './Pages/HamburgerParts/Tutorial';
import { UIDProvider } from './Contexts/UIDContext';
import { FeedProvider } from './Contexts/FeedContext';
import {CurrentEventProvider} from './Contexts/CurrentEventContext'
import {ProfilePageUIDProvider} from './Contexts/ProfilePageUID'
import {CurrentTraitStatProvider} from './Contexts/CurrentTraitStat'
import {LastPageProvider} from './Contexts/LastPageContext'
import {HamburgerBarProvider} from './Contexts/HamburgerBarContext'
import { FriendsProvider } from './Contexts/FriendsContext';
import { NotificationProvider } from './Contexts/NotificationsContext';
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
import { useUID } from './Contexts/UIDContext';
import ExperienceUploader from './Pages/Skills/ExperienceUploader';
import {db} from './Firebase/firebase'
import {UserDataProvider, useUserData} from './Contexts/UserDataContext';
import { useGameRules } from './Contexts/GameRules';
import UserPassPopup from './Pages/Profile/UserPassPopup';
import { GameRulesProvider } from './Contexts/GameRules';
import { CooldownProvider } from './Contexts/CooldownContext';
import LoadingOverlay from './Overlays/LoadingOverlay';
const Stack = createStackNavigator();
const SkillStack = createStackNavigator();
const AuthStack = createStackNavigator();
const ProfileStack = createStackNavigator()

////// COMPONENT FUNCTION BEGINNING //////
function AppMain(): JSX.Element {

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
  const {dataLoading}:any = useGameRules()
  // console.log("authapp, ", userData)
  if (Object.values(userData).length>0 && dataLoading==false) {
    return(
      <FeedProvider>

        <CooldownProvider>
          <NotificationProvider>
          <StatusBar />
          <HeaderBar />
            <Stack.Navigator initialRouteName='Skills' screenOptions={{ headerShown: false }}>
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
              <Stack.Screen name="Tutorial" component={Tutorial} />
              <Stack.Screen name="Admin" component={AdminComponent} />
            </Stack.Navigator>
          <HamburgerBar />
          <BottomBar/>
          </NotificationProvider>
        </CooldownProvider>
      </FeedProvider>
    )
  } else {
    return(
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
          <LoadingOverlay text={"Starting aRL..."} isVisible={true} />
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
      <GameRulesProvider>
        <UserDataProvider>
          <ProfilePageUIDProvider>
          <CurrentEventProvider>
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
          </CurrentEventProvider>
          </ProfilePageUIDProvider>
        </UserDataProvider>
        </GameRulesProvider>
      </FriendsProvider>
      </UIDProvider>
    </LastPageProvider>
    
  )
}



export default AppMain;
