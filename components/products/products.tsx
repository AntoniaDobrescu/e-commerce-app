import React from 'react';
import Product from '../product/product';
import { useAppContext } from '../../context/productsContext';
import style from './products.module.scss';
import ProductsPagination from './productsPagination/productsPagination';
import { ProductModel } from '../../models/models';
import OrderController from '../orderController/orderController';

const Products = () => {
    const {productsListPage} = useAppContext();

    if (!productsListPage) {
        return <div>No products available</div>
    }

    return (
        <>
            <div className={style.productList}>
                <div className={style.wrapper}>
                    <div className={style.productListTitle}>
                        <span className={style.boldText}>Photography /</span>
                        <span className={style.normalText}>Premium Photos</span>
                    </div>
                    <OrderController />
                </div>
                {
                    productsListPage.map((product: ProductModel, i: number) => {
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
