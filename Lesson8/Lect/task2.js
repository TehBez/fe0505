function tickets(peopleInLine) {
    let cashboxSum = 0;
    let mon25 = 0;
    let mon50 = 0;
    let mon100 = 0;
    const ticketPrice = 25;
    let result = true;

    for (let i=0; i < peopleInLine.length; i++) {
        if (peopleInLine[i] === 25) {
            cashboxSum += 25;
            mon25++;
        } else if (peopleInLine[i] === 50) {
            if (mon25 > 0) {
                cashboxSum += 50;
                cashboxSum -= 25;
                mon25--;
                mon50++;
            } else {
                result = false;
                break
            }
        } else if (peopleInLine[i] === 100) {
            if ((mon25 > 0) && (mon50 > 0)) {
                cashboxSum += peopleInLine[i];
                cashboxSum -= (3 * ticketPrice);
                mon25--;
                mon50--;
                mon100++;
            } else if (mon25 > 2) {
                cashboxSum += peopleInLine[i];
                cashboxSum -= (3 * ticketPrice);
                mon25 -= 3;
                mon100++;
            } else {
                result = false;
                break
            } 
        }
    }

    if (result === true) {
        return "YES";
    } else {
        return "NO";
    }
}

console.log( tickets([25, 25, 50, 50]) ); // YES
console.log( tickets([25, 100]) ); // NO
console.log( tickets([25, 25, 50, 50, 100]) ); // NO
