import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {fetchDataByCategory} from "../../services/api";
import {IGetCategoryResult, IPerson} from "../../typing/types";
import PersonsList from "../../components/PersonsList/PersonsList";


const CategoryResults = () => {
    const { category } = useParams<{ category: string }>();
    const [resultsList, setResults] = useState<IGetCategoryResult[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (category) {
                const data = await fetchDataByCategory(category);
                setResults(data);
            }
        };
        (async () => {
            await fetchData();
        })();
    }, [category]);

    if (!category) return null;

    const isPersonsCategory = category === 'people';
    const personsList = isPersonsCategory ? (resultsList as IPerson[]) : [];

    return (
        <div>
            <div>
                <h3>{category.toUpperCase()}</h3>
            </div>
            {category === 'people' ? (
                <PersonsList personsList={personsList} setPerson={setResults as React.Dispatch<React.SetStateAction<IPerson[]>>}/>
                // <PersonsList personsList={resultsList} setPerson={setResults} />
            ) : (
                <div><span>Category page for {category}</span></div>
            )}
        </div>
    );
};

export default CategoryResults;
