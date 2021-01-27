import React, {useState,useEffect} from 'react';
import { iex } from '../api/iex';
import axios from 'axios';

const Stock = (props) => {

    ////////////////////////////////------------------------------
    
    const [data,setData] = useState({})
    const [quantityToBuy, setQuantityToBuy] = useState( 0 );

    useEffect( () => {
        const url = `${iex.url}/stock/${props.ticker}/intraday-prices?chartLast=1&token=${iex.api_key}`;
        axios(url).then((promise) => {
            let data = promise.data[promise.data.length-1];
            setData({
                price:data.close,
                date: data.date,
            })
        }).catch(err => alert(`error on ${props.ticker} -> ${err}`))
    },[])

    ////////////////////////////////------------------------------

    const plusHandler = () => setQuantityToBuy(Number(quantityToBuy) + 1 );
    
    const minusHandler = () => {
        if (quantityToBuy < 1) {
            return;
        }else{
            setQuantityToBuy(Number(quantityToBuy) - 1 )
        }
    };

    const addToMyShare = () => {
        if (quantityToBuy === 0){
            alert `Choose an amount to buy`
            return;
        }else{
            props.onClick({
                ticker: props.ticker, 
                amount: quantityToBuy, 
                price: -Number(quantityToBuy)*data.price
            })
            setQuantityToBuy( 0 )
        }
        
    }

    ////////////////////////////////------------------------------

    return(
        <tr>
            <td>{props.ticker}</td>
            <td>{data.price}</td>
            <td>{data.date}</td>
            <td>{quantityToBuy}</td>
            <td>
                <button className="plus" onClick={plusHandler}>+</button>
                <button className="minus" onClick={minusHandler}>-</button>
            </td>
            <td>
                <button onClick={addToMyShare} className="add">Add !</button>
            </td>            
        </tr>
    )
}
export default Stock;