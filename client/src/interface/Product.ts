
export type ProductType = {
    name:string,
    price : number,
    image : string,
    id : number | string,
    category : string,
}

export interface Product {
    product : ProductType
}

