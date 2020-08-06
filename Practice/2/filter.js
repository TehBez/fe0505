import {
    CustomEvents
} from './customEvents.js';

export class Filter {
    constructor(props) {
        this._props = props;
        this._el = document.querySelector('.footer');
        this._counterEl = this._el.querySelector('.todo-count strong');
        this._filters = Array.from(this._el.querySelectorAll('.filters a'));
        this._availableFilters = this._filters.map(linkEl => linkEl.hash);
        this._count = props.count || 0;

        this._counterEl.innerText = this._count;

        this.changeFilter = this.changeFilter.bind(this);

        this._filters.forEach(linkEl => linkEl.addEventListener('click', this.changeFilter));

        this.events = new CustomEvents();
        this.events.registerEvents('change');

        this.getCurrentFilterFromLocation()
            .catch(this.getCurrentFilterFromMarkup.bind(this))
            .catch(this.getDefaultFilter.bind(this))
            .then(this.setCurrentFilter.bind(this));
    }

    getCurrentFilterFromLocation() {
        console.log('getCurrentFilterFromLocation');

        return new Promise((resolve, reject) => {
            const currentFilter = location.hash;

            if (currentFilter && this._availableFilters.includes(currentFilter)) {
                resolve(currentFilter);
            } else {
                reject(new Error('filter not found in location'));
            }
        });
    }

    getCurrentFilterFromMarkup() {
        console.log('getCurrentFilterFromMarkup');
        const currentFilterEl = this._el.querySelector('.filters a.selected');

        if (currentFilterEl && currentFilterEl.hash) {
            return Promise.resolve(currentFilterEl.hash);
        }

        return Promise.reject(new Error('filter not found in markup'));
    }

    getDefaultFilter() {
        console.log('getDefaultFilter');
        return Promise.resolve(this._props.defaultFilter || this._availableFilters[0]);
    }

    setCurrentFilter(filter) {
        console.log('setCurrentFilter', filter);
        const currentFilterEl = this._filters.find(linkEl => linkEl.hash === filter);

        if (currentFilterEl) {
            this._currentFilter = filter;
            this.resetSelectedFilter();
            currentFilterEl.classList.add('selected');

            if (this._props.onChangeFilter) {
                this._props.onChangeFilter();
            } else {
                this.events.dispatch('change');
            }
        }
    }

    changeFilter(event) {
        const {
            target
        } = event;

        this.setCurrentFilter(target.hash);
    }

    resetSelectedFilter() {
        this._filters.forEach(linkEl => linkEl.classList.remove('selected'));
    }

    getCurrentFilterName() {
        return this._currentFilter;
    }

    setItemsCount(count) {
        this._count = count;
        this._counterEl.innerText = this._count;
    }
}