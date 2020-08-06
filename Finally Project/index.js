import {
    Filter
} from './filter.js';

// создаём форму
const addForm = new AddForm({
    onAddTask // объект - первый аргумент вызова функции - функция обратного вызова
});

addForm.events.addEventListener('complete', onAddTaskComplete);

// фильтр
const filter = new Filter({
    defaultFilter: '#/all',
    onChangeFilter: onFilterChange
});

const taskList = new TaskList({
    filterItems: filteredTask
});

onFilterChange();

function filteredTask(task) {
    const currentFilterName = filter.getCurrentFilterName();

    switch (currentFilterName) {
        case '#/active':
            return task.getCompleted() === false;
        case '#/completed':
            return task.getCompleted() === true;
        default:
            return true;
    }
}

function onFilterChange() {
    taskList.render();
    filter.setItemsCount(taskList.getActiveTaskCount());
}


const tasks = new Tasks([{
        id: 1, // создаём таски и отрисовываем их taskList.render(tasks.getAllTasks());
        title: 'Task 1',
        data: '2020-07-01',
        completed: false
    },
    {
        id: 2,
        title: 'Task 2',
        data: '2020-07-01',
        completed: true
    }
]);

// const taskList = new TaskList();

// taskList.render(tasks.getAllTasks()); // в рендере отрисовываем все таски

// taskList.render([ // эти таски помещаем в const tasks = new Tasks()
//     {
//         id: 1,
//         title: 'Task 1',
//         completed: false
//     },
//     {
//         id: 2,
//         title: 'Task 2',
//         completed: true
//     }
// ]);

function onAddTask(task) {
    // tasks.push(task); - вместо него вызываем метод, который написан в tasks
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

// сохранять данные после закрытия и загрузки - серверная часть (работа с сервером?)
// возможность удалять задачи
// возможность редактирования добавленных задач
// фильтр

// возможно предусмотреть индикатор (в обычном режиме - зеленый, за сутки до выполнения - жёлтый, просрочка - красный)

// Использовать модули и классы

// не работает hover на корзине