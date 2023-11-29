import {
  ScrollView,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import styles from '../../styles'
import React, {useState,useEffect} from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';
import { useProfilePageUID } from '../../Contexts/ProfilePageUID';
import TrophySpot from './TrophySpot';
import { useNavigation } from '@react-navigation/native';
import PostModal from './PostModal';

const TrophyCase = ():JSX.Element => {
  const { profilePageData }:any = useProfilePageUID()
  const navigation = useNavigation<any>();
  const [sortedTrophies,setSortedTrophies] = useState<any[]>([])
  const [postData,setPostData] = useState<any>()


  useEffect(()=>{
    if (profilePageData.trophyList.length > 0) {
      // console.log('USER TROPHIES:', profilePageData.trophyList)
      const sortedTrophies = profilePageData.trophyList.sort((a:any,b:any)=>{
        const tierRank:any = {"gold":1,"silver":2,"bronze":3};
        return tierRank[a.tier] - tierRank[b.tier] || b.score - a.score
      })
      setSortedTrophies(sortedTrophies)
      // console.log('SORTED TROPHIES:', sortedTrophies)
    } else {
      setSortedTrophies([{
        id:"",
        score:"-",
        status:"achieved",
        svgPath: "certificate2.svg",
        timeStamp: "",
        trophyTitle:`No Trophies!` 
      }])
    }
  },[])

  const handlePostLoad = async(postID:string) => {
    if (postID != "") {
    // console.log(postID)
    try {
      const trophyPostDocRef = doc(db,"users",profilePageData.matchingProfileData.uid,"trophyPosts",postID)
      const trophySnap = await getDoc(trophyPostDocRef)
      setPostData(trophySnap.data())
    } catch(err) {
      console.error(err)
    }

    }
  }


  const handleGoBack = () => {
    navigation.navigate("Profile")
  }

  return(
    <>
    {!postData&&(
      <View style={{backgroundColor:"#1c1c1c", flexDirection:"column"}}>
      <TouchableOpacity onPress={()=>handleGoBack()} style={{...styles.closeUploaderButton, paddingTop: 20}}>
          <Text style={styles.backHeaderText}>⇦Go Back</Text>
      </TouchableOpacity>
        <ScrollView horizontal={true} style={{backgroundColor:"#1c1c1c", height:"100%"}}>
          <View style={{...styles.trophyBoxWrapper, paddingTop:5}}>
            {sortedTrophies.map(trophy => (
              <TrophySpot handlePostLoad={handlePostLoad} d={trophy} key={trophy.id} />
            ))}
          </View>    
        </ScrollView>
      </View>
    )}
    {postData&&(
      <PostModal data={postData} setData={setPostData}/>
    )}
    
    </>
  )
}

export default TrophyCase