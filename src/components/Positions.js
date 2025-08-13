import React from "react";
import {positions} from "../data/data";
//import axios from "axios";
const Positions = () => {
  // const [allPositions, setAllPositions]=useState([])
  
  //    useEffect(()=>{
  //    axios.get("http://localhost:3002/allPositions").then((res)=>{
  //     setAllPositions(res.data)
      
  //    });
  //   }, []);
  return (
    <>
      <h3 className="title">Positions ({positions.length}) </h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>
           {positions.map((stock,index)=>{
                    const currValue = stock.price * stock.qty;
                    const isProfit = currValue-stock.avg * stock.qty >= 0.0;
                    const ProfClass = isProfit ? "profit" : 'Loss';
                    const dayClass = stock.isLoss ? "Loss": " profit";
                    
                    return(
                       <tr key={index}>
                      <td>{stock.product}</td>
                      <td>{stock.name}</td>
                      <td>{stock.qty}</td>
                       <td>{stock.avg.toFixed(2)}</td>
                      <td>{stock.price.toFixed(2)}</td>
                  
                      <td className={ProfClass}>{(currValue - stock.avg * stock.qty).toFixed(2)}</td>

                      <td className={dayClass}>{stock.day}</td>
                    </tr>
                    );
                  })
                  }
        </table>
        
      </div>
      
    </>
                   
  );
};

export default Positions;