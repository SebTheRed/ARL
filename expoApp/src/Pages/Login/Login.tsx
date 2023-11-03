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
import {db, auth,} from '../../Firebase/firebase'
import {doc, getDoc} from 'firebase/firestore'
import { useUserData } from '../../Contexts/UserDataContext';
import LoadingOverlay from '../../Overlays/LoadingOverlay';
import { scaleFont } from '../../Utilities/fontSizing';

type RootStackParamList = {
	Login:undefined,
	AuthedApp:undefined,
	SignUp:undefined,
}
const Login = ({route}:any):JSX.Element => {
	const [email,setEmail] = useState("")
	const [password,setPassword] = useState("")
	const {setUID}:any = useUID();
	const {setUserData}:any = useUserData()
  const [loadingBool,setLoadingBool] = useState<boolean>(false)
  const [failureMessage,setFailureMessage] = useState<string>()
  const [initializing, setInitializing] = useState<boolean>(false)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();





  const handleSignUpPress = (val: keyof RootStackParamList) => {
   navigation.navigate(val);
  }




  const handleAuthChange = async(user:any) => {
    if (user) {
      setUID(user.uid)
      const userDocRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(userDocRef)
      if (docSnap.exists()){
        setUserData(docSnap.data())
        setInitializing(false)
        navigation.navigate("AuthedApp")
      } else {
        setInitializing(false)
        setFailureMessage("ERROR: Reload app and try again.")
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
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredentials)=>{
        // console.log(userCredentials)
			let uid = userCredentials.user.uid
			navigation.navigate("AuthedApp")
			setUID(uid)
			if (uid) {
				const userDocRef = doc(db, "users", uid);
				getDoc(userDocRef)
				  .then((docSnapshot) => {
					if (docSnapshot.exists()) {
					//   console.log("Setting user data:", docSnapshot.data());  // Debugging line
					  setUserData(docSnapshot.data());
					} else {
					  // console.error("No such document!");
            setFailureMessage("ERROR: Reload app and try again.")
					}
				  })
				  .catch((error) => {
					// console.error("Error getting doc", error);
          setFailureMessage("ERROR: Reload app and try again.")
				  });
			  }
        })
        .catch((error)=>{
            // console.error(error)
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
		<ScrollView keyboardShouldPersistTaps='handled' style={{...styles.logincontainer,backgroundColor:"#22ace3"}} contentContainerStyle={{alignItems:"center", justifyContent:"space-between"}}>
			<View style={{...styles.ARLLogoWrapper, backgroundColor:"transparent"}}>
				<View style={styles.offsetWrapper}>
				</View>
				<Text style={{...styles.borderedTextShadow, color: 'black',fontWeight:"bold"}}>ARL</Text>
				<Text style={{...styles.borderedText, color: 'white' ,fontWeight:"bold"}}>ARL</Text>
			</View>
			<View style={{...styles.loginWrapper}}>
      {failureMessage&&(<View style={{height:30,width:"100%",backgroundColor:"rgba(255,0,0,0.5)", alignItems:"center", justifyContent:"center", borderColor:"#ff0000",borderWidth:2}}>
      <Text style={{color:"#fff",fontSize:scaleFont(14)}}>{failureMessage}</Text>
      </View>)}
      <View style={{height:10}} />
				<View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
					<Text style={styles.logintitle}>sign in </Text>
					<Text style={{...styles.skillPageXPText,}}> or </Text>
					<TouchableOpacity onPress={()=>handleSignUpPress("SignUp")} style={styles.loginSignupButton}>
						
						<Text style={styles.loginbuttonText}>sign up</Text>
					</TouchableOpacity>
				</View>
				
				<View style={styles.logininputContainer}>
					<Text style={styles.loginlabel}>email</Text>
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
					<Text style={styles.loginlabel}>password</Text>
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
					<Text style={styles.loginbuttonText}>sign into arl</Text>
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