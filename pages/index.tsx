import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
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
                {
                    categoryFilterOptions
                    ? <CategoryFilter
                            categoryFilterOptions={categoryFilterOptions}
                            changeCategoryFilter={changeCategoryFilter}
                        />
                        : null
                }
            </section>

            <section>
                <PriceFilter changePriceFilter={changePriceFilter} />
            </section>
            <section>
                <ProductFeatured />
            </section>
            <section>
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
