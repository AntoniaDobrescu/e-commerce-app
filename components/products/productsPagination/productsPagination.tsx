import React, { useCallback, useMemo } from 'react';
import { ProductPaginationItem, useAppContext } from '../../../context/productsContext';
import ProductPaginationButton from './productPaginationItem/productPaginationButton';
import style from './productsPagination.module.scss';
import Image from 'next/image';
import classNames from 'classnames';

const ProductsPagination = () => {
    const {paginationProductsList, selectedPaginationProducts, setSelectedPaginationProducts} = useAppContext();

    const onHandleClick = (productPaginationItem: ProductPaginationItem) => {
        setSelectedPaginationProducts(productPaginationItem);
    }

    const handleClickPage = useCallback((deviation: number) => {
        const currentIdx: number = paginationProductsList.findIndex(elem => elem.label === selectedPaginationProducts.label);

        const nextPage = paginationProductsList[currentIdx + deviation];

        if (nextPage) {
            setSelectedPaginationProducts(nextPage);
        }
    }, [paginationProductsList, selectedPaginationProducts]);

    const handleClickNextPage = useCallback(() => {
        handleClickPage(1)
    }, [handleClickPage])
    const handleClickPreviousPage = useCallback(() => {
        handleClickPage(-1)
    }, [handleClickPage]);

    const isPreviousDisabled = useMemo<boolean>(() => {
        if (!selectedPaginationProducts || !paginationProductsList) {
            return true;
        }

        return selectedPaginationProducts.label === paginationProductsList[0]?.label
    }, [selectedPaginationProducts, paginationProductsList])

    const isNextDisabled = useMemo<boolean>(() => {
        if (!selectedPaginationProducts || !paginationProductsList) {
            return true;
        }

        return selectedPaginationProducts.label === paginationProductsList[paginationProductsList.length - 1]?.label
    }, [selectedPaginationProducts, paginationProductsList])

    return (
        <div className={style.paginationContainer}>
            <button
                onClick={handleClickPreviousPage}
                disabled={isPreviousDisabled}
                // className={style.arrowButton}
                className={classNames(style.arrowButton, {
                    [style['disabled']]: isPreviousDisabled
                })}
            >
                <div className={style.arrowContainerLeft}>
                    <Image
                        priority
                        src="/images/arrow.png"
                        className={style.arrow}
                        alt={'logo'}
                        layout={'fill'}
                    />
                </div>
            </button>
            <ul className={style.pagesContainer}>
                {paginationProductsList.map((productPaginationItem: ProductPaginationItem) => {
                    return (
                         <ProductPaginationButton
                            key={productPaginationItem.label}
                            productPaginationItem={productPaginationItem}
                            onHandleClick={onHandleClick}
                            selectedPaginationProducts={selectedPaginationProducts}
                        />
                    );
                })}
            </ul>
            <button
                onClick={handleClickNextPage}
                disabled={isNextDisabled}
                className={classNames(style.arrowButton, {
                    [style['disabled']]: isPreviousDisabled
                })}
            >
                <div className={style.arrowContainerRight}>
                    <Image
                        priority
                        src="/images/arrow.png"
                        className={style.arrow}
                        alt={'logo'}
                        layout={'fill'}
                    />
                </div>
            </button>
        </div>
    );
};

export default ProductsPagination;
