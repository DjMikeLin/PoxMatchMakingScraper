module.exports = {
    getCurrDate: function(){
    const currDate = new Date();
    
    let currMonth = currDate.getMonth() + 1;
    currMonth = currMonth < 10 ? '0' + currMonth : currMonth;
    
    const currDay = currDate.getDate() < 10 ? '0' + currDate.getDate() : currDate.getDate();
    const currYear = currDate.getUTCFullYear();

    return `${currMonth}${currDay}${currYear}`;
    }
}
