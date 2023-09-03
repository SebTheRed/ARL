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
    SectionList,
} from 'react-native'
import React from 'react'
import FeedPost from '../Feed/FeedPost';
import { useEffect, useState } from 'react';
import { useFeed } from '../../Contexts/FeedContext';
// import FeedPost from './FeedPost';
import styles from '../../styles'
import { useNavigation } from '@react-navigation/native';
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


const Profile = ({route}:any):JSX.Element => {
    // const navigation = useNavigation();
    const navigation = useNavigation<any>();
    const { currentFeed, refreshFeed, paginateFeed }:any = useFeed();
    const {skillsList, XPScale, trophyData}:any = route.params;
    const {matchingProfileData,refreshProfileFeed, profilePageUID, setProfilePageUID, profileFeed}:any = useProfilePageUID()
    const {userData}:any = useUserData()
    const {uid}:any = useUID()
    const [buttonType,setButtonType] = useState("")
    const [matchedTrophyPins,setMatchedTrophyPins] = useState([{},{},{}])
    const [refreshing, setRefreshing] = useState(false);
    
    useEffect(()=>{
        // console.log(matchingProfileData)
        const trophyPinTitles = matchingProfileData.trophyPins
        let passThruArray = [{},{},{}]
        trophyPinTitles.map((title:string,i:number)=>{
            // console.log("in de loop")
            trophyData.map((trophy:TrophyDataObj)=>{
                if (title === trophy.title){
                    passThruArray[i] = trophy
                    // console.log(trophy)
                }
            })
        if (Object.keys(passThruArray[i]).length === 0) {passThruArray.push()}
        })
        // console.log(passThruArray)
        setMatchedTrophyPins(passThruArray)

        console.log("UID",uid,"PROF PAGE UID",profilePageUID)
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
    // useEffect(()=>{
	// 	setStartAfter(currentFeed[currentFeed.length - 1])
	// },[currentFeed])

    const handleRefresh = async () => {
	  setRefreshing(true);
	  await refreshProfileFeed();
	  setRefreshing(false);
	};
    const handleEditButtonPress = () => {
        navigation.navigate("EditProfile")
    }
    const handleAddFriendPress = () => {

    }
    const handleRemoveFriendPress = () => {

    }
  
	// const handleLoadMore = () => {
	//   paginateFeed(startAfter)
	// };


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
            <TouchableOpacity onPress={handleEditButtonPress} style={styles.profilePageMultiButton}>
                <Text style={styles.postTopButtonText}>Edit Profile</Text>
                <Image style={styles.postTopStreakIcon} source={require('../../IconBin/edit.png')} />
            </ TouchableOpacity>
            
            )
            case "Add": return(
            <TouchableOpacity style={styles.profilePageMultiButton}>
                <Text style={styles.postTopButtonText}>Add Friend</Text>
                <Image style={styles.postTopStreakIcon} source={require('../../IconBin/friendAdd.png')} />
            </ TouchableOpacity>
            )
            case "Remove": return(
            <TouchableOpacity style={styles.profilePageMultiButton}>
                <Text style={styles.postTopButtonText}>Remove Friend</Text>
                <Image style={styles.postTopStreakIcon} source={require('../../IconBin/friendRemove.png')} />
            </ TouchableOpacity>
            )
            default:return(<Text>Sorry?</Text>)
        }
      }


    const ProfileHeader = ():JSX.Element => {
        return(
    <View style={styles.profilePageContainer}>
        <View style={styles.profilePageCover}></View>
        
        <View style={styles.profilePageTopContainer}>
            <View style={styles.profilePageTopLeftContainer}>
                    {matchedTrophyPins.map((trophy:any,i:number)=>{
                        if (Object.keys(trophy).length == 0) {
                            return(
                                <TouchableOpacity key={i} style={styles.profilePageEmptyTrophyButton}>
                                    <View style={styles.profilePageEmptyTrophyPin}></View>
                                </TouchableOpacity>
                                
                            )
                        }
                        return(
                            <TouchableOpacity key={i} style={styles.profilePageTrophyButton}>
                                <Image style={styles.profilePageTrophyPin} source={trophy.imgPath} />
                            </TouchableOpacity>
                        )
                    })}
               
            </View>
            
            <View style={styles.profilePagePictureBox}>
                <Image style={styles.profilePagePicture} source={require('./mochi.png')} />
            </View>
            <View style={styles.profilePageMultiBox}>
                <MultiButtonSplitter />
            </View>
        </View>

        <View style={styles.profilePageNamesContainer}>
            <Text style={styles.profilePageUserName}>@{matchingProfileData.userName}</Text>
            <Text style={styles.profilePageRealName}>{matchingProfileData.name}</Text>
        </View>

        <View style={styles.profilePageStatsContainer}>
            <View style={styles.profilePageStatsTop}>
                <View style={styles.profilePageFriendsContainer}>
                    <Image style={styles.postTopStreakIcon} source={require('../../IconBin/friends.png')} />
                        <Text style={{...styles.postTopStreak}}>{matchingProfileData.friends.length.toLocaleString()}</Text>
                </View>
                 <View style={styles.profilePageStreakContainer}>
                    <Image style={styles.postTopStreakIcon} source={require('../../IconBin/streak.png')} />

                        <Text style={{...styles.postTopStreak}}>{matchingProfileData.streak.toLocaleString()}</Text>
                </View>
                <View style={styles.profilePageJoinDateContainer}>
                    <Text style={{...styles.postTopStreak}}>{matchingProfileData.accountCreationDate}</Text>
                    <Image style={styles.postTopStreakIcon} source={require('../../IconBin/calendar.png')} />
                </View>
            </View>
            <View style={styles.profilePageStatsbottom}>

                {skillsList.map((data:any,index:any)=>{
                    const currentLevel = calculateCurrentLevel(data.title.toLowerCase(), )
                    return(
                        <TouchableOpacity style={{...styles.profilePageTraitBox, backgroundColor:data.color}} key={index}>
                            {/* <Text style={styles.profilePageTraitTitle}>{data.title}</Text> */}
                            <Text style={{...styles.borderedText, color:"#1c1c1c", fontSize:25, fontWeight:"bold"}}>{currentLevel}</Text>
                            {/* <Text style={{...styles.borderedTextShadow, fontSize:25,fontWeight:"bold", color:"#fff"}}>{currentLevel}</Text> */}
                        </TouchableOpacity>
                    )
                })}
            </View>
            
        </View>

    </View>
        )
    }

    if (matchingProfileData){
        
    }
    return(
        <FlatList
		data={profileFeed}
		renderItem={({ item }) => <FeedPost skillsList={skillsList} data={item} />}
		keyExtractor={item => item.id.toString()}
		style={styles.feedFlatList}
		contentContainerStyle={{ alignItems: 'center' }}
		// onEndReached={handleLoadMore}
		// onEndReachedThreshold={0.1}
		scrollEventThrottle={150}
		refreshControl={
		  <RefreshControl
			refreshing={refreshing}
			onRefresh={handleRefresh}
			colors={['#FFF']}
			tintColor="#FFF"
		  />
		}
        ListHeaderComponent={<ProfileHeader />}
	  />
       
    )


    
}

export default Profile