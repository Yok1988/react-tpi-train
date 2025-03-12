//npx expo install expo-image-picker  //กล้องถ่ายรูป
//npx expo install expo-image-manipulator  //Resize รูป
import { useState } from 'react';
import { Button, Image, View, StyleSheet, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import axios from 'axios';

export default function CameraScreen() {
  const [permissions, requestPermission] = ImagePicker.useCameraPermissions();
  const [image, setImage] = useState<string | null>(null);

  if (!permissions) {
    return <View />;
  }

  if (!permissions.granted) {
    return (
      <View style={styles.container}>
        <Text>
          We need your permission to show the camera
        </Text>
        <Button title="grant permission" onPress={requestPermission} />
      </View>
    )
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    // let result = await ImagePicker.launchImageLibraryAsync({    //เปิดจากแกลลอรี่
    //   mediaTypes: ['images', 'videos'],
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    let result = await ImagePicker.launchCameraAsync({
      // cameraType: ImagePicker.CameraType.back, เปิดกล้อง
      aspect: [4, 3],
      quality: 1,
      // base64: true
    });

    if (!result.canceled) {  // resize image
    const imgForResize = ImageManipulator.manipulate(result.assets![0].uri).resize({height: 400});
    const imgRef = await imgForResize.renderAsync();
    const imgForUpload = await imgRef.saveAsync({base64: true, compress: 0.5, format: SaveFormat.JPEG});
    // console.log(imgForUpload.base64);

    setImage(imgForUpload.uri);
    // setImage(result.assets[0].uri);

    // upload image to backend api
    const url = "https://api.codingthailand.com/api/upload";
    const res = await axios.post(url, {
      picture: "data:image/jpeg;base64," + imgForUpload.base64
    });

    Alert.alert("ผลการอัปโหลด" , JSON.stringify(res.data));

    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}    
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 400,
    margin: 30
  },
});


//rnf  //rnfs
// import { View, Text } from 'react-native'
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';  // See MaterialIcons here: https://icons.expo.fyi

// export default function CameraScreen() {
//   return (
//     <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
//       <Text>camera</Text>
//       <MaterialIcons size={80} color={'dark'} name="camera-alt" />
//     </View>
//   )
// }

