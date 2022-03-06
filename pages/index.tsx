import Head from 'next/head'
import Layout from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import { GetStaticProps } from 'next'
import Products from '../components/products/products';
import React, { useEffect } from 'react';
import { useAppContext } from '../context/productsContext';
import ProductFeatured from '../components/productFeatured/productFeatured';
import CategoryFilter from '../components/categoryFilter/categoryFilter';
import PriceFilter from '../components/priceFilter/priceFilter';
import OrderController from '../components/orderController/orderController';
import style from './index.module.scss';

export default function Home({
    allPostsData
}:{
    allPostsData: {
        date: string
        title: string
        id: string
    }[]
}) {
    const {getInitialProductsData,
        categoryFilterOptions,
        changeCategoryFilter,
        changePriceFilter,
        setSelectedPaginationToDefault,
    } = useAppContext();

    useEffect(() => {
        getInitialProductsData();
    }, [])

    return (
        <Layout home>
            <Head>
                <title>e-commerce</title>
            </Head>
            <section className={style.productFeaturedContainer}>
                <ProductFeatured />
            </section>
            <section className={style.filterOrderProductsContainer}>
                <div className={style.filterContainer}>
                    {
                        categoryFilterOptions
                        ?
                            <CategoryFilter
                                categoryFilterOptions={categoryFilterOptions}
                                changeCategoryFilter={changeCategoryFilter}
                                setSelectedPaginationToDefault={setSelectedPaginationToDefault}
                            />
                        :
                            null
                    }
                    <PriceFilter
                        setSelectedPaginationToDefault={setSelectedPaginationToDefault}
                        changePriceFilter={changePriceFilter}
                    />

                </div>
                <div>
                    <Products/>
                </div>
            </section>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}
