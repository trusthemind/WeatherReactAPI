import React, { useState } from "react";
import "./style.css"
function Search({ onSearch }) {
    let [inputValue, setInputValue] = useState("")

    return (
        <form onSubmit={(e)=>{e.preventDefault();onSearch(inputValue);}}>
         <input type="text" placeholder="Enter your city" value={inputValue} onInput={(e) => { e.preventDefault(); setInputValue(e.target.value) }} />
        </form>
    );
}


export default Search;