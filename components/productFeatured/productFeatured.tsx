import React from 'react';
import { useAppContext } from '../../context/productsContext';
import style from './productFeatured.module.scss';
import Image from 'next/image';
import { ItemRecommendation, ProductModel } from '../../models/models';

const ProductFeatured = () => {
    const {productFeatured} = useAppContext();

    if (!productFeatured) {
        return null;
    }

    const {
        name,
        image,
        details,
    }: ProductModel = productFeatured;

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
                    <span className={style.text}>Photo of the day</span>
                </div>
            </div>
            <button className={style.button}>ADD TO CART</button>
            <div className={style.descriptionDetailsWrapper}>
                <div className={style.descriptionContainer}>
                    <div className={style.descriptionTitle}>About the {name}</div>
                    <p className={style.descriptionText}>{details.description}</p>
                </div>
                <div>
                    <div className={style.recommendationContainer}>
                        <div className={style.recommendationTitle}>People also buy</div>
                        <div className={style.recommendationsImagesContainer}>
                            {details.recommendations.map((item: ItemRecommendation, i: number) => {
                                return (
                                    <div className={style.recommendationsImage} key={i}>
                                       <Image
                                           key={i}
                                           src={item.src}
                                           alt={item.alt}
                                           layout={'fill'}
                                       />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={style.detailsContainer}>
                        <div className={style.detailsTitle}>Details</div>
                        <div className={style.detailsContent}>
                            <div className={style.detailsSize}>Size: ${details.dimensions.width} x ${details.dimensions.height} pixel</div>
                            <div className={style.detailsSize}>Size: ${details.size/1000} mb</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductFeatured;
