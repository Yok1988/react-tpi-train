import { View, Text } from 'react-native'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react';

export default function DetailScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect( ()=>{
    navigation.setOptions({
      title: params.title
    })
  },[navigation,params]);  
  
  return (
    <View>
      <Text>{params.id}</Text>
      <Text>{params.title}</Text>
    </View>
  )
}