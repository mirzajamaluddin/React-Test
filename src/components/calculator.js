import React, { useState,useEffect } from 'react'
import './calculator.css'

const Calculator = ()=>{
    const [rows, setRows] = useState([{sign: '+', value: 0 , enabled: true}])
    const [calculatedResult, setCalculatedResult] = useState(0)
    useEffect(()=>{
      calculateResult()
    },[rows])
    const addRow = ()=>{
        setRows([...rows, { sign: '+', value: 0, enabled: true }])
    }
    const handleSign = (value, index)=>{
      const updatedRows = [...rows]
      updatedRows[index].sign = value
      setRows(updatedRows)
    }
    const inputHandler = (index,value)=>{
      const updatedRows = [...rows]
      value === '' ? updatedRows[index].value = null : updatedRows[index].value = parseFloat(value)
      setRows(updatedRows)
    }
    const handleEnableDisable = (index)=>{
        const updatedRows = [...rows]
        updatedRows[index].enabled = !updatedRows[index].enabled 
        setRows(updatedRows)
    }
    const deleteRow = (index)=>{
        const updatedRows = [...rows]
        updatedRows.splice(index,1)
        setRows(updatedRows)
    }
    const calculateResult = () => {
      let result = 0
      let enabledRows = rows.filter((row)=>{return row.enabled === true})
      enabledRows.forEach((row) => {
        result += row.sign === '+' ? row.value : -row.value
      })
      setCalculatedResult(result)
    }
    return(
    <div className="calculator-container">
      <div className="calculator">
           <div>
            <button onClick={addRow}>Add row</button>
           </div>
         {rows.map((row, index) => (
           <div key={index} className="row">
             <select
              disabled={!row.enabled}
              value={row.sign}
              onChange={(e) => handleSign(e.target.value, index)}
             >
               <option value="+">+</option>
               <option value="-">-</option>
             </select>
         <input
          onChange={(e) => inputHandler(index, e.target.value)}
          type="text"
          value={row.value}
          disabled={!row.enabled}
         />
         <button onClick={() => deleteRow(index)}>Delete</button>
        {row.enabled ?<button onClick={() => handleEnableDisable(index)}>Disable</button>:
         <button onClick={() => handleEnableDisable(index)}>Enable</button>}
        </div>
       ))}
      <div>Result: {calculatedResult}</div>
    </div>
</div>
)}
export default Calculator