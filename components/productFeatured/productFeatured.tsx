import React from 'react';
import { useAppContext } from '../../context/productsContext';
import style from './productFeatured.module.scss';
import Image from 'next/image';
import { ItemRecommendation, Product } from '../../models/models';

const ProductFeatured = () => {
    const {productFeatured} = useAppContext();

    if (!productFeatured) {
        return null;
    }

    const {
        name,
        image,
        details,
    }: Product = productFeatured;

    return (
        <div className={style.productFeaturedContainer}>
            <h2 className={style.productFeaturedTitle}>{name}</h2>
            <div className={style.photoOfDayContainer}>
                <div className={style.imageContainer}>
                    <Image
                        className={style.image}
                        src={image.src}
                        alt={image.alt}
                        layout={'fill'}

                    />
                </div>
                <span className={style.text}>Photo of the day</span>
            </div>
            <button className={style.button}>ADD TO CART</button>
            <div>
                <div>`About the ${name}`</div>
                <p>{details.description}</p>
            </div>
            <div className={style.recommendationContainer}>
                <div>People also buy</div>
                {details.recommendations.map((item: ItemRecommendation, i: number) => {
                    return (
                        <div className={style.recommendationsImage}>
                           <Image
                               key={i}
                               src={item.src}
                               alt={item.alt}
                               layout={'fill'}
                           />
                        </div>
                    );
                }) }
            </div>
            <div className={style.detailsContainer}>
                <div className={style.detailsTitle}>Details</div>
                <div>
                    <div>Size: ${details.dimensions.width} x ${details.dimensions.height}</div>
                    <div>Size: ${details.size/1000}</div>
                </div>
            </div>
        </div>
    );
};

export default ProductFeatured;
