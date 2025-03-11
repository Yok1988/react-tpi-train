import { StyleSheet } from "react-native";

const styles = StyleSheet.create({ //A
    container :{//B
        marginTop :150,
        backgroundColor:"#f7ffd9",
        flexWrap:'wrap'
    }
})

const buttons = StyleSheet.create({ //C
    primary :{//D
        flex :1,
        height:70,
        backgroundColor:"#5c5cd1",
        justifyContent:'center',
        alignItems:'center',
        marginLeft:20,
        marginRight:20        
    }
})
 export{styles,buttons} //E