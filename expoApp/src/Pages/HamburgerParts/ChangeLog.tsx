import {
	ScrollView,
	Text,
	View,
} from 'react-native';
import styles from '../../styles';
import { scaleFont } from '../../Utilities/fontSizing';
import {collection,getDocs} from 'firebase/firestore'
import {db} from '../../Firebase/firebase'
import {useState,useEffect} from 'react'

const ChangeLog = ():JSX.Element => {
  const [changes,setChanges] = useState<any[]>([])

  useEffect(() => {
    const fetchChangeLogs = async () => {
      try {
        const changeLogCollection = collection(db, 'changeLog');
        const changeLogSnapshot = await getDocs(changeLogCollection);
        let changeLogData = changeLogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Sorting the changeLogData by version in descending order
        changeLogData = changeLogData.sort((a:any, b:any) => {
          const versionA = a.version.split('.').map(Number);
          const versionB = b.version.split('.').map(Number);
          return versionB[0] - versionA[0] || versionB[1] - versionA[1];
        });

        setChanges(changeLogData);
      } catch (error) {
        console.error("Error fetching change logs:", error);
      }
    };

    fetchChangeLogs();
  }, []);

  return(
    <ScrollView style={{backgroundColor:"#1c1c1c"}}>
      <View style={{ ...styles.defaultPageBackground, alignItems: "flex-start", padding: 10 }}>
        {changes.map((change, index) => (
          <>
          <View style={{height:20}} />
          <View key={change.id}>
            <Text style={{...styles.sectionTitle, fontSize:scaleFont(28)}}>{change.version}</Text>
            <Text style={{...styles.sectionTitle,fontSize:scaleFont(24)}}>{change.title}</Text>
            <Text style={{...styles.sectionFlare}}>{change.message}</Text>
          </View>
          <View style={{height:20}} />
          <View style={{...styles.sectionLine}} />
          </>
        ))}
      </View>
    </ScrollView>
  )
}

export default ChangeLog