import React, { FC, useCallback } from 'react';
import { CategoryOption } from '../categoryFilter';

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
        <li>
            <input onChange={handleChange} id={value} type="checkbox" checked={isSelected}/>
            <label htmlFor={value}>{value}</label>
        </li>
    );
};

export default CategoryFilterItem;
