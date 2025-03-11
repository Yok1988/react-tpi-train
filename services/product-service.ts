import axios from "axios";

export async function gerProductService(){
    return await axios.get('https://api.codingthailand.com/api/course')
}
export async function gerProductDetailService(id:number){
    return await axios.get('https://api.codingthailand.com/api/course/'+id.toString());
}


//BackEnd ต้องติดตั้ง
//npm install axios
//npm i @tanstack/react-query
//npx expo install @shopify/flash-list
//ถ้ามี await ที่ไหนต้องใส่ async นำหน้า FN