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
	FlatList,
	RefreshControl
} from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import { useFeed } from '../../Contexts/FeedContext';
// import FeedPost from './FeedPost';
import styles from '../../styles'
import { useProfilePageUID } from '../../Contexts/ProfilePageUID';

const Profile = ({route}:any):JSX.Element => {
    const {skillsList, XPScale}:any = route.params;
    const {matchingProfileData}:any = useProfilePageUID()
    
    useEffect(()=>{
        console.log(matchingProfileData)
    },[])

    const calculateCurrentLevel = (skillName: string) => {
        const currentXP = matchingProfileData.xpData[skillName]; // Assuming skillData.title is 'Family', 'Friends', etc.
        let level = 1;
        for (const [lvl, xp] of Object.entries(XPScale) as [string,number][]) {
          if (currentXP >= xp) {
            level = parseInt(lvl);
          } else {
            break;
          }
        }
        return level;
      };


    return(
    <View style={styles.profilePageContainer}>
        <View style={styles.profilePageCover}></View>
        
        <View style={styles.profilePageTopContainer}>
            <View style={styles.profilePageStreakContainer}>
                {/* Icon & number */}
            </View>
            <View style={styles.profilePagePicture}></View>
            <View style={styles.profilePageMultiButton}>
                {/* Some kind of switch logic here instead */}
            </View>
        </View>

        <View style={styles.profilePageNamesContainer}>
            <View style={styles.profilePageUserName}></View>
            <View style={styles.profilePageRealName}></View>
        </View>

        <View style={styles.profilePageStatsContainer}>
            <View style={styles.profilePageStatsTop}>
                <View style={styles.profilePageJoinDateContainer}>
                    {/*Icon & Date*/}
                </View>
                <View style={styles.profilePageFriendsContainer}>
                    {/*Icon & Date*/}
                </View>
            </View>
            <View style={styles.profilePageStatsbottom}>

                {skillsList.map((data:any,index:any)=>{
                    const currentLevel = calculateCurrentLevel(data.title.toLowerCase(), )
                    return(
                        <View style={{...styles.profilePageTraitBox, backgroundColor:data.color}} key={index}>
                            <Text style={styles.profilePageTraitNumber}>{currentLevel}</Text>
                        </View>
                    )
                })}
            </View>
            
        </View>
    </View>
    )
}

export default Profile