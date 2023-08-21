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

export const obtainWeek = () =>{
    const startDay = new Date(JSON.parse(sessionStorage.getItem("startDay")||'"2023-07-22"'))
    const today = new Date(obtainDate())
    let weeks = ""+(Math.round((today.getTime()-(startDay.getTime()-86400000))/ 604800000)+1);
    return weeks
}