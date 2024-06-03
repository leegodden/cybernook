import { useEffect, useState } from 'react';
import axios from 'axios';
import Products from './components/products/Products';
import { CartProvider } from './context/CartContext';
import DetailProduct from './components/products/DetailProduct';
import { Routes, Route } from 'react-router-dom';
import Cart from './components/cart/Cart';

function App(): JSX.Element {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const url = `http://localhost:4000/store/products`;
				const { data } = await axios(url);
				setProducts(data);
				console.log(data);
				return data;
			} catch (eror: unknown) {
				console.log(eror);
			}
		};
		getProducts();
	}, []);
	// console.log(products);
	return (
		<>
			<CartProvider>
				<Routes>
					<Route path='/store' element={<Products products={products} />} />
					<Route path='/detail/:id' element={<DetailProduct />} />
					<Route path='/cart' element={<Cart />} />
				</Routes>
			</CartProvider>
		</>
	);
}

export default App;
