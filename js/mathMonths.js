/////////////////////////////////////////////////////////
// Calculate Months /////////////////////////////////////
/////////////////////////////////////////////////////////
function getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
}

function getFormattedTimeSince(start) {
    let formattedTime = "#";

    var months = Math.ceil(getNumberOfDays(start, Date.now()) / 30);
    var years = Math.trunc(months / 12)

    let remainderMonths = years * 12;
    let remainingMonths = months - remainderMonths;

    if (months >= 12) {
        formattedTime = years + " yr " + remainingMonths + " mos";
    } else {
        formattedTime = months + ' mos';
    }

    return formattedTime;
}

///////////////////////////////////////////////
// Math for About Page ////////////////////////
///////////////////////////////////////////////

// Brass Token Auto Month Calc
var brassToken = document.getElementById('BrassToken');
if (brassToken) {

    var timeSince = document.createTextNode(getFormattedTimeSince('7/30/2021'))

    brassToken.replaceWith(timeSince);

    console.log(brassToken);
}

//VFS-Ambassador Auto Month Calc
var vfsAmbassador = document.getElementById('VFS-Ambassador');
if (vfsAmbassador) {

    var timeSince = document.createTextNode(getFormattedTimeSince('2/1/2022'));

    vfsAmbassador.replaceWith(timeSince);

    console.log(vfsAmbassador);
}