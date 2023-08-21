import { memo } from "react"
import { Expense } from "../ExpenseType"
import RangeCard from "../range-card"


interface ShowExpensesProps{
    ranges : {expenses:Expense[], id:number, start:string, end:string}[],
    active: string
}
const ShowExpenses = memo(({ranges, active}:ShowExpensesProps) =>{
    console.log("hello from showExpenses")
    return (
        ranges.map((range)=>{
            return <RangeCard key = {range.id} range={range.expenses} start={range.start} end={range.end} id={range.id}/>
        })
    )
})

export default ShowExpenses