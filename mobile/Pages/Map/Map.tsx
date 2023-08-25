import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';
import styles from '../../styles'
import MapView from 'react-native-maps';

////// COMPONENT FUNCTION BEGINNING //////
const Map = ():JSX.Element=>{
    return(
        <View>
            <MapView
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
            </MapView>
        </View>
    )
}

export default Map