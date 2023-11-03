import {
	Text,
	View,
	Image,
	TouchableOpacity,
	FlatList,
	RefreshControl,
} from 'react-native'
import React from 'react'
import FeedPost from '../Feed/FeedPost';
import { useEffect, useState } from 'react';
import {getStorage,ref, getDownloadURL} from 'firebase/storage';
// import FeedPost from './FeedPost';
import {db,} from '../../Firebase/firebase'
import {setDoc,doc,getDoc,deleteDoc, updateDoc, arrayUnion, increment} from 'firebase/firestore'
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
import LoadingOverlay from '../../Overlays/LoadingOverlay';
import EditSVG from '../../IconBin/svg/edit.svg'
import FriendsSVG from '../../IconBin/svg/friends.svg'
import FriendsAddSVG from '../../IconBin/svg/friendAdd.svg'
import FriendsRemoveSVG from '../../IconBin/svg/friendRemove.svg'
import BlockSVG from '../../IconBin/svg/block.svg'
import CalendarSVG from '../../IconBin/svg/calendar.svg'
import VerifiedSVG from '../../IconBin/svg/verified.svg'
import StreakSVG from '../../IconBin/svg/streak.svg'


// const screenWidth = Dimensions.get('window').width;
const Profile = ():JSX.Element => {
    // const navigation = useNavigation();
    const navigation = useNavigation<any>();
    const {friendsRefresh,setFriendsRefresh}:any = useFriends()
    const {setLastPage}:any = useLastPage()
    const {setCurrentTraitTitle}:any = useCurrentTraitStat()
    const {dataLoading,skillsList, levelScale, trophyData}:any = useGameRules()
    const {matchingProfileData,refreshProfileFeed, profilePageUID, setProfilePageUID, profileFeed}:any = useProfilePageUID()
    const {userData}:any = useUserData()
    const {uid}:any = useUID()
    const [matchedTrophyPins,setMatchedTrophyPins] = useState([{},{},{}])
    const [profilePicState,setProfilePicState] = useState<any>(null)
    const [coverPicState,setCoverPicState] = useState<any>(null)
    const [refreshing, setRefreshing] = useState(false);
    const [relation,setRelation] = useState("");
    const [currentLevels,setCurrentLevels] = useState<any>({})
    const [pageLoading,setPageLoading] = useState<boolean>(true)

    
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

         //Going to translate levels before the loading is finished.
    },[userData])
    useEffect(()=>{
      const calculateSkills = () => {
              const proxyObj:any = {}
              Object.values(skillsList)
              .sort((a: any, b: any) => a.order - b.order)
              .map((d: any, i: number) => {
              const skillLevel = calculateCurrentLevel(d.title.toLowerCase(),)
              proxyObj[d.title] = {...d, currentLevel:skillLevel}

          })
          console.log("proxy obj for user skills",proxyObj)
          setCurrentLevels(proxyObj)
        }
        calculateSkills()
    },[dataLoading, matchingProfileData])
    useEffect(()=>{
        const translateURL = async () => {
          const storage = getStorage();
          const pathRef = ref(storage, matchingProfileData.picURL);
          const coverPathRef = ref(storage, matchingProfileData.coverURL);
          const profilePicUrl = await getDownloadURL(pathRef);
          const coverPicUrl = await getDownloadURL(coverPathRef);
          setProfilePicState(profilePicUrl);
          setCoverPicState(coverPicUrl);

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
                                name: 'Search', 
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
            const reqUserRef = doc(db,"users",profilePageUID)
            const respUserRef = doc(db,"users",uid)
            await updateDoc(reqUserRef, {
              friendCount: increment(-1)
            })
            await updateDoc(respUserRef, {
              friendCount: increment(-1)
            })
            setFriendsRefresh((prevState:boolean)=>!prevState)
        }catch(error){
          console.error(error)
        }
        
        
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
                <EditSVG width={scaleFont(25)} height={scaleFont(25)} />
                <Text style={styles.postTopButtonText}>Edit Profile</Text>
            </ TouchableOpacity>
            
            )
            case "none": return(
            <View style={{flexDirection:"row", justifyContent:"flex-end",alignItems:"center"}}>
                <TouchableOpacity onPress={handleAddFriendPress} style={{...styles.profilePageMultiButton, width:100}}>
                    <FriendsAddSVG width={scaleFont(25)} height={scaleFont(25)} />
                    <Text style={styles.postTopButtonText}>Add Friend</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleBlockPersonPress} style={{...styles.profilePageMultiButton, width:25, borderColor:"#fe0000", backgroundColor:"rgba(255, 0, 0, 0.3)"}}>
                    <BlockSVG width={scaleFont(25)} height={scaleFont(25)} />
                </TouchableOpacity>
            </View>
            )
            case "pending": return(
            <View style={{flexDirection:"row", justifyContent:"flex-end",alignItems:"center"}}>
                <View style={{...styles.profilePageMultiButton,width:100}}>
                    <Text style={styles.postTopButtonText}>Pending. . .</Text>
                </ View>
                <TouchableOpacity onPress={handleBlockPersonPress} style={{...styles.profilePageMultiButton, width:25, borderColor:"#fe0000", backgroundColor:"rgba(255, 0, 0, 0.3)"}}>
                    <BlockSVG width={scaleFont(25)} height={scaleFont(25)} />
                </TouchableOpacity>
            </View>
            )
            case "friends": return(
        <View style={{flexDirection:"row", justifyContent:"flex-end",alignItems:"center"}}>
            <View style={{...styles.profilePageMultiButton, width:100}}>
                <VerifiedSVG width={scaleFont(25)} height={scaleFont(25)} />
                <Text style={{...styles.postTopButtonText}}>Friends</Text>
            </ View>
            <TouchableOpacity onPress={handleRemoveFriendPress} style={{...styles.profilePageMultiButton, width:25, borderColor:"#fe0000"}}>
                <FriendsRemoveSVG width={scaleFont(25)} height={scaleFont(25)} />
            </TouchableOpacity>
        </View>
            )
            default:return(<Text>Sorry?</Text>)
        }
      }


const ProfileHeader = ():JSX.Element => {
    return(
<>
    <View style={styles.profilePageContainer}>
      <View style={{...styles.profilePageCover}}>
        <Image onLoad={()=>setPageLoading(false)} style={styles.profilePageCoverPicture} source={{uri:coverPicState}} />
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
          <Image style={styles.profilePagePicture} source={{uri: profilePicState}} />
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
            <FriendsSVG width={scaleFont(30)} height={scaleFont(30)} />
              <Text style={{...styles.postTopStreak, fontSize:scaleFont(24)}}> {matchingProfileData.friendCount}</Text>
          </View>
          <View style={{width:"20%"}} />
          <View style={styles.profilePageJoinDateContainer}>

              <View style={styles.profilePageStreakContainer}>
                  <Text style={{...styles.postTopStreak}}>{matchingProfileData.streak.toLocaleString()}</Text>
                  <StreakSVG width={scaleFont(30)} height={scaleFont(30)} />
              </View>

              <Text style={{...styles.postTopStreak,fontSize:scaleFont(24)}}>{matchingProfileData.accountCreationDate}</Text>
              <CalendarSVG width={scaleFont(30)} height={scaleFont(30)} />
          </View>
      </View>
        {(Object.keys(currentLevels).length > 0)&&
        <View style={styles.profilePageStatsbottom}>
          {Object.values(currentLevels).map((d:any,i:number)=>{
              console.log("current item being mapped:", d)
              return(
                  <TouchableOpacity onPress={()=>handleTraitStatsPress(d.title)} style={{...styles.profilePageTraitBox, backgroundColor:d.color}} key={i}>
                      {/* <Text style={styles.profilePageTraitTitle}>{data.title}</Text> */}
                      <Text style={{...styles.borderedText, color:"#1c1c1c", fontSize:scaleFont(25), fontWeight:"bold"}}>{d.currentLevel}</Text>
                      {/* <Text style={{...styles.borderedTextShadow, fontSize:25,fontWeight:"bold", color:"#fff"}}>{currentLevel}</Text> */}
                  </TouchableOpacity>
              )
          })}
        </View>}
      </View>
    </View>   
</>)}


    return(
    <>
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
      <LoadingOverlay text={"Loading Profile"} isVisible={pageLoading} opacity={0.8}/>
    </>
       
    )


    
}

export default Profile