import { useNavigation } from 'expo-router';
import { useEffect } from 'react'
import { View, Text, ImageBackground } from 'react-native'

export default function AboutScreen() {  
  const navigation = useNavigation();

  useEffect( () => { //ตกแต่งต้องใช้ UseEffect()
    navigation.setOptions({
      title:"เกี่ยวกับเรา",
      headerShown:true,
      headerStyle:{
        backgroundColor:"#0bb3d9"
      },
      headerTintColor:"white",
      headerTitleStyle:{
        fontWeight:"bold"
      }
    });
  },[navigation] );

  return (
    <View>
      <Text>AboutScreen</Text>
    </View>
  )
}