import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import getDataMock from '../mock';

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

    console.log('productsList: ', productsList);
    console.log('priceFilter: ', priceFilter)
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

export function AppWrapper({children}) {
    const [productsList, setProductsList] = useState<Array<Product> | null>(null);
    const [initialProductsList, setInitialProductsList] = useState<Array<Product> | null>(null);
    const [productFeatured, setProductFeatured] = useState<Product | null>(null);
    const [categoryFilterOptions, setCategoryFilterOptions] = useState<string[] | null>(null);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [priceFilter, setPriceFilter] = useState<PriceFilterModel | null>(null);

    console.log('priceFilter: ', priceFilter);

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
        return {productsList,
            productFeatured,
            getInitialProductsData,
            categoryFilterOptions,
            changeCategoryFilter,
            changePriceFilter,
        };
    }, [productsList,
        productFeatured,
        getInitialProductsData,
        categoryFilterOptions,
        changeCategoryFilter,
        changePriceFilter
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
