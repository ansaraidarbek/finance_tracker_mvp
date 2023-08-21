import IV from './InputVar.module.css'
import { memo, useContext } from 'react';
import {obtainDate} from '../TDate';
import ExpenseContext from '../ExpenseContext';

interface inputVarProps{
    name:string, //👈️ required
    type?:string, //👈️ optional
    color?:string, //👈️ optional
    value:string|number|null, //👈️ required
}

const InputVar =  memo(({type = 'input', color="#15032B", ...inpFields}:inputVarProps) =>{
    
    const setExpense = useContext(ExpenseContext)
    console.log("Hello from selector "+ inpFields.name)

    const onChange = (text:string) =>{
        setExpense(oldExpense =>({ ...oldExpense, [inpFields.name]:(type==='number')?((+text === 0)?null:+text):text}))
    }

    return (
        <div className={IV.inp}>
            <span style = {{color:color}}>{inpFields.name}</span>
            <input style = {{color:color,border: "1px solid" +color}} 
                type={type}
                min={obtainDate()}
                value={inpFields.value||""}
                onChange = {(e) => {onChange(e.target.value)}}
            />
        </div>
    )
})

export default InputVar