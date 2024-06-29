import React from 'react';
import {useNavigate} from "react-router-dom";
import './SearchResults.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CATEGORIES as categories } from "../../constants/caterories.constants";
import { ISearchByCategoryResults } from "../../typing/types";

interface SearchResultsProps {
    results: Partial<ISearchByCategoryResults>;
}

const SearchResults = ({results}: SearchResultsProps) => {
    const navigate = useNavigate();

    return (
        <div className="search-results-grid">
            {categories.map(category => (
                <Card key={category} className="mb-3">
                    <Card.Body>
                        <Card.Title>{category.charAt(0).toUpperCase() + category.slice(1)}</Card.Title>
                        <Card.Text>
                            <ul>
                                {results[category as keyof ISearchByCategoryResults]?.slice(0, 3).map((result: any) => (
                                    <li key={result.url}>{result.name || result.title}</li>
                                ))}
                            </ul>
                        </Card.Text>
                        {results[category as keyof ISearchByCategoryResults]?.length! > 0 && (
                            <Button variant="primary" onClick={() => navigate(`category/${category}`)}>View All</Button>
                        )}
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default SearchResults;
