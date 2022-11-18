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



//========================================================================================================================================================

