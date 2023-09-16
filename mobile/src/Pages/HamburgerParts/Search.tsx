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
} from 'react-native';
import React, { useEffect, useState } from 'react'
import UserTile from './UserTile';
import { db } from '../../Firebase/firebase';
import { getDocs, query, orderBy, startAt, endAt,where, collection, limit,startAfter } from "firebase/firestore";
import styles from '../../styles';

const Search = ({route}:any):JSX.Element => {
    const { XPScale,skillsList} = route.params;
    const [searchTerm,setSearchTerm] = useState("")
    const [users,setUsers] = useState<any>()
    const PAGE_SIZE = 10

    useEffect(()=>{
        // fetchSearch()
    },[])
    
    const fetchSearch = async(text:string) => {
        let results:any;

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
            {users && (
                <View style={styles.userTileContainer}>
                    {users.map((userDoc:any,i:any)=>{
                        return(<UserTile skillsList={skillsList} XPScale={XPScale} userDoc={userDoc} key={i} />)
                    })}
                </View>
            )} 
        </View>
    )
}

export default Search