export function getDateToString(date: Date): string {
  let day = date.toString().split(' ')[2];
  return [date.getFullYear(), date.getMonth()+1, day].join('-');
}
export function getTimeToString(time: Date): string {
  return [time.getHours(), time.getMinutes(), time.getSeconds()].join(':');
}
export function getDateTimeToString(datetime: Date): string {
  return [getDateToString(datetime), getTimeToString(datetime)].join('T');
}
export function getStringToDateTime(datetime: string): Date {
  return new Date(datetime);
}
export function normalize(date:string):string{
  if (date == undefined || date == "TBD"){
    return "TBD";
  } else{
    return [date.split('T')[0], date.split('T')[1]].join(' ');
  }

}
export function compare(date1:string, date2:string):string{
  let year1 = Number.parseInt(date1.split('-')[0]);
  let year2 = Number.parseInt(date2.split('-')[0]);
  let month1 = Number.parseInt(date1.split('-')[1]);
  let month2 = Number.parseInt(date2.split('-')[1]);
  let day1 = Number.parseInt(date1.split('-')[2]);
  let day2 = Number.parseInt(date2.split('-')[2]);

  if (year1 > year2)
    return date1;
  else if(year1 == year2)
    if (month1 > month2)
      return date1;
    else if(month1 == month2)
      if (day1 > day2)
        return date1;
      else if(day1 == day2)
        return "equal";
  return date2;
}
