let body = document.querySelector("body");
const lock = document.querySelector("._lock");
let wrapper = document.querySelector('.wrapper');

function showMenu(className) {
    const hamburger = document.querySelector('.ham'),
        hamburgerBlock = document.querySelector('.hamburger'),
        menu = document.querySelector('.' + className),
        menuName = className;
    hamburger.addEventListener('click', (e) => {
        menu.classList.toggle(menuName + '_active');
        body.classList.toggle("_lock");
        hamburgerBlock.classList.toggle("_fixed");
    });
}

function closeMenuOnLink(className) {
    const menu = document.querySelector('.' + className),
        menuLinks = document.querySelectorAll('.' + className + "__link"),
        hamburger = document.querySelector('.ham'),
        hamburgerBlock = document.querySelector('.hamburger'),
        menuName = className,
        delay = 400;
    menuLinks.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            let scrollToElem = item.getAttribute('href');
            let coordinates = document.querySelector(scrollToElem).offsetTop;
            setTimeout(() => {
                window.scrollTo({
                    top: coordinates,
                    behavior: "smooth"
                });
            }, delay);
            menu.classList.toggle(menuName + '_active');
            body.classList.toggle("_lock");
            hamburger.classList.toggle("active");
hamburgerBlock.classList.toggle("_fixed");
        });
    });
}

function setProgress() {
    const counters = document.querySelectorAll('.progress-block__count'),
        progressLine = document.querySelectorAll('.progress-block__progress-bar span');
    counters.forEach((item, i) => {
        progressLine[i].style.width = item.innerHTML;
    });
}

function addSmoothScroll() {
    let scrollList = document.querySelectorAll('.smooth-scroll');
    scrollList.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            let scrollToElem = item.getAttribute('href');
            let coordinates = document.querySelector(scrollToElem).offsetTop;
            setTimeout(() => {
                window.scrollTo({
                    top: coordinates,
                    behavior: "smooth"
                });
            });
        });
    });
}

showMenu('menu');
closeMenuOnLink('menu');
setProgress();
addSmoothScroll();

var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('body').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('body').classList.add('_touch');
}
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('_webp');
	} else {
		document.querySelector('body').classList.add('_no-webp');
	}
});
function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

if (document.querySelector('.wrapper')) {
	document.querySelector('.wrapper').classList.add('_loaded');
}
let unlock = true;

function validateForm(form) {
	$(form).validate({
		rules: {
			userName: {
				required: true,
				minlength: 2,
			},
			userEmail: {
				required: true,
				email: true,
			},
			privacy: "required",
		},
		messages: {
			userName: {
				required: "Пожалуйста, введите свое имя",
				minlength: jQuery.validator.format("Введите минимум {0} символа!"),
			},
			userEmail: {
				required: "Пожалуйста, введите свою почту",
				email: "Неправильно введен адрес почты",
			},
			privacy: {
				required: "",
			},
		},
	});
}

$(document).ready(function () {
	$(".form").each(function (i) {
		validateForm(this);
	});
	$("form").submit(function (e) {
		e.preventDefault();
		let userName = $(this).find('input[name="userName"]').val();
        let userEmail = $(this).find('input[name="userEmail"]').val();
		if ((userEmail !== '') && (userName !== '')) {
			$.ajax({
				type: "POST",
				url: "mailer/smart.php",	
				data: $(this).serialize(),
			}).done(function () {
				$(this).find("input").val("");
				$("form").trigger("reset");
			});
		}
		return false;
	});
});
