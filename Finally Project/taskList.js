function TaskList(remove) {
    // this = {}
    this._el = document.querySelector('.todo-list');

    this.render = function (tasks) {
        const tasksCollection = tasks.map(renderTask); // преобразовываем tasks - берем элемент массива и к нему применяем функцию, которая была передана в map

        this._el.innerText = ''; // чистим верстку задач
        this._el.append(...tasksCollection); // с помощью оператора "..." tasksCollection(возвращает массив в список аргументов) передаем не массивом, а списком
    } // при передаче функции преобразования вместо массива задач, будем получать коллекцию элементов

    function formatDate(date) {
        const [yy, mm, dd] = date.split('-');
        return dd + '.' + mm + '.' + yy;
    }


    function renderTask(task) { // пишем метод renderTask
        const {
            id,
            title,
            data,
            completed
        } = task;
        const li = document.createElement('li'),
            view = document.createElement('div'),
            form = document.createElement('form'),
            toggleEl = document.createElement('input'),
            titleEl = document.createElement('span'),
            // DATE
            dataEl = document.createElement('span'),
            destroyBtn = document.createElement('button'),
            editEl = document.createElement('input'),
            submitEl = document.createElement('button'); // создание элементов для формы тасков
        console.log('task', task);

        li.append(view, form); // формируем структуру/дерево верстки - соединяем верстку в этом элементе и его будем возвращать
        view.append(toggleEl, titleEl, dataEl, destroyBtn);
        form.append(editEl, submitEl);

        li.dataset.id = id;
        view.classList.add('view'); // класс-лист возвращает нам объект у которого есть свойство add
        toggleEl.classList.add('toggle');
        toggleEl.setAttribute('type', 'checkbox');
        toggleEl.checked = completed;
        titleEl.innerText = title; // что бы не парсить страницу используем вместо innerHTML - innerText
        dataEl.innerText = formatDate(data);
        destroyBtn.classList.add('destroy');
        destroyBtn.addEventListener('click', () => remove(id));
        editEl.classList.add('edit');
        editEl.value = title;
        submitEl.classList.add('visually-hidden');
        submitEl.type = 'submit';

        return li;
    }

}