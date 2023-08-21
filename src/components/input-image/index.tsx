import { memo, useContext } from "react"
import ExpenseContext from "../ExpenseContext"
import IM from './InputImage.module.css'
import { UploadSVG } from "../UI/svg"

const InputImage = memo(({image}:{image:string|null}) =>{
    console.log("hello from input image")
    const setExpense = useContext(ExpenseContext)
    return (
        <div className={IM.image} onClick={() => setExpense(oldExpense =>({ ...oldExpense, Image:prompt("Enter")||""}))}>
        {(image === '')
            ?<UploadSVG/>
            :<img
            src={image||undefined}
            alt="someImg"
            />
        }
    </div>
    )
})

export default InputImage