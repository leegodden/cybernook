import {request, response} from 'express';
import Product from '../models/Product';
import { AxiosError } from 'axios';
import { Product as P } from '../interfaces/Product';
import fs from 'fs'
import path from 'path';

const createProduct = async (req = request, res = response) => {
    const {name,  price, category } : P = req.body
    const  file = req.file
    try{
        // console.log(image)
        const newProduct  = await Product.create<any>({name, image : file?.filename, price, category})
        
        if(!newProduct){return res.status(404).json({error : 'No saved product'})};
    
        return res.status(200).json(newProduct)
    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {

          return res.status(500).json({ error: (error as AxiosError).message });
        } else {
  
          return res.status(500).json({ error: 'Ocurrió un error desconocido.' });
        }
    }  
    
};


const getProductById = async (req = request, res = response) => {
    const {id} = req.params;
    try{
        const productFind = await Product.findByPk(id);
        if(!productFind){return res.status(404).json({ error : `Product ${id} does not exist`})};

        return res.status(200).json(productFind)

    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {

          return res.status(500).json({ error: (error as AxiosError).message });
        } else {
  
          return res.status(500).json({ error: 'Ocurrió un error desconocido.' });
        }
    }  

};

const getProducts = async (req = request, res = response) => {

    try{
        const products = await Product.findAll();
        if(!products){return res.status(404).json({error : 'there not products'})};
        //console.log(products)
        return res.status(200).json(products)
    }
    catch (error: any) {
        if (error instanceof AxiosError) {

          return res.status(500).json({ error: (error as AxiosError).message });
        } else {
  
          return res.status(500).json({ error: 'Ocurrió un error desconocido.' });
        }
    }   
}



const getImageProduct = (req = request, res = response) => {
    const {fichero} = req.params;
    //console.log(fichero)
    let ruta = './uploads/'+fichero;
    //console.log(ruta)
    fs.stat(ruta, (error, exist) => {
        if(exist){
            return res.sendFile(path.resolve(ruta));
        }
        else{
            return res.status(404).json({
                error : "El imagen no se pudo encontrar"
           })
        }
    })
};

export {
    createProduct,
    getProductById,
    getProducts,
    getImageProduct
}