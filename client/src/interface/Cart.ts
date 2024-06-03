
import { PurchaseType } from "./Purchase";
export interface Cart{
    cart : PurchaseType[]
    //setCart : (cart : PurchaseType[]) => void;
    setCart :  React.Dispatch<React.SetStateAction<PurchaseType[]>>;
    
}