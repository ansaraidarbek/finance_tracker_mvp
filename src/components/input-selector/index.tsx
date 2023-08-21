import { memo, useContext } from "react"
import IS from '../input-var/InputVar.module.css'
import ExpenseContext from "../ExpenseContext"

interface InputSelectorProps{
    name:string, //👈️ required
    color?:string, //👈️ required
    value:string, //👈️ required
    inpAdditional:string[] //👈️ optional
}

const InputSelector = memo(({color = "#15032B", ...inpFields}:InputSelectorProps) =>{
    const setExpense = useContext(ExpenseContext)
    console.log("Hello from selector "+ inpFields.name)

    return (
        <div className={IS.inp}>
            <span style = {{color:color}}>{inpFields.name}</span>
            <select 
                style = {{color:color,border: "1px solid" +color}}
                value = {inpFields.value}
                onChange = {(e) => {setExpense(oldExpense =>({ ...oldExpense, [inpFields.name]:e.target.value}))}}
                >
                    <option disabled>Select the type</option>
                    <option disabled value="" style={{display:"none"}}></option>
                    {inpFields.inpAdditional.map((elem) => {
                        return (<option key={elem} value={elem}>{elem}</option>)
                    })}
            </select>
        </div>)
})

export default InputSelector