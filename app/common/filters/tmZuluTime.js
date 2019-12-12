
export default function() {
  return function(d) {
    console.log(`incomingDate: ${d}`);
    let baseDate = new Date(d);
    console.log(`baseDate: ${baseDate}`);
    let year = baseDate.getUTCFullYear();
    let month = baseDate.getUTCMonth();
    let date = baseDate.getUTCDate();
    let hours =  baseDate.getUTCHours();
    let minutes = baseDate.getUTCMinutes();
    let returnDate = new Date(year, month, date, hours, minutes);
    console.log(`returnDate: ${returnDate}`);
    return returnDate; 
  }

}