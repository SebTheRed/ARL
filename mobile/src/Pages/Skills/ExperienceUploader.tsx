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
    const [utilityType,setUtilityType] = useState("")
    const [text, setText] = useState('');

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
        setCurrentEvent({})
    }

    const LogAction = ():JSX.Element => {
        return(<Text>Log</Text>)
    }
    const ApiAction = ():JSX.Element => {
        return(<Text>Api</Text>)
    }
    const CameraAction = ():JSX.Element => {
        return(<Text>Camera</Text>)
    }
    const AccelerationAction = ():JSX.Element => {
        return(<Text>Acceleration</Text>)
    }
    const TimelineAction = ():JSX.Element => {
        return(<Text>Timeline</Text>)
    }


    const ActionSplitter = ():JSX.Element => {
        switch(utilityType){
            case "api": return(<ApiAction />)
            case "camera": return(<CameraAction />)
            case "log": return(<LogAction />)
            case "acceleration": return(<AccelerationAction />)
            case "timeline": return(<TimelineAction />)
            default:return(<LogAction />)
        }
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
                <View style={{...styles.actionBox,backgroundColor:''}}>
                    {/* This is where the camera button/start run button / etc would be */}
                </View>
                <View style={{...styles.logContainer}}>
                    <View style={{flexDirection:"row",justifyContent:"space-between",width:"90%"}}>
                        <Text style={{...styles.loginlabel}}>Write a log of the experience:</Text>
                        <Text style={{...styles.loginlabel, color:`${(text.length === 256)?"red":"white"}`}}>{text.length} / 256</Text>
                    </View>
                    <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="Type something"
                        placeholderTextColor="grey"
                        numberOfLines={10}
                        multiline={true}
                        onChangeText={(text) => setText(text)}
                        value={text}
                        maxLength={256}
                    />
                    
                </View>
            </View>
          
        </Modal>
    )
}

export default ExperienceUploader