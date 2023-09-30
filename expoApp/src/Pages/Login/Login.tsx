import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
		TextInput,
		Animated,
		Keyboard,
		KeyboardAvoidingView,
		Platform,
  } from 'react-native';
  import React from 'react'
  import { useNavigation } from '@react-navigation/native';
  import { NavigationProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth'
import { useUID } from '../../Contexts/UIDContext';
import styles from '../../styles'
import type {PropsWithChildren} from 'react';
import {db, auth,} from '../../Firebase/firebase'
import {doc, getDoc} from 'firebase/firestore'
import { useUserData } from '../../Contexts/UserDataContext';
import LinearGradient from 'react-native-linear-gradient';
import LoadingOverlay from '../../Overlays/LoadingOverlay';
import { scaleFont } from '../../Utilities/fontSizing';
type RootStackParamList = {
	Login:undefined,
	AuthedApp:undefined,
	SignUp:undefined,
}
const Login = ({route}:any):JSX.Element => {
	const [email,setEmail] = useState("Seb.belfonti@gmail.com")
	const [password,setPassword] = useState("punspaye")
	const {setUID}:any = useUID();
	const {setUserData}:any = useUserData()
  const [loadingBool,setLoadingBool] = useState<boolean>(false)
  const [failureMessage,setFailureMessage] = useState<string>()
	// const animatedValue = new Animated.Value(0);

	// useEffect(() => {
	//   Animated.loop(
	// 	Animated.sequence([
	// 	  Animated.timing(animatedValue, {
	// 		toValue: 1,
	// 		duration: 20000,
	// 		useNativeDriver: false,
	// 	  }),
	// 	  Animated.timing(animatedValue, {
	// 		toValue: 0,
	// 		duration: 20000,
	// 		useNativeDriver: false,
	// 	  }),
	// 	])
	//   ).start();
	// }, []);
	// const interpolatedColor = animatedValue.interpolate({
	// 	inputRange: [0,0.25,0.5,0.75, 1],
	// 	outputRange: ['orange', 'gold', "#00ff15", "cyan", "#007bff"],
	//   });


 // 2. Use the useNavigation hook with the type
 const navigation = useNavigation<NavigationProp<RootStackParamList>>();

 // 3. Update the handlePress function
 const handleSignUpPress = (val: keyof RootStackParamList) => {
   navigation.navigate(val);
 }

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
		<ScrollView keyboardShouldPersistTaps='handled' style={{...styles.logincontainer,backgroundColor:"#19c6ff"}} contentContainerStyle={{alignItems:"center", justifyContent:"space-between"}}>
			<View style={{...styles.ARLLogoWrapper, backgroundColor:"transparent"}}>
				<View style={styles.offsetWrapper}>
				</View>
				<Text style={{...styles.borderedTextShadow, color: 'black',fontWeight:"bold"}}>arl</Text>
				<Text style={{...styles.borderedText, color: 'white' ,fontWeight:"bold"}}>arl</Text>
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
        <LoadingOverlay isVisible={loadingBool} />
      )}
		</ScrollView>
    
		</KeyboardAvoidingView>
	)
}

export default Login