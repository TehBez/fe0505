// 1. Создать компонент управляющий фильтрацией (реагирует на клик по фильтрам/отображает количество тасков)
// 2. Найти элементы которые мы выбираем и которые выводятся
// 3. Из компонента по клику передаем информацию, что поменялся фильтр (callback) / Активный фильтр / Получает информацию о количестве тасков


// попытка использовать класс
class Filter {
    constructor(props = {}) {
        this.props = props;
        this._el = document.querySelector('footer');
        this._filters = this._el.querySelectorAll('.filters a');
        this._itemCounter = this._el.querySelector('.todo-count strong');

        this._filters.forEach((_filterEl) => {
            _filterEl.addEventListener('click', this.clickFilterHandler);
            this.setFilterFlag(_filterEl);
        });

        this.render();
    }
}