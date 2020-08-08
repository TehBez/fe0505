// Начинаем делать всё с функции конструктора

// new AddForm при вызове в index.js создаёт контекст this (который мы используем при описании самой функции)

function AddForm(props) { // передаём в конструктор свойства props
    // this = {}

    this._props = props; // сохраняем свойства props

    this._el = document.querySelector('.header');
    this._completeEl = this._el.querySelector('.complete-all');
    this._todoEl = this._el.querySelector('.new-todo');

    // ДАТА
    this._dataEl = this._el.querySelector('.deadline');

    // перехватываем/прослушиваем событие (нажатие на кнопку btn) и вызываем функцию addTask при нажатии
    this._el.addEventListener('submit', addTask.bind(this)); // изменяет существующий контекст - контекст выполнения

    // генерируем саму функцию, в которой аргументом передаём объект событие
    function addTask(event) {
        event.preventDefault(); // исключаем перезагрузку страницы
        const {
            _completeEl,
            _todoEl,
            _dataEl
        } = this; // _completeEl = this._completeEl; _todoEl = this._todoEl;
        const task = {
            id: Date.now(),
            title: _todoEl.value,
            data: _dataEl.value,
            completed: _completeEl.checked,
        };

        // console.log(task);
        // onAddTask(task) - при таком вызове this = underfined
        // onAddTask.call(this, task); // передаем this для нахождения _todoEl
        if (task.title.length > 0) {
            onAddTask.apply(this, [task]);
        }
    }

    function onAddTask(task) {
        const {
            _todoEl,
            _dataEl
        } = this; // функция, которая обнуляет информацию в поле value элемента _todoEl

        _todoEl.value = '';
        _dataEl.value = '';

        this._props.onAddTask(task);
    }
    // return this; - как правило в таких функциях мы ничего не возвращаем
}