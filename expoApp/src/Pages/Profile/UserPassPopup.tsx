import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	Image,
	TouchableOpacity,
	FlatList,
	RefreshControl,
	Switch,
	TextInput,
    Modal,
} from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import { useFeed } from '../../Contexts/FeedContext';
import {useUserData} from '../../Contexts/UserDataContext'
import { useUID } from '../../Contexts/UIDContext';
import { useNavigation, CommonActions } from '@react-navigation/native';
import styles from '../../styles'
import {db, auth} from '../../Firebase/firebase'
import {getAuth, updateEmail, updatePassword} from "firebase/auth"
import {updateDoc,doc} from 'firebase/firestore'
import { scaleFont } from '../../Utilities/fontSizing';
import LoadingOverlay from '../../Overlays/LoadingOverlay';

const UserPassPopup = ():JSX.Element => {
const {uid}:any = useUID()
const navigation = useNavigation<any>();
const [emailInput,setEmailInput] = useState<string>()
const [passwordInput,setPasswordInput] = useState<string>()
const [deleteModal,setDeleteModal] = useState<boolean>(false)
const [loadingBool,setLoadingBool] = useState<boolean>(false)
const [successMessage,setSuccessMessage] = useState<string>()
const [failureMessage,setFailureMessage] = useState<string>()

const handleGoBack = () => {
    navigation.navigate("EditProfile")
}
const handleDeleteButton = () => {
  setDeleteModal(true)
}


const handleChangeCredentials = async(text:string) => {
    switch(text){
        case"email":
            try{
              setLoadingBool(true)
              const functionURL = "https://us-central1-appreallife-ea3d9.cloudfunctions.net/changeUserEmail"
              const response = await fetch(functionURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    uid: uid,
                }),
                }).then(()=>{
                  setSuccessMessage("Email change successful!")
                  setLoadingBool(false)
                })
            } catch(error){
              setFailureMessage("Email change failed! Be sure to provide a real email.")
              setLoadingBool(false)
                console.error('ERROR EMAIL NOT RESET: ', error)
            }
        break;
        case"password":
            try{
              setLoadingBool(true)
              const functionURL = "https://us-central1-appreallife-ea3d9.cloudfunctions.net/changeUserPassword"
              const response = await fetch(functionURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    uid: uid,
                    newPassword: passwordInput
                }),
                }).then(()=>{
                  setSuccessMessage("Password change successful!")
                  setLoadingBool(false)
                })
            }catch(error){
                setLoadingBool(false)
                setFailureMessage("Password change failed! Be sure its 8 characters long.")
                console.error("ERROR PASSWORD NOT RESET: ", error)
            } 
        break;
    }
}
const deleteAccount = async() => {
  try{
    setLoadingBool(true)
    const functionURL = "https://us-central1-appreallife-ea3d9.cloudfunctions.net/deleteUserProfile"
    const response = await fetch(functionURL, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
          uid: uid,
      }),
      }).then((response)=>{
        //ROUTE USER BACK TO LOGIN
        setLoadingBool(false)
        navigation.dispatch(
          CommonActions.reset({
              index: 0,
              routes: [
              {
                  name: 'Login', // The name of the root navigator's screen that contains the child navigators
                 
              },
              ],
          })
          );
      })

  } catch(err) {
    console.warn("ACCOUNT DELETION FAILED: ", err)
    setLoadingBool(false)
    setFailureMessage("DELETION FAILED. CLOSE APP & TRY AGAIN.")
  }
}


const DeleteConfirmation = ():JSX.Element => {
  return(
  <Modal animationType='slide' transparent={true} visible={deleteModal}>
    <View style={styles.confimationModal}>
      <View style={styles.deleteModalContent}>
        <TouchableOpacity onPress={()=>setDeleteModal(false)} style={{}}>
          <Image
          style={{ width:30,height:30,resizeMode:"cover" }}
          source={require('../../IconBin/close.png')}
        />
        </TouchableOpacity>
        <View style={{height:50}} />
        <Text style={{color:"white", fontSize:scaleFont(24)}}>Are you sure you want to delete your account?</Text>
        <View style={{height:100}} />
        <TouchableOpacity onPress={deleteAccount} style={{...styles.whatIsARLButton, backgroundColor:"#b00000"}}>
          <Text style={{...styles.loginbuttonText, color:"#1c1c1c"}}>DELETE ACCOUNT!</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  )
}


    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            style={styles.popUpModal}
        >
            <View style={{...styles.changeCredsWrapper}}>
                <TouchableOpacity onPress={()=>handleGoBack()} style={styles.closeUploaderButton}>
                    <Text style={styles.backHeaderText}>⇦Go Back</Text>
                </TouchableOpacity>
                <View style={{padding:10}}>
                    <View style={{height:10,}}></View>
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                        <Text style={styles.logintitle}>Change Credentials</Text>
                    </View>
                    <View style={{height:10}} />
                    {failureMessage&&(<View style={{height:30,width:"90%",backgroundColor:"rgba(255,0,0,0.5)", alignItems:"center", justifyContent:"center", borderColor:"#ff0000",borderWidth:2}}>
                    <Text style={{color:"#fff",fontSize:scaleFont(14)}}>!! {failureMessage} !!</Text>
                    </View>)}
                    {successMessage&&(<View style={{height:30,width:"90%",backgroundColor:"rgba(50,200,82,0.4)", alignItems:"center", justifyContent:"center", borderColor:"#32a852",borderWidth:2}}>
                    <Text style={{color:"#fff",fontSize:scaleFont(14)}}>!! {successMessage} !!</Text>
                    </View>)}
                    <View style={{height:10,}}></View>
                    <View style={styles.logininputContainer}>
                        <Text style={styles.loginlabel}>Enter new email</Text>
                        <TextInput autoCapitalize='none' onChangeText={(text)=>""} style={styles.logininput}  />
                    </View>
                    <TouchableOpacity onPress={()=>""} style={{...styles.loginbutton, marginTop:8, backgroundColor:"#656565"}}>
                        <Text style={styles.loginbuttonText}>Coming Soon..</Text>
                    </TouchableOpacity>
                    <View style={{height:60,}}></View>
                    <View style={styles.logininputContainer}>
                        <Text style={styles.loginlabel}>Enter new password</Text>
                        <TextInput onChangeText={(text)=>""} style={styles.logininput} secureTextEntry />
                    </View>
                    
                    <TouchableOpacity onPress={()=>""} style={{...styles.loginbutton, marginTop:8, backgroundColor:"#656565"}}>
                        <Text style={styles.loginbuttonText}>Coming Soon..</Text>
                    </TouchableOpacity>
                    <View style={{height:100,}}></View>
                    <TouchableOpacity onPress={handleDeleteButton} style={{...styles.whatIsARLButton, backgroundColor:"#b00000"}}>
                      <Text style={{...styles.loginbuttonText, color:"#1c1c1c"}}>DELETE ACCOUNT</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <DeleteConfirmation />
            {loadingBool&&(
                <LoadingOverlay isVisible={loadingBool} />
            )}
        </Modal>
    )
}

export default UserPassPopup