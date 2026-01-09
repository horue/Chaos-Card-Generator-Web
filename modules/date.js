export class DateBuilder{
  static build = () => {
    const date = new Date()
    const month = date.getMonth()
    let semester
    if( month <= 5){
        semester = 1
    }
    else{
        semester = 2
    }
    const year = date.getFullYear()
    return `${year}.${semester}`
  };
}
