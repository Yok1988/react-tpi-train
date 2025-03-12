import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import AppMenu from '@/components/AppMenu';
import { MD3LightTheme as DefaultTheme ,PaperProvider} from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Redirect } from 'expo-router'
import { AuthStoreContext } from '@/contexts/AuthContext';
import AppLoading from '@/components/AppLoading';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function MainLayout() {

  const {isAuth,isAuthLoading} = useContext(AuthStoreContext);

  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  
  if(isAuthLoading){
    SplashScreen.hideAsync();
    return <AppLoading/>
  }

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#1169ed',
      secondary: 'yellow',
    },
  };

  return (
    <QueryClientProvider client={queryClient}> 
      <PaperProvider theme={theme}>    
        {
          isAuth ? (
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer drawerContent={(props) => <AppMenu {...props}/>}>
              <Drawer.Screen name='(tabs)' options={{headerShown:false}}/>  
              <Drawer.Screen name='(product)' options={{headerShown:false}}/>        
              <Drawer.Screen name='+not-found' />  
            </Drawer>            
          </GestureHandlerRootView>  
          ) : ( <Redirect href="../login" /> )
        }     
        <StatusBar style="auto" /> 
     </PaperProvider>     
    </QueryClientProvider>
  );
}




//npx expo install react-native-webview
//npx expo install expo-image
//npx expo install expo-secure-store
//เปิดไฟล์ app.json  เพิ่ม
// "expo-secure-store",
// {
//   "configureAndroidBackup": true,
//   "faceIDPermission": "Allow $(PRODUCT_NAME) to access your Face ID biometric data."
// }

//Prevent the splash screen from auto-hiding before asset loading is complete.

//BackEnd ต้องติดตั้ง
//npm install axios
//npm i @tanstack/react-query
//npx expo install @shopify/flash-list
//ถ้ามี await ที่ไหนต้องใส่ async นำหน้า FN

/*<Stack>
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  Stack.Screen name="+not-found" />
</Stack> */

//https://tanstack.com/query/latest/docs/framework/react/quick-start  QueryClientProvider
//ข้อกำหนดให้ครอบเมื่อใช้ทุกหน้าใช้ npm install react-native-paper  
