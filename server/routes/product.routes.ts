import { Router } from 'express';
import {
	createProduct,
	getProductById,
	getProducts,
	getImageProduct,
} from '../controllers/product.controller';
import uploads from '../middlewares/UploadImage';
const router = Router();

router.post('/product', uploads.single('image'), createProduct);
router.get('/products', getProducts);
router.get('/product/:id', getProductById);
router.get('/product_image/:fichero', getImageProduct);

export default router;
