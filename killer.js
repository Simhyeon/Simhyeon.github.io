let SRC = '';
const MAX_INDEX = 107;

function fetchSrcData() {
	if (SRC !== '') { return; }
	fetch('./eco_killer_src.json')
		.then((res) => {
			if (!res.ok) {
				throw new Error
				(`HTTP error! Status: ${res.status}`);
			}
			return res.json();
		})
		.then((data) => 
            		{ init(data); })
			.catch((error) => 
				console.error("Unable to fetch data:", error));

	// Init first data
    
}

function init(data) {
	SRC = data;
	let elem = document.getElementById("container");
	let item = SRC[0];

	elem.children[0].innerHTML = item.header // Header
	elem.children[1].innerHTML = item.text // Content

	let next = document.getElementById("killer-next");
	let prev = document.getElementById("killer-prev");
	let home = document.getElementById("killer-home");

	next.addEventListener('click', () => {
		go_next();
	})
	prev.addEventListener('click', () => {
		go_prev();
	})
	home.addEventListener('click', () => {
		go_home();
	})
}

function go_next() {
	let elem = document.getElementById("container");
	let index = parseInt(elem.dataset.index);
	if (index == MAX_INDEX) { return; }

	let item = SRC[index+1];

	elem.children[0].innerHTML = item.header // Header
	elem.children[1].innerHTML = item.text // Content

	// GEt target container
	elem.dataset.index = index + 1;
}

function go_prev() {
	let elem = document.getElementById("container");
	let index = parseInt(elem.dataset.index);
	if (index == 0) { return; }
	let item = SRC[index-1];
	elem.children[0].innerHTML = item.header // Header
	elem.children[1].innerHTML = item.text // Content

	elem.dataset.index = index - 1;
}

function go_home() {
	let elem = document.getElementById("container");
	let item = SRC[0];
	elem.children[0].innerHTML = item.header // Header
	elem.children[1].innerHTML = item.text // Content
	elem.dataset.index = 0;
}

function init_theme() {
	let dark_mode = get_dark_mode();
	let html = document.getElementsByTagName("html")[0];

	// Default is dark mode
	if (dark_mode === null || dark_mode === "true") { // Dark mode
		if (!html.classList.contains('dark_mode')) {
			html.classList.add('dark_mode');
		}
	} 
	else { // Light mode
		if (html.classList.contains('dark_mode')) {
			html.classList.remove('dark_mode');
		}
	}
}

function get_dark_mode() {
    return localStorage.getItem("dark_mode"); 
}

function get_draggable() {
    return localStorage.getItem("drag_able"); 
}
