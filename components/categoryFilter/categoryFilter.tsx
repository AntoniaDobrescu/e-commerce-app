import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import CategoryFilterItem from './categoryFilterItem/categoryFilterItem';

export interface CategoryOption {
    value: string,
    isSelected: boolean,
}

interface Props {
    categoryFilterOptions: string[],
    changeCategoryFilter: (value: string[]) => void,
}

const CategoryFilter: FC<Readonly<Props>> = memo((
    {
        categoryFilterOptions,
        changeCategoryFilter
    }
) => {
    const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>(() => {
        const result = [];

        categoryFilterOptions.forEach(category => {
            const singleResult: CategoryOption = {
                value: category,
                isSelected: false,
            }
            result.push(singleResult)

        });

        return result;
    });

    const onHandleChange = useCallback((categoryOption: CategoryOption, isChecked: boolean) => {
        const newCategoryOptions = [...categoryOptions];

        newCategoryOptions.forEach((item, idx) => {
            if (item.value === categoryOption.value) {
                newCategoryOptions[idx].isSelected = isChecked
            }
        })

        setCategoryOptions(newCategoryOptions);
    }, [])

    useEffect(() => {
        const values: string[] = [];

        categoryOptions.forEach(elem => {
            if (elem.isSelected) {
                values.push(elem.value);
            }
        })
;
        changeCategoryFilter(values);
    }, [categoryOptions])

    return (
        <div>
            <ul>
                {categoryOptions.map(category => <CategoryFilterItem
                    key={category.value}
                    categoryOption={category}
                    onHandleChange={onHandleChange}
                />)}

            </ul>
        </div>
    );
});

export default CategoryFilter;
