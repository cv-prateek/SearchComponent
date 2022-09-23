import React, { useEffect, useState } from 'react';
import SearchBar from '../components/searchBox';
import axios from "axios";

const Search = () => {

    const [stockData, setstockData] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const getCustomersData = () => {
        axios
            .get("https://jsonplaceholder.typicode.com/todos")
            .then(data => setstockData(data.data))
    };

    const onChange = (value: any) => {
        setSearchTerm(value);
    };

    useEffect(() => {
        getCustomersData();
    }, [])

    return (
        <>
            <SearchBar stockData={stockData} type="name" placeholder="search" filterKey="title"
                searchTerm={searchTerm}
                handleChange={onChange}
            />
        </>
    );
};
export default Search;