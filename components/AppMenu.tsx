import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { ImageBackground, ScrollView, Text } from 'react-native'
import { Drawer } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';  // See MaterialIcons here: https://icons.expo.fyi
import { useQuery } from '@tanstack/react-query';
import { gerVersionService} from '@/services/util-service';
import { AuthStoreContext } from '@/contexts/AuthContext';
import { useContext } from 'react'
import { logoutService } from '@/services/auth-service';
import { router } from 'expo-router';

export default function AppMenu(props:DrawerContentComponentProps) {
  const {profile,onLogout} = useContext(AuthStoreContext);  
  const {data} = useQuery<string> ({ // {data} API
    queryKey:['versionData'], //queryKey ห้ามซ้ำตั้งชื่ออะไรก็ได้
    queryFn: async ()=>{
      const response = await gerVersionService();
      console.log(response.data);
      console.log(response.data.data.version);   
      console.log(response.data.message); 
      return response.data.data.version;
    }
  });

  return (    
    <SafeAreaView>
        <ScrollView>
            <ImageBackground 
                //source={{uri:"http://picsum.photos/180/180"}}
                source={{uri:"https://media.kaohoon.com/wp-content/uploads/2017/04/20170328TPIPP.jpg"}}             
                style={{width:"100%" ,height:180 ,justifyContent:"center",alignItems:"center"}}
              >
              <Text style={{fontSize:20 ,color:"white"}}>Main Menu</Text>
              {
                data && <Text style={{fontSize:16 ,color:"white"}}>version : {data} </Text>
              }   
              {
                profile && <Text style={{fontSize:16 ,color:"blue"}}>
                  id : {profile.id} name:{profile.name} role:{profile.role}
                </Text>
              }             
            </ImageBackground>

            <Drawer.Section title="เมนูหลัก">
              <Drawer.Item
                icon="home"
                label="หน้าแรก"
                right={()=> <MaterialIcons name='keyboard-arrow-right'/>}
                onPress={() => {
                  props.navigation.navigate('(tabs)');
                } }
              />

              <Drawer.Item
                icon="star"
                label="สินค้า"      
                right={()=> <MaterialIcons name='keyboard-arrow-right'/>}
                onPress={() => {
                  props.navigation.navigate('(product)');
                }}
              />
            </Drawer.Section>

            <Drawer.Section title="ระบบ">         
              <Drawer.Item
                icon="logout"
                label="ออกจากระบบ"      
                //right={()=> <MaterialIcons name='logout'/>}
                onPress={ async () => {
                   await logoutService();
                   onLogout();
                   router.replace('/login');
                }}
              />
            </Drawer.Section>

        </ScrollView>     
    </SafeAreaView>
  )
}


//import MaterialCommunityIcons from '@expo/vector-icons/MaterialIcons'; 
//npx expo install @react-navigation/drawer react-native-gesture-handler react-native-reanimated
//npx expo install expo-image