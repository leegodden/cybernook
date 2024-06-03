export type PurchaseType = {
    name : string,
    price: number,
    quantityProduct : number ,
    image : string,
    id_purchase :  string,
    id?: number
}

export interface Purchase  {
    purchase : PurchaseType

}

