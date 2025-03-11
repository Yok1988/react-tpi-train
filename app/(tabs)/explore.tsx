import { StyleSheet, Button, Text, View, Alert } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { HelloWave } from '@/components/HelloWave';
import { useEffect, useState } from 'react';

export default function TabTwoScreen() {
  const isAuth = true; 
  const [title,SetTitle] = useState("H E L L O TPIPL");
  // useEffect(()=>{});

  useEffect(()=>{
    console.log("Hello UseEffect1🟢");
  },[]);//ถ้าใส่ [] ทำงานครั้งเดียวรอบเดียว init รีเรนเดอร์อัตโนมัติ 

  useEffect(()=>{
    console.log("Hello UseEffect2🧡");
  });//ทำงานทุกรอบ รีเรนเดอร์ อัตโนมัติ

  useEffect(()=>{
    console.log("Hello UseEffect3😜");
  },[title]);//ทำงานต่อเมื่อ title มีการเปลี่ยนค่า


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore { isAuth && <HelloWave/> } </ThemedText>
        <Text>YOK</Text>
        <Text>flexDirection row</Text>
      </ThemedView>

      <View style={{backgroundColor:"#c5cafc",padding:10 ,borderWidth:2,borderColor:"green"}} >    
        <Text style={styles.myText}>HELLO TPIPL 1</Text>
        <Text style={styles.myText}>HELLO TPIPL 2</Text>
        <Text style={styles.myText}>ยิ น ดี ต้ อ น รั บ !</Text>
        <Text style={styles.myText}>บริษัท ทีพีไอ โพลีน จำกัด (มหาชน)</Text>

        <Text style={{ color: 'green', fontSize: 18, marginBottom: 10, textAlign: 'center' ,fontWeight: 'bold'}}>{title}</Text>
        <Button title='Press me' onPress={()=>{
          Alert.alert("สวัสดี React Native")
          SetTitle("HELLO REACT NATIVE");
        }} />
      </View>      
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor:'green',
    padding:10,
    justifyContent:"center",
    alignItems:'center'
  },
  myText:{
    color: 'blue',
    fontWeight: 'bold',
    textAlign:'center'
  }
});
