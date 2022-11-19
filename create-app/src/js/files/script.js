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
