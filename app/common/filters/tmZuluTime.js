
export default function() {
  return function(d) {
    let baseDate = new Date(d);
    let year = baseDate.getUTCFullYear();
    let month = baseDate.getUTCMonth();
    let date = baseDate.getUTCDate();
    let hours =  baseDate.getUTCHours();
    let minutes = baseDate.getUTCMinutes();
    let returnDate = new Date(year, month, date, hours, minutes);
    return returnDate; 
  }
}