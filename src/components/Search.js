import React, {useState} from 'react';
import '../App.css';

const Search = (props) => {
    
    const [symbol,setSymbol] = useState("");

    const inputHandler = (e) => setSymbol(e.target.value);
    const submitHandler = (e) => {
        e.preventDefault();
        props.onClick(symbol)
        setSymbol("");
    }

    return(
        <tr id="search">
            <td>Type a ticker</td>
            <td>
                <form onSubmit={submitHandler}>
                    <input onInput={inputHandler} value={symbol} className="searchInput"/>
                    <button >Search</button>
                </form>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    )
}

export default Search;