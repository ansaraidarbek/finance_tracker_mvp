import './styles/App.css';
import { useEffect, useMemo, useState } from 'react';
import InputCard from './components/input-card';
import {Expense} from './components/ExpenseType';
import {obtainDate, obtainWeek} from './components/TDate';
import AnalysisCard from './components/analysis-card';
import ExpenseContext from './components/ExpenseContext';
import { AddSVG, DeleteSvg, SaveSvg } from './components/UI/svg';
import TopButtons from './components/top-buttons';
import ShowExpenses from './components/show-expenses';
import { createRanges } from './components/CreateRanges';


function App() {
  const [expenses, setExpenses] = useState<Expense[]>(JSON.parse(localStorage.getItem("expenses")||"[]"))
  const [active, setActive] = useState("daily")
  const [deleting, setDeleting] = useState(false)
  const [expense, setExpense] = useState<Expense>({
    Id : null,
    Image: '',
    GeneralName: '',
    Quantity: null,
    Together : '',
    Name : '',
    Place : '',
    Price : null,
    Weight : null,
    PaymentDetails : '',
    Type : '',
    Date : obtainDate(),
    Week : obtainWeek()
  })

  const ranges = useMemo( ()=>createRanges(expenses, active), [ expenses, active])
  const buttons = useMemo(()=>['weekly', 'daily', 'monthly'], [])
  // const KEY_HANDLERS:{[ket:string]:boolean} = {
  //   KeyS: false,
  //   AltLeft: false,
  // };

  useEffect(()=>{
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }, [expenses])
  console.log(expense)

  const validateExpense =() =>{
    const checkFields = ()=>{
      if(expense.GeneralName === ''){
        return {responce:false, message:'General Name'}
      }
      if(expense.Name === ''){
        return {responce:false, message:'Name'}
      }
      if(expense.Place === ''){
        return {responce:false, message:'Place'}
      }
      if(expense.Price === null || expense.Price === 0){
        return {responce:false, message:'Price'}
      }
      if(expense.PaymentDetails === ''){
        return {responce:false, message:'PaymentDetails'}
      }
      if(expense.Type === ""){
        return {responce:false, message:'Type'}
      }
      return {responce:true, message:undefined}
    }
    const {responce, message} = checkFields()
    if(!responce){
      alert(message+" is missing")
    }
    return responce
  }

  const addExpense = () =>{
    if(!validateExpense()) return 
    const expenseCopy = {...expense, Id:expenses.length+1, Quantity:(expense.Quantity)?expense.Quantity:1, Date: obtainDate(), Week : obtainWeek()}
    setExpenses(oldExpenses => [...oldExpenses, expenseCopy])
  }

  const saveExpense = () =>{
    console.log(expense)
    if(!validateExpense()) return 
    setExpenses( oldExpenses => oldExpenses.map((elem) => {
      if(elem.Id === expense.Id){
        return {...expense, Date: elem.Date}
      }
      return elem
    }))
    alert("saved")
    console.log("saveed")
  }

  const deleteExpense = () =>{
    setExpenses(oldExpenses=>oldExpenses.filter((elem)=>{
      return elem.Id !== expense.Id
    }).map((elem, index) =>{
      elem.Id = index +1
      return elem
    })
    )
    
    setDeleting(false)
    setExpense({
      Id : null,
      Image: '',
      GeneralName: '',
      Quantity: null,
      Together : '',
      Name : '',
      Place : '',
      Price : null,
      Weight : null,
      PaymentDetails : '',
      Type : '',
      Date : obtainDate(),
      Week : obtainWeek()
    })
    console.log("deleted")
  }

  const onKeyDown = (e:React.KeyboardEvent<HTMLElement>) => {
    if (e.altKey && e.code === 'KeyS'){
      saveExpense()
    }
  }

  return (
    <section className='main' tabIndex={0} onKeyDown={onKeyDown}>
      <div className='leftTable'>
        <ExpenseContext.Provider value ={setExpense}>
          <InputCard expense={expense} deleting = {deleting} deleteExpense = {deleteExpense} setDeleting={setDeleting}/>
        </ExpenseContext.Provider>
        <AnalysisCard/>
      </div>
      <div className='rightTable'>
        <div className="topPanel">
          <TopButtons buttons={buttons} setActive={setActive} active={active}/>
        </div>
        <div className="middlePanel">
          <ExpenseContext.Provider value ={setExpense}>
            <ShowExpenses ranges={ranges}/>
          </ExpenseContext.Provider>
        </div>
        <div className="lowerPanel">
          <div className="lowerLeftPanel">
            <button
              onClick={() =>{addExpense()}}
            ><AddSVG/>new expense</button>
          </div>
          <div className="lowerRightPanel">
            <button
              className={expense.Id?'':'disactivate'}
              disabled = {expense.Id?false:true}
              onClick={() =>{saveExpense()}}
            ><SaveSvg color={expense.Id?'white':'gray'}/>save</button>
            <button
              className={expense.Id?'':'disactivate'}
              disabled = {expense.Id?false:true}
              onClick={() =>{setDeleting(true)}}
            ><DeleteSvg color={expense.Id?'white':'gray'}/>delete</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
