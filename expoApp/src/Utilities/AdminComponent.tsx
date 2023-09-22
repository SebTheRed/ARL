import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Image,
  } from 'react-native';
import styles from '../styles';
import { scaleFont } from './fontSizing';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
const AdminComponent = ({route}:any):JSX.Element => {
    const {XPScale,skillsList,trophyData,XPTriggerEvents} = route.params;

    const pushDataToFirestore = async(val:string) => {
        console.log("BEGINNING PUSH OF:", val)
        switch(val){
            case "levelScale":
                try {
                    await setDoc(doc(db,"gameRules/", "levelScale"), XPScale)
                    .then(() => {
                        console.log("Post Success!");
                        // Go back to the root navigator
                        
                        })
                } catch(err){
                    console.error("Post failed to post",err)
                }
            break;
            case "skillsList":
                try {
                    await setDoc(doc(db,"gameRules/", "skillsList"), skillsList)
                    .then(() => {
                        console.log("Post Success!");
                        // Go back to the root navigator
                        
                        })
                } catch(err){
                    console.error("Post failed to post",err)
                }
            break;
            case "trophyData":
                try {
                    await setDoc(doc(db,"gameRules/", "trophyData"), trophyData)
                    .then(() => {
                        console.log("Post Success!");
                        // Go back to the root navigator
                        
                        })
                } catch(err){
                    console.error("Post failed to post",err)
                }
            break;
            case "experiencesList":
                try {
                    await setDoc(doc(db,"gameRules/", "experiencesList"), XPTriggerEvents)
                    .then(() => {
                        console.log("Post Success!");
                        // Go back to the root navigator
                        
                        })
                } catch(err){
                    console.error("Post failed to post",err)
                }
            break;
            default: console.warn("wtf")
        }
    }

    return(
    <View style={{...styles.defaultPageBackground,justifyContent:'space-evenly'}}>
        <TouchableOpacity onPress={()=>pushDataToFirestore("levelScale")} style={{width:"95%",height:60,backgroundColor:"#00ff00",borderRadius:5, padding:10,}}>
            <Text style={{color:"#1c1c1c",fontSize:scaleFont(24)}}>Update XPScale</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>pushDataToFirestore("skillsList")} style={{width:"95%",height:60,backgroundColor:"#ffff00",borderRadius:5, padding:10}}>
            <Text style={{color:"#1c1c1c",fontSize:scaleFont(24)}}>Update skillsList</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>pushDataToFirestore("trophyData")} style={{width:"95%",height:60,backgroundColor:"#00ffff",borderRadius:5, padding:10}}>
            <Text style={{color:"#1c1c1c",fontSize:scaleFont(24)}}>Update trophyData</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>pushDataToFirestore("experiencesList")} style={{width:"95%",height:60,backgroundColor:"#ff00ff",borderRadius:5, padding:10}}>
            <Text style={{color:"#1c1c1c",fontSize:scaleFont(24)}}>Update XPTriggerEvents</Text>
        </TouchableOpacity>
    </View>
    )
}

export default AdminComponent