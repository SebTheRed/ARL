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
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles'
import {db, auth} from '../../Firebase/firebase'
import {getAuth, updateEmail, updatePassword} from "firebase/auth"
import {updateDoc,doc} from 'firebase/firestore'
import { scaleFont } from '../../Utilities/fontSizing';

const UserPassPopup = ():JSX.Element => {
const navigation = useNavigation<any>();
const [emailInput,setEmailInput] = useState<string>()
const [passwordInput,setPasswordInput] = useState<string>()
const [deleteModal,setDeleteModal] = useState<boolean>(false)

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

            } catch(error){
                console.error('ERROR EMAIL NOT RESET: ', error)
            }
        break;
        case"password":
            try{

            }catch(error){
                console.error("ERROR PASSWORD NOT RESET: ", error)
            } 
        break;
    }
}
const deleteAccount = () => {
  
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
                <View style={{padding:40}}>
                    <View style={{height:10,}}></View>
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                        <Text style={styles.logintitle}>Change Credentials</Text>
                    </View>
                    <View style={{height:10,}}></View>
                    <View style={styles.logininputContainer}>
                        <Text style={styles.loginlabel}>Enter new email</Text>
                        <TextInput autoCapitalize='none' onChangeText={(text)=>""} style={styles.logininput}  />
                    </View>
                    <TouchableOpacity onPress={()=>handleChangeCredentials("email")} style={{...styles.loginbutton, marginTop:8}}>
                        <Text style={styles.loginbuttonText}>Change email</Text>
                    </TouchableOpacity>
                    <View style={{height:60,}}></View>
                    <View style={styles.logininputContainer}>
                        <Text style={styles.loginlabel}>Enter new password</Text>
                        <TextInput onChangeText={(text)=>""} style={styles.logininput} secureTextEntry />
                    </View>
                    
                    <TouchableOpacity onPress={()=>""} style={{...styles.loginbutton, marginTop:8}}>
                        <Text style={styles.loginbuttonText}>Change password</Text>
                    </TouchableOpacity>
                    <View style={{height:100,}}></View>
                    <TouchableOpacity onPress={handleDeleteButton} style={{...styles.whatIsARLButton, backgroundColor:"#b00000"}}>
                      <Text style={{...styles.loginbuttonText, color:"#1c1c1c"}}>DELETE ACCOUNT</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <DeleteConfirmation />
        </Modal>
    )
}

export default UserPassPopup