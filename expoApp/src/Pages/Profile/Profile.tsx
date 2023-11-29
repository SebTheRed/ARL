import {
	Text,
	View,
	Image,
	TouchableOpacity,
	FlatList,
	RefreshControl,
  ActivityIndicator
} from 'react-native'
import React from 'react'
import FeedPost from '../Feed/FeedPost';
import { useEffect, useState } from 'react';

// import FeedPost from './FeedPost';
import {db,} from '../../Firebase/firebase'
import {setDoc,doc,getDoc,deleteDoc, updateDoc, arrayUnion, increment} from 'firebase/firestore'
import styles from '../../styles'
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useProfilePageUID } from '../../Contexts/ProfilePageUID';
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
import TotalLevelSVG from '../../IconBin/SkillIcons/total_level.svg'
import TrophySVG from '../../IconBin/svg/trophy.svg'
import TrophyPost from '../Feed/TrophyPost';
import { useUserData } from '../../Contexts/UserDataContext';

// const screenWidth = Dimensions.get('window').width;
const Profile = ():JSX.Element => {
    // const navigation = useNavigation();
    const navigation = useNavigation<any>();
    const {friendsData,refreshFriendsList}:any = useFriends()
    const {setLastPage}:any = useLastPage()
    const {setCurrentTraitTitle}:any = useCurrentTraitStat()
    const {gameRules}:any = useGameRules()
    const {profilePageData}:any = useProfilePageUID()
    const {uid}:any = useUID()
    const {userLevels}:any = useUserData()
    const [refreshing, setRefreshing] = useState(false);
    const [relation,setRelation] = useState("");

    useEffect(()=>{
      if (!profilePageData.loading ) {
        const checkFriendStatus = async () => {
          const sortedUIDString = [uid, profilePageData.profilePageUID].sort().join('_'); 
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
      if (uid != profilePageData.profilePageUID) {checkFriendStatus()} else (setRelation("self"))
      }
        


    },[friendsData,profilePageData.loading])

  const handleTrophyCasePress = () => {
    navigation.navigate("TrophyCase")
  }

  const handleRefresh = async () => {
	  // setRefreshing(true);
	  // await refreshProfileFeed();
	  // setRefreshing(false);
	};
    const handleEditButtonPress = () => {
        navigation.navigate("EditProfile")
    }
    const handleAddFriendPress = async() => {
        const sortedUIDString = [uid, profilePageData.profilePageUID].sort().join('_');
        try{
            await setDoc(doc(db,"friendships",sortedUIDString), 
            {
                requestingUser:uid,
                receivingUser:profilePageData.profilePageUID,
                blocked:false,
                pending:true,
                timestamp: new Date().toISOString()
            })
            refreshFriendsList()
        }catch(error){console.error(error)}

    }
    const handleRemoveFriendPress = async() => {
        const sortedUIDString = [uid, profilePageData.profilePageUID].sort().join('_');
        try{
            await deleteDoc(doc(db,"friendships",sortedUIDString))
            const reqUserRef = doc(db,"users",profilePageData.profilePageUID)
            const respUserRef = doc(db,"users",uid)
            await updateDoc(reqUserRef, {
              friendCount: increment(-1)
            })
            await updateDoc(respUserRef, {
              friendCount: increment(-1)
            })
            refreshFriendsList()
        }catch(error){
          console.error(error)
        }
        
        
    }
    const handleBlockPersonPress = async() => {
        const sortedUIDString = [uid, profilePageData.profilePageUID].sort().join('_');
        try{
            await setDoc(doc(db,"friendships",sortedUIDString), 
            {
                requestingUser:uid,
                receivingUser:profilePageData.profilePageUID,
                blocked:true,
                pending:false,
                timestamp: new Date().toISOString()
            })
            await updateDoc(doc(db,`users/${uid}`), {blockedUsers:arrayUnion(profilePageData.profilePageUID)})
            refreshFriendsList()
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
            default:return(<View/>)
        }
      }


const ProfileHeader = ():JSX.Element => {
    return(
<>
    <View style={styles.profilePageContainer}>
    <View style={{...styles.profilePageCover}}>
        <Image 
            style={[styles.profilePageCoverPicture]} 
            source={{ uri: profilePageData.coverPicUrl }} 
        />
    </View>
        
      <View style={styles.profilePageTopContainer}>
        <View style={styles.profilePageTopLeftContainer}>
            <TouchableOpacity onPress={handleTrophyCasePress} style={styles.profilePageMultiButton}>
                <Text style={styles.postTopButtonText}>Trophy Case</Text>
                <TrophySVG width={scaleFont(25)} height={scaleFont(25)} />
            </ TouchableOpacity>
        </View>
        <View style={styles.profilePagePictureBox}>
            <Image 
                style={[styles.profilePagePicture]} 
                source={{ uri: profilePageData.profilePicUrl }} 
            />
        </View>
        <View style={styles.profilePageMultiBox}>
            <MultiButtonSplitter />
        </View>
      </View>
      <View style={styles.profilePageNamesContainer}>
          <Text style={styles.profilePageUserName}>@{profilePageData.matchingProfileData.userName}</Text>
          <Text style={styles.profilePageRealName}>{profilePageData.matchingProfileData.name}</Text>
      </View>
      <View style={styles.profilePageStatsContainer}>









        <View style={styles.profilePageStatsTop}>
          <View style={styles.profilePageFriendsContainer}>
              <View style={{flexDirection:"row"}}>
                <StreakSVG width={scaleFont(30)} height={scaleFont(30)} />
                <Text style={{...styles.postTopStreak, fontSize:scaleFont(24)}}> {profilePageData.matchingProfileData.streak.toLocaleString()}</Text>
              </View>
              <View style={{flexDirection:"row"}}>
                <TotalLevelSVG width={scaleFont(30)} height={scaleFont(30)} />
                <Text style={{...styles.postTopStreak, fontSize:scaleFont(24)}}> {profilePageData.userLevels.totalLevel.toLocaleString()}</Text>
              </View>
          </View>
          <View style={{width:"20%"}} />
          <View style={styles.profilePageJoinDateContainer}>
              <View style={{flexDirection:"row"}}>
                <Text style={{...styles.postTopStreak, fontSize:scaleFont(24)}}> {profilePageData.matchingProfileData.friendCount} </Text>
                <FriendsSVG width={scaleFont(30)} height={scaleFont(30)} />
              </View>
              <View style={{flexDirection:"row"}}>
                <Text style={{...styles.postTopStreak,fontSize:scaleFont(24)}}>{profilePageData.matchingProfileData.accountCreationDate}</Text>
                <CalendarSVG width={scaleFont(30)} height={scaleFont(30)} />
              </View> 
          </View>
      </View>
        <View style={styles.profilePageStatsbottom}>
          {Object.values(gameRules.skillsList)
          .sort((a: any, b: any) => a.order - b.order)
          .map((d:any,i:number)=>{
              console.log("current item being mapped:", d)
              return(
                  <TouchableOpacity onPress={()=>handleTraitStatsPress(d.title)} style={{...styles.profilePageTraitBox, backgroundColor:d.color}} key={i}>
                      {/* <Text style={styles.profilePageTraitTitle}>{data.title}</Text> */}
                      <Text allowFontScaling={false} style={{...styles.borderedText, color:"#1c1c1c", fontSize:scaleFont(25), fontWeight:"bold"}}>{profilePageData.userLevels[d.title.toLowerCase()]}</Text>
                      {/* <Text style={{...styles.borderedTextShadow, fontSize:25,fontWeight:"bold", color:"#fff"}}>{currentLevel}</Text> */}
                  </TouchableOpacity>
              )
          })}
        </View>
      </View>
    </View>   
</>)}

const FeedPostSplitter = ({data, voteLock}:any):JSX.Element => {
  // console.log("DATA BEING PASSED THRU FEED POST SPLITTER", data.type)
  if (relation == "friends" || relation == "self") {
    if (data.type == "trophy") {
      return(<TrophyPost data={data} voteLock={voteLock} />)
    } else {
      return(<FeedPost data={data} voteLock={voteLock} />)
    }
  } else {
    return(
      <View style={{height:500}}>
        <Text style={{color:"#656565", fontSize:scaleFont(16)}}>You must be friends with {profilePageData.matchingProfileData.userName} to see their Profile Feed.</Text>
      </View>
    )
  }

}


    return(
    <>
        {profilePageData.loading ? (
        <LoadingOverlay isVisible={profilePageData.loading} opacity={1} text={"Loading. . ."}/>
        ) : (
          <FlatList
          data={profilePageData.profileFeed}
          ListHeaderComponent={<ProfileHeader />}
          renderItem={({ item }) => <FeedPostSplitter voteLock={(userLevels.totalLevel >= 11 ? false : true)} data={item} />}
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
        )
      }

       
        
    </>
       
    )


    
}

export default Profile