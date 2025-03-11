//rnf  //rnfs
import { View, Text } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.

export default function CameraScreen() {
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text>camera</Text>
      <MaterialIcons size={80} color={'dark'} name="camera-alt" />
    </View>
  )
}

