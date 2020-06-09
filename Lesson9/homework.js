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
function getFamily(human) {
    const mother = getHuman(human.mother),
        father = getHuman(human.father),
        children = ANCESTRY_DATA.filter(function(child) {
            return child.mother === human.name || child.father === human.name;
        });

    return {
        human,
        mother,
        father,
        children,
        key: getFamilyKey(human)
    }
}

function getUniqFamily() { 
    const data = ANCESTRY_DATA.map(getFamily),
        keys = {
            'null-null': true
        };

    return data.filter(function(family) {
        const familyKey = family.key,
            isUniq = !keys[familyKey];

        keys[familyKey] = true;

        return isUniq;
    });
}

console.log( 'getFamily', ANCESTRY_DATA.map(getFamily) );
console.log( 'getUniqFamily', getUniqFamily() );

function getDataWithFamilyKey() {
    return ANCESTRY_DATA.map(function(human) {
        return Object.assign({}, human, {
            familyKey: `${human.father}-${human.mother}`
        });
    });
}

function getFamilyKey(human) {
    return `${human.father}-${human.mother}`;
}

function getFamilys() {
    return ANCESTRY_DATA
        .reduce(
            function(families, human) {
                const familyKey = getFamilyKey(human);

                if (!Array.isArray(families[familyKey])) {
                    families[familyKey] = [];
                }

                families[familyKey].push(human);

                return families;
            },
            {}
        );
}

// получаем детей
function getChildren(motherName, fatherName, data) {  
    return data.filter (human => human.mother === motherName && human.father === fatherName);
}

function task3() {  
    const familys = ANCESTRY_DATA
    .map(
        function(families) {
            const peoples = getFamilys(families);
            return peoples; 
        }) // инициализация нашего массива родителей (возвращаем parents)
    .filter(
        function (parents) {
            return parents !== null; // фильтр - возращаем всё, где значение не null
        })
    .map(
        function (family) {              
            family.children = getChildren(family.mother.name, family.father.name, ANCESTRY_DATA); //создаем новый массив семьи, передаем данные функции выше.  дети формируются если родители совпадают
            return family; // тут не понятно... присваиваем данные функции family.children (вот тут вопрос! .children - это метод или свойство?)  - возврат массива семей       
        }); 
    const childrenCounts = familys
    .map(         
        function(family) {
            return family.children.length;
        }); // создаем массив с детьми (я так полагаю с их количеством??)
    return getAverage( childrenCounts ); //вычисляем среднее число детей
}


console.log( 'task3', task3() );

console.log( 'getDataWithFamilyKey', getDataWithFamilyKey() );
console.log( 'getFamilys', getFamilys() );
console.log( 'getFamilysConverted',
    Object.entries( getFamilys() )
        .filter(function(familyData) {
            const familyKey = familyData[0];

            return familyKey !== 'null-null';
        })
);


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





