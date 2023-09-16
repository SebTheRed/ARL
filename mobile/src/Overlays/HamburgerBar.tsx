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
import { useHamburgerBar } from '../Contexts/HamburgerBarContext';
import styles from '../styles';
import {useEffect, useState} from 'react'
const HamburgerBar = ():JSX.Element => {

    const {hamburgerToggle,setHamburgerToggle}:any = useHamburgerBar()
    const [menuWidth] = useState(new Animated.Value(-250)); // Initial hidden position

    useEffect(()=>{
    if (hamburgerToggle==true) {
        Animated.timing(menuWidth, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    } else if (hamburgerToggle==false) {
        Animated.timing(menuWidth, {
            toValue: -250,
            duration: 300,
            useNativeDriver: false,
        }).start();
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

    const HamburgerSideBar = ():JSX.Element => {
        return(
            <Animated.View style={[styles.menu, { left: menuWidth }]}>
                <TouchableOpacity onPress={closeMenu} style={styles.closeSideBar}>
                <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
                {/* Your menu items here */}
                <Text style={styles.menuItem}>Item 1</Text>
                <Text style={styles.menuItem}>Item 2</Text>
                <Text style={styles.menuItem}>Item 3</Text>
            </Animated.View>
        )
    }
    

    return(
        <HamburgerSideBar />
    )
}

export default HamburgerBar