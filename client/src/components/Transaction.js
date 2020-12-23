import React,{useContext} from 'react'
import {GlobalContext} from "../context/GlobalState"
import { numberWithCommas } from '../utils/format'

const Transaction = ({transaction,key}) => {
    const {deletetransaction} =useContext(GlobalContext)
    const sign= transaction.amount<0?"-":"+"
    return (
        <li className={transaction.amount<0?"minus":"plus"} key={key}>
        {transaction.text}<span>{sign}${numberWithCommas(Math.abs(transaction.amount))}</span><button onClick={()=>deletetransaction(transaction._id)} className="delete-btn">X</button>
        </li>
    )
}

export default Transaction
