import {
    ScrollView,
    View,
    TouchableOpacity,
    Text
  } from 'react-native';
import styles from '../../styles'
import React, {useState,useEffect} from 'react';
import TrophyBox from './TrophyBox';
import { useGameRules } from '../../Contexts/GameRules';
import { useUserData } from '../../Contexts/UserDataContext';
import { calculateUserLevels } from '../../Utilities/LevelCalculator';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';
import { useUID } from '../../Contexts/UIDContext';
import PostModal from '../Profile/PostModal';


const Trophies = ():JSX.Element => {
  const {uid}:any = useUID()
  const {userData, userTrophies, userLevels}:any = useUserData()
  const { gameRules }:any = useGameRules()
  const [postData,setPostData] = useState<any>()
  const [bronzeLock,setBronzeLock]=useState<boolean>(true)
  const [silverLock,setSilverLock]=useState<boolean>(true)
  const [goldLock,setGoldLock]=useState<boolean>(true)

useEffect(()=>{
  console.log(userLevels)
  if (userLevels.totalLevel >= 50) {setBronzeLock(false)}
  if (userLevels.totalLevel >= 100) {setSilverLock(false)}
  if (userLevels.totalLevel >= 200) {setGoldLock(false)}
},[])

const isTrophyLocked = (tier:string) => {
  switch(tier){
    case "bronze":
      return bronzeLock
    case "silver":
      return silverLock
    case "gold":
      return goldLock
  }
}

const openPost = async(postID:string) => {
  if (postID != "") {
    // console.log(postID)
    try {
      const trophyPostDocRef = doc(db,"users",uid,"trophyPosts",postID)
      const trophySnap = await getDoc(trophyPostDocRef)
      setPostData(trophySnap.data())
    } catch(err) {
      console.error(err)
    }

    }
}

const trophyStatus = (trophyTitle:string) => {
  const foundTrophy = userTrophies.find((uTrophy:any) => uTrophy.trophyTitle === trophyTitle);

  if (foundTrophy) {
    if (foundTrophy.status === "pending") {
      return {
        status:"pending"
      };
    } else if (foundTrophy.status === "achieved") {
      return {
        status:"achieved",
        data:foundTrophy,
      };
    }
  }

  return {status:"none"};
};


	return(
    <>
      {!postData && <ScrollView horizontal={true} style={{...styles.backgroundStyle}}>
        <View style={{...styles.trophyBoxWrapper, paddingTop:5}}>
          {['bronze', 'silver', 'gold'].map(category => 
            gameRules.trophyData[category].map((data:any) => {
              const locked = isTrophyLocked(category);
              const status = trophyStatus(data.title);
              return <TrophyBox status={status} locked={locked} d={data} key={data.title} openPost={openPost}/>;
            })
          )}
        </View>    
      </ScrollView>
      }
      {postData && <PostModal data={postData} setData={setPostData} />}
    </>
	)
}

export default Trophies