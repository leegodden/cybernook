import axios, { AxiosError } from "axios";
import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useParams } from "react-router-dom";
import { formaterDinero, generarId } from "../../helpers";
import { PurchaseType } from "../../interface/Purchase";
import { ProductType } from "../../interface/Product";
import { useNavigate } from "react-router-dom";


// import { generarId } from "../../helpers";


const DetailProduct: React.FC = () : JSX.Element | null => {
    const Navigate = useNavigate();
    const {cart, resfreshData, setRefreshData, setCart} = useContext(CartContext)
   
    const { id } = useParams();
    const [quantity, setQuantity] = useState(0);
    const [product, setProduct] = useState<ProductType>({
        image: '',
        price: 0,
        name : '',
        id : '',
        category : '',
    
    });
  

    const infoPurchase:  PurchaseType = {
        name: '',
        image: '',
        quantityProduct: 0,
        price: 0,
        id_purchase :''
    };
    useEffect(() => {
        const getCartPurchase = async () => {
            const url = `http://localhost:4000/store/list_cart`;
            try{
                // setRefreshData(false)
                const {data} = await axios(url);
                //console.log(data)
                setCart(data)
                return data
            }
            catch(error : unknown){
                if(error instanceof AxiosError){
                    console.log(error.message)
                }
            }
        }
        getCartPurchase();
    },[resfreshData, setCart]);
    useEffect(() => {
        const getProduct = async () => {
            const url = `http://localhost:4000/store/product/${id}`;
            const { data } = await axios(url);
            setProduct(data);
          
        };
        getProduct();

    }, [id]);
    if (!product || product.image === undefined) { return null }

    const handleAddQuantityProduct = () => {
        setQuantity(value => value + 1)
    };
    const handleLessQuantityProduct = () => {
        setQuantity(value => value - 1);
        if (quantity <= 0) {
            setQuantity(0);
            return
        }
    };
    //console.log(cart)
    const handleAddPurchase = async () => {
        
        const priceTotal: number = quantity * product.price
        // console.log(priceTotal)
      
        if (quantity !== 0) {
            infoPurchase.name = product.name;
            infoPurchase.price = priceTotal;
            infoPurchase.image = product.image;
            infoPurchase.quantityProduct = quantity;
            console.log(infoPurchase.id_purchase)
            console.log(cart.map(p =>  p.id_purchase))
            const purchaseFound = cart.find(purchase => purchase.image === infoPurchase.image);
            if(purchaseFound){
                try {
                    setRefreshData(false)
                    const url = `http://localhost:4000/store/cart/${purchaseFound.id}`;
                    const { data } = await axios.put(url, infoPurchase);
                    setRefreshData(true)
                    console.log(data)
                    return data
                }
                catch (error: unknown) {
                    if (error instanceof AxiosError) {
                        console.log(error.message);
                        return
                    }
                }
            }
            else{
                console.log('es nuevo')
                try {
                    setRefreshData(false);
                    infoPurchase.id_purchase = generarId()
                    const url = `http://localhost:4000/store/cart`;
                    const { data } = await axios.post(url, infoPurchase);
                    setRefreshData(true)
                    console.log(data)
                    return data
                }
                catch (error: unknown) {
                    if (error instanceof AxiosError) {
                        console.log(error.message);
                        return
                    }
                }
            }
  
           
            return
        }
    }

    return (
        <>
            <div className="grid md:grid-cols-2 w-full lg:w-3/4 mx-auto gap-10 bg-slate-300 p-10 mt-20">
                <div>
                    <h2 className="text-center mb-4 text-2xl">{product.name}</h2>
                    <img className="w-9/12 md:w-[400px] mx-auto" src={`http://localhost:4000/store/product_image/${product?.image }`} alt="img-product" />
                   
                </div>
                
                <div className="flex flex-col justify-center items-center">
                    <p className="text-2xl ">Price: {product.price && formaterDinero(product.price)}</p>
                    <div className="mt-40 flex gap-8 justify-center mb-10 w-full">
                        <button className="text-red-500 hover:text-white hover:bg-red-600  border border-1 border-red-500 w-10 rounded-sm text-2xl font-bold" 
                            onClick={handleLessQuantityProduct}>-</button>
                        <button className="text-2xl">{quantity}</button>
                        <button  className="text-blue-500 hover:text-white hover:bg-blue-600  border border-1 border-blue-500 w-10 rounded-sm text-2xl font-bold" 
                            onClick={handleAddQuantityProduct}>+</button>
                        <img className="w-[30px] cursor-pointer" src="/images/basura.png" alt="image-garbage" />
                    </div>
                    <div className="w-full">
                        <button className=" bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-bold p-2 w-full block rounded-md uppercase" 
                            onClick={() => {
                            handleAddPurchase();
                            if(quantity > 0){
                                Navigate('/cart')
                                return
                            }
                        }}>add to cart</button>
                    </div>
                </div>
            </div>
           
        </>
    )
}

export default DetailProduct