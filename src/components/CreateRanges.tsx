import { Expense } from "./ExpenseType"

export const createRanges = (expenses:Expense[], active:string) =>{
    const newExpense:{expenses: Expense[], id:number, start:string, end:string}[] = []
    let separator = ""
    let id = 1

    const obtainKey = (expense:Expense) =>{
        if(active === 'daily'){
            return expense.Date
        }else if(active === 'monthly'){
            return (expense.Date).slice(0,7)
        }else{
            return expense.Week
        }
    }

    const takeStringDate = (date:Date)=>{
        const offset = date.getTimezoneOffset()
        date = new Date(date.getTime() - (offset*60*1000))
        return date.toISOString().split('T')[0]

    }

    const returnDate = (date:string) =>{
        if(active === 'daily'){
            return [date, date]
        }else if(active === 'monthly'){
            const objDate = new Date(date)
            while(objDate.getDate() !== 1){
                objDate.setDate(objDate.getDate() - 1) 
            }
            let start = takeStringDate(objDate)
            objDate.setMonth(objDate.getMonth() + 1)
            objDate.setDate(objDate.getDate() - 1) 
            let end = takeStringDate(objDate)
            return [start, end]
        }else{
            const objDate = new Date(date)
            while(objDate.getDay() !== 1){
                objDate.setDate(objDate.getDate() - 1) 
            }
            let start = takeStringDate(objDate)
            objDate.setDate(objDate.getDate() + 6)
            let end = takeStringDate(objDate)
            return [start, end]
        }
    }

    expenses.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        if ( a.Date < b.Date ){
            return -1;
        }
        if ( a.Date > b.Date ){
            return 1;
        }
        return 0;
      });
    
    expenses.forEach(expense =>{
        //param either day, month or week
        let option:string
        option = obtainKey(expense)
        if(option!==separator){
            //if new day, month or week encountered we create new array and store new day 
            let startDate:string, endDate:string
            [startDate, endDate] = returnDate(expense.Date)
            newExpense.push({ expenses: [], id:id, start:startDate, end:endDate})
            id = id +1
            separator = option
        }
        newExpense[newExpense.length - 1].expenses.push(expense)
    })

    return newExpense
}