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
import styles from '../styles'
import type {PropsWithChildren} from 'react';
import {app, auth} from '../Firebase/firebase'
const Login = ():JSX.Element => {
	// console.log(app)
	const [email,setEmail] = useState("")
	const [password,setPassword] = useState("")


	const signIn = (e:any) => {
		e.preventDefault()
		signInWithEmailAndPassword(auth, email, password)
		.then((userCredentials)=>{
			console.log(userCredentials)
		})
		.catch((error)=>{
			console.log(error)
		})
	}
	return(
		<View style={styles.container}>
			<Text style={styles.title}>Sign In</Text>

			<View style={styles.inputContainer}>
				<Text style={styles.label}>Email</Text>
				<TextInput onChangeText={(text)=>setEmail(text)} style={styles.input} placeholder="Enter your email" />
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Password</Text>
				<TextInput onChangeText={(text)=>setPassword(text)} style={styles.input} placeholder="Enter your password" secureTextEntry />
			</View>

			<TouchableOpacity onPress={signIn} style={styles.button}>
				<Text style={styles.buttonText}>Login</Text>
			</TouchableOpacity>
		</View>
	)
}

export default Login