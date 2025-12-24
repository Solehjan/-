if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {

    const data = {
        name: 'Каталог товаров',
        hasChildren: true,
        items: [
            {
                name: 'Мойки',
                hasChildren: true,
                items: [
                    {
                        name: 'Ulgran',
                        hasChildren: true,
                        items: [
                            { name: 'Smth', hasChildren: false, items: [] },
                            { name: 'Smth', hasChildren: false, items: [] }
                        ]
                    },
                    {
                        name: 'Vigro Mramor', 
                        hasChildren: false,
                        items: []
                    },
                    {
                        name: 'Handmade',
                        hasChildren: true,
                        items: [
                            { name: 'Smth', hasChildren: false, items: [] },
                            { name: 'Smth', hasChildren: false, items: [] }
                        ]
                    }
                ]
            },
            {
                name: 'Фильтры',
                hasChildren: true,
                items: [
                    {
                        name: 'Ulgran',
                        hasChildren: true,
                        items: [
                            { name: 'Smth', hasChildren: false, items: [] },
                            { name: 'Smth', hasChildren: false, items: [] }
                        ]
                    },
                    {
                        name: 'Vigro Mramor',
                        hasChildren: false,
                        items: []
                    }
                ]
            }
        ]
    };

    // Запускаем класс
    const items = new ListItems(document.getElementById('list-items'), data);
    items.render();
    items.init(); // Вешаем события клика

    // 2. КОНСТРУКТОР 
    function ListItems(el, data) {
        this.el = el;
        this.data = data;

        // Инициализация событий открытие/закрытие
        this.init = function () {
            // Ищем все элементы с атрибутом data-parent
            const parents = this.el.querySelectorAll('[data-parent]');

            parents.forEach(parent => {
                // Ищем внутри них элемент, на который можно кликнуть 
                const open = parent.querySelector('[data-open]');
                
                // Если элемент найден вешаем клик
                if (open) {
                    open.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.toggleItems(parent);
                    });
                }
            });
        };

        // Запуск рендера 
        this.render = function () {
            // Каталог товаров
            this.el.insertAdjacentHTML('beforeend', this.renderParent(this.data));
        };

        // ФУНКЦИЯ 1 папки
        this.renderParent = function (element) {

            let html = `
                <div class="list-item" data-parent>
                    <div class="list-item__inner" data-open>
            `;

            // если есть дети стрелочку добавим
            if (element.hasChildren) {
                html += `<img src="src/assets/icons/chevron-down.png" class="list-item__arrow" alt="arrow">`;
            } else {
                html += `<span style="width: 16px; display:inline-block;"></span>`;
            }

            html += `<img src="src/assets/img/folder.png" class="list-item__folder" alt="folder">`;
            
            // Название
            html += `<span class="list-item__text">${element.name}</span>`;
            
            html += `</div>`; // Закрываем .list-item__inner

            // Если дети создаем контейнер для них и запускаем рекурсию
            if (element.hasChildren) {
                html += `<div class="list-item__items">`;
                // вызываем renderChildren для массива вложенных элементов
                html += this.renderChildren(element.items);
                html += `</div>`;
            }

            html += `</div>`; // Закрываем .list-item
            return html;
        };

        // ФУНКЦИЯ 2 Рендер детей 
        this.renderChildren = function (items) {
            let html = '';
            // Проходим по массиву детей и для каждого снова вызываем renderParent
            items.forEach(item => {
                html += this.renderParent(item);
            });
            return html;
        };

        // Переключатель класса т.е открыть/закрыть
        this.toggleItems = function (parent) {
            parent.classList.toggle('list-item_open');
        };
    }
}