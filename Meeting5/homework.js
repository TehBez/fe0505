// Метод every() проверяет, удовлетворяют ли все элементы массива условию, заданному в передаваемой функции.
function every(arr, condition) {
    for (let i = 0; i < arr.length; i++) {
        const result = condition(arr[i], i, arr);
        if (!result) {
            return false;
        }
    }
    return true;
}

// Метод join() объединяет все элементы массива (или массивоподобного объекта) в строку.
function join(arr, str) {
    let result = '';
    for (let i=0; i<arr.length; i++) {
        result += arr[i];
        if (i !== arr.length - 1) {
            result += str;
        }
    }
    return result;
}

// Метод map() создаёт новый массив с результатом вызова указанной функции для каждого элемента массива.
function map( arr, transform) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push( transform(arr[i], i, arr) );
    }
    return result;
}

// Метод some() проверяет, удовлетворяет ли какой-либо элемент массива условию, заданному в передаваемой функции.
function some(arr, condition) {
    for (let i = 0; i < arr.length; i++) {
        const result = condition(arr[i], i, arr);
        if (result) {
            return true;
        }
    }
    return false;
}

// Метод reduce() применяет функцию reducer к каждому элементу массива (слева-направо),
// возвращая одно результирующее значение.
function reduce(arr, reducer, initialValue) {
    let accumulator = initialValue;
    for (let i = 0; i < arr.length; i++) {
        accumulator = reducer(accumulator, arr[i], i, arr);
    }
    return accumulator;
}