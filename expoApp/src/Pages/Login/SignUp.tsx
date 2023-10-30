
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
import { getFirestore, doc, setDoc,getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from '../../styles'
import type {PropsWithChildren} from 'react';
import {db, auth} from '../../Firebase/firebase'
import { useUserData } from '../../Contexts/UserDataContext';
import { useUID } from '../../Contexts/UIDContext';
import LoadingOverlay from '../../Overlays/LoadingOverlay'

type RootStackParamList = {
	Login:undefined,
	AuthedApp:undefined,
	SignUp:undefined,
}

const SignUp = ():JSX.Element => {
    const {setUID}:any = useUID();
	const {setUserData}:any = useUserData()
    const [responseMessage,setResponseMessage] = useState<string>()
    const [userName, setUserName] = useState('');
    const [isUserNameValid, setIsUserNameValid] = useState(true);

    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);

    const [name, setName] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [loadingBool,setLoadingBool] = useState(false)
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
    const handleInputChange = (text:any, setter:any, validator:any, isValidSetter:any) => {
        setter(text);
        isValidSetter(validator(text));
      };


const addUserFetch = async () => {
    setLoadingBool(true)
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
        setLoadingBool(false)
        throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const uidResponse = await response.text();
        console.log("USER UID: ",uidResponse)
        signInWithEmailAndPassword(auth,email,password)
        .then(()=>{
            // console.log(userCredentials)
            setUID(uidResponse)
            if (uidResponse) {
                const userDocRef = doc(db, "users", uidResponse);
                getDoc(userDocRef)
                    .then((docSnapshot) => {
                    if (docSnapshot.exists()) {
                    //   console.log("Setting user data:", docSnapshot.data());  // Debugging line
                        setUserData(docSnapshot.data());
                    } else {
                        console.error("No such user documents document!");
                    }
                    })
                    .catch((error) => {
                    console.error("Error getting user document", error);
                    });
                    setLoadingBool(false)
                    navigation.navigate("AuthedApp")
                } else {
                    setLoadingBool(false)
                }
        })
        .catch((error)=>{
            console.error(error)
        })
    } catch (error) {
        console.error('Error calling addUser function: ', error);
        setResponseMessage('Error adding user');
        setLoadingBool(false)
    }
    };





return(
<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
<ScrollView style={{...styles.logincontainer,backgroundColor:"#22ace3"}} contentContainerStyle={{alignItems:"center", justifyContent:"center"}}>
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
            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"flex-end"}}>
                <Text style={styles.loginlabel}>user name</Text>
                {!isUserNameValid&&(<Text style={{...styles.loginlabel, color:"#ff0000",fontSize:10,}}>! alphabet characters & ._- only!</Text>)}

            </View>
            
            <TextInput
            style={[styles.logininput, !isUserNameValid && styles.invalidInput]}
            returnKeyType="done"
            blurOnSubmit={true}
            onSubmitEditing={()=>Keyboard.dismiss()} 
            onChangeText={(text) =>
              handleInputChange(text, setUserName, (text:string) => /^[a-zA-Z0-9._-]{1,16}$/.test(text), setIsUserNameValid)
            }
            value={userName}
          />
        </View>
        <View style={styles.logininputContainer}>
        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"flex-end"}}>
            <Text style={styles.loginlabel}>email</Text>
            {!isEmailValid&&(<Text style={{...styles.loginlabel, color:"#ff0000",fontSize:10,}}>! enter a proper email !</Text>)}
        </View>
            <TextInput
            value={email}
            style={[styles.logininput, !isEmailValid && styles.invalidInput]}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            returnKeyType="done"
            blurOnSubmit={true}
            onSubmitEditing={()=>Keyboard.dismiss()} 
            onChangeText={(text) =>
              handleInputChange(text, setEmail, (text:string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text), setIsEmailValid)
            }
            />
        </View>
        <View style={styles.logininputContainer}>
        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"flex-end"}}>
            <Text style={styles.loginlabel}>first & last Name</Text>
            {!isNameValid&&(<Text style={{...styles.loginlabel,fontSize:10, color:"#ff0000"}}>! alphabet characters & ._- only!</Text>)}
        </View>
            <TextInput
            value={name}
            style={[styles.logininput, !isNameValid && styles.invalidInput]}
            autoCapitalize='words'
            returnKeyType="done"
            blurOnSubmit={true}
            onSubmitEditing={()=>Keyboard.dismiss()} 
            onChangeText={(text) =>
              handleInputChange(text, setName, (text:string) => /^[a-zA-Z\s]+$/.test(text), setIsNameValid)
            }
            />
        </View>
        <View style={styles.logininputContainer}>
        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"flex-end"}}>
            <Text style={styles.loginlabel}>phone number</Text>
            {!isPhoneNumberValid&&(<Text style={{...styles.loginlabel, color:"#ff0000",fontSize:10}}>! enter an accurate phone # !</Text>)}

        </View>
            <TextInput
            value={phoneNumber}
            style={[styles.logininput, !isPhoneNumberValid && styles.invalidInput]}
            returnKeyType="done"
            blurOnSubmit={true}
            onSubmitEditing={()=>Keyboard.dismiss()}
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            onChangeText={(text)=>{
                handleInputChange(text, setPhoneNumber, (text:string) => /^[\d() -]{0,17}$/.test(text), setIsPhoneNumberValid)
            }}
            />
        </View>
        <View style={styles.logininputContainer}>
        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"flex-end"}}>
            <Text style={styles.loginlabel}>password</Text>
            {!isPasswordValid&&(<Text style={{...styles.loginlabel, color:"#ff0000",fontSize:10,}}>! at least 8 characers !</Text>)}
        </View>
            <TextInput
            value={password}
            style={[styles.logininput, !isPasswordValid && styles.invalidInput]}
            returnKeyType="done"
            blurOnSubmit={true}
            onSubmitEditing={()=>Keyboard.dismiss()} 
            secureTextEntry
            onChangeText={(text) =>
              handleInputChange(text, setPassword, (text:string) => /^[a-zA-Z0-9!@#$%^&*()_+,\-./:;<=>?@[\\\]_`{|}~]{8,}$/.test(text), setIsPasswordValid)
            }
            />
        </View>
        {(isUserNameValid&&isEmailValid&&isNameValid&&isPasswordValid&&isPhoneNumberValid&&userName&&email&&name&&password&&phoneNumber)&&(
        <TouchableOpacity onPress={addUserFetch} style={styles.loginbutton}>
            <Text style={styles.loginbuttonText}>complete sign up</Text>
        </TouchableOpacity>)}

        {((!isUserNameValid||!isEmailValid||!isNameValid||!isPasswordValid||!isPhoneNumberValid)||(!userName||!email||!name||!password||!phoneNumber))&&(
        <TouchableOpacity style={{...styles.loginbutton, backgroundColor:"#333"}}>
            {(!userName||!email||!name||!password||!phoneNumber)&&(
                <Text style={styles.loginbuttonText}>fill out all fields</Text>
            )}
            {(userName&&email&&name&&password&&phoneNumber)&&(
                <Text style={styles.loginbuttonText}>! fix your info !</Text>
            )}  
        </TouchableOpacity>)}
        
    </View>
    <View style={{height:500,}} />
</ScrollView>
<LoadingOverlay text={"Signing you up..."} isVisible={loadingBool} opacity={1}/>
</KeyboardAvoidingView>

    )
}

export default SignUp

