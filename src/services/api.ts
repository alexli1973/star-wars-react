import axios from 'axios';
import { BASE_URL } from "../constants/api.constants";

import {IGetCategoryResult, ISearchByCategoryResults} from "../typing/types";
import { CATEGORIES as categories } from "../constants/caterories.constants";


export const fetchData = async (searchTerm: string): Promise<Partial<ISearchByCategoryResults>> => {
    if (!searchTerm) return {};

    try {
        const promises = categories.map(category =>
            axios.get(`${BASE_URL}${category}/?search=${searchTerm}`)
                .then(response => ({ status: 'fulfilled', category, data: response.data.results }))
                .catch(error => ({ status: 'rejected', category, error }))
        );

        const settledPromises = await Promise.allSettled(promises);

        const resData: Partial<ISearchByCategoryResults> = {};

        settledPromises.forEach(result => {
            if (result.status === 'fulfilled') {
                const fulfilledResult = result as PromiseFulfilledResult<{ status: 'fulfilled'; category: string; data: any[]; }>;
                resData[fulfilledResult.value.category as keyof ISearchByCategoryResults] = fulfilledResult.value.data;
            } else {
                const rejectedResult = result as PromiseRejectedResult;
                console.error(`Error fetching data for ${rejectedResult.reason.category}`, rejectedResult.reason.error);
            }
        });

        return resData;
    } catch (error) {
        console.error("Error fetching data", error);
        return {};
    }
};

export const fetchDataByCategory = async (category: string): Promise<IGetCategoryResult[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/${category}/`);
        return response.data.results;
    } catch (error) {
        console.error(`Failed to fetch ${category} data:`, error);
        return [];
    }
}
