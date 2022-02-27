import React, { useState } from 'react';
import classNames from 'classnames';
import style from './product.module.scss';
import Button from '../button/button';
import { Product } from '../../models/models';
import Image from 'next/image';

const Product = (props: Product) => {
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

    // const {
    //     dimensions,
    //     size,
    //     description,
    //     recommendations,
    // } = details;
    //
    // const {
    //     width,
    //     height,
    // } = dimensions;

    // if (image) {
    //     const {
    //         src,
    //         alt,
    //     } = image;
    // }


    const handleShowButton = (e): void => {
        e.preventDefault();
        setDisplayButton(prevCheck => !prevCheck);
    }

    const handleHideButton = (e): void => {
        // console.log('inside handleHideButton')
        e.preventDefault();
        setDisplayButton(prevCheck => !prevCheck);
    }

    const isItemRecommendation: boolean = !!details;
    const [displayButton, setDisplayButton] = useState<boolean>(true);


    // image?.src && console.log('image', `${image.src}`);

    return (
        <div className={style.productContainer}>
            {bestseller &&
                <span>Best Seller</span>
            }
            <div>category: {category}</div>
            <div>name: {name}</div>
            {image?.src &&
                <Image
                    className={style.image}
                    src={image.src}
                    alt={image.alt}
                    onMouseEnter={e => handleShowButton(e)}
                    onMouseLeave={e => handleHideButton(e)}
                    height={108}
                    width={108}
                />
            }
            <Button
                buttonText={'ADD TO CART'}
                className={classNames(style.button, {
                [style['button--notDisplayed']]: displayButton
            })}/>
        </div>
)};

export default Product;
