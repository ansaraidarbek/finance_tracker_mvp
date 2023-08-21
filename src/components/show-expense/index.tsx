import { memo, useContext } from "react"
import { Expense } from "../ExpenseType"
import SE from './ShowExpense.module.css'
import ExpenseContext from "../ExpenseContext"

const ShowExpense = memo(({expense}:{expense:Expense}) =>{
    console.log("hello from show expense " + expense.Name)
    const setExpense = useContext(ExpenseContext)
    return (<div className={SE.main} onClick={()=>{setExpense(expense)}}>
            <span className={SE.name}>{expense.Name}</span>
            <span className={SE.price}>{expense.Price}</span>
            <span className={SE.quantity}>{expense.Quantity}</span>
            </div>)
})

export default ShowExpense