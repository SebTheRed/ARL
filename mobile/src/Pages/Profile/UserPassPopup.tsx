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
import {db, auth,} from '../../Firebase/firebase'
import {updateDoc,doc} from 'firebase/firestore'

const UserPassPopup = ():JSX.Element => {
const navigation = useNavigation<any>();
const [emailInput,setEmailInput] = useState(String)
const [passwordInput,setPasswordInput] = useState(String)

const handleGoBack = () => {
    navigation.navigate("profile")
}






    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={true}>
            <View style={{...styles.expUploaderTop}}>
                <TouchableOpacity onPress={()=>handleGoBack()} style={styles.closeUploaderButton}>
                    <Text style={styles.backHeaderText}>⇦Go Back</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default UserPassPopup