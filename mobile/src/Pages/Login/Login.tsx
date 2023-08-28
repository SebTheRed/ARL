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
	const animatedValue = new Animated.Value(0);

	useEffect(() => {
	  Animated.loop(
		Animated.sequence([
		  Animated.timing(animatedValue, {
			toValue: 1,
			duration: 5000,
			useNativeDriver: false,
		  }),
		  Animated.timing(animatedValue, {
			toValue: 0,
			duration: 5000,
			useNativeDriver: false,
		  }),
		])
	  ).start();
	}, []);
	const interpolatedColor = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['orange', 'gold'],
	  });

 // 2. Use the useNavigation hook with the type
 const navigation = useNavigation<NavigationProp<RootStackParamList>>();

 // 3. Update the handlePress function
 const handleSignUpPress = (val: keyof RootStackParamList) => {
   navigation.navigate(val);
 }

const signIn = async(e:any) => {
	e.preventDefault();
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredentials)=>{
            console.log(userCredentials)
			let uid = userCredentials.user.uid
			navigation.navigate("AuthedApp")
			setUID(uid)
			if (uid) {
				const userDocRef = doc(db, "users", uid);
				getDoc(userDocRef)
				  .then((docSnapshot) => {
					if (docSnapshot.exists()) {
					  console.log("Setting user data:", docSnapshot.data());  // Debugging line
					  setUserData(docSnapshot.data());
					} else {
					  console.error("No such document!");
					}
				  })
				  .catch((error) => {
					console.error("Error getting doc", error);
				  });
			  }
        })
        .catch((error)=>{
            console.error(error)
        })
}
	return(
		<Animated.View style={{...styles.logincontainer,backgroundColor:interpolatedColor}}>
			<View style={{...styles.loginWrapper}}>
				<View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
					<Text style={styles.logintitle}>Log In </Text>
					<Text style={{...styles.skillPageXPText,}}> or </Text>
					<TouchableOpacity onPress={()=>handleSignUpPress("SignUp")} style={styles.loginSignupButton}>
						
						<Text style={styles.loginbuttonText}>Sign Up</Text>
					</TouchableOpacity>
				</View>
				
				<View style={styles.logininputContainer}>
					<Text style={styles.loginlabel}>Email</Text>
					<TextInput onChangeText={(text)=>setEmail(text)} style={styles.logininput} placeholder="Enter your email" />
				</View>
				<View style={styles.logininputContainer}>
					<Text style={styles.loginlabel}>Password</Text>
					<TextInput onChangeText={(text)=>setPassword(text)} style={styles.logininput} placeholder="Enter your password" secureTextEntry />
				</View>
				
				<TouchableOpacity onPress={signIn} style={styles.loginbutton}>
					<Text style={styles.loginbuttonText}>Enter ARL</Text>
				</TouchableOpacity>
			</View>
		</Animated.View>
	)
}

export default Login