import IC from './InputCard.module.css'
import InputVar from '../input-var';
import {Expense} from '../ExpenseType';
import InputImage from '../input-image';
import InputSelector from '../input-selector';
import { memo } from 'react';

interface inputCardProps{
    expense: Expense, //👈️ required
    deleting: boolean, //👈️ required
    deleteExpense: Function //👈️ required
    setDeleting: React.Dispatch<React.SetStateAction<boolean>>//👈️ required
}

const types:string[] = JSON.parse(sessionStorage.getItem("types")||'["food","oneTimeFood","expense","transportr","debt","dish"]')
const InputCard = memo(({deleting, deleteExpense, expense, setDeleting}:inputCardProps) => {

    console.log("Hello from inputCard ")

    return (
    <div className={IC.main}>
        <div className={IC.firstPanel}>
            <InputImage image={expense.Image}/>
            <InputVar name = {'GeneralName'} color = '#FFFFFF' value={expense.GeneralName}/>
            <InputVar name = {'Quantity'} type = {'number'} color = '#FFFFFF' value={expense.Quantity}/>
            <InputVar name = {'Together'} color = '#FFFFFF' value={expense.Together}/>
        </div>
        <div className={IC.secondPanel}>
            <InputVar name = {'Name'} value={expense.Name}/>
            <InputVar name = {'Place'} value={expense.Place}/>
            <InputVar name = {'Price'} type = {'number'} value={expense.Price}/>
            <InputVar name = {'Weight'} type = {'number'} value={expense.Weight}/>
            <InputVar name = {'PaymentDetails'} value={expense.PaymentDetails}/>
        </div>
        <div className={IC.thirdPanel}>
            <InputSelector name = {'Type'} inpAdditional = {types} value={expense.Type}/>
            <InputVar name = {'Date'} type = {'date'} value={expense.Date}/>
        </div>
        {deleting
            ?<div className={IC.deletePanel}>
                <span>You want to delete this element?</span>
                <div className={IC.deleteButtons}>
                    <button onClick={()=>{deleteExpense()}}>Yes</button>
                    <button onClick ={()=>setDeleting(false)}>No</button>
                </div>
            </div>
            :null
        }
    </div>
    )
})

export default InputCard

