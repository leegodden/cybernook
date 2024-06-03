import { useNavigate } from "react-router-dom"
import { Product } from "../../interface/Product"
import React from "react"
import { formaterDinero } from "../../helpers"

const CardProduct : React.FC<Product> = ({product}) => {
    const Navigate = useNavigate();
    //console.log(product)
  return (
    <div onClick={() => Navigate(`/detail/${product.id}`)} className="mx-auto w-full  shadow-md border border-gray-100 bg-gray-200 p-4 rounded-sm">
      
        <div  className="w-3/4 h-52 m-10 md:w=[200px] mx-auto">
        <img className={`${product.category === 'phone' || product.category === 'camera' ? 'mx-auto w-[140px] h-[160px]' : 'mx-auto w-[300px] h-[200px] md:h-[130px] xl:h-[140px] 2xl:h-[180px]' }`} src={`http://localhost:4000/store/product_image/${product.image}`} alt="img-product" />
        </div>
        <h2 className="text-center">{product.name}</h2>
        <p className="text-center text-2xl ">{product.price && formaterDinero(product.price)}</p>
    </div>
  )
}

export default CardProduct