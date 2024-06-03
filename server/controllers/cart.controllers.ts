import {request, response}  from 'express';
import { Purchase } from '../interfaces/Purchase';
import Cart from '../models/Cart';
import { AxiosError } from 'axios';;

const createPurchase = async (req = request, res = response) => {
    const {name, image, quantityProduct, price, id_purchase} : Purchase = req.body;

    try{
        const newPurchase = await Cart.create<any, any>({name, image, quantityProduct, price, id_purchase});
        if(!newPurchase){
            return res.status(402).json({error : 'Purchase invalid'})
        }
        return res.status(200).json({
            success : 'thank you for purchase',
            newPurchase
        })
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({error : error.message})
        }
        else{
            return res.status(500).json({error : 'Error Desconocido'})
        }
    }
}

const getAllPurchaseCart = async (req = request, res = response) =>{
    try{
        const listCart = await Cart.findAll();
        if(!listCart){return res.status(404).json({error : 'Cart yet is Empty'})};
        return res.status(200).json(listCart)
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({error : error.message})
        }
        else{
            return res.status(500).json({error : 'error uncknow'})
        }
    }
};

const updatePurchase = async (req =request, res = response) => {
    const {id} = req.params;
    const {price, quantityProduct } : Purchase = req.body

    try{
        const purchaseFound = await Cart.findByPk(id);
        if(!purchaseFound) {return res.status(404).json({error : 'Error purchase does not exist'})};
        purchaseFound.price = price;
        purchaseFound.quantityProduct = quantityProduct;
        purchaseFound.save();
        return res.status(200).json({
            success : 'purchase update',
            purchaseFound
        })

    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({error : error.message})
        }
        else{
            return res.status(500).json({error : 'error uncknow'})
        }
    }

};

const deletePurchaseById = async( req = request, res = response) => {
    const {id} = req.params;
    try{
     const success = await Cart.destroy({where: {id}});
     if(!success){ return res.status(404).json({error : 'Cannot delete purchase'})};
     
     return res.status(200).json({ok : `Your purchase ${id} has deleted`})
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({error : error.message})
        }
        else{
            return res.status(500).json({error : 'error uncknow'})
        }
    }
}

export {
    createPurchase,
    getAllPurchaseCart,
    updatePurchase,
    deletePurchaseById
}