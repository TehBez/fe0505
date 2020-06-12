// получаем детей
function getChildren(motherName, fatherName, data) {
    return data.filter(human => human.mother === motherName && human.father === fatherName);
}

function task3() {
    const familys = ANCESTRY_DATA
    .map(
        function(families) {
            const peoples = getFamilys(families);
            return peoples;
        }) // инициализация нашего массива родителей (возвращаем parents)
    .filter(
        function (peoples) {
            return peoples !== null; // фильтр - возращаем всё, где значение не null
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
        }); // создаем массив с детьми
    return getAverage( childrenCounts ); //вычисляем среднее число детей
}

console.log( 'task3', task3() );