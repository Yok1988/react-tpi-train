import axios from "axios";

export async function gerVersionService(){
    return await axios.get("https://api.codingthailand.com/api/version")
}

//BackEnd ต้องติดตั้ง
//npm install axios
//npm i @tanstack/react-query
//npx expo install @shopify/flash-list
//ถ้ามี await ที่ไหนต้องใส่ async นำหน้า FN