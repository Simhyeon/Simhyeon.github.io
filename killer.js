let SRC = '';
let MAX_INDEX = -1;

// Touch swipe related
// Source https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
let touchstartX = 0
let touchendX = 0

document.addEventListener('touchstart', e => {
	touchstartX = e.changedTouches[0].screenX
})

document.addEventListener('touchend', e => {
	touchendX = e.changedTouches[0].screenX
	checkDirection()
})
    
function checkDirection() {
	if (touchendX < touchstartX) {
		go_next();
	}
	if (touchendX > touchstartX) {
		go_prev();
	}
}
// </TOUCH>

function fetchSrcData(file_name) {
	if (SRC !== '') { return; }
	fetch(`./${file_name}.json`)
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
	MAX_INDEX = SRC.length - 1
	let elem = document.getElementById("container");
	let item = SRC[0];

	elem.children[0].innerHTML = item.header // Header
	elem.children[1].innerHTML = item.text // Content

	let next = document.getElementById("killer-next");
	let prev = document.getElementById("killer-prev");
	let home = document.getElementById("killer-home");
	let toc = document.getElementById("killer-toc");

	next.addEventListener('click', () => {
		go_next();
	})
	prev.addEventListener('click', () => {
		go_prev();
	})
	home.addEventListener('click', () => {
		go_home();
	})

	// Initialize table of contents
	let toc_window = document.getElementById("popup-hint-window");
	let appendee = toc_window.children[0];

	// Create go to object
	let goto_elem = document.createElement('button');
	goto_elem.classList.add('killer-toc-list');
	goto_elem.dataset.target = -1;

	let counter = 0;
	SRC.forEach(e => {
		let dupNode = goto_elem.cloneNode(true);
		dupNode.innerHTML = `${e.header}`;
		dupNode.dataset.target = counter;
		appendee.appendChild(dupNode);
		dupNode.addEventListener('click', (e) => {
			go_to(e.currentTarget.dataset.target);
			toc_window.style.setProperty('visibility','hidden');
		});
		// Clone paste
		counter += 1;
	});


	// Add event listern
	toc.addEventListener('click', () => {
		show_toc(toc_window);
	})

	// Add popup close event for window
	window.addEventListener('mouseup',function(event){
		var pol = document.getElementById('popup-hint-window');
		if(event.target != pol && event.target.parentNode != pol){
			pol.style.setProperty('visibility','hidden');
		}
	});

	// compile naviation with arrow keys
	document.onkeydown = function(e) {
		switch (e.keyCode) {
			case 37:
				go_prev();
				break;
			case 39:
				go_next();
				break;
			default:
				break;
		}
	};
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

function go_to(index) {
	let elem = document.getElementById("container");
	let item = SRC[index];
	elem.children[0].innerHTML = item.header // Header
	elem.children[1].innerHTML = item.text // Content
	elem.dataset.index = index;
}

function show_toc(toc_window) {
	// Show toc-window
	toc_window.style.setProperty('visibility','unset');
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

// HIde pope up window
function close_pop_up(button) {
	button.parentNode.style.setProperty('visibility','hidden');
}
