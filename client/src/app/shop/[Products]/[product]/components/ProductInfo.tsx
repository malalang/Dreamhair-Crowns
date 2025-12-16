import React from 'react';

interface ProductInfoProps {
	product: ProductType;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {

	return (
		<div className=' p-2 rounded-md text-white space-y-8'>
			{/* Product Name and Price */}
			<article>
				<h1 className='text-4xl font-extrabold'>{product.Name}</h1>
				<p className='text-3xl text-center text-yellow-500 font-bold text-white mt-2'>
					R{product.Price.toFixed(2)}
				</p>
			</article>

			{/* Description */}
			<article>
				<h2 className='text-2xl font-bold text-white mb-3'>Description</h2>
				<ul className='list-disc list-inside space-y-1.5 text-white'>
					{product.Description.map((d: string, index: number) => (
						<li key={index}>{d}</li>
					))}
				</ul>
			</article>
		</div>
	);
};

export default ProductInfo;