import { Image, Pressable, StyleSheet, Text, View ,Button as ButtonRN} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AppLogo from '@/components/AppLogo';
import { Link, router, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';  // See MaterialIcons here: https://icons.expo.fyi
import { DrawerActions } from '@react-navigation/native';
import HomeLogo from '@/components/HomeLogo';
import { Button } from 'react-native-paper';
import { AuthStoreContext } from '@/contexts/AuthContext';
import { useContext } from 'react'

//npx expo start -c (คำสั่ง ClearCash)
//npx expo run:android

export default function HomeScreen() {
  const navigation = useNavigation();
  const {profile} = useContext(AuthStoreContext);  
    useEffect( () => { //ตกแต่งใช้ UseEffect()
      navigation.setOptions({
        //title:"Home",
        headerTitle:() => <HomeLogo/>,
        headerTitleAlign:'center',
        headerShown:true,
        headerLeft:() => (
          <MaterialIcons.Button name='menu' backgroundColor="#0bb3d9" 
          onPress={() =>{
            navigation.dispatch(DrawerActions.openDrawer());
          }}
        /> 
      ),
        headerStyle:{backgroundColor:"#0bb3d9"},
        headerTintColor:"white",
        headerTitleStyle:{fontWeight:"bold"}
      });
    },[navigation] );
    
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/tp.jpg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome TPIPL! </ThemedText>
        <AppLogo/>
        <HelloWave />          
      </ThemedView>

      <View>     
          <Link href="/about">About Us</Link>    
      </View>

      {
        profile && <Text style={{fontSize:16 ,color:"green"}}>
          ID User : {profile.id}   Name:{profile.name}  Role:{profile.role}
        </Text>
      }   

      {/* Pressable */}
      <View>       
        <Link href="/about" asChild> 
          <Pressable style={{backgroundColor:"green"}}>
            <Text>About Us2</Text> 
          </Pressable>
        </Link>      
      </View>
      <View>
      <Button icon="account-circle" mode="contained" onPress={() => router.push("/about")}>
          About Us
       </Button>    
      </View>  

      <View>
        <ButtonRN title='About Us 3' onPress={()=>{
          router.push("/about")
        }}/> 
      </View>  
   
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
