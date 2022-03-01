import React, { FC } from 'react';
import classNames from 'classnames';

import style from './productPaginationButton.module.scss';
import { NumberOfProductsPerPage, ProductPaginationItem } from '../../../../context/productsContext';

interface Props {
    productPaginationItem: ProductPaginationItem;
    selectedPaginationProducts: ProductPaginationItem;
    onHandleClick: (productPaginationItem: ProductPaginationItem) => void;
}

const ProductPaginationButton: FC<Readonly<Props>> = (
    {
        productPaginationItem,
        onHandleClick,
        selectedPaginationProducts,
    }
) => {
    const {label} = productPaginationItem;

    const handleClick = () => {
        onHandleClick(productPaginationItem)
    }
    console.log('productPaginationItem: ', productPaginationItem);

    return (
        <li >
            <button className={classNames(style.button, {
                [style['button--isSelected']]: selectedPaginationProducts.label === productPaginationItem.label
            })} onClick={handleClick}>{label}</button>
        </li>
    );
};

export default ProductPaginationButton;
