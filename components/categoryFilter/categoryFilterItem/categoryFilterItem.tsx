import React, { FC, useCallback } from 'react';
import { CategoryOption } from '../categoryFilter';
import style from './categoryFilterItem.module.scss';

interface Props {
    categoryOption: CategoryOption,
    onHandleChange: (category: CategoryOption, isChecked: boolean) => void;
}

const CategoryFilterItem: FC<Readonly<Props>> = (
    {
        categoryOption,
        onHandleChange
    }
) => {
    const {isSelected, value} = categoryOption;
    const handleChange = useCallback((event) => {
        onHandleChange(categoryOption, event.target.checked);
    }, [])

    return (
        <li className={style.categoryFilterItem}>
            <input
                onChange={handleChange}
                id={value}
                type="checkbox"
                checked={isSelected}
                className={style.categoryFilterItemCheckbox}
            />
            <label
                htmlFor={value}
                className={style.categoryFilterItemLabel}
            >
                {value}
            </label>
        </li>
    );
};

export default CategoryFilterItem;
