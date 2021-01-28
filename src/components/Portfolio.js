import React,{useState,useEffect} from 'react';
import MyShares from './MyShares';
import {connect} from 'react-redux';

const Portfolio = (props) => {

    ////////////////////////////////------------------------------

    const [mySharesTicker, setMySharesTicker] = useState(props.list[0].mySharesTicker);
    const [mySharesQuantity, setMySharesQuantity] = useState(props.list[0].mySharesQuantity);
    const [budget,setBudget] = useState( props.list[0].budget ); 
    const [add,setAdd] = useState( '' );
    const [withdraw, setWithdraw] = useState( '' );

    useEffect( () => {
        props.onChange(budget);
    },[budget]);

    useEffect( () => {
        let {amount,price,ticker} = props.buy;

        if (price !== undefined){
            setBudget(budget + Number(props.buy.price));
            
            if (mySharesTicker.includes(ticker)){
                let index = mySharesTicker.indexOf(ticker);
                let quantityArr = [];

                mySharesQuantity.forEach((item,ind) => {
                    if (index === ind){
                        quantityArr.push(item+amount)
                    }else{
                        quantityArr.push(item);
                    }
                })
                setMySharesQuantity(quantityArr);
            }else{
                setMySharesTicker(prev => [...prev,ticker]);
                setMySharesQuantity(prev => [...prev,amount])
            } 
        }
        
    },[props.buy])
    
    // useEffect(()=>{},[budget]);

    useEffect( () => {
        if (typeof(budget) !== "number") {
            setBudget(0);
            setMySharesQuantity([]);
            setMySharesTicker([]);
            return;
        }else{
            props.remove();
            props.add({mySharesTicker,mySharesQuantity,budget})
        }
        
        
    },[budget])
    

    useEffect( () => {
        let {price} = props.buy;

        if (price !== undefined){
            setBudget(budget + Number(props.buy.price));
        }
    },[props.buy])
    
    ////////////////////////////////------------------------------

    const addHandler = (e) => setAdd(e.target.value);
    const withdrawHadnler = (e) => {
        let withdrawAmount = e.target.value;
        if (withdrawAmount > budget){
            alert `Withdraw should be less than your budget`
            return;
        }else{
            setWithdraw(e.target.value)
        }
    };

    const changeBudget = (e) => {
        if (e.target.name === 'deposit'){
            setBudget(budget + Number(add));
            setAdd('');
        }else{
            setBudget(budget - withdraw);
            setWithdraw('');
        }
    }

    const fetchData = (data) =>{
        setBudget(prev => prev+data.moneyBack)
        
        if (data.delete) {
            let resultTicker = [];
            let resultQuantity = [];
            mySharesTicker.forEach( (item,index) => {
                if (item !== data.name) {
                    resultTicker.push(item);
                    resultQuantity.push(mySharesQuantity[index]);
                }
            })

            setMySharesTicker( resultTicker )
            setMySharesQuantity( resultQuantity )
            return;
        }else{
            let resultQuantity = [];
            mySharesTicker.forEach( (item,index) => {
                if (item === data.name) {
                    resultQuantity.push(data.quantity);
                }else{
                    resultQuantity.push(mySharesQuantity[index])
                }
            })

            setMySharesQuantity( resultQuantity )
        }
        
    }

    ////////////////////////////////------------------------------    
    
    return (
        <div>
            <table className="table table-striped mt-5">
                <thead>
                    <tr >
                        <th id="tr">Your Budget</th>
                    </tr>
                    <tr>
                        <th id="space"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Cash Balance</td>
                        <td>
                            $ {(typeof(budget)!== 'number') ?
                                0 :
                                Number(budget.toFixed(2))}
                        </td> 
                        <td></td>
                    </tr>
                    <tr>
                        <td>Add to budget</td>
                        <td>
                            <input type="number" onInput={addHandler} value={add}/><br/>
                        </td> 
                        <td>
                            <button name="deposit" onClick={changeBudget} className="deposit">Deposit</button>
                        </td>
                    </tr> 
                    <tr>
                        <td>Withdraw Money</td>
                        <td>
                            <input type="number" onInput={withdrawHadnler} value={withdraw}/><br/>
                        </td> 
                        <td>
                            <button name="withdraw" onClick={changeBudget} className="withdraw">Withdraw</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <table className="table table-striped mt-5" id="portfolio">
                <thead>
                    <tr>
                        <th id="tr">Your Portfolio</th>
                    </tr>
                    <tr>
                        <th>Ticker</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Amount to sell</th>
                        <th></th>
                        <th>sell</th>
                    </tr>
                </thead>
                <tbody>
                    {mySharesTicker ? null : mySharesTicker.map( (item,index) => (
                        <MyShares 
                            key={index}
                            share={item} 
                            quantity={mySharesQuantity[index]} 
                            buy={props.buy} 
                            onClick={fetchData}
                        />
                    ))}
                </tbody>
            </table> 
            
        </div>

    )
}

function mapStateToProps(state, ownProps) {
    return {
        list: state.list
    }
}

function mapDispatchToProps(dispatch){
    return {
        add: (value) => {
            dispatch({type: 'ADD', payload: value })
        },
        remove: () => {
            dispatch({type:'REMOVE'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)//Portfolio;