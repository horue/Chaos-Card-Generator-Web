export class DateBuilder{
  static build = () => {
    date = new Date()
    month = date.getMonth()
    if( month <= 5){
        semester = '1'
    }
    else{
        semester = '2'
    }
    year = date.getFullYear()
    finalDate = `${year}.${semester}`
  };
}
