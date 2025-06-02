import { connectToDatabase } from "../conexion.js"
import Product from "../schemas/productos.schemas.js"

export const createProd = async({name, desc, price, stock}) =>{
    try{
        await connectToDatabase()
        const res= await Product.create({name, desc, price, stock})

        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log("error")
    }
}

export const finAll = async()=>{
    try{
        await connectToDatabase()
        const res = await Product.find()
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        
    }
}