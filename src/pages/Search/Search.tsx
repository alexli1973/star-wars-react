import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { fetchData } from "../../services/api";
import { ISearchByCategoryResults } from "../../typing/types";
import SearchResults from "../../components/SearchResults/SearchResults";
import Loader from "../../components/Loader/Loader";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [results, setResults] = useState<Partial<ISearchByCategoryResults>>({});
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getResults = async () => {
            if (searchTerm) {
                setLoading(true);
                const data = await fetchData(searchTerm);
                setResults(data);
                setLoading(false);
            } else {
                setResults({});
            }
        };
        (async () => {
            await getResults();
        })();
        //getResults();
    }, [searchTerm]);

    return (
        <div>
            <div>
                <h3>Star Wars Search page</h3>
            </div>
            <InputGroup>
                <FormControl
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </InputGroup>

            {loading ? (
                <Loader/>
            ) : (
                <SearchResults results={results}/>
            )}
        </div>
    );
};

export default Search;
