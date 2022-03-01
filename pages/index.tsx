import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'
import Image from 'next/image';
import Products from '../components/products/products';
import React, { useEffect } from 'react';
import { useAppContext } from '../context/productsContext';
import ProductFeatured from '../components/productFeatured/productFeatured';
import CategoryFilter from '../components/categoryFilter/categoryFilter';
import PriceFilter from '../components/priceFilter/priceFilter';
import OrderController from '../components/orderController/orderController';

export default function Home({
                                 allPostsData
                             }: {
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
                <title>test</title>
            </Head>
            <section>
                {/*<ProductFeatured />*/}
            </section>
            <section>
                {
                    categoryFilterOptions
                    ? <CategoryFilter
                            categoryFilterOptions={categoryFilterOptions}
                            changeCategoryFilter={changeCategoryFilter}
                            setSelectedPaginationToDefault={setSelectedPaginationToDefault}
                        />
                        : null
                }
            </section>

            <section>
                <PriceFilter
                    setSelectedPaginationToDefault={setSelectedPaginationToDefault}
                    changePriceFilter={changePriceFilter}
                />
            </section>

            <section>
                <OrderController />
                <Products/>
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
