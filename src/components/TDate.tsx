export const obtainDate = () =>{
    const today = new Date();
    let month:number = today.getMonth()+1;
    let properMonth:string = ''
    if(month < 10){
        properMonth = "0"
    }
    properMonth = properMonth + month
    const year = today.getFullYear();
    const date = today.getDate();
    const currentDate = year + "-" + properMonth + "-" + date;
    return currentDate
}

const obtainStartOfWeek =(date:Date) =>{
    while(date.getDay() != 1){
        date.setDate(date.getDate() - 1) 
    }
    date.setHours(date.getHours() - 6);
    return date
}

export const obtainWeek = () =>{
    const startDay = obtainStartOfWeek(new Date(JSON.parse(sessionStorage.getItem("startDay")||'"2023-07-22"')))
    const today = obtainStartOfWeek(new Date(obtainDate()))
    let weeks = ""+(Math.round((today.getTime()-(startDay.getTime()))/ 604800000)+1);
    return weeks
}