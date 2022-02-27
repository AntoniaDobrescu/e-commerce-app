import { mockData } from './mockData';

const getDataMock = (
    getError = false,
    loadTime = 100
): Promise<any> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (getError) return reject("Dummy error message");
            else {
                return resolve(mockData);
            }
        }, loadTime);
    });
};

export default getDataMock;
