// средняя разница в возрасте между матерями и их детьми.
// функция1, которая возвращает год рождения человека
function getBorn(human) {
    return human.born;
}

// функция2, которая возвращает имя матери
function getMother(human) {
    return human.mother;
}

// функция2, которая возвращает год рождения матери
function getMotherBorn(human) {
    let nameMother = getMother();
    let motherBorn = getBorn(nameMother);
    return motherBorn;
};

// функция3, которая возвращает массив с разницей в возрасте между матерями и их детьми. Вопрос 3. Нужно в наборе значений сопоставить имена детей с матерями и получить  ту самую разницу, которую добавить в массив
function getDifferentArr () {
    return ANCESTRY_DATA
    .reduce(
        function (human) {
           const childBorn = getBorn();
           const motherBorn = getMotherBorn();

           let arr = [];
           arr.push(childBorn - motherBorn);
           return arr;
        },
        {}
    );
}

console.log( getDifferentArr() );


// функция4, которая возвращает среднюю разницу в возрасте
function getArrAverage(arr) {
    return arr.reduce(
        function(sum, el) {
            return sum + el;
        },
        0
    ) / arr.length; 
}