function AddForm(props) { // функция-конструктор, которая генерит новый объект
    // this = {}

    this._props = props;
    this._el = document.querySelector('.header'); // Добавление форм в документ
    this._completeEl = this._el.querySelector('.complete-all');
    this._todoEl = this._el.querySelector('.new-todo');

    this._el.addEventListener( 'submit', addTask.bind(this) ); // Прослушивание события submit

    function addTask(event) { // Функции будет принадлежать элемент событие
        event.preventDefault();

        const {_completeEl, _todoEl} = this; // _completeEl = this._completeEl; _todoEl = this._todoEl;
        const task = {
            id: Date.now(),
            title: _todoEl.value,
            completed: _completeEl.checked
        };

        // onAddTask.call(this, task);
        if (task.title.length > 0) {
            onAddTask.apply(this, [task]);
        }
    }

    function onAddTask(task) {
        const {_todoEl} = this;

        _todoEl.value = '';

        this._props.onAddTask(task);
    }

    // return this;
}
