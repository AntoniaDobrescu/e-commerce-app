import React, { FC, useCallback } from 'react';
import { PriceOption } from '../priceFilter';
import style from './priceFilterItem.module.scss';

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
        <li className={style.priceFilterItem}>
            <input
                onChange={handleChange}
                id={label}
                type="checkbox"
                checked={isChecked}
                className={style.priceFilterItemCheckbox}
            />
            <label
                htmlFor={label}
                className={style.priceFilterItemLabel}
            >
                {label}
            </label>
        </li>
    );
};

export default PriceFilterItem;
