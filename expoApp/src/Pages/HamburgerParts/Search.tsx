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
	TextInput,
  FlatList,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react'
import UserTile from './UserTile';
import { db } from '../../Firebase/firebase';
import { getDocs, query, orderBy, startAt, endAt,where, collection, limit,startAfter } from "firebase/firestore";
import styles from '../../styles';
import {scaleFont} from '../../Utilities/fontSizing'

const Search = ({route}:any):JSX.Element => {
    const { XPScale,skillsList} = route.params;
    const [searchTerm,setSearchTerm] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const [users,setUsers] = useState<any>()
    const PAGE_SIZE = 10

    useEffect(()=>{
        // fetchSearch()
    },[])
    
    const fetchSearch = async(text:string) => {
        let results:any;
      if (text.length < 3) {
        setErrorMessage("Search at least 3 letters")
        return}
        setErrorMessage("")
        // Query by name
        const nameQuery = query(
          collection(db, "users"),
          where("name", ">=", text),
          where("name", "<=", text + "\uf8ff"),
          where("settings.privateProfile", "==", true),
          limit(PAGE_SIZE)
        );
      
        const nameSnapshot = await getDocs(nameQuery);
        const nameDocs = nameSnapshot.docs.map(doc => doc.data());
      
        // Query by userName
        const userNameQuery = query(
          collection(db, "users"),
          where("userName", ">=", text),
          where("userName", "<=", text + "\uf8ff"),
          where("settings.privateProfile", "==", true),
          limit(PAGE_SIZE)
        );
      
        const userNameSnapshot = await getDocs(userNameQuery);
        const userNameDocs = userNameSnapshot.docs.map(doc => doc.data());
      
        // Merge and remove duplicates
        results = [...nameDocs, ...userNameDocs];
        if (results.length < 1) {
          setErrorMessage("No one was found by that name or username")
        }
        const uniqueResults = Array.from(new Set(results.map(a => a.uid)))
          .map(uid => results.find(a => a.uid === uid));
      
        console.log(JSON.stringify(uniqueResults, null, 2));
        setUsers(uniqueResults);  // Replace with your state update function
        
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
        onSubmitEditing={()=>Keyboard.dismiss()}
              onBlur={(e) => fetchSearch(e.nativeEvent.text)} 
            //   onSubmitEditing={(e) => fetchSearch(e.nativeEvent.text)}
            //   onChangeText={(text) => setSearchTerm(text)}
            //   value={searchTerm}
			/>
		  </View>
		);
	  };
    return(
        <View style={styles.defaultPageBackground}>
            <View style={{flexDirection:"row",justifyContent:"space-evenly",alignItems:"center"}}>
                {/* <Image style={styles.searchIcon} source={require("../../IconBin/search.png")} /> */}
                <SearchBar />
            </View>
            {errorMessage&&(<View style={{height:30,width:"90%",backgroundColor:"rgba(255,0,0,0.5)", alignItems:"center", justifyContent:"center", borderColor:"#ff0000",borderWidth:2}}>
              <Text style={{color:"#fff",fontSize:scaleFont(14)}}>!! {errorMessage} !!</Text>
            </View>)}
            {users && (
                <FlatList
                data={users}
                renderItem={({item})=>< UserTile skillsList={skillsList} XPScale={XPScale} userDoc={item} key={item.uid} />}
                contentContainerStyle={{ alignItems: 'center' }}
                style={styles.userTileContainer}
                scrollEventThrottle={150}
                />
            )} 
        </View>
    )
}

export default Search