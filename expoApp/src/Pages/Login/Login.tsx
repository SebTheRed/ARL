import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth'
import { useUID } from '../../Contexts/UIDContext';
import styles from '../../styles'
import {auth} from '../../Firebase/firebase'
import { useUserData } from '../../Contexts/UserDataContext';
import LoadingOverlay from '../../Overlays/LoadingOverlay';
import { scaleFont } from '../../Utilities/fontSizing';
import { useGameRules } from '../../Contexts/GameRules';
import { useFeed } from '../../Contexts/FeedContext';
import { useFriends } from '../../Contexts/FriendsContext';
import ForwardArrow from '../../IconBin/svg/forward_arrow.svg'

type RootStackParamList = {
Login:undefined,
AuthedApp:undefined,
SignUp:undefined,
}
const Login = ({route}:any):JSX.Element => {
const {setGameRulesData}:any = useGameRules()
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const {setUID}:any = useUID();
const {setUserData, setUserTrophies, setUserLevels}:any = useUserData()
const {setFriendsData}:any = useFriends()
const {setGlobalFeed, setFriendsFeed, setLastVisibleFriends, setLastVisibleFriendsTrophy, setLastVisibleGlobal, setLastVisibleGlobalTrophy,}:any = useFeed()
const [loadingBool,setLoadingBool] = useState<boolean>(false)
const [failureMessage,setFailureMessage] = useState<string>()
const [initializing, setInitializing] = useState<boolean>(false)
const navigation = useNavigation<NavigationProp<RootStackParamList>>();

// UN-COMMENT TO FORCE LOG OUT!
// useEffect(()=>{
//   auth.signOut()
// },[])


const handleSignUpPress = (val: keyof RootStackParamList) => {
 navigation.navigate(val);
}


const handleAuthChange = async(user:any) => {
  if (user) {
    const functionURL = "https://us-central1-appreallife-ea3d9.cloudfunctions.net/initializeApplication"
    const response = await fetch(functionURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({uid:user.uid})
    })
    if (response.ok) {
      const responseData = await response.json()
      console.log(JSON.stringify(responseData.gameRules,null,2))
      setUID(user.uid)
      setUserData(responseData.userData)
      setGameRulesData(responseData.gameRules)
      setUserTrophies(responseData.userTrophies)
      setUserLevels(responseData.userLevels)
      setFriendsData(responseData.userFriends)
      setInitializing(false)
      navigation.navigate("AuthedApp")
      const friendsFeedFunctionURL = "https://us-central1-appreallife-ea3d9.cloudfunctions.net/generateFriendsFeed"
      const globalFeedFunctionURL = "https://us-central1-appreallife-ea3d9.cloudfunctions.net/generateGlobalFeed"
      const [friendsFeedResponse,globalFeedResponse] = await Promise.all([
        fetch(friendsFeedFunctionURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({uid:user.uid, lastVisFriends:null,lastVisTrophy:null})
        }),
        fetch(globalFeedFunctionURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({uid:user.uid, lastVisGlobal:null,lastVisTrophy:null})
        }),
      ]);
      if (friendsFeedResponse.ok) {
        const friendsFeedData = await friendsFeedResponse.json()
        setFriendsFeed(friendsFeedData.posts)
        setLastVisibleFriends(friendsFeedData.lastVisibleFriends)
        setLastVisibleFriendsTrophy(friendsFeedData.lastVisibleFriendsTrophy)
        console.log(JSON.stringify(friendsFeedData,null,2))
        // set friends feed data
      } else {console.error("Friends Feed Data not properly initialized")}

      if (globalFeedResponse.ok) {
        const globalFeedData = await globalFeedResponse.json()
        setGlobalFeed(globalFeedData.posts)
        setLastVisibleGlobal(globalFeedData.lastVisibleGlobal)
        setLastVisibleGlobalTrophy(globalFeedData.lastVisibleGlobalTrophy)
        console.log(JSON.stringify(globalFeedData,null,2))
        // set global feed data
      } else {console.error("Global Feed Data not properly initialized")}
      
    } else {
      console.error("Server error when trying to initialize: ", response.status, response.statusText)
      setInitializing(false)
    }
  } else{setInitializing(false)}
  
}
useEffect(()=>{
  setInitializing(true)
  const authSubscriber = auth.onAuthStateChanged(handleAuthChange);
  return authSubscriber
},[])


const signIn = async(e:any) => {
  e.preventDefault();
  try {
    console.log(auth,email,password)
    signInWithEmailAndPassword(auth,email,password)
    .catch((error)=>{
      setFailureMessage("Wrong email / password.")
    })
  } catch(err) {
}
  
}
return(
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1 }}
  >
  <ScrollView keyboardShouldPersistTaps='handled' style={{...styles.logincontainer,backgroundColor:"#299e46"}} contentContainerStyle={{alignItems:"center", justifyContent:"space-between"}}>
    <View style={{...styles.ARLLogoWrapper, backgroundColor:"transparent"}}>
      <Image style={{...styles.loginARLLogo}} source={require('../../IconBin/arl_letters.png')} />
      <Text style={{color:"#fff",fontSize:scaleFont(20), fontWeight:"bold"}}>App Real Life</Text>
    </View>
    <View style={{...styles.loginWrapper}}>
    {failureMessage&&(<View style={{height:30,width:"100%",backgroundColor:"rgba(255,0,0,0.5)", alignItems:"center", justifyContent:"center", borderColor:"#ff0000",borderWidth:2}}>
    <Text style={{color:"#fff",fontSize:scaleFont(14)}}>{failureMessage}</Text>
    </View>)}
    <View style={{height:10}} />
      <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
        <Text style={styles.logintitle}>Sign in </Text>
        <Text style={{...styles.skillPageXPText,}}> or </Text>
        <TouchableOpacity onPress={()=>handleSignUpPress("SignUp")} style={{...styles.loginSignupButton, borderColor:"#fff", backgroundColor:"#36b149", justifyContent:"center"}}>
          <Text style={{...styles.loginbuttonText, fontWeight:"bold"}}>Sign up</Text>
          <ForwardArrow width={scaleFont(20)} height={scaleFont(20)} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.logininputContainer}>
        <Text style={styles.loginlabel}>Email:</Text>
        <TextInput
        returnKeyType="done"
        blurOnSubmit={true}
        onSubmitEditing={()=>Keyboard.dismiss()}
        autoCapitalize='none' 
        onChangeText={(text)=>setEmail(text)} 
        style={styles.logininput}
          />
      </View>
      <View style={styles.logininputContainer}>
        <Text style={styles.loginlabel}>Password:</Text>
        <TextInput 
          returnKeyType="done"
          blurOnSubmit={true}
          onSubmitEditing={()=>Keyboard.dismiss()}
          onChangeText={(text)=>setPassword(text)}
          style={styles.logininput}
          secureTextEntry
          />
      </View>
      
      <TouchableOpacity onPress={signIn} style={styles.loginbutton}>
        <Text style={{...styles.loginbuttonText, fontWeight:"bold"}}>Sign in</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={signIn} style={styles.whatIsARLButton}>
        <Text style={styles.loginbuttonText}>what's arl ?</Text>
      </TouchableOpacity> */}
    </View>
    

    {loadingBool&&(
      <LoadingOverlay text={"Logging you in..."} isVisible={loadingBool} opacity={1}/>
    )}
    {initializing&&(
      <LoadingOverlay text={"Initializing..."} isVisible={initializing} opacity={0.8} />
    )}
    <View style={{...styles.loginVoltWrapper}}>
      <Text style={{...styles.loginVoltText}}>Powered By:</Text>
      <Image style={{...styles.loginVoltLogo}} source={require("../../IconBin/volt_logo.png")} />
    </View>
  </ScrollView>
  
  </KeyboardAvoidingView>
)
}

export default Login