// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
// import { isMobile } from "./functions.js";
// import { formsModules } from "./forms/forms.js";

//============== ACTIVE LINKS ==========================================================================================================================================
const menuLinks = document.querySelectorAll('.menu__link');
console.log(menuLinks);

if (menuLinks) {
	function linkColor() {
		menuLinks.forEach(link => link.classList.remove('js-active-link'));
		this.classList.add('js-active-link');
	};
	menuLinks.forEach(link => link.addEventListener('click', linkColor));
}

//=========== FILTERS =============================================================================================================================================
const list = document.querySelector('.list');
const items = document.querySelectorAll('.blocks__item');

const listItems = document.querySelectorAll('.list__item');

if (list) {
	function filter() {
		list.addEventListener('click', event => {
			const targetId = event.target.dataset.id;
			const target = event.target;

			if (target.classList.contains('list__item')) {
				listItems.forEach(listItem => listItem.classList.remove('tab-active'));
				target.classList.add('tab-active')
			}

			console.log(targetId);

			switch (targetId) {
				case 'all':
					getItems('blocks__item')
					break

				case 'marketing':
					getItems(targetId)
					break

				case 'management':
					getItems(targetId)
					break

				case 'recruting':
					getItems(targetId)
					break

				case 'design':
					getItems(targetId)
					break

				case 'development':
					getItems(targetId)
					break

				case 'articles':
					getItems(targetId)
					break

				case 'videos':
					getItems(targetId)
					break

				case 'podcasts':
					getItems(targetId)
					break
			}

		})
	};
	filter();

	function getItems(className) {
		items.forEach(item => {
			if (item.classList.contains(className)) {
				item.style.display = 'block'
			} else {
				item.style.display = 'none'
			}
		})
	}
}

//=========== LOAD MORE BUTTON =============================================================================================================================================
let btnshowMoreCards = document.querySelector('.button-load');
const hiddenCards = document.querySelectorAll('.js-hidden');
let isHidden = true;

if (btnshowMoreCards) {
	btnshowMoreCards.addEventListener("click", () => {
		btnshowMoreCards.textContent = isHidden
			? 'Hidden'
			: 'Load more';

		isHidden = !isHidden;
		hiddenCards.forEach(item => item.classList.toggle('js-hidden'));
	});
};
//========= SEARCH FORM ===============================================================================================================================================
const searchInput = document.querySelector('.search-text');
const rowsWorks = document.querySelectorAll('.blocks__row .blocks__item');

//console.log(rowsWorks);
if (searchInput) {
	searchInput.addEventListener('keyup', function (event) {
		//console.log(event);
		const q = event.target.value.toLowerCase();

		rowsWorks.forEach(work => {
			//console.log(work);
			work.querySelector('.cards__job-title').textContent.toLowerCase().startsWith(q) ? work.style.display = 'table-row' : work.style.display = 'none';
		});
	});
};



//========================================================================================================================================================
const lengthPart = 9; // количество элементов в 1 части
//const filter = document.querySelector('.buttons');
const product = document.querySelector('.pages');

if (product) {
	const pagination = document.querySelector('.pagination');

	let data = [...product.children]; // Тут храним все `.card`, типо аналог БД, т.е исходные данные.
	let chunks = SplitParts(data); // Тут храним части. Ниже описание функции.

	RenderChunks(0); // Рендерим первую часть. Описание функии ниже.
	RenderPagination(); // Рендерим пагинацию. Описание тоже ниже.

	// Механика работы фильта
	/*
	filter.addEventListener('click', e => { // При клике в область фильтра
		let btn = e.target.closest('.js-btn'); // проверяем, нажата ли была кнопка .btn, это называется "делегирование событий".
		if (btn) {
			if (btn.dataset.filter !== 'all') // если не нажимаем на кнопку all
				chunks = SplitParts(data.filter(elem => elem.classList.contains(btn.dataset.filter))); // То из исходного массива получаем только элементы с классом, который равен `data-filter` у кнопки. Потом его разбиваем на части и сохраняем в массив с частями.
			else
				chunks = SplitParts(data); // Если нажат `all`, то разбиваем весь массив на части.
		}
		RenderChunks(0); // После отработки фильтра важно перерендерить части..
		RenderPagination(); // и пагинацию
	});*/

	// Механика работы пагинации
	pagination.addEventListener('click', e => {
		let item = e.target.closest('.pagination-item'); // Тут тоже делегирование, как в механике выше.
		if (item) {
			let active = pagination.querySelector('.pagination-item.active'), // получим активную страницу
				part; // сюда запишем номер части, для проверок пагинации
			if (item.classList.contains('item-prev') || item.classList.contains('item-next')) { // если нажата кнопка "вперёд" или "назад"
				if (item.classList.contains('disable')) return false; // Если кнопка имеет класс `disable`, то прекращаем выполнение кода ниже
				part = +active.dataset.part; // записываем номер части активной страницы.
				part = item.classList.contains('item-prev') ? part - 1 : part + 1; // Если нажата кнопка "назад", то отнимаем единицу активной старница, если "вперёд", то прибавляем.

				RenderChunks(part); // Рендерим страница
				// Меняем в пагинации активную страницу
				active.classList.remove('active'); // Находим активную и удаляем класс `active`
				pagination.querySelector(`.pagination-item[data-part="${part}"]`).classList.add('active'); // находим страницу с `data-part`, который равен активной странице и добавляем ему класс `active`
			} else { // Если нажаты кнопки страницы (1, 2, 3 и т.п.)
				active.classList.remove('active'); // удаляем класс `active` у активной.
				item.classList.add('active'); // добавляем нажатой кнопке класс `active`
				part = +item.dataset.part; // получаем её номер части
				RenderChunks(part); // Рендерим страницу.
			}
			// Тут запрещаем или разрешаем использовать кнопки "вперёд" или "назад", в зависимости от того, какая часть сейчас активна.
			let prev = pagination.querySelector('.pagination-item.item-prev'),
				next = pagination.querySelector('.pagination-item.item-next');

			// Сначала удалим у них класс `disable`, если он есть
			if (prev.classList.contains('disable')) prev.classList.remove('disable');
			if (next.classList.contains('disable')) next.classList.remove('disable');
			if (part === 0) prev.classList.add('disable'); // Проверим является ли активная страница началом частей, если да, то запретим использовать кнопку "назад"
			if (part === chunks.length - 1) next.classList.add('disable'); // если активная является концом частей, то запрещаем "вперёд".
		}
	});


	// Функция которая делит массив на части.
	function SplitParts(arr) { // передаём массив, который нужно разбить
		if (arr.length > lengthPart) { // проверяем, имеет ли переданный массив длину больше, чем длина части
			let chunks = [], // подготавливаем возращаемый массив с частями
				part = Math.floor(arr.length / lengthPart); // сколько частей получится

			for (let i = 0; i < arr.length; i += lengthPart) // проходим по массиву, шаг длине части
				chunks.push(arr.slice(i, i + lengthPart)); // добавляем часть в массив с частями

			return chunks; // возвращаем массив
		} else return arr; // если получаемый массив меньше длины части, то возвращаем его же.
	}

	// Функция для вывода конкретно части в HTML
	function RenderChunks(part) { // передаём порядковый номер части
		if (part >= 0 && part < chunks.length) { // если номер части > 0 и < длины частей
			product.innerHTML = ''; // очищаем элемент, куда будем выводить части
			chunks[part].map(elem => product.append(elem)); // Выводим т.к. в исходном массиве уже сразу Element, то мы можем добавить его через .append
		} else return false;
	}

	// Функия для создания пагинации
	function RenderPagination() {
		pagination.innerHTML = ''; // Очищаем блок
		if (chunks.length > 1) { // Если частей больше одной, то выводим погинацию, иначе нет смысла..
			chunks.map((elem, i) => pagination.insertAdjacentHTML('beforeend', `<li class="pagination-item${i === 0 ? ' active' : ''}" data-part="${i}"><a href="#">${i + 1}</a></li>`)); // Создаём столько же "ссылок", сколько частей есть
			// Ниже добавляем кнопки "вперёд" и "назад"
			pagination.insertAdjacentHTML('afterbegin', '<li class="pagination-item item-prev disable"><a href="#"><i class="_icon-arrow-right" aria-hidden="true"></i></a></li>'); // Т.к. данная функция создаёт пагинацию у которой первая страница активна, то сразу запрещаем кнопке "назад" работать.
			pagination.insertAdjacentHTML('beforeend', '<li class="pagination-item item-next"><a href="#"><i class="_icon-arrow-right" aria-hidden="true"></i></a></li>');
		}
	}
}
//========================================================================================================================================================

function map(n) {
	ymaps.ready(init);
	function init() {
		// Создание карты.
		let myMap = new ymaps.Map("map", {
			// Координаты центра карты.
			// Порядок по умолчанию: «широта, долгота».
			// Чтобы не определять координаты центра карты вручную,
			// воспользуйтесь инструментом Определение координат.
			//controls: [[53.88284739205031, 27.727503000000006]],
			center: [34.78218143888964, 135.48873970312502],
			// Уровень масштабирования. Допустимые значения:
			// от 0 (весь мир) до 19.
			zoom: 7
		});

		/* 
		myMap.controls.remove('geolocationControl'); // удаляем геолокацию
		myMap.controls.remove('searchControl'); // удаляем поиск
		myMap.controls.remove('trafficControl'); // удаляем контроль трафика
		myMap.controls.remove('typeSelector'); // удаляем тип
		myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
		myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
		myMap.controls.remove('rulerControl'); // удаляем контрол правил
		myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
*/
		let myPlacemark = new ymaps.Placemark([34.78218143888964, 135.48873970312502], {
		}, {
			// Опции.
			//balloonContentHeader: 'Mistoun',
			//balloonContentBody: 'Москва, Николоямская 40с1',
			//balloonContentFooter: '+ 7(495) 507-54 - 90',
			//hasBalloon: true,
			//hideIconOnBalloonOpen: true,

			hasBalloon: false,
			hideIconOnBalloonOpen: false,
			// Необходимо указать данный тип макета.
			iconLayout: 'default#imageWithContent',
			// Своё изображение иконки метки.
			//iconImageHref: 'img/icons/map.svg',
			// Размеры метки.
			iconImageSize: [40, 40],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-20, -20],
			// Смещение слоя с содержимым относительно слоя с картинкой.
			iconContentOffset: [0, 0],
		});
		myMap.geoObjects.add(myPlacemark);

		//myMap.behaviors.disable('scrollZoom');
		myMap.behaviors.disable('drag');
	}
}
if (document.querySelector('#map')) {
	map()
}

