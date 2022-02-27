import React from 'react';
import Product from '../product/product';
import { useAppContext } from '../../context/productsContext';
import style from './products.module.scss';

const Products = () => {
    const {productsList} = useAppContext();

    if (!productsList) {
        return <div>No products available</div>
    }

    return (
        <div className={style.list}>
            {
                // add index
                //create type for product
                productsList.map((product, i) => {
                    const {
                        name,
                        category,
                        price,
                        currency,
                        image,
                        bestseller,
                        featured,
                        details,
                    } = product;

                    return (
                        <Product
                            key={i}
                            name={name}
                            category={category}
                            price={price}
                            currency={currency}
                            image={image}
                            bestseller={bestseller}
                            featured={featured}
                            details={details}
                        />

                    )
                })
            }
        </div>
    );
};

export default Products;
