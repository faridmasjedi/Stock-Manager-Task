import React,{useState,useEffect} from 'react';
import {iex} from '../api/iex';
import axios from 'axios';

const MyShares = (props) => {

    ////////////////////////////////------------------------------
    const [mySharesPrice, setMySharesPrice] = useState('');
    const [amountToSell, setAmountToSell] = useState( 0 );
    
    useEffect( () => {
        let url = `${iex.url}/stock/${props.share}/intraday-prices?chartLast=1&token=${iex.api_key}`;

        axios(url).then((promise) => {
            let data = promise.data[promise.data.length-1];
            setMySharesPrice(data.close)
        });
    },[props.share])
    
    ////////////////////////////////------------------------------
    const addAmount = () => {
        if (amountToSell === props.quantity) {
            alert `Mamimum amount to sell is reached`;
            return;
        }else{
            setAmountToSell(amountToSell+1)
        }
    };
    const minusAmount = () => {
        if (amountToSell < 1 ){
            return;
        }else{
            setAmountToSell(amountToSell-1)
        }
    };

    const sellHandler = () => {
        if (amountToSell>props.quantity) {
            alert `You can not sell more than what you have`;
            return;
        }else{            
            if (amountToSell === props.quantity) {
                props.onClick({
                    moneyBack:amountToSell * mySharesPrice,
                    delete: true,
                    name: props.share,
                    quantity: 0
                })
                
            }else{
                setAmountToSell(0)
                props.onClick({
                    moneyBack:amountToSell * mySharesPrice,
                    delete: false,
                    name: props.share,
                    quantity: props.quantity - amountToSell
                })
            }
        }   
    }

    ////////////////////////////////------------------------------

    return(

        <tr>
            <td>{props.share}</td>
            <td>{mySharesPrice}</td>
            <td>{props.quantity}</td>
            <td>{amountToSell}</td>
            <td>
                <button className="plus" onClick={() => addAmount()}>+</button>
                <button className="minus" onClick={() => minusAmount()}>-</button>
            </td>
            <td>
                <button onClick={() => sellHandler()} className="sell">Sell !</button>
            </td>            
        </tr>
    )
}
export default MyShares;