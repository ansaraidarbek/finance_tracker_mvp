import { memo } from "react"
import { Expense } from "../ExpenseType"
import ShowExpense from "../show-expense"
import RC from './RangeCard.module.css'

interface RangeCard {
    range:Expense[],
    start:string,
    end:string,
    id:number
}

const RangeCard = memo(({range,start,end, id}:RangeCard) =>{
    console.log("hello from range card " + id)
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = ["st", "nd", "rd"]
    const findAmount = () =>{
        let total=0
        let count =0
        range.forEach((elem) =>{
            if(elem.Price != null){
                total+=elem.Price
            }
            count ++
        })
        return {totalSpent:total, totalAmount:count}
    }
    const {totalSpent, totalAmount} = findAmount()
    const properName = (date:string) =>{
        const firstHalf = month[+date.slice(5,7)-1]
        let secondHalf = date.slice(8,10)
        if(+secondHalf<4){
            secondHalf = +secondHalf+day[+secondHalf-1]
        }else{
            secondHalf = secondHalf+'th'
        }
        return firstHalf + " " + secondHalf
    }
    return (
        <div className={RC.main}>
            <div className={(range.length<2)?[RC.leftPanel,RC.uniquepadding].join(' '):RC.leftPanel}>
                <div className={RC.rangeDate}>
                    <span className={(range.length<2)?RC.unique:""}>{properName(start)}</span>
                    <span className={(range.length<2)?RC.unique:""}>{properName(end)}</span>
                </div>
                <div className={RC.amount} style ={{justifyContent:(range.length<2)?"flex-start":"flex-end"}}>
                    <span className={RC.total}>{totalSpent} spent</span>
                    <span className={(range.length<2)?[RC.number,RC.uniqueamount].join(' '):RC.number}>{totalAmount} {(range.length<2)?"thing":"things"}</span>
                </div>
            </div>
            <div className={RC.rightPanel}>
                {range.map((expense)=>{
                    return <ShowExpense key={expense.Id} expense={expense}/>
                })}
            </div>
        </div>
    )
})

export default RangeCard