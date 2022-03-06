import React, { FC, useCallback, useEffect, useState } from 'react';
import { defaultPriceOptions } from '../../constants/filter';
import { PriceFilterModel } from '../../models/models';
import PriceFilterItem from './priceFilterItem/priceFilterItem';
import style from './priceFilter.module.scss';


export interface PriceOption extends PriceFilterModel {
    isChecked: boolean;
}

interface Props {
    changePriceFilter: (priceFilter: PriceFilterModel | null) => void;
    setSelectedPaginationToDefault: () => void;
}

const PriceFilter: FC<Readonly<Props>> = (
    {
        changePriceFilter,
        setSelectedPaginationToDefault,
    }
) => {
    const [priceOptions, setPriceOptions] = useState<PriceOption[]>(() => {
        const result: PriceOption[] = defaultPriceOptions.map(elem => {
            return {
                ...elem,
                isChecked: false
            }
        })

        return result;
    })

    const onHandleChange = useCallback((priceOption: PriceOption, isChecked: boolean) => {
        const newPriceOptions = priceOptions.map(elem => {
            const isNewChecked = priceOption.label === elem.label ? isChecked : false

            return {
                ...elem,
                isChecked: isNewChecked
            }
        })

        setPriceOptions(newPriceOptions);
        setSelectedPaginationToDefault();
    }, [])

    useEffect(() => {
        const priceOption = priceOptions.find(elem => elem.isChecked);
        const parsedPriceOption: PriceFilterModel | null = priceOption
            ? {
                label: priceOption.label,
                min: priceOption.min,
                max: priceOption.max
            }
            : null;

        changePriceFilter(parsedPriceOption)
    }, [priceOptions])

    return (
        <div className={style.priceFilterContainer}>
            <div className={style.priceRangeTitle}>Price range</div>
            <ul>
                {priceOptions.map(price =>
                    {
                        return (
                            <PriceFilterItem
                                key={price.label}
                                priceOption={price}
                                onHandleChange={onHandleChange}
                            />
                        );
                    }
                )}
            </ul>
        </div>
    );
};

export default PriceFilter;
