import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Portfolio from './Portfolio';
import Search from './Search';
import Stock from './Stock';
import '../App.css';

function App() {
  const [buy, setBuy] = useState( {} )
  const [checkBudget, setCheckBudget] = useState()
  const [newTrickers, setNewTricker] = useState([]);

  const fetchData = async (data) => {
    if (checkBudget < Math.abs(data.price) ){
      alert `Low Budget`
    }else{
      await setBuy( data );
      await setBuy( {} );
    }
    
  }
  const fetchBudget = (data) => setCheckBudget(data);
  
  const fetchNewTricker = (data) => {
    setNewTricker( prev => [...prev,data] );
  };

  const newStockComponents = () => {
    if( newTrickers.length === 0 ){
      return;
    }else{
      return (
        newTrickers.map( (tricker) => (
            <Stock ticker={tricker} onClick={fetchData}/>
        ))
      )
       
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="mt-3" >
          <Portfolio buy={buy} onChange={fetchBudget}/>
        </div>

        <br/>
        <hr/>

        <table className="table table-striped mt-5">
          <thead>
            
            <tr>
              <th id="tr">Some Tickers / Search</th>
            </tr>

            <tr>
              <th>Ticker</th>
              <th>Price</th>
              <th>Date</th>
              <th>Amount to Buy</th>
              <th></th>
              <th>Buy</th>
            </tr>

          </thead>

          <tbody>
            <Stock ticker="aapl" onClick={fetchData}/>
            <Stock ticker="goog" onClick={fetchData}/>
            <Stock ticker="msft" onClick={fetchData}/>
            <Stock ticker="tsla" onClick={fetchData}/>
            { newStockComponents() }
            <Search onClick={fetchNewTricker}/>
          </tbody>

        </table>
        
      </div>
    </div>
  );
}

export default App;
