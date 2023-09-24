
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
    const [responseMessage,setResponseMessage] = useState<string>()
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

const addUserFetch = async () => {
    const functionURL = "https://us-central1-appreallife-ea3d9.cloudfunctions.net/addUser"
    try {
        const response = await fetch(functionURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:email,password:password,userName:userName,name:name,phoneNumber }),
        });

        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const message = await response.text();
        console.log("RESPONSE MESSAGE: ",message)
        setResponseMessage(message);
    } catch (error) {
        console.error('Error calling addUser function: ', error);
        setResponseMessage('Error adding user');
    }
    };

    return(

<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
<ScrollView style={{...styles.logincontainer,backgroundColor:"#19c6ff"}} contentContainerStyle={{alignItems:"center", justifyContent:"center"}}>
    <View style={{height:10}}></View>
    <View style={{...styles.loginWrapper, height:550, width:"90%"}}>
        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
            <Text style={styles.logintitle}>sign up</Text>
            <Text style={{...styles.skillPageXPText,}}> or </Text>
            <TouchableOpacity onPress={()=>handleGoBackPress("Login")} style={styles.loginSignupButton}>
                <Text style={styles.loginbuttonText}>⇦ go back</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.logininputContainer}>
            <Text style={styles.loginlabel}>user name</Text>
            <TextInput returnKeyType="done"
                        blurOnSubmit={true}
                        onSubmitEditing={()=>Keyboard.dismiss()} onChangeText={(text)=>setUserName(text)} style={styles.logininput} />
        </View>
        <View style={styles.logininputContainer}>
            <Text style={styles.loginlabel}>email</Text>
            <TextInput returnKeyType="done"
                        blurOnSubmit={true}
                        onSubmitEditing={()=>Keyboard.dismiss()} onChangeText={(text)=>setEmail(text)} style={styles.logininput} />
        </View>
        <View style={styles.logininputContainer}>
            <Text style={styles.loginlabel}>first & last Name</Text>
            <TextInput returnKeyType="done"
                        blurOnSubmit={true}
                        onSubmitEditing={()=>Keyboard.dismiss()} onChangeText={(text)=>setName(text)} style={styles.logininput} />
        </View>
        <View style={styles.logininputContainer}>
            <Text style={styles.loginlabel}>phone number</Text>
            <TextInput returnKeyType="done"
                        blurOnSubmit={true}
                        onSubmitEditing={()=>Keyboard.dismiss()}onChangeText={(text)=>setPhoneNumber(text)} style={styles.logininput} />
        </View>
        <View style={styles.logininputContainer}>
            <Text style={styles.loginlabel}>password</Text>
            <TextInput returnKeyType="done"
                        blurOnSubmit={true}
                        onSubmitEditing={()=>Keyboard.dismiss()} onChangeText={(text)=>setPassword(text)} style={styles.logininput} secureTextEntry />
        </View>
        <TouchableOpacity onPress={addUserFetch} style={styles.loginbutton}>
            <Text style={styles.loginbuttonText}>complete sign up</Text>
        </TouchableOpacity>
    </View>
    {/* <View style={{height:500,}} /> */}
</ScrollView>
</KeyboardAvoidingView>

    )
}

export default SignUp

