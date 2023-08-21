import { memo, useState } from "react"

interface TopButtonsProps{
    buttons:string[],
    setActive:React.Dispatch<React.SetStateAction<string>>
    active:string
}

const TopButtons = memo(({buttons, active, setActive}:TopButtonsProps) =>{
    console.log("hello from top buttons")
    return (
        <>
        {buttons.map((el) =>{
            return <button 
                    key = {el}
                    className={(active===el)?'active':''}
                    onClick={()=>setActive(el)}
                    >{el}</button>
        })}
        </>
      )
})

export default TopButtons