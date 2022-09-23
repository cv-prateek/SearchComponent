import React, { useEffect, useState } from 'react';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { SearchBox, ISearchBoxStyles } from '@fluentui/react/lib/SearchBox';
import { useDebounce } from 'use-debounce';

const stackTokens: Partial<IStackTokens> = { childrenGap: 20 };
const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 400 }, };

interface InputValidatorProps {
    placeholder: string;
    value?: any;
    handleChange: (value: any) => void,
    searchTerm?: any;
    stockData?: any;
    type?: any;
    filterKey: string
}


const SearchBar = ({ stockData, handleChange, searchTerm, filterKey }: InputValidatorProps) => {
    const [searchData, setSearchData] = React.useState([] as any);
    const [selectedText, setSelectedText] = useState(false);
    const [data] = useDebounce(searchData, 1000);
    const onChangeSearch = (value: string) => {
        const serchLower = value.toLocaleLowerCase();
        if (serchLower !== "") {
            setSearchData(stockData.filter((item: any) => {
                let companyName = item[filterKey]
                companyName = companyName.toLocaleLowerCase()
                if (companyName.includes(serchLower)) {
                    return true
                }
                return null
            }));
        }
        else {
            setSearchData([])
        }
        handleChange(value);
        setSelectedText(true);
    };

    const onBlurclickOutside = () => {
        handleChange("")
        setSearchData([])
    }


    useEffect(() => {
        if (!searchTerm) {
            setSelectedText(false);
        }
    }, [searchTerm, selectedText]);

    return (
        <Stack tokens={stackTokens}>
            <SearchBox
                styles={searchBoxStyles}
                value={searchTerm}
                placeholder="Search"
                onBlur={() => onBlurclickOutside()}
                onClear={() => handleChange("")}
                onChange={(e: any) => onChangeSearch(e.target.value)}
            />
            {data?.length > 0 && <div className='Container Content'>
                {data?.map((x: any, i: any) => {
                    return (
                        <div key={i} className='ShowText' onClick={() => handleChange(x[filterKey])}>{x[filterKey]}</div>
                    )
                })}
            </div>}

            {(data?.length === 0 && searchTerm !== "" && selectedText) &&
                <div className='Container '>
                    <div> No record found</div>
                </div>}

        </Stack>
    );
};

export default SearchBar;