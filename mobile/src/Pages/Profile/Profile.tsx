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
} from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import { useFeed } from '../../Contexts/FeedContext';
// import FeedPost from './FeedPost';
import styles from '../../styles'
import { useProfilePageUID } from '../../Contexts/ProfilePageUID';
import { useUserData } from '../../Contexts/UserDataContext';
import { useUID } from '../../Contexts/UIDContext';

type TrophyDataObj = {
    title:string,
    tier:string,
    imgPath:undefined,
    desc:string,
    progressQTY:number,
}
type MatchingTrophyType = [
    {},{},{}
]

const Profile = ({route}:any):JSX.Element => {
    const {skillsList, XPScale, trophyData}:any = route.params;
    const {matchingProfileData, profilePageUID}:any = useProfilePageUID()
    const {userData}:any = useUserData()
    const {uid}:any = useUID()
    const [buttonType,setButtonType] = useState("")
    const [matchedTrophyPins,setMatchedTrophyPins] = useState([{},{},{}])
    
    useEffect(()=>{
        // console.log(matchingProfileData)
        const trophyPinTitles = matchingProfileData.trophyPins
        let passThruArray = [{},{},{}]
        trophyPinTitles.map((title:string,i:number)=>{
            console.log("in de loop")
            trophyData.map((trophy:TrophyDataObj)=>{
                if (title === trophy.title){
                    passThruArray[i] = trophy
                    console.log(trophy)
                }
            })
        if (Object.keys(passThruArray[i]).length === 0) {passThruArray.push()}
        })
        setMatchedTrophyPins(passThruArray)


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
    },[userData])

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
            <View style={styles.profilePageTopLeftContainer}>
                    {matchedTrophyPins.map((trophy:any,i:number)=>{
                        if (trophy.title == "") {
                            return(
                                <Text>+</Text>
                            )
                        }
                        return(
                            <TouchableOpacity key={i} style={styles.profilePageTrophyButton}>
                                <Image style={styles.profilePageTrophyPin} source={trophy.imgPath} />
                            </TouchableOpacity>
                        )
                    })}
                {/* <View style={styles.profilePageStreakContainer}>
                    <Image style={styles.postTopStreakIcon} source={require('../../IconBin/streak.png')} />
                    <Text style={{...styles.postTopStreak}}>69</Text>
                </View> */}
            </View>
            
            <View style={styles.profilePagePictureBox}>
                <Image style={styles.profilePagePicture} source={require('./mochi.png')} />
            </View>
            <View style={styles.profilePageMultiBox}>
                <TouchableOpacity style={styles.profilePageMultiButton}>
                    <MultiButtonSplitter />
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.profilePageNamesContainer}>
            <Text style={styles.profilePageUserName}>@{matchingProfileData.userName}</Text>
            <Text style={styles.profilePageRealName}>{matchingProfileData.name}</Text>
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