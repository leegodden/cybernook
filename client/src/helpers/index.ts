export const formaterDinero = (cantidad : number) : string => {
    return cantidad.toLocaleString('en-US', {
        style : 'currency',
        currency : 'USD'
    });
};
export const generarId = () : string => {
     const id = Math.random().toString(16).substring(2) + Date.now().toString(16)
     return id
};