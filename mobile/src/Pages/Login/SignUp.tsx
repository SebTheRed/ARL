
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
import {db, auth} from '../../Firebase/firebase'

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
		await setDoc(doc(db, "users", uid), {
			email: email,
			name: name, 
			phoneNumber: phoneNumber, 
			userName:userName,
            streak:0,
            picURL:"",
            trophyPins:{
                1:"",
                2:"",
                3:"",
            },
            xpData:{
                family:1,friends:1,fitness:1,
                earthcraft:1,cooking:1,technology:1,
                games:1,language:1,humanity:1,
            },
            trophyData:{
                "Tital of Steel": {unlocked:false,progress:0},
                "Uphill Battle": {unlocked:false,progress:0},
                "Progress of Pain": {unlocked:false,progress:0},
                "Sisyphus' Prized Work": {unlocked:false,progress:0},
                "Marathon's March": {unlocked:false,progress:0},
                "Martial Master": {unlocked:false,progress:0},
                "26.2": {unlocked:false,progress:0},
                "Powerhouse": {unlocked:false,progress:0},
                "Resolution Revolution I": {unlocked:false,progress:0},
                "Resolution Revolution II": {unlocked:false,progress:0},
                "Cooking Connoisseur": {unlocked:false,progress:0},
                "Cooking Contributor": {unlocked:false,progress:0},
                "Family Feast": {unlocked:false,progress:0},
                "Wash Your Keyboard": {unlocked:false,progress:0},
                "Bearing FAANGs": {unlocked:false,progress:0},
                "Internet Property": {unlocked:false,progress:0},
                "Digital Playground": {unlocked:false,progress:0},
                "Core Contributor": {unlocked:false,progress:0},
                "Gamer with Taste": {unlocked:false,progress:0},
                "Above & Beyond": {unlocked:false,progress:0},
                "The Grind": {unlocked:false,progress:0},
                "Gotta Go Fast": {unlocked:false,progress:0},
                "Cant Stop Wont Stop": {unlocked:false,progress:0},
                "Lightfoot Traveler": {unlocked:false,progress:0},
                "Globe Trotter": {unlocked:false,progress:0},
                "Artistic Soul": {unlocked:false,progress:0},
                "Social Butterfly": {unlocked:false,progress:0},
                "All Aboard": {unlocked:false,progress:0},
                "Family Reunion": {unlocked:false,progress:0},
                "Checking In": {unlocked:false,progress:0},
                "Game of Life": {unlocked:false,progress:0},
                "Clean Leader": {unlocked:false,progress:0},
                "Hands of Bronze": {unlocked:false,progress:0},
                "Eyes of Silver": {unlocked:false,progress:0},
                "Voice of Gold": {unlocked:false,progress:0},
                "Decoration of Space": {unlocked:false,progress:0},
                "Decoration of Time": {unlocked:false,progress:0},
                "Lost in Nature": {unlocked:false,progress:0},
                "Finding Nature": {unlocked:false,progress:0},
                "Chief Trailfoot": {unlocked:false,progress:0},
                "Butcher & Shepherd": {unlocked:false,progress:0},
                "Of The Earth": {unlocked:false,progress:0},
                "Nature's Friend": {unlocked:false,progress:0},
                "Nature's Steward": {unlocked:false,progress:0},
                "Off The Grid": {unlocked:false,progress:0},


            },
            settings:{
                darkMode:true,
            },
        }
        );
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