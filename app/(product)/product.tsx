import AppLoading from '@/components/AppLoading';
import { gerProductService } from '@/services/product-service';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerActions } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { router, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Card ,Chip,Text} from 'react-native-paper';

export default function ProductScreen() {
  const navigation = useNavigation();


  const {data,isPending,error,isError,refetch,isRefetching} = useQuery <any[]> ({  //API {data} 
    queryKey:['productData'], //ห้ามซ้ำตั้งชื่ออะไรก็ได้
    queryFn: async () => {
      const response = await gerProductService();
      //console.log(response.data);    
      return response.data.data; //ถ้าเป็น Array ต้องใช้ any[]
    }
  });
  
  useEffect( () => { //ตกแต่งใช้ UseEffect()      
    navigation.setOptions({
      title:"สินค้า",
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
   

  const _renderItem = ( {item}: {item:any} ) => {
    return(
      //<Text>{item.title}</Text>
      <Card style= {{margin:10}} onPress={()=>{
        router.push({
          pathname:"/detail",
          params:{id : item.id, title :item.title}
        });//กดข้ามหน้าส่งข้อมูล
        //router.push("/detail")
      }} >
        <Card.Cover source={{ uri: item.picture }} /> 
        <Card.Content>
          <Text variant ="titleLarge">{item.title}</Text>
          <Text variant ="bodyMedium">{item.detail}</Text>
        </Card.Content>  
        <Card.Actions>
          <Chip icon ="calendar">{item.date}</Chip>
          <Chip icon ="calendar">{item.view}</Chip>
        </Card.Actions>      
      </Card>
    );
  }

  if(isPending){
    return <AppLoading/>
  }

  const _onRefresh = () => {
    refetch();
  }

  if(isError){
    return (
      <>
        <Text>เกิดข้อผิดพลาดจาก server โปรดลองใหม่</Text>    
        <Text>{JSON.stringify(error)}</Text>       
      </>
    )
  }

  //Output  <Text>{JSON.stringify(data)}</Text>   
  return (
    <>    
      {
        data && < FlashList 
                  data={data} 
                  estimatedItemSize={50} 
                  renderItem={_renderItem}
                  onRefresh={_onRefresh}
                  refreshing={isRefetching}
                />
      }       
    </>
  )
}


{/* 
const _renderItem = () => {}

<>    
   View ย่อ    
</> 

ใช้คู่กัน
onRefresh={_onRefresh}
refreshing={isRefetching}

*/}