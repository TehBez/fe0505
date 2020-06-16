console.log(ANCESTRY_DATA);
/*
    {
      "name": "Carolus Haverbeke",
      "sex": "m",
      "born": 1832,
      "died": 1905,
      "father": "Carel Haverbeke",
      "mother": "Maria van Brussel"
    }
*/

// средняя разница в возрасте между матерями и их детьми.

function task1() {
    const ageDiff = ANCESTRY_DATA.map(function(human) {
        const mother = getHuman(human.mother);
        const child = getHuman(human.name);

        if (mother && child) {
            return Math.abs(getAge(mother) - getAge(child));
        }

        return null;
    }).filter(function(ageDiff) { return ageDiff !== null; });

    return getArrAverage(ageDiff);
}

console.log ( "task1", task1() );


// средняя разница в возрасте между родителями
function getHuman(name) {
    return ANCESTRY_DATA.find(function (human) {
        return human.name === name;
    })
}

function task2() {
    const ageDiff = ANCESTRY_DATA.map(function(human) {
        const mother = getHuman(human.mother),
            father = getHuman(human.father);

        if (mother && father) {
            return Math.abs(getAge(mother) - getAge(father));
        }

        return null;
    }).filter(function(ageDiff) { return ageDiff !== null; });

    return getArrAverage(ageDiff);
}

console.log ( "task2", task2() );


// среднее количество детей в семье

//определяем имена матерей и отцов
function getParents( human, data ) {
    const mother = getHuman(human.mother, data), // имя матери
      father = getHuman(human.father, data); // имя отца
    if (!mother || !father) {
        return null; // если нет данных возвращаем null
    }
    return {father, mother} // если все ок, возвращаем родителей
  }

// получаем детей
function getChildren( motherName, fatherName, data ) {
    return data.filter(function ( human ) {
      return human.mother === motherName && human.father === fatherName
    });
}

function task3( data ) { // передаем данные функции - data.
    const familys = data.map(function ( human ) {
        return getParents(human, data)
    })
    .filter(
        function ( parents ) {
            return parents !== null; // фильтр - возращаем всё, где значение не null
        })
    .map(
        function (family) {
            family.children = getChildren(family.mother.name, family.father.name, data); // создаем в каждом обекте ключ children, которому присваиваем значение вычесляемое в функции  getChildren, где мы определили детей
            return family;
        });

    const childrenCounts = familys.map(function ( family ) {
        return family.children.length // возвращаем количество детей
    });

    return getArrAverage(childrenCounts); //полсчитываем среднее количесво детей передавая в функцию getArrAverage количесво детей
}

console.log( 'task3', task3(ANCESTRY_DATA) );


// - [X] средний возраст людей для каждого из столетий.
// Назначаем столетию людей, беря их год смерти, деля его на 100 и округляя: `Math.ceil(person.died / 100)`.

function getAge(human) {
    return human.died - human.born;
}

function getCentury(human) {
    return Math.ceil(human.died / 100);
}

function getArrAverage(arr) {
    return arr.reduce(
        function(sum, el) {
            // sum = 0, el = 1 => 1
            // sum = 1, el = 2 => 3
            // sum = 3, el = 3 => 6
            return sum + el;
        },
        0
    ) / arr.length; // 6 / 3 => 2
}

// средний возраст людей для каждого из столетий.
// Назначаем столетию людей: `Math.ceil(person.died / 100)`.
function task4() {
    const centuries = ANCESTRY_DATA
        .reduce(
            function(centuries, human) {
                const currentCenturie = getCentury(human);
                const currentAge = getAge(human);

                // {20: [73, 80], 18: [41]}
                // console.log(centuries, currentCenturie, currentAge, human);

                // currentCenturie[currentCenturie] === undefined

                if (!Array.isArray(centuries[currentCenturie])) {
                    centuries[currentCenturie] = [];
                }

                centuries[currentCenturie].push(currentAge);

                return centuries;
            },
            {}
        );

    for (const centurie in centuries) {
        centuries[centurie] = getArrAverage(centuries[centurie]);
    }

    return centuries;
}

console.log( 'task4', task4() );





