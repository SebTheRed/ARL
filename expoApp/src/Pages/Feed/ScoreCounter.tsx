import {
	Text,
	View,
	Image,
	TouchableOpacity,
} from 'react-native'
import React,{useEffect,useState} from 'react'
import { runTransaction,doc,updateDoc,onSnapshot } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';
import styles from '../../styles';
import { useUID } from '../../Contexts/UIDContext';
import CaratUp from '../../IconBin/svg/carat_up.svg'
import CaratDown from '../../IconBin/svg/carat_down.svg'
import { scaleFont } from '../../Utilities/fontSizing';


const ScoreCounter = ({data}:any):JSX.Element => {
  const {uid}:any = useUID()
  const [score,setScore] = useState<number>(0)


  useEffect(() => {
    const postRef = doc(db, 'posts', data.id);
  
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
    const postRef = doc(db, 'posts', postId);
  
    try {
      await runTransaction(db, async (transaction) => {
        const postDoc = await transaction.get(postRef);
  
        if (!postDoc.exists()) {
          console.warn('Post does not exist!');
          return;
        }
  
        const postData = postDoc.data();
        const upvotes = postData.upvote || [];
        const downvotes = postData.downvote || [];
  
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
            downvote: downvotes,
            upvote: [...upvotes, uid],
          });
        } else {
          // Increment the score and add user's UID to upvotes
          await updateDoc(postRef, {
            score: postData.score + 1,
            upvote: [...upvotes, uid],
          });
        }
      });
    } catch (error) {
      console.error('Error upvoting post:', error);
    }
  }
  const handleDownvote = async () => {
    const postId = data.id;
    const postRef = doc(db, 'posts', postId);
  
    try {
      await runTransaction(db, async (transaction) => {
        const postDoc = await transaction.get(postRef);
  
        if (!postDoc.exists()) {
          console.warn('Post does not exist!');
          return;
        }
  
        const postData = postDoc.data();
        const upvotes = postData.upvote || [];
        const downvotes = postData.downvote || [];
  
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
            upvote: upvotes,
            downvote: [...downvotes, uid],
          });
        } else {
          // Decrement the score and add user's UID to downvotes
          await updateDoc(postRef, {
            score: postData.score - 1,
            downvote: [...downvotes, uid],
          });
        }
      });
    } catch (error) {
      console.error('Error downvoting post:', error);
    }
  }



  return(
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
  )
}

export default ScoreCounter