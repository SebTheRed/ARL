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
	Animated,
} from 'react-native';
import { useHamburgerBar } from '../../Contexts/HamburgerBarContext';
import styles from '../../styles';
import {useEffect, useState} from 'react'
import { NavigationRouteContext, useNavigation, CommonActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
type RootStackParamList = {
    Search:undefined,
    Notifications:undefined,
    TrophyGrading:undefined,
    Friends:undefined,
}

const HamburgerBar = ():JSX.Element => {

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

    const handleOptionPress = (val:string) => {
        navigation.navigate(val)
        setHamburgerToggle(false)
    }



    const HamburgerSideBar = ():JSX.Element => {
        return(
            <Animated.View style={[styles.hamburgerMenu, { left: menuWidth }]}>
                {/* Your menu items here */}
                <View style={{height:10,}}></View>
                <TouchableOpacity onPress={()=>{handleOptionPress("Search")}} style={styles.menuItemContainer}>
                    <Image style={styles.menuIcon} source={require("../../IconBin/search.png")} />
                    <Text style={styles.menuItem}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{handleOptionPress("Notifications")}} style={styles.menuItemContainer}>
                    <Image style={styles.menuIcon} source={require("../../IconBin/notifications.png")} />
                    <Text style={styles.menuItem}>Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{handleOptionPress("TrophyGrading")}} style={styles.menuItemContainer}>
                    <Image style={styles.menuIcon} source={require("../../IconBin/trophy_grading.png")} />
                    <Text style={styles.menuItem}>Trophy Grading</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{handleOptionPress("Friends")}} style={styles.menuItemContainer}>
                    <Image style={styles.menuIcon} source={require("../../IconBin/friends.png")} />
                    <Text style={styles.menuItem}>Friends</Text>
                </TouchableOpacity>
            </Animated.View>
        )
    }
    

    return(
        <HamburgerSideBar />
    )
}

export default HamburgerBar