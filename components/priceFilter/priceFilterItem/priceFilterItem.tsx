import React, { FC, useCallback } from 'react';
import { PriceOption } from '../priceFilter';

interface Props {
    priceOption: PriceOption;
    onHandleChange: (price: PriceOption, isChecked: boolean) => void;
}

const PriceFilterItem:FC<Readonly<Props>> = (
    {
        priceOption,
        onHandleChange
    }
) => {
    const {label, isChecked} = priceOption;

    const handleChange = useCallback((event) => {
        onHandleChange(priceOption, event.target.checked);
    }, [])

    return (
        <li>
            <input onChange={handleChange} id={label} type="checkbox" checked={isChecked}/>
            <label htmlFor={label}>{label}</label>
        </li>
    );
};

export default PriceFilterItem;
