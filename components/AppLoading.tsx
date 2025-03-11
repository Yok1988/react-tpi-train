import { View, Text } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

export default function AppLoading() {
  return (
    <View style={{flex:1,justifyContent:"center" ,alignItems:"center"}}>
      <ActivityIndicator animating={true} size={40} />
    </View>
  )
}