import React, { useCallback, useMemo } from 'react';
import { ProductPaginationItem, useAppContext } from '../../../context/productsContext';
import ProductPaginationButton from './productPaginationItem/productPaginationButton';

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
        <div>
            <button onClick={handleClickPreviousPage} disabled={isPreviousDisabled}> prev </button>
            <ul>
                {paginationProductsList.map((productPaginationItem: ProductPaginationItem) => {
                    return <ProductPaginationButton
                        key={productPaginationItem.label}
                        productPaginationItem={productPaginationItem}
                        onHandleClick={onHandleClick}
                        selectedPaginationProducts={selectedPaginationProducts}
                    />
                })}
            </ul>
            <button onClick={handleClickNextPage} disabled={isNextDisabled}> next </button>
        </div>
    );
};

export default ProductsPagination;
