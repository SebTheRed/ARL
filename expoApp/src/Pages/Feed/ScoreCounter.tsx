import {
	Text,
	View,
	Image,
	TouchableOpacity,
} from 'react-native'
import { useUserData } from '../../Contexts/UserDataContext';
import React,{useEffect,useState} from 'react'
import { runTransaction,doc,updateDoc,onSnapshot } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';
import styles from '../../styles';
import { useUID } from '../../Contexts/UIDContext';
import CaratUp from '../../IconBin/svg/carat_up.svg'
import CaratDown from '../../IconBin/svg/carat_down.svg'
import { scaleFont } from '../../Utilities/fontSizing';


const ScoreCounter = ({data,voteLock}:any):JSX.Element => {
  const {uid}:any = useUID()
  const [score,setScore] = useState<number>(0)


  useEffect(() => {
    let postBucketType:string
    if (data.type == "trophy"){postBucketType="trophyPosts"}
    else {postBucketType="posts"}
    const postRef = doc(db, postBucketType, data.id);
  
    // Set up the onSnapshot listener
    const unsubscribe = onSnapshot(postRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const updatedData = docSnapshot.data();
        setScore(updatedData.score); // Update the score state variable
      }
    });
  
    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, [data.id]); // Dependency array with data.id to ensure the listener is set up once per post

  const handleUpvote = async () => {
    const postId = data.id;
    let postBucketType:string
    if (data.type == "trophy"){postBucketType="trophyPosts"}
    else {postBucketType="posts"}
    const postRef = doc(db, postBucketType, postId);
  
    try {
      await runTransaction(db, async (transaction) => {
        const postDoc = await transaction.get(postRef);
  
        if (!postDoc.exists()) {
          console.warn('Post does not exist!');
          return;
        }
  
        const postData = postDoc.data();
        const upvotes = postData.upvotes || [];
        const downvotes = postData.downvotes || [];
  
        // Check if the user has already upvoted the post
        if (upvotes.includes(uid)) {
          console.log('User has already upvoted this post!');
          return;
        }
  
        // Remove user's UID from downvotes if it exists and adjust the score
        if (downvotes.includes(uid)) {
          const index = downvotes.indexOf(uid);
          downvotes.splice(index, 1);
          await updateDoc(postRef, {
            score: postData.score + 2, // +1 to remove the downvote and +1 for the upvote
            downvotes: downvotes,
            upvotes: [...upvotes, uid],
          });
        } else {
          // Increment the score and add user's UID to upvotes
          await updateDoc(postRef, {
            score: postData.score + 1,
            upvotes: [...upvotes, uid],
          });
        }
      });
    } catch (error) {
      console.error('Error upvoting post:', error);
    }
  }
  const handleDownvote = async () => {
    const postId = data.id;
    let postBucketType:string
    if (data.type == "trophy"){postBucketType="trophyPosts"}
    else {postBucketType="posts"}
    const postRef = doc(db, postBucketType, postId);
  
    try {
      await runTransaction(db, async (transaction) => {
        const postDoc = await transaction.get(postRef);
  
        if (!postDoc.exists()) {
          console.warn('Post does not exist!');
          return;
        }
  
        const postData = postDoc.data();
        const upvotes = postData.upvotes || [];
        const downvotes = postData.downvotes || [];
  
        // Check if the user has already downvoted the post
        if (downvotes.includes(uid)) {
          console.log('User has already downvoted this post!');
          return;
        }
  
        // Remove user's UID from upvotes if it exists and adjust the score
        if (upvotes.includes(uid)) {
          const index = upvotes.indexOf(uid);
          upvotes.splice(index, 1);
          await updateDoc(postRef, {
            score: postData.score - 2, // -1 to remove the upvote and -1 for the downvote
            upvotes: upvotes,
            downvotes: [...downvotes, uid],
          });
        } else {
          // Decrement the score and add user's UID to downvotes
          await updateDoc(postRef, {
            score: postData.score - 1,
            downvotes: [...downvotes, uid],
          });
        }
      });
    } catch (error) {
      console.error('Error downvoting post:', error);
    }
  }



  return(
    <>
      {(!voteLock)&& (
        <View style={{...styles.postBottomVoteContainer}}>

        <TouchableOpacity onPress={handleUpvote} style={styles.postBottomIconContainer} >
          <CaratUp width={scaleFont(45)} height={scaleFont(45)} />
          {/* <Text style={styles.postBottomText}></Text> */}
        </TouchableOpacity>
        <Text style={styles.postBottomScore}>{score}</Text>
        <TouchableOpacity onPress={handleDownvote} style={styles.postBottomIconContainer} >
          <CaratDown width={scaleFont(45)} height={scaleFont(45)} />
          {/* <Text style={styles.postBottomText}></Text> */}
        </TouchableOpacity>
      </View>
        )}
        {(voteLock)&& (
        <View style={{flexDirection:"column",alignItems:"center"}}>
          <Text style={styles.postBottomScore}>{score}</Text>
          <Text style={{color:"#656565"}}>Voting unlocks at total level 11.</Text>
      </View>
        )}
      </>

  )
}

export default ScoreCounter