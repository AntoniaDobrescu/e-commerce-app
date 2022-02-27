import React from 'react';
import { useAppContext } from '../../context/productsContext';

const ProductFeatured = () => {
    const {productFeatured} = useAppContext();

    if (!productFeatured) {
        return null
    }

    return (
        <div>
            {productFeatured.name}
        </div>
    );
};

export default ProductFeatured;
