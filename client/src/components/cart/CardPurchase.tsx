import { Purchase as PurchaseIterface } from "../../interface/Purchase"
// import { Cart } from "../../interface/Cart"
import React from "react"

const CardPurchase: React.FC<PurchaseIterface> = ({ purchase }) => {

  return (
    <div>
      <div className="flex mt-4 border border-1 border-slate-300 items-start p-4">
        <img className="w-[60px] md:w-[80px]" src={`http://localhost:4000/store/product_image/${purchase?.image}`} alt="img-purchase" />
        <div className="">
          <h2 className="text-center">{purchase.name}</h2>
          <p className="text-center">{purchase.price}</p>
          <p className="text-center">{purchase.quantityProduct}</p>
        </div>

      </div>
    </div>
  )
}

export default CardPurchase