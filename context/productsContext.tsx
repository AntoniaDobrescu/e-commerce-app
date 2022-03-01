import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import getDataMock from '../mock';
import sortBy from 'lodash.sortby';

//remove Props from Product
import { PriceFilterModel, Product } from '../models/models';

const AppContext = createContext(null);

const filterByCategory = (categoryFilter: null | string[], productsList: Product[]): Product[] => {
    if (!categoryFilter || categoryFilter.length === 0) {
        return productsList;
    }
    let newProductList = [];

    categoryFilter.forEach(category => {
        const categoryProducts = productsList.filter(product => {
            return product.category === category;
        });

        newProductList = newProductList.concat(categoryProducts);
    })

    return newProductList;
};

const filterByPrice = (priceFilter: null | PriceFilterModel, productsList: Product[]): Product[] => {
    if (!priceFilter) {
        return productsList;
    }

    let newProducts = productsList.filter(product => {
        return product.price > priceFilter.min && product.price < priceFilter.max
    })

    return newProducts;
};

const generateCategoriesByList = (productsList: Product[]): string[] => {
    const categorySet = new Set();

    productsList.forEach((product: Product) => {
        categorySet.add(product.category);
    })

    return Array.from(categorySet) as string[];
}

const filterByRangeIndex = (productsList: Product[], selectedPaginationProducts: ProductPaginationItem): Product[] => {
    return productsList.slice(selectedPaginationProducts.startIndex, selectedPaginationProducts.endIndex);
}

export const NumberOfProductsPerPage = 6;

export interface ProductPaginationItem {
    startIndex: number;
    endIndex: number;
    label: number;
}

const defaultSelectedPaginationProducts: ProductPaginationItem = {
    startIndex: 0,
    endIndex: NumberOfProductsPerPage,
    label: 1,
}

export type SortDirection = 'Ascending' | 'Descending';
export type SortType = 'Price' | 'Alphabetically';

type SortingDataObject = {
    direction: SortDirection,
    type: SortType
}

const generateSortedProductsList = (productList: Product[], sortingDataObject: SortingDataObject) => {
    if (sortingDataObject) {
        if (sortingDataObject.direction === 'Ascending') {
            return sortBy(productList, [sortingDataObject.type === 'Price' ? 'price' : 'name'])
        } else {
            return sortBy(productList, [sortingDataObject.type === 'Price' ? 'price' : 'name']).reverse();
        }
    }
}

export function AppWrapper({children}) {
    const [productsList, setProductsList] = useState<Array<Product> | null>(null);
    const [initialProductsList, setInitialProductsList] = useState<Array<Product> | null>(null);
    const [productFeatured, setProductFeatured] = useState<Product | null>(null);

    const [categoryFilterOptions, setCategoryFilterOptions] = useState<string[] | null>(null);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [priceFilter, setPriceFilter] = useState<PriceFilterModel | null>(null);
    const [selectedPaginationProducts, setSelectedPaginationProducts] = useState<ProductPaginationItem>(
        defaultSelectedPaginationProducts)
    const [sortingDataObject, setSortingDataObject] = useState<SortingDataObject | null>(null);

    useEffect(() => {
        setProductsList((currentProductList: Product[]) => {
            return generateSortedProductsList(currentProductList, sortingDataObject)
        })
    }, [sortingDataObject])

    const setSelectedPaginationToDefault = useCallback(() => {
        setSelectedPaginationProducts(defaultSelectedPaginationProducts)
    }, [])

    const paginationProductsList = useMemo(() => {
        if (!productsList) {
            return [];
        }

        const value: ProductPaginationItem[] = [];

        for (let i = 0; i < (productsList.length / NumberOfProductsPerPage); i++) {
            value.push({
                label: (i + 1),
                startIndex: NumberOfProductsPerPage * i,
                endIndex: NumberOfProductsPerPage * (i + 1)
            })
        }

        return value;
    }, [productsList])

    const productsListPage = useMemo(() => {
        if (!productsList) {
            return []
        }

        return filterByRangeIndex(productsList, selectedPaginationProducts);
    }, [productsList, selectedPaginationProducts]);

    const changeCategoryFilter = useCallback((value: string[]) => {
        setCategoryFilter(value);
    }, [])

    const changePriceFilter = useCallback((value: PriceFilterModel | null) => {
        setPriceFilter(value);
    }, [])

    useEffect(() => {
        if (initialProductsList) {
            let newProductsList: Product[];

            newProductsList = filterByCategory(categoryFilter, initialProductsList);
            newProductsList = filterByPrice(priceFilter, newProductsList);

            setProductsList(newProductsList);
        }
    }, [categoryFilter, priceFilter, initialProductsList])

    const getInitialProductsData = useCallback(() => {
        getDataMock()
            .then(data => {

                const foundProductFeatured = data.products.find((item) => item.featured);
                const productListFiltered = data.products.filter(item => item.name !== foundProductFeatured.name);
                const categoryFilterOption = generateCategoriesByList(productListFiltered);

                setInitialProductsList(productListFiltered);
                setProductsList(productListFiltered);
                setProductFeatured(foundProductFeatured);
                setCategoryFilterOptions(categoryFilterOption);
            })
            .catch(e => {
                console.error(e)
            })
    }, [])

    const value = useMemo(() => {
        return {
            productFeatured,
            getInitialProductsData,
            categoryFilterOptions,
            changeCategoryFilter,
            changePriceFilter,
            paginationProductsList,
            productsListPage,
            selectedPaginationProducts,
            setSelectedPaginationProducts,
            setSelectedPaginationToDefault,
            setSortingDataObject,
        };
    }, [
        productFeatured,
        getInitialProductsData,
        categoryFilterOptions,
        changeCategoryFilter,
        changePriceFilter,
        paginationProductsList,
        productsListPage,
        selectedPaginationProducts,
        setSelectedPaginationProducts,
        setSelectedPaginationToDefault,
        setSortingDataObject,
    ])

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );

}

export function useAppContext() {
    return useContext(AppContext);
}
