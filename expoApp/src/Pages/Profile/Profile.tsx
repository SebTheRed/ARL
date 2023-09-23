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
    Dimensions,
} from 'react-native'
import React from 'react'
import FeedPost from '../Feed/FeedPost';
import { useEffect, useState } from 'react';
import { useFeed } from '../../Contexts/FeedContext';
import {getStorage,ref, getDownloadURL} from 'firebase/storage';
// import FeedPost from './FeedPost';
import {db, auth,} from '../../Firebase/firebase'
import {setDoc,doc,addDoc,getDoc,deleteDoc, Timestamp, updateDoc, arrayUnion} from 'firebase/firestore'
import styles from '../../styles'
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useProfilePageUID } from '../../Contexts/ProfilePageUID';
import { useUserData } from '../../Contexts/UserDataContext';
import { useUID } from '../../Contexts/UIDContext';
import { useLastPage } from '../../Contexts/LastPageContext';
import {useCurrentTraitStat} from '../../Contexts/CurrentTraitStat'
import {useFriends} from '../../Contexts/FriendsContext'
import { useGameRules } from '../../Contexts/GameRules';
import {scaleFont} from '../../Utilities/fontSizing'


// const screenWidth = Dimensions.get('window').width;
const Profile = ():JSX.Element => {
    // const navigation = useNavigation();
    const navigation = useNavigation<any>();
    const {friendsRefresh,setFriendsRefresh}:any = useFriends()
    const {setLastPage}:any = useLastPage()
    const { currentFeed, refreshFeed, paginateFeed }:any = useFeed();
    const {setCurrentTraitTitle}:any = useCurrentTraitStat()
    const {skillsList, levelScale, trophyData}:any = useGameRules()
    const {matchingProfileData,refreshProfileFeed, profilePageUID, setProfilePageUID, profileFeed}:any = useProfilePageUID()
    const {userData}:any = useUserData()
    const {uid}:any = useUID()
    const [buttonType,setButtonType] = useState("")
    const [matchedTrophyPins,setMatchedTrophyPins] = useState([{},{},{}])
    const [profilePicState,setProfilePicState] = useState<any>(null)
    const [coverPicState,setCoverPicState] = useState<any>(null)
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    const [relation,setRelation] = useState("")
    
    useEffect(()=>{
        // console.log(matchingProfileData)
        const trophyPinTitles = matchingProfileData.trophyPins
        let passThruArray = [{},{},{}]
        trophyPinTitles.map((title:string,i:number)=>{
            // console.log("in de loop")
            Object.values(trophyData).map((trophy:any)=>{
                if (title === trophy.title){
                    passThruArray[i] = trophy
                    // console.log(trophy)
                }
            })
        if (Object.keys(passThruArray[i]).length === 0) {passThruArray.push()}
        })
        // console.log(passThruArray)
        setMatchedTrophyPins(passThruArray)
    },[userData])
    useEffect(()=>{
        const translateURL = async () => {
            setIsLoading(true); // Set loading state to true before fetching
            const storage = getStorage();
            const pathRef = ref(storage, matchingProfileData.picURL);
            const coverPathRef = ref(storage, matchingProfileData.coverURL);
            const profilePicUrl = await getDownloadURL(pathRef);
            const coverPicUrl = await getDownloadURL(coverPathRef);
            setProfilePicState(profilePicUrl);
            setCoverPicState(coverPicUrl);
            setIsLoading(false); // Set loading state to false after fetching
        };
        translateURL()
    },[matchingProfileData])
    useEffect(()=>{
        const checkFriendStatus = async () => {
            const sortedUIDString = [uid, profilePageUID].sort().join('_'); 
            const docRef1 = doc(db, "friendships", sortedUIDString);
            const docSnap1 = await getDoc(docRef1);
            if (docSnap1.exists()) {
              const friendshipData = docSnap1.data();
              console.log("Friendship data:", friendshipData);
              if (friendshipData.pending===true){setRelation("pending")}
              if (friendshipData.pending===false){setRelation("friends")}
              if (friendshipData.blocked===true){
                setRelation("blocked")
                navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [
                        {
                          name: 'AuthedApp', 
                          state: {
                            routes: [
                              {
                                name: 'Search', // NEED TO TEST BLOCKING TO ENSURE THIS WORKS!!!
                              },
                            ],
                          },
                        },
                      ],
                    })
                  );
            }
            } else {
              console.log("No such friendship exists.");
              setRelation("none")
              // Add your logic here for when no friendship exists
            }
          };
        if (uid != profilePageUID) {checkFriendStatus()} else (setRelation("self"))
    },[friendsRefresh])
    const handleRefresh = async () => {
	  setRefreshing(true);
	  await refreshProfileFeed();
	  setRefreshing(false);
	};
    const handleEditButtonPress = () => {
        navigation.navigate("EditProfile")
    }
    const handleAddFriendPress = async() => {
        const sortedUIDString = [uid, profilePageUID].sort().join('_');
        try{
            await setDoc(doc(db,"friendships",sortedUIDString), 
            {
                requestingUser:uid,
                receivingUser:profilePageUID,
                blocked:false,
                pending:true,
                timestamp: new Date().toISOString()
            })
            setFriendsRefresh((prevState:boolean)=>!prevState)
        }catch(error){console.error(error)}

    }
    const handleRemoveFriendPress = async() => {
        const sortedUIDString = [uid, profilePageUID].sort().join('_');
        try{
            await deleteDoc(doc(db,"friendships",sortedUIDString))
            setFriendsRefresh((prevState:boolean)=>!prevState)
        }catch(error){console.error(error)}
        
        
    }
    const handleBlockPersonPress = async() => {
        const sortedUIDString = [uid, profilePageUID].sort().join('_');
        try{
            await setDoc(doc(db,"friendships",sortedUIDString), 
            {
                requestingUser:uid,
                receivingUser:profilePageUID,
                blocked:true,
                pending:false,
                timestamp: new Date().toISOString()
            })
            await updateDoc(doc(db,`users/${uid}`), {blockedUsers:arrayUnion(profilePageUID)})
            setFriendsRefresh((prevState:boolean)=>!prevState)
        }catch(error){console.error(error)}
    }
    const handleTraitStatsPress = (traitName:String) => {
        setLastPage("profile")
        navigation.navigate("ProfileStats")
        setCurrentTraitTitle(traitName)
    }
  
	// const handleLoadMore = () => {
	//   paginateFeed(startAfter)
	// };


    const calculateCurrentLevel = (skillName: string) => {
        const currentXP = matchingProfileData.xpData[skillName]; // Assuming skillData.title is 'Family', 'Friends', etc.
        let level = 1;
        for (const [lvl, xp] of Object.entries(levelScale) as [string,number][]) {
          if (currentXP >= xp) {
            level = parseInt(lvl);
          } else {
            break;
          }
        }
        return level;
      };


      const MultiButtonSplitter = ():JSX.Element => {
        switch(relation){
            case "self": return(
            <TouchableOpacity onPress={handleEditButtonPress} style={styles.profilePageMultiButton}>
                <Image style={styles.profilePageButtonIcon} source={require('../../IconBin/edit.png')} />
                <Text style={styles.postTopButtonText}>Edit Profile</Text>
            </ TouchableOpacity>
            
            )
            case "none": return(
            <View style={{flexDirection:"row", justifyContent:"flex-end",alignItems:"center"}}>
                <TouchableOpacity onPress={handleAddFriendPress} style={{...styles.profilePageMultiButton, width:100}}>
                    <Image style={styles.profilePageButtonIcon} source={require('../../IconBin/friendAdd.png')} />
                    <Text style={styles.postTopButtonText}>Add Friend</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleBlockPersonPress} style={{...styles.profilePageMultiButton, width:25, borderColor:"#fe0000", backgroundColor:"rgba(255, 0, 0, 0.3)"}}>
                    <Image style={{...styles.profilePageButtonIcon, tintColor:"#fe0000"}} source={require('../../IconBin/block.png')} />
                </TouchableOpacity>
            </View>
            )
            case "pending": return(
            <View style={{flexDirection:"row", justifyContent:"flex-end",alignItems:"center"}}>
                <View style={{...styles.profilePageMultiButton,width:100}}>
                    <Text style={styles.postTopButtonText}>Pending. . .</Text>
                </ View>
                <TouchableOpacity onPress={handleBlockPersonPress} style={{...styles.profilePageMultiButton, width:25, borderColor:"#fe0000", backgroundColor:"rgba(255, 0, 0, 0.3)"}}>
                    <Image style={{...styles.profilePageButtonIcon, tintColor:"#fe0000"}} source={require('../../IconBin/block.png')} />
                </TouchableOpacity>
            </View>
            )
            case "friends": return(
        <View style={{flexDirection:"row", justifyContent:"flex-end",alignItems:"center"}}>
            <View style={{...styles.profilePageMultiButton, width:100}}>
                <Image style={{...styles.profilePageButtonIcon}} source={require('../../IconBin/verified.png')} />
                <Text style={{...styles.postTopButtonText}}>Friends</Text>
            </ View>
            <TouchableOpacity onPress={handleRemoveFriendPress} style={{...styles.profilePageMultiButton, width:25, borderColor:"#fe0000"}}>
                <Image style={{...styles.profilePageButtonIcon, tintColor:"#fff"}} source={require('../../IconBin/friendRemove.png')} />
            </TouchableOpacity>
        </View>
            )
            default:return(<Text>Sorry?</Text>)
        }
      }


    const ProfileHeader = ():JSX.Element => {
        return(
    <View style={styles.profilePageContainer}>
        <View style={{...styles.profilePageCover}}>
            {(coverPicState && !isLoading)&&(<Image style={styles.profilePageCoverPicture} source={{uri:coverPicState}} />)}
        </View>
        
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
                {(profilePicState&&!isLoading)&&(<Image style={styles.profilePagePicture} source={{uri: profilePicState}} />)}
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
            {skillsList && typeof skillsList === 'object' ? 
                Object.values(skillsList)
                .sort((a: any, b: any) => a.order - b.order)
                .map((d: any, i: number) => {
                const currentLevel = calculateCurrentLevel(d.title.toLowerCase(), )
                return(
                    <TouchableOpacity onPress={()=>handleTraitStatsPress(d.title)} style={{...styles.profilePageTraitBox, backgroundColor:d.color}} key={i}>
                        {/* <Text style={styles.profilePageTraitTitle}>{data.title}</Text> */}
                        <Text style={{...styles.borderedText, color:"#1c1c1c", fontSize:scaleFont(25), fontWeight:"bold"}}>{currentLevel}</Text>
                        {/* <Text style={{...styles.borderedTextShadow, fontSize:25,fontWeight:"bold", color:"#fff"}}>{currentLevel}</Text> */}
                    </TouchableOpacity>
                )})
            : null}
            </View>
            
        </View>

    </View>
        )
    }

    if (matchingProfileData){
        
    }
    return(
    <>
    {(relation!="blocked")&&(
        <FlatList
		data={profileFeed}
        ListHeaderComponent={<ProfileHeader />}
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
		  />}
        />
    )}
    </>
       
    )


    
}

export default Profile