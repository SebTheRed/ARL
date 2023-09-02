
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

	// const animatedValue = new Animated.Value(0);

	// useEffect(() => {
	//   Animated.loop(
	// 	Animated.sequence([
	// 	  Animated.timing(animatedValue, {
	// 		toValue: 1,
	// 		duration: 5000,
	// 		useNativeDriver: false,
	// 	  }),
	// 	  Animated.timing(animatedValue, {
	// 		toValue: 0,
	// 		duration: 5000,
	// 		useNativeDriver: false,
	// 	  }),
	// 	])
	//   ).start();
	// }, []);
	// const interpolatedColor = animatedValue.interpolate({
	// 	inputRange: [0,0.25,0.5,0.75, 1],
	// 	outputRange: ['orange', 'gold', "green", "cyan", "#007bff"],
	//   });



const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    
    return `${month}/${day}/${year}`;
    };


const createAccount = async(e:any) => {
    let uid = ""
	try {
		const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
		console.log(userCredentials)
		uid = userCredentials.user.uid;
        //NEED
        //TO
        //ADD LOADING
        // SCREEN HERE
		await setDoc(doc(db, "users", uid), {
            uid: uid,
			email: email,
            accountCreationDate:getCurrentDate(),
			name: name, 
			phoneNumber: phoneNumber, 
			userName:userName,
            streak:0,
            picURL:"",
            trophyPins:["","",""],
            xpData:{
                family:1,friends:1,fitness:1,
                earthcraft:1,cooking:1,technology:1,
                games:1,language:1,humanity:1,
            },
            trophyData:{
                "Tital of Steel": {unlocked:false,progress:0},
                "Fitness Fanatic": {unlocked:false,progress:0},
                "Golden Devotion": {unlocked:false,progress:0},
                "Sisyphus' Prized Work": {unlocked:false,progress:0},
                "Marathon's March": {unlocked:false,progress:0},
                "Martial Master": {unlocked:false,progress:0},
                "26.2": {unlocked:false,progress:0},
                "Yoga Yogi": {unlocked:false,progress:0},
                "Exercise Enthusiast": {unlocked:false,progress:0},
                "Chef of the Year": {unlocked:false,progress:0},
                "Cooking Connoisseur": {unlocked:false,progress:0},
                "Iron Chef": {unlocked:false,progress:0},
                "Family Feast": {unlocked:false,progress:0},
                "Code Crusader": {unlocked:false,progress:0},
                "Bearing FAANGs": {unlocked:false,progress:0},
                "Internet Property": {unlocked:false,progress:0},
                "Digital Playground": {unlocked:false,progress:0},
                "Web3 Wizard": {unlocked:false,progress:0},
                "Gamer with Taste": {unlocked:false,progress:0},
                "Steam Star": {unlocked:false,progress:0},
                "The Grind": {unlocked:false,progress:0},
                "Gotta Go Fast": {unlocked:false,progress:0},
                "Cant Stop Wont Stop": {unlocked:false,progress:0},
                "Lightfoot Traveler": {unlocked:false,progress:0},
                "Globe Trotter": {unlocked:false,progress:0},
                "Gallery Guru": {unlocked:false,progress:0},
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
                "One with Nature": {unlocked:false,progress:0},
                "Butchers & Shepherds": {unlocked:false,progress:0},
                "Of The Earth": {unlocked:false,progress:0},
                "Nature's Friend": {unlocked:false,progress:0},
                "Nature's Steward": {unlocked:false,progress:0},
                "Off The Grid": {unlocked:false,progress:0},


            },
            settings:{
                darkMode:true,
            },
            friends:{},
            blockedUsers:{},
        })
		console.log("User document created in Firestore");
        navigation.navigate("Login")
	} catch(error){
		console.log(error)
	}
    }

    return(


<Animated.View style={{...styles.logincontainer,backgroundColor:"#19c6ff"}}>
    <View style={{...styles.loginWrapper, height:"90%", width:"90%"}}>
        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
            <Text style={styles.logintitle}>sign up</Text>
            <Text style={{...styles.skillPageXPText,}}> or </Text>
            <TouchableOpacity onPress={()=>handleGoBackPress("Login")} style={styles.loginSignupButton}>
                <Text style={styles.loginbuttonText}>⇦ go back</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.logininputContainer}>
            <Text style={styles.loginlabel}>user name</Text>
            <TextInput onChangeText={(text)=>setUserName(text)} style={styles.logininput} />
        </View>
        <View style={styles.logininputContainer}>
            <Text style={styles.loginlabel}>email</Text>
            <TextInput onChangeText={(text)=>setEmail(text)} style={styles.logininput} />
        </View>
        <View style={styles.logininputContainer}>
            <Text style={styles.loginlabel}>first & last Name</Text>
            <TextInput onChangeText={(text)=>setName(text)} style={styles.logininput} />
        </View>
        <View style={styles.logininputContainer}>
            <Text style={styles.loginlabel}>phone number</Text>
            <TextInput onChangeText={(text)=>setPhoneNumber(text)} style={styles.logininput} />
        </View>
        <View style={styles.logininputContainer}>
            <Text style={styles.loginlabel}>password</Text>
            <TextInput onChangeText={(text)=>setPassword(text)} style={styles.logininput} secureTextEntry />
        </View>
        <TouchableOpacity onPress={createAccount} style={styles.loginbutton}>
            <Text style={styles.loginbuttonText}>complete sign up</Text>
        </TouchableOpacity>
    </View>
</Animated.View>


    )
}

export default SignUp

