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
	TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react'
import {getStorage,ref, getDownloadURL} from 'firebase/storage';
import styles from '../../styles';
const UserTile = ({userDoc}:any):JSX.Element => {
    const [isLoading,setIsLoading] = useState(true)
    const [profilePicState,setProfilePicState] = useState<any>(null)

    useEffect(()=>{
        const translateURL = async () => {
            setIsLoading(true); // Set loading state to true before fetching
            const storage = getStorage();
            const pathRef = ref(storage, userDoc.picURL);
            const profilePicUrl = await getDownloadURL(pathRef);
            setProfilePicState(profilePicUrl);
            setIsLoading(false); // Set loading state to false after fetching
        };
        translateURL()
    },[])


    return(
        <TouchableOpacity  style={{...styles.sectionContainer, width:"100%"}}>
            <View style={styles.sectionProfPicContainer}>
                <Image style={styles.sectionProfPic} source={{uri:profilePicState}} />
            </View>
            <View style={styles.sectionTextContainer}>
                <Text style={styles.sectionTitle}>{userDoc.userName}</Text>
                <Text style={styles.sectionDescription}>{userDoc.name}</Text>
                
            </View>
            <View style={{...styles.sectionLevelBox, backgroundColor:"red"}}>
                <View style={styles.offsetWrapper}>
                </View>
                <Text style={{...styles.borderedTextShadow, color: 'black',}}>1</Text>
                <Text style={{...styles.borderedText, color: 'white' }}>1</Text>
            </View>
        </TouchableOpacity>
    )
}
export default UserTile