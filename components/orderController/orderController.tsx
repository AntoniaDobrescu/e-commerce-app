import React, { useCallback, useEffect, useState } from 'react';
import { SortDirection, SortType, useAppContext } from '../../context/productsContext';

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
        <div>
            <button onClick={handleDirectionChange}>Icon</button>
            <span>Sort By</span>
            <select name="sorting" id="sorting" value={type} onChange={handleTypeChange}>
                <option value='Price'>Price</option>
                <option value='Alphabetically'>Alphabetically</option>
            </select>
        </div>
    );
};

export default OrderController;
