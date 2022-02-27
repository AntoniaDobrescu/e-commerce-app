import { PriceFilter } from '../context/productsContext';

export const defaultPriceOptions: PriceFilter[] = [
    {
        min: 0,
        max: 20,
        label: 'Lower than $20'
    },
    {
        min: 20,
        max: 1000,
        label: '$20 - $100'
    },
    {
        min: 100,
        max: 200,
        label: '$100 - $200'
    },
    {
        min: 200,
        max: Number.POSITIVE_INFINITY,
        label: 'More than $200'
    },
]
