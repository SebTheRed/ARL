
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
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { getFirestore, doc, setDoc } from "firebase/firestore";
import styles from '../../styles'
import type {PropsWithChildren} from 'react';
import {app, auth} from '../../Firebase/firebase'

type RootStackParamList = {
	Login:undefined,
	AuthedApp:undefined,
	SignUp:undefined,
}

const SignUp = ():JSX.Element => {
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("")
    const [name,setName] = useState("")
    const [userName,setUserName] = useState("")
    // 2. Use the useNavigation hook with the type
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    // 3. Update the handlePress function
    const handleGoBackPress = (val: keyof RootStackParamList) => {
    navigation.navigate(val);
    }

const createAccount = async(e:any) => {
    let uid = ""
	try {
		const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
		console.log(userCredentials)
		uid = userCredentials.user.uid;
		let db = getFirestore(app)
		await setDoc(doc(db, "users", uid), {
			email: email,
			name: "", // You can set this later
			phoneNumber: "", // You can set this later
			// Add other fields as needed
		});
		console.log("User document created in Firestore");
	} catch(error){
		console.log(error)
	}
    }

    return(
    <View style={styles.logincontainer}>
        
        <Text style={styles.logintitle}>Sign Up</Text>
        <View style={styles.logininputContainer}>
            <Text style={styles.loginlabel}>User Name</Text>
            <TextInput onChangeText={(text)=>setUserName(text)} style={styles.logininput} />
        </View>
        <View style={styles.logininputContainer}>
            <Text style={styles.loginlabel}>Email</Text>
            <TextInput onChangeText={(text)=>setEmail(text)} style={styles.logininput} />
        </View>
        <View style={styles.logininputContainer}>
            <Text style={styles.loginlabel}>First & Last Name</Text>
            <TextInput onChangeText={(text)=>setName(text)} style={styles.logininput} />
        </View>
        <View style={styles.logininputContainer}>
            <Text style={styles.loginlabel}>Phone Number</Text>
            <TextInput onChangeText={(text)=>setPhoneNumber(text)} style={styles.logininput} />
        </View>
        <View style={styles.logininputContainer}>
            <Text style={styles.loginlabel}>Password</Text>
            <TextInput onChangeText={(text)=>setPassword(text)} style={styles.logininput} secureTextEntry />
        </View>
        <TouchableOpacity onPress={()=>handleGoBackPress("Login")} style={styles.loginSignupButton}>
            <Text style={styles.loginbuttonText}>⇦ Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={createAccount} style={styles.loginbutton}>
            <Text style={styles.loginbuttonText}>Complete Sign Up & Join ARL!</Text>
        </TouchableOpacity>
    </View>
    )
}

export default SignUp