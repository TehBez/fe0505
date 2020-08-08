function Filter(props) {
    this._props = props; // передаём свойства props defaultFilter: '#/all', onChangeFilter: onFilterChange

    // поиск элементов в документе
    this._el = document.querySelector('.footer');
    this._counterEl = this._el.querySelector('.todo-count strong');
    this._filters = Array.from(this._el.querySelectorAll('.filters a'));

    this._availableFilters = this._filters.map(linkEl => linkEl.hash); // получаем массив hash (фильтров)
    this._count = props.count || 0;
    this._counterEl.innerText = this._count;

    // варианты кода можно использовать при запросах к серверу (если есть)
    // ищем фильтр в Location
    this.getCurrentFilterFromLocation = function () {

        return new Promise((resolve, reject) => { // возвращаем обещание (генерируем)
            const currentFilter = location.hash; // текущий фильтр берем из location

            if (currentFilter && this._availableFilters.includes(currentFilter)) { // если фильтр существует и доступен
                resolve(currentFilter); // обещание выполнено (текущий фильтр)
            } else {
                reject(new Error('Not found filter in location!')); // иначе ошибка
            }
        });
    }

    // ищем фильтр в вёрстке (Markup)
    this.getCurrentFilterFromMarkup = function () {

        return new Promise((resolve, reject) => {
            const currentFilterEl = this._el.querySelector('.filters a.selected'); // текущий фильтр берем из верстки

            if (currentFilterEl && currentFilterEl.hash) { // если у элемента есть hash, который мы нашли
                resolve(currentFilterEl); // обещание выполнено
            } else {
                reject(new Error('Not found filter in markup!')); // иначе ошибка
            }
        });
    }

    this.getDefaultFilter = function () { // фильтр по дефолту
        return Promise.resolve(this._props.defaultFilter || this._availableFilters[0]); //выбор фильтра по дефолту или первого из массива хэшей (#all)
    }

    // устанавливаем флаг нужному фильтру
    this.setCurrentFilter = function (filter) {
        const currentFilterEl = this._filters.find(linkEl => linkEl.hash === filter); // ищем элемент у которого хэш равен filter

        // если находим currentFilterEl
        if (currentFilterEl) {
            this._currentFilter = filter;
            this.resetSelectedFilter(); // убираем флаг
            currentFilterEl.classList.add('selected'); // возвращаем флаг (клас) нужному фильтру currentFilterEl

            if (this._props.onChangeFilter) { // если в _props.onChangeFilter передано событие то выполняем его
                this._props.onChangeFilter(); // сообщаем подписантам (index.js) что произошло событие
            }
        }
    }

    this.changeFilter = function (event) { // срабатывает changeFilter - получам на вход событие
        const {
            target
        } = event; // узнаем на каком элементе событие произошло

        this.setCurrentFilter(target.hash); // target.hash устанавливаем нужный фильтр - добавляем в index.js
    }

    this.changeFilter = this.changeFilter.bind(this); // наследуем this - changeFilter

    this._filters.forEach(linkEl => linkEl.addEventListener('click', this.changeFilter)); // проходим по каждому элементу и подписываемся на событие
    // здесь this.changeFilter = underfined


    this.getCurrentFilterFromLocation() // запрашиваем обещание
        .catch(this.getCurrentFilterFromMarkup.bind(this)) // если выполнено
        .catch(this.getDefaultFilter.bind(this)) // если выполнено
        .then(this.setCurrentFilter.bind(this)); // устанавливаем текущий фильтр

    // убрать флаг selected
    this.resetSelectedFilter = function () {
        this._filters.forEach(linkEl => linkEl.classList.remove('selected')); // пройдясь по массиву фильтров (ссылок) удаляем флаг 'selected'
    } // после этого возвращаем флаг selected на нужный нам фильтр setCurrentFilter

    this.getCurrentFilterName = function () { // получаем имя текущего фильтра (#all)
        return this._currentFilter;
    }

    this.setItemsCount = function (count) {
        this._count = count;
        this._counterEl.innerText = this._count;
    }

}