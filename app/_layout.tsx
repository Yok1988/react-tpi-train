import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from '@/hooks/useColorScheme';
import AppMenu from '@/components/AppMenu';
import { MD3LightTheme as DefaultTheme ,PaperProvider} from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

//npx expo install expo-image
//Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
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
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer drawerContent={(props) => <AppMenu {...props}/>}>
            <Drawer.Screen name='(tabs)' options={{headerShown:false}}/>  
            <Drawer.Screen name='(product)' options={{headerShown:false}}/>        
            <Drawer.Screen name='+not-found' />  
          </Drawer>            
        </GestureHandlerRootView>       
        <StatusBar style="auto" /> 
     </PaperProvider>     
    </QueryClientProvider>
  );
}



/*<Stack>
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  Stack.Screen name="+not-found" />
</Stack> */

//https://tanstack.com/query/latest/docs/framework/react/quick-start  QueryClientProvider
{/* //ข้อกำหนดให้ครอบเมื่อใช้ทุกหน้าใช้ npm install react-native-paper     */}
