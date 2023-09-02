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
	RefreshControl
} from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import { useFeed } from '../../Contexts/FeedContext';
// import FeedPost from './FeedPost';
import styles from '../../styles'
import { useProfilePageUID } from '../../Contexts/ProfilePageUID';
import { useUserData } from '../../Contexts/UserDataContext';
import { useUID } from '../../Contexts/UIDContext';

const Profile = ({route}:any):JSX.Element => {
    const {skillsList, XPScale}:any = route.params;
    const {matchingProfileData, profilePageUID}:any = useProfilePageUID()
    const {userData}:any = useUserData()
    const {uid}:any = useUID()
    const [buttonType,setButtonType] = useState("")
    
    useEffect(()=>{
        // console.log(matchingProfileData)
        if (uid == profilePageUID) {setButtonType("Edit")}
        else {
            // Get an array of all friend UIDs
            const friendUIDs = Object.keys(userData.friends);
        
            // Check if the current profile's UID is in the friendUIDs array
            if (friendUIDs.includes(matchingProfileData.uid)) {
              setButtonType("Remove");
            } else {
              setButtonType("Add");
            }
        }
    },[])

    const calculateCurrentLevel = (skillName: string) => {
        const currentXP = matchingProfileData.xpData[skillName]; // Assuming skillData.title is 'Family', 'Friends', etc.
        let level = 1;
        for (const [lvl, xp] of Object.entries(XPScale) as [string,number][]) {
          if (currentXP >= xp) {
            level = parseInt(lvl);
          } else {
            break;
          }
        }
        return level;
      };


      const MultiButtonSplitter = ():JSX.Element => {
        switch(buttonType){
            case "Edit": return(
            <>
                <Text style={styles.postTopButtonText}>Edit</Text>
                <Image style={styles.postTopStreakIcon} source={require('../../IconBin/edit.png')} />
            </>
            
            )
            case "Add": return(
            <>
                <Text style={styles.postTopButtonText}>Add Friend</Text>
                <Image style={styles.postTopStreakIcon} source={require('../../IconBin/friendAdd.png')} />
            </>
            )
            case "Remove": return(
            <Image style={styles.postTopStreakIcon} source={require('../../IconBin/friendRemove.png')} />
            )
            default:return(<Text>Sorry?</Text>)
        }
      }









    return(
    <ScrollView style={styles.profilePageContainer}>
        <View style={styles.profilePageCover}></View>
        
        <View style={styles.profilePageTopContainer}>
            <View style={styles.profilePageStreakContainer}>
                <Image style={styles.postTopStreakIcon} source={require('../../IconBin/streak.png')} />
				<Text style={{...styles.postTopStreak}}>69</Text>
            </View>
            <View style={styles.profilePagePictureBox}>
                <Image style={styles.profilePagePicture} source={require('./mochi.png')} />
            </View>
            <View style={styles.profilePageMultiBox}>
                <TouchableOpacity style={styles.profilePageMultiButton}>
                    <MultiButtonSplitter />
                </TouchableOpacity>
                {/* Some kind of switch logic here instead */}
            </View>
        </View>

        <View style={styles.profilePageNamesContainer}>
            <View style={styles.profilePageUserName}></View>
            <View style={styles.profilePageRealName}></View>
        </View>

        <View style={styles.profilePageStatsContainer}>
            <View style={styles.profilePageStatsTop}>
                <View style={styles.profilePageJoinDateContainer}>
                    {/*Icon & Date*/}
                </View>
                <View style={styles.profilePageFriendsContainer}>
                    {/*Icon & Date*/}
                </View>
            </View>
            <View style={styles.profilePageStatsbottom}>

                {skillsList.map((data:any,index:any)=>{
                    const currentLevel = calculateCurrentLevel(data.title.toLowerCase(), )
                    return(
                        <View style={{...styles.profilePageTraitBox, backgroundColor:data.color}} key={index}>
                            <Text style={styles.profilePageTraitNumber}>{currentLevel}</Text>
                        </View>
                    )
                })}
            </View>
            
        </View>
    </ScrollView>
    )
}

export default Profile