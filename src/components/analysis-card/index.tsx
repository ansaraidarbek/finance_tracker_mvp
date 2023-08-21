import { memo } from 'react'
import AC from './AnalysisCard.module.css'

const AnalysisCard = memo(() => {
    console.log("hello from analysis")
    return (
    <div className={AC.main}>
        <h1>
            Analysis Section
        </h1>
        <h1>
            Soon...
        </h1>
    </div>
    )
})

export default AnalysisCard