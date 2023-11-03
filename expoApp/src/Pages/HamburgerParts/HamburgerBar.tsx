import {
	Text,
	View,
	TouchableOpacity,
	Animated,
} from 'react-native';
import { useHamburgerBar } from '../../Contexts/HamburgerBarContext';
import styles from '../../styles';
import {useEffect, useState} from 'react'
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import {signOut} from "firebase/auth"
import { auth } from '../../Firebase/firebase';
import { useNotifications } from '../../Contexts/NotificationsContext';
import SearchSVG from '../../IconBin/svg/search.svg'
import NotificationsSVG from '../../IconBin/svg/notifications.svg';
import FriendsSVG from '../../IconBin/svg/friends.svg'
import PsychSVG from '../../IconBin/svg/psych.svg'
import LogSVG from '../../IconBin/svg/log.svg'
import DoorSVG from '../../IconBin/svg/door.svg'
import { scaleFont } from '../../Utilities/fontSizing';


type RootStackParamList = {
    Search:undefined,
    Notifications:undefined,
    TrophyGrading:undefined,
    Friends:undefined,
    Streak:undefined,
    Tutorial:undefined,
    ChangeLog:undefined,
}

const HamburgerBar = ():JSX.Element => {
    const {activeNotif}:any = useNotifications()
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const {hamburgerToggle,setHamburgerToggle}:any = useHamburgerBar()
    const [menuWidth] = useState(new Animated.Value(-250)); // Initial hidden position
    const [overlayOpacity] = useState(new Animated.Value(0)); // Initial opacity
    

    useEffect(()=>{
    if (hamburgerToggle==true) {
        openMenu()
    } else if (hamburgerToggle==false) {
        closeMenu()
    }
    },[hamburgerToggle])


    const handleSignOut = async() => {
      try{
        await signOut(auth)
        console.log("Successfully signed out.")
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'Login', 
              },
            ],
          })
        );
      } catch(err) {
        console.error("OOPS! WHY CAN'T THEY LOG OUT?!")
      }
    }




    const closeMenu = () => {
        Animated.timing(menuWidth, {
            toValue: -250,
            duration: 300,
            useNativeDriver: false,
        }).start();
        setHamburgerToggle(false)
    };
    const openMenu = () => {
        Animated.timing(menuWidth, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }

    const handleOptionPress = (val:any) => {
        navigation.navigate(val)
        setHamburgerToggle(false)
    }



    const HamburgerSideBar = ():JSX.Element => {
        return(
            <Animated.View style={[styles.hamburgerMenu, { left: menuWidth }]}>
                {/* Your menu items here */}
                <View style={{height:10,}}></View>
                <TouchableOpacity onPress={()=>{handleOptionPress("Search")}} style={styles.menuItemContainer}>
                    <SearchSVG width={scaleFont(45)} height={scaleFont(45)} />
                    <Text style={styles.menuItem}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{handleOptionPress("Notifications")}} style={styles.menuItemContainer}>
                  <View>
                    <NotificationsSVG width={scaleFont(45)} height={scaleFont(45)}  />
                    {activeNotif && <View style={styles.notificationDot} />}
                  </View>
                    
                    <Text style={styles.menuItem}>Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{handleOptionPress("Friends")}} style={styles.menuItemContainer}>
                    <FriendsSVG width={scaleFont(45)} height={scaleFont(45)}  />
                    <Text style={styles.menuItem}>Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{handleOptionPress("Tutorial")}} style={styles.menuItemContainer}>
                    <PsychSVG width={scaleFont(45)} height={scaleFont(45)}  />
                    <Text style={styles.menuItem}>How ARL works</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{handleOptionPress("ChangeLog")}} style={styles.menuItemContainer}>
                    <LogSVG width={scaleFont(45)} height={scaleFont(45)}  />
                    <Text style={styles.menuItem}>Change Log</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignOut} style={styles.menuItemContainer}>
                    <DoorSVG width={scaleFont(45)} height={scaleFont(45)}  />
                    <Text style={styles.menuItem}>Sign Out</Text>
                </TouchableOpacity>
            </Animated.View>
        )
    }
    

    return(
        <HamburgerSideBar />
    )
}

export default HamburgerBar