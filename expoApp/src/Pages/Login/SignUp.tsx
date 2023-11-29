import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Modal,
  Button
} from 'react-native';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from '../../styles'
import {db, auth} from '../../Firebase/firebase'
import { useUserData } from '../../Contexts/UserDataContext';
import { useUID } from '../../Contexts/UIDContext';
import LoadingOverlay from '../../Overlays/LoadingOverlay'
import { scaleFont } from '../../Utilities/fontSizing';
import BackArrow from '../../IconBin/svg/back_arrow.svg'

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

  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleGoBackPress = (val: keyof RootStackParamList) => {
  navigation.navigate(val);
  }


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

const WaiverModal = ():JSX.Element => {
  return(
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
    <View style={{height:"100%", width:"100%", backgroundColor:"rgba(0,0,0,0.7)"}}>
      <View style={{ marginTop: 100, marginHorizontal: 20, backgroundColor: '#1c1c1c', borderColor:"#fff", borderWidth:2, borderRadius:10 }}>
      <View style={{height:10}} />
        <ScrollView
          style={{backgroundColor:"#1c1c1c", padding:20, borderRadius:10, borderColor:"#656565", borderWidth:1, height:"70%"}}
        >
          <Text style={{color:"#fff", fontSize:scaleFont(24)}}>Scroll Entire Waiver</Text>
          <View style={{height:10}} />
          <Text style={{color: "#fff", fontWeight: 'bold'}}>1. Acknowledgment and Acceptance of Risks:</Text>
          <View style={{height:10}} />
          <Text style={{color: "#fff"}}>
            I understand that participating in the activities and experiences suggested by The App for Real Life (ARL) involves inherent risks and dangers. These may include, but are not limited to, physical injury, psychological stress, and in extreme cases, death.
          </Text>
          <View style={{height:10}} />
          <Text style={{color: "#fff", fontWeight: 'bold'}}>2. Personal Responsibility:</Text>
          <Text style={{color: "#fff"}}>
            I acknowledge that I am participating voluntarily, and I am solely responsible for my safety and well-being. I affirm that I am in good health and physically capable of engaging in these activities.
          </Text>
          <View style={{height:10}} />
          <Text style={{color: "#fff", fontWeight: 'bold'}}>3. Liability Release:</Text>
          <Text style={{color: "#fff"}}>
            I hereby release, waive, and discharge Volt Applications LLC, its affiliates, officers, employees, agents, and ARL from any and all liabilities, claims, demands, or causes of action that may arise from my participation in activities suggested by ARL, whether caused by negligence or otherwise.
          </Text>
          <View style={{height:10}} />
          <Text style={{color: "#fff", fontWeight: 'bold'}}>4. Compliance with Rules and Instructions:</Text>
          <Text style={{color: "#fff"}}>
            I agree to comply with all rules and instructions provided by ARL and understand that failure to do so may increase the risk of injury or harm.
          </Text>
          <View style={{height:10}} />
          <Text style={{color: "#fff", fontWeight: 'bold'}}>5. Age Requirement:</Text>
          <Text style={{color: "#fff"}}>
            I affirm that I am of legal age to consent to this waiver, or that I have obtained consent from a parent or legal guardian if I am a minor.
          </Text>
          <View style={{height:10}} />
          <Text style={{color: "#fff", fontWeight: 'bold'}}>6. Image and Data Usage Consent:</Text>
          <Text style={{color: "#fff"}}>
            I agree that ARL may use any images, video footage, or data I provide for promotional, research, or other purposes as outlined in the Privacy Policy and Terms of Service.
          </Text>
          <View style={{height:10}} />
          <Text style={{color: "#fff", fontWeight: 'bold'}}>7. Amendment and Modification:</Text>
          <Text style={{color: "#fff"}}>
            I understand that ARL reserves the right to modify or amend this waiver at any time, and I agree to adhere to any such modifications.
          </Text>
          <View style={{height:10}} />
          <Text style={{color: "#fff", fontWeight: 'bold'}}>8. Governing Law:</Text>
          <Text style={{color: "#fff"}}>
            This waiver shall be governed by and construed in accordance with the laws of the jurisdiction in which Volt Applications LLC operates.
          </Text>
          <View style={{height:10}} />
          <TouchableOpacity 
            onPress={() => {
              addUserFetch()
              setModalVisible(false)
            }} style={styles.loginbutton}>
            <Text accessibilityLabel="Agree to legal terms" style={styles.loginbuttonText}>I Agree, Sign Me Up!</Text>
          </TouchableOpacity>
          <View style={{height:80}} />
        </ScrollView>
      </View>
      </View>
    </Modal>
  )
}


return(
<>
<ScrollView style={{...styles.logincontainer,backgroundColor:"#299e46"}} contentContainerStyle={{alignItems:"center", justifyContent:"center"}}>
  <View style={{height:10}}></View>
  <View style={{...styles.loginWrapper, height:550, width:"90%"}}>
      <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
          <Text style={styles.logintitle}>Sign up</Text>
          <Text style={{...styles.skillPageXPText,}}> or </Text>
          <TouchableOpacity onPress={()=>handleGoBackPress("Login")} style={styles.loginSignupButton}>
              <BackArrow width={scaleFont(20)} height={scaleFont(20)} />
              <Text style={styles.loginbuttonText}>Go back</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.logininputContainer}>
          <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"flex-end"}}>
              <Text style={styles.loginlabel}>Unique username:</Text>
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
          <Text style={styles.loginlabel}>Your email (used to log in):</Text>
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
          <Text style={styles.loginlabel}>Full name:</Text>
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
          <Text style={styles.loginlabel}>Phone number:</Text>
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
          <Text style={styles.loginlabel}>Strong password:</Text>
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
      <TouchableOpacity onPress={()=>setModalVisible(true)} style={styles.loginbutton}>
          <Text style={styles.loginbuttonText}>Submit</Text>
      </TouchableOpacity>)}

      {((!isUserNameValid||!isEmailValid||!isNameValid||!isPasswordValid||!isPhoneNumberValid)||(!userName||!email||!name||!password||!phoneNumber))&&(
      <TouchableOpacity style={{...styles.loginbutton, backgroundColor:"#333"}}>
          {(!userName||!email||!name||!password||!phoneNumber)&&(
              <Text style={styles.loginbuttonText}>Fill out all fields first</Text>
          )}
          {(userName&&email&&name&&password&&phoneNumber)&&(
              <Text style={styles.loginbuttonText}>! Fix your info !</Text>
          )}  
      </TouchableOpacity>)}
      
  </View>
  <View style={{height:500,}} />
</ScrollView>
<LoadingOverlay text={"Signing you up..."} isVisible={loadingBool} opacity={1}/>
<WaiverModal />
</>
  )
}

export default SignUp