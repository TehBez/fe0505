// Вопрос 1: мы здесь инициализируем Tasks делая его объектом?? аргумент tasks = [] - это подразумевает? или то, что по умолчанию в функцию мы получаем объект this = {}?

// не подключен и не прописан в структуре HTML - не все очевидно с this.getCompletedTasks

function Tasks(tasks = []) {
    // this = {}

    this._tasks = [];

    if (Array.isArray(tasks)) {
        this._tasks = this._tasks.concat(tasks);
    }

    this.getAllTasks = function () { // для сортировки - вкладка всех Task
        return [...this._tasks]; // извлекаем все элементы массива _tasks и ложим их в новый массив
    }

    this.getCompletedTasks = function () { // для сортировки - вкладка выполненых Task
        return this._tasks.filter( // берем массив (выбираем с помощью filter только те элементы, передаваемая функция которых будет возвращать true)
            function ({
                completed
            }) { //выбираем только те элементы, у которых completed равный true
                return completed;
            }
        );
    }

    this.getActiveTasks = function () {
        return this._tasks.filter(
            function ({
                completed
            }) { // в задачах (tasks) всегда есть флаг completed, который равен true/false
                return !completed; //выбираем только те элементы, у которых completed равный false
            }
        );
    }

    this.getTaskById = function (id) { // функция, которая получает на вход id
        return this._tasks.find(function (task) { // ищет его в задачах и возвращает id только в тех случаях, если он равен переданному - во всех остальных случаях будет null
            return task.id === id;
        })
    }

    this.addTask = function (task) { // добавление задач
        if (!task.title || !task.id) { // если возвращает false (task = underfined / пустая строка)
            return {
                result: false,
                error: 'wrong task'
            };
        }

        if (this.getTaskById(task.id)) { // получаем Id задачи, если уже есть возвращаем ошибку, если есть дубликат
            return {
                result: false,
                error: 'dublicate id'
            };
        }

        this._tasks.push(task); // во всех остальных вариантах мы добавляем эту задачу и возвращаем true

        return {
            result: true
        };
    }

    // return this;
}