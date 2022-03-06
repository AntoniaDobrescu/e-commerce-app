import React, { useCallback, useEffect, useState } from 'react';
import { SortDirection, SortType, useAppContext } from '../../context/productsContext';
import Image from 'next/image';
import upAndDown from '../../public/images/up-down.png';
import style from './orderControler.module.scss';

const OrderController = () => {
    const [direction, setDirection] = useState<SortDirection | null>(null);
    const [type, setType] = useState<SortType>('Price');
    const {setSortingDataObject} = useAppContext();

    const handleTypeChange = useCallback((event) => {
        setType(event.target.value);
    }, [])

    const handleDirectionChange = useCallback(() => {
        setDirection((currentDirection) => {
            const newDirection: SortDirection = (function () {switch(currentDirection) {
                case null: {
                    return 'Ascending'
                }
                case 'Ascending': {
                    return 'Descending'
                }
                case 'Descending': {
                    return 'Ascending'
                }
            }})()

            return newDirection
        })
    }, [])

    useEffect(() => {
        if (direction) {
            setSortingDataObject({
                direction,
                type,
            })
        }

    }, [direction, type])

    return (
        <div className={style.orderControllerContainer}>
            <button onClick={handleDirectionChange} className={style.upAndDownButton}>
                <div className={style.upAndDown}>
                    <Image
                        priority
                        src={upAndDown}
                        alt={'upAndDown'}
                        layout={'fill'}
                    />
                </div>
            </button>
            <div className={style.orderControllerText}>Sort By</div>
            <select
                name="sorting"
                id="sorting"
                value={type}
                onChange={handleTypeChange}
                className={style.orderControllerSelect}
            >
                <optgroup className={style.orderControllerOption}>
                    <option value='Price' className={style.orderControllerOption}>Price</option>
                    <option value='Alphabetically' className={style.orderControllerOption}>Alphabetically</option>
                </optgroup>
            </select>
        </div>
    );
};

export default OrderController;
