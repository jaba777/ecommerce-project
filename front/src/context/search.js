import { useState, createContext, useContext } from 'react';

const SearchContext=createContext();


export const SearchProvider=({children})=>{
    const [values,setValues]=useState({
       keyword: "",
       results: []
    })

    //default axios



    return(
        <SearchContext.Provider value={{values,setValues}}>
            {children}
        </SearchContext.Provider>
    )

}


export const useSearch=() => useContext(SearchContext);