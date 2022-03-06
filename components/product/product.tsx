import React from 'react';
import style from './product.module.scss';
import Button from '../button/button';
import { ProductModel } from '../../models/models';
import Image from 'next/image';
import placeholder from '../../mock/mockPhoto/placeholder.png';

const Product = (props: ProductModel) => {
    const {
        name,
        category,
        price,
        currency,
        image,
        bestseller,
        featured,
        details,
    } = props;

    return (
        <div className={style.productContainer}>
            <div className={style.productImageContainer}>
                {bestseller &&
                    <span className={style.productBestSeller}>Best Seller</span>
                }
                {image?.src
                    ?
                        <Image
                            className={style.image}
                            src={image.src}
                            alt={image.alt}
                            layout={'fill'}
                        />
                    :
                        <Image
                            className={style.image}
                            src={placeholder}
                            alt={'placeholder'}
                            layout={'fill'}
                        />
                }
                <Button
                    buttonText={'ADD TO CART'}
                    className={style.productButton}
                />
            </div>
            <div className={style.productDetailsContainer}>
                <div className={style.productCategory}>{category}</div>
                <div className={style.productName}>{name}</div>
                <div className={style.productPrice}>${price}</div>
            </div>
        </div>
    )
};

export default Product;
