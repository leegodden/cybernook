import CardProduct from './CardProduct';

import { Products as ProductsArray } from '../../interface/Products';

import React from 'react';

const Products: React.FC<ProductsArray> = ({ products }) => {
	return (
		<div className='w-full md:w-3/4 mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
			{products.map((product) => {
				return <CardProduct key={product.id} product={product} />;
			})}
		</div>
	);
};

export default Products;
