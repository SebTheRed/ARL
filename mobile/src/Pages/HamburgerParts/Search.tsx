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
import { db } from '../../Firebase/firebase';
import { getDocs, query, orderBy, startAt, endAt,where, collection, limit,startAfter } from "firebase/firestore";
import styles from '../../styles';

const Search = ():JSX.Element => {
    const [searchTerm,setSearchTerm] = useState("")
    const [users,setUsers] = useState<any>()
    const PAGE_SIZE = 10

    useEffect(()=>{
        // fetchSearch()
    },[])
    
    const fetchSearch = async(text:string) => {
        let results = [];

        // Query by name
        const nameQuery = query(
            collection(db, "users"),
            where("name", ">=", text),
            where("name", "<=", text + "\uf8ff"),
            limit(PAGE_SIZE)
        );

        const nameSnapshot = await getDocs(nameQuery);
        const nameDocs = nameSnapshot.docs.map(doc => doc.data());

        // Query by userName
        const userNameQuery = query(
            collection(db, "users"),
            where("userName", ">=", text),
            where("userName", "<=", text + "\uf8ff"),
            limit(PAGE_SIZE)
        );

        const userNameSnapshot = await getDocs(userNameQuery);
        const userNameDocs = userNameSnapshot.docs.map(doc => doc.data());

        // Merge and remove duplicates
        results = [...nameDocs];
        let uniqueResults=[]
        results.map((doc,i)=>{
            userNameDocs.map((userNameDoc,i)=>{
                if (userNameDoc.uid != doc.uid) {uniqueResults.push(userNameDoc)}
            })
        })
        uniqueResults.push(results)

        console.log(JSON.stringify(uniqueResults, null, 2))
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
              onSubmitEditing={(e) => fetchSearch(e.nativeEvent.text)}
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
        </View>
    )
}

export default Search