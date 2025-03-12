import { getProfileService } from "@/services/auth-service";
import { createContext, useEffect, useState } from "react";

export const AuthStoreContext = createContext<any>(null);

const AuthStoreProvider = ({children}:any) => {
    //global state (varible) ประกาศตัวแปรให้มองเห็นทั้งหมด
    const [isAuth,setIsAuth] = useState(false);
    const [profile,setProfile] = useState(false);
    const [isAuthLoading,setIsAuthLoading] = useState(true);

    const initAuth = async () => {
        try {
            const res = await getProfileService();
            if(res.data.data.user){
                setProfile(res.data.data.user);
                setIsAuth(true);
            }else{
                setIsAuth(false);
            }
        } catch (error) {
            setIsAuth(false); //401 token หมดอายุ หรือไม่ใช่ Token ในระบบ
        }finally{
           setIsAuthLoading(false)  //stop Loading   
        }
    }

    useEffect( () =>{
        initAuth();
    },[]);

    const onUpdateAuthData = async () => {
        //setIsAuth(true); //Update isAuth
        const res =await getProfileService();
        if(res.data.data.user){
            setProfile(res.data.data.user);
            setIsAuth(true);
        }else{
            setIsAuth(false);
        }
    };

    //logout
    const onLogout =() =>{
        setIsAuth(false);
        setProfile(null!);
    }
    
    const authStoreData = {
        isAuth :isAuth,
        onUpdateAuthData:onUpdateAuthData,
        profile:profile,
        isAuthLoading:isAuthLoading,
        onLogout:onLogout
    }

    return(
        <AuthStoreContext.Provider value={authStoreData} >
            {children}
        </AuthStoreContext.Provider>
    );
}

export default AuthStoreProvider;