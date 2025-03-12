import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react';
import { gerProductDetailService } from '@/services/product-service';
import { useQuery } from '@tanstack/react-query';
import { FlashList } from '@shopify/flash-list';
import { List } from 'react-native-paper';

export default function DetailScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  const {data} = useQuery <any[]> ({  //API {data} 
    queryKey:['productDetailData'], //queryKey ห้ามซ้ำตั้งชื่ออะไรก็ได้
    queryFn: async () => {
      const response = await gerProductDetailService(Number(params.id)); //Number(params.id) แปลง string เป็น Number
      return response.data.data; //array[]
    }
  });

  useEffect( ()=>{
    navigation.setOptions({
      title: params.title
    })
  },[navigation,params]);  

  const _renderItem = ( {item} : {item:any}) => (
    <List.Item 
      title ={item.ch_title}
      description={item.ch_dateadd}
      onPress={ () =>{
        router.push({pathname:"/website"});
      }}
    />
  );
    
  return (//output
    <>
      {
        data && <FlashList data={data} estimatedItemSize={50}  renderItem={_renderItem} />
      }
    </>
  )
}



// return (//output
//   <>
//     <Text>{JSON.stringify(data)}</Text>
//     <Text>{params.id}</Text>
//     <Text>{params.title}</Text>
//   </>
// )