import { Router } from "express";
import { createPurchase, getAllPurchaseCart, updatePurchase, deletePurchaseById } from "../controllers/cart.controllers";


const router = Router();

router.post('/cart', createPurchase);
router.get('/list_cart', getAllPurchaseCart);
router.put('/cart/:id', updatePurchase);
router.delete('/cart/:id', deletePurchaseById)

export default router 