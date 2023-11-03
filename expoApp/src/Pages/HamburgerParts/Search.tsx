import {
	Text,
	View,
	TextInput,
  FlatList,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState,useRef } from 'react'
import UserTile from './UserTile';
import { db } from '../../Firebase/firebase';
import { getDocs, query, where, collection, limit, } from "firebase/firestore";
import styles from '../../styles';
import {scaleFont} from '../../Utilities/fontSizing'
import { useGameRules } from '../../Contexts/GameRules';

const Search = ():JSX.Element => {
    const { levelScale,skillsList}:any = useGameRules()
    const [searchTerm,setSearchTerm] = useState("")
    const searchRef = useRef<string>()
    const [errorMessage,setErrorMessage] = useState("")
    const [users,setUsers] = useState<any>()
    const PAGE_SIZE = 10

    useEffect(()=>{
        // fetchSearch()
    },[])
    
  const fetchSearch = async(text:string) => {
      if (!text || text.length < 3) {
          setErrorMessage("Search at least 3 letters");
          return;
      }
  
      try {
          setErrorMessage("");
  
          // Query by nameMatches array
          const searchQuery = query(
              collection(db, "users"),
              where("nameMatches", "array-contains", text.toLowerCase()),
              where("settings.privateProfile", "==", true),
              limit(PAGE_SIZE)
          );
  
          const snapshot = await getDocs(searchQuery);
          const docs = snapshot.docs.map(doc => doc.data());
  
          if (docs.length < 1) {
              setErrorMessage("No one was found by that name or username");
          }
  
          console.log(JSON.stringify(docs, null, 2));
          setUsers(docs);  // Replace with your state update function
      } catch(err) {
          console.error(err);
      }
  }

    const SearchBar = () => {
		return (
		  <View style={styles.searchContainer}>
			<TextInput
			  style={styles.searchInput}
			  placeholder="Search For People..."
			  placeholderTextColor="#999"
        blurOnSubmit={true}
        returnKeyType="done"
        onSubmitEditing={(e)=>{
          Keyboard.dismiss()
          fetchSearch(e.nativeEvent.text)
        }}
              // onBlur={(e) => fetchSearch(e.nativeEvent.text)} 
              onChangeText={(text) => searchRef.current = text}
            //   value={searchTerm}
			/>
		  </View>
		);
	  };
    return(
        <View style={styles.defaultPageBackground}>
            <View style={{flexDirection:"row",justifyContent:"space-evenly",alignItems:"center"}}>
                <SearchBar />
            </View>
            {errorMessage&&(<View style={{height:30,width:"90%",backgroundColor:"rgba(255,0,0,0.5)", alignItems:"center", justifyContent:"center", borderColor:"#ff0000",borderWidth:2}}>
              <Text style={{color:"#fff",fontSize:scaleFont(14)}}>!! {errorMessage} !!</Text>
            </View>)}
            {users && (
                <FlatList
                data={users}
                renderItem={({item})=>< UserTile skillsList={skillsList} XPScale={levelScale} userDoc={item} key={item.uid} />}
                contentContainerStyle={{ alignItems: 'center' }}
                style={styles.userTileContainer}
                scrollEventThrottle={150}
                />
            )} 
        </View>
    )
}

export default Search