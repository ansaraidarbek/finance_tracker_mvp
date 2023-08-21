import { createContext } from "react";
import { Expense } from "./ExpenseType";

const ExpenseContext = createContext<React.Dispatch<React.SetStateAction<Expense>>>(()=>{})

export default ExpenseContext