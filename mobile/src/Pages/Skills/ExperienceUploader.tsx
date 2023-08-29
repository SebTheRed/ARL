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
    Modal,
  } from 'react-native';
  import React from 'react'
  import {useCurrentEvent} from '../../Contexts/CurrentEventContext'
  import { NavigationRouteContext, useNavigation } from '@react-navigation/native';
  import { NavigationProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import styles from '../../styles'
import type {PropsWithChildren} from 'react';
import {db, auth,} from '../../Firebase/firebase'
import {doc, getDoc} from 'firebase/firestore'
import { useUserData } from '../../Contexts/UserDataContext';
import LinearGradient from 'react-native-linear-gradient';

type RootStackParamList = {
    SkillsPage:undefined,
}
const ExperienceUploader = ():JSX.Element => {
    const {currentEvent, setCurrentEvent}:any = useCurrentEvent()
    const [utilityType,setUtilityType] = useState(undefined)
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    useEffect(()=>{
        setUtilityType(currentEvent.type)
        console.log("expUpload")
        console.log(currentEvent)
    },[])
    

    const handleGoBack = () => {
        const skillName = currentEvent.skillTitle
        console.log(skillName)
        navigation.navigate(currentEvent.skillTitle)
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

export default ExperienceUploader