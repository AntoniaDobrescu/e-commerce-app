import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import CategoryFilterItem from './categoryFilterItem/categoryFilterItem';
import style from './categoryFilter.module.scss';

export interface CategoryOption {
    value: string,
    isSelected: boolean,
}

interface Props {
    categoryFilterOptions: string[],
    changeCategoryFilter: (value: string[]) => void,
    setSelectedPaginationToDefault: () => void,
}

const CategoryFilter: FC<Readonly<Props>> = memo((
    {
        categoryFilterOptions,
        changeCategoryFilter,
        setSelectedPaginationToDefault,
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
        setSelectedPaginationToDefault();
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
        <div className={style.categoryFilterContainer}>
            <div className={style.categoryTitle}>Category</div>
            <ul>
                {categoryOptions.map(category =>
                    {
                        return (
                            <CategoryFilterItem
                                key={category.value}
                                categoryOption={category}
                                onHandleChange={onHandleChange}
                            />
                        );
                    })
                }
            </ul>
        </div>
    );
});

export default CategoryFilter;
