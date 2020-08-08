// создаём форму
const addForm = new AddForm({
    onAddTask // объект - первый аргумент вызова функции - функция обратного вызова
});

// фильтр
const filter = new Filter({ // создаём фильтр
    defaultFilter: '#/all',
    onChangeFilter: onFilterChange // вызываем onFilterChange
});

// taskList (передаем функцию onRemoveTask) - где после события 'click' происходит удаление задачи
const taskList = new TaskList(onRemoveTask);

// стартовые задачи (массив)
const tasks = new Tasks(
    [{
        id: 1,
        title: 'Last Meeting',
        completed: true,
        data: '2020-07-12'
    }, {
        id: 2,
        title: 'Finally Project',
        completed: false,
        data: '2020-08-08'
    }]
);

onFilterChange();

// получаем таски по фильтру
function getTasks() {
    const currentFilterName = filter.getCurrentFilterName();

    switch (currentFilterName) {
        case '#/active':
            return tasks.getActiveTasks();
        case '#/completed':
            return tasks.getCompletedTasks();
        default:
            return tasks.getAllTasks();
    }
}

// функция отрисовки тасков по фильтру и подсчёт количества тасков по активной вкладке
function onFilterChange() {
    const renderedTasks = getTasks();
    taskList.render(renderedTasks);

    filter.setItemsCount(renderedTasks.length); // считаем длину массива отрисованных задач (длина массива отрисованных тасков)
}

// функция добавления тасков
function onAddTask(task) {
    const {
        result,
        error
    } = tasks.addTask(task); // результатом будет объект, который мы возвращаем {result, error}
    // когда вызываем метод addTask, мы вызываем его в объекте tasks - this = tasks
    // внутри наших функций именно он будет контекстом

    if (result) { // если получаем result = true
        console.log('task added', tasks.getAllTasks()); // выводим в консоль task added
        taskList.render(tasks.getAllTasks()); // вызываем отрисовку каждый раз, когда добавляем задачу
    } else {
        console.error('task not added', error); // иначе - ошибка
    }
}

// функция удаления тасков (по ID)
function onRemoveTask(taskId) {
    tasks.deleteTask(taskId);

    onFilterChange();
}