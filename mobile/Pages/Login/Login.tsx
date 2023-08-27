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
  } from 'react-native';
  import React from 'react'
  import { useNavigation } from '@react-navigation/native';
  import { NavigationProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth'
import { useUID } from '../../Contexts/UIDContext';
import styles from '../../styles'
import type {PropsWithChildren} from 'react';
import {app, auth} from '../../Firebase/firebase'

type RootStackParamList = {
	Login:undefined,
	AuthedApp:undefined,
	SignUp:undefined,
}
const Login = ():JSX.Element => {
	const [email,setEmail] = useState("")
	const [password,setPassword] = useState("")
	const {updateUID}:any = useUID();

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
			updateUID(uid)
        })
        .catch((error)=>{
            console.error(error)
        })
}
	return(
		<View style={styles.logincontainer}>
			<Text style={styles.logintitle}>Sign In</Text>

			<View style={styles.logininputContainer}>
				<Text style={styles.loginlabel}>Email</Text>
				<TextInput onChangeText={(text)=>setEmail(text)} style={styles.logininput} placeholder="Enter your email" />
			</View>
			<View style={styles.logininputContainer}>
				<Text style={styles.loginlabel}>Password</Text>
				<TextInput onChangeText={(text)=>setPassword(text)} style={styles.logininput} placeholder="Enter your password" secureTextEntry />
			</View>
			<TouchableOpacity onPress={()=>handleSignUpPress("SignUp")} style={styles.loginSignupButton}>
				<Text style={styles.loginbuttonText}>Sign Up</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={signIn} style={styles.loginbutton}>
				<Text style={styles.loginbuttonText}>Login</Text>
			</TouchableOpacity>
		</View>
	)
}

export default Login