import React from 'react';
import Product from '../product/product';
import { useAppContext } from '../../context/productsContext';
import style from './products.module.scss';
import ProductsPagination from './productsPagination/productsPagination';

const Products = () => {
    const {productsListPage} = useAppContext();

    if (!productsListPage) {
        return <div>No products available</div>
    }

    return (
        <>
            <div className={style.list}>
                {
                    // add index
                    //create type for product
                    productsListPage.map((product, i) => {
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
            <ProductsPagination/>
        </>
    );
};

export default Products;
