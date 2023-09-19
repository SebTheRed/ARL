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

const UserPassPopup = ():JSX.Element => {
const navigation = useNavigation<any>();
const [emailInput,setEmailInput] = useState(String)
const [passwordInput,setPasswordInput] = useState(String)

const handleGoBack = () => {
    navigation.navigate("EditProfile")
}
const handleChangeCredentials = async(text:string) => {
    const auth = getAuth()
    const currentUser = auth.currentUser
    if (!currentUser) {
        console.error('NO CURRENT USER?!')
        return;
    }
    switch(text){
        case"email":
            try{
                updateEmail(currentUser, emailInput).then(()=>{
                    console.log(`Email successfully updated to ${emailInput}`)
                })
            } catch(error){
                console.error('ERROR EMAIL NOT RESET: ', error)
            }
        break;
        case"password":
            try{
                updatePassword(currentUser, passwordInput).then(()=>{
                    console.log(`Email successfully updated to ${passwordInput}`)
                })
            }catch(error){
                console.error("ERROR PASSWORD NOT RESET: ", error)
            } 
        break;
    }
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
				{/* <TouchableOpacity onPress={signIn} style={styles.whatIsARLButton}>
					<Text style={styles.loginbuttonText}>what's arl ?</Text>
				</TouchableOpacity> */}
                </View>
            </View>
        </Modal>
    )
}

export default UserPassPopup