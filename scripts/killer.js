let SRC = '';
let MAX_INDEX = -1;
let LC_PAGE_NAME = '';
let page_number_elem = null;

// Touch swipe related
// Source https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
let touchstartX = 0
let touchendX = 0

let ON_POPUP = false;

document.addEventListener('touchstart', e => {
	if (ON_POPUP) { return ; }
	touchstartX = e.changedTouches[0].screenX
})

document.addEventListener('touchend', e => {
	if (ON_POPUP) { return ; }
	touchendX = e.changedTouches[0].screenX
	checkDirection()
})

document.addEventListener('mousedown', e => {
	if (ON_POPUP) { return ; }
	touchstartX = e.screenX
})

document.addEventListener('mouseup', e => {
	if (ON_POPUP) { return ; }
	touchendX = e.screenX
	checkDirection()
})
    
function checkDirection() {
    let distance = Math.abs(touchendX - touchstartX);
    if (distance < 50) {
        return;
    } 
	if (touchendX < touchstartX) {
		go_next();
	}
	if (touchendX > touchstartX) {
		go_prev();
	}
}
// </TOUCH>

function fetch_data_and_init(file_name, page_name, use_numbering) {
	if (SRC !== '') { return; }
	fetch(`/rcs/${file_name}.json`)
		.then((res) => {
			if (!res.ok) {
				throw new Error
				(`HTTP error! Status: ${res.status}`);
			}
			return res.json();
		})
		.then((data) => 
            		{ init(data, page_name,use_numbering); })
			.catch((error) => 
				console.error("Unable to fetch data:", error));
}

function init(data, page_name,use_numbering) {
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
		let toc_text = '';
		if (use_numbering) {
			toc_text = `${counter}. ${e.header}`
		} else {
			toc_text = e.header
		}
		dupNode.innerHTML = toc_text;
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

	// Add window click event
	// 1. Add popup close event for window
	// TODO 2. add click naviation
	window.addEventListener('mouseup',function(event){
		var pol = document.getElementById('popup-hint-window');
		if(event.target != pol && event.target.parentNode != pol){
			pol.style.setProperty('visibility','hidden');
		}
	});

	// compile naviation with arrow keys
	document.onkeydown = function(e) {
		switch (e.keyCode) {
			case 35: 
				go_to(MAX_INDEX);
				break;
			case 36: 
				go_home();
				break;
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

	// Init first data
	LC_PAGE_NAME = page_name;
	if (localStorage.getItem(LC_PAGE_NAME) === null) {
		localStorage.setItem(LC_PAGE_NAME,0)
	}
	let new_index = localStorage.getItem(LC_PAGE_NAME);

	page_number_elem = document.getElementById('page-number')

	go_to(new_index);
}

function update_page_bookmark(current_page) {
	localStorage.setItem(LC_PAGE_NAME, current_page); 
	if (page_number_elem !== null) {
		page_number_elem.textContent = `-${current_page}-`
	}
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
	update_page_bookmark(index + 1);
}

function go_prev() {
	let elem = document.getElementById("container");
	let index = parseInt(elem.dataset.index);
	if (index == 0) { return; }
	let item = SRC[index-1];
	elem.children[0].innerHTML = item.header // Header
	elem.children[1].innerHTML = item.text // Content

	elem.dataset.index = index - 1;
	update_page_bookmark(index - 1);
}

function go_home() {
	let elem = document.getElementById("container");
	let item = SRC[0];
	elem.children[0].innerHTML = item.header // Header
	elem.children[1].innerHTML = item.text // Content
	elem.dataset.index = 0;
	update_page_bookmark(0);
}

function go_to(index) {
	let elem = document.getElementById("container");
	let item = SRC[index];
	elem.children[0].innerHTML = item.header // Header
	elem.children[1].innerHTML = item.text // Content
	elem.dataset.index = index;
	update_page_bookmark(index);
}

function show_toc(toc_window) {
	ON_POPUP = true;
	// Show toc-window
	toc_window.style.setProperty('visibility','unset');

	// Scroll to current status
	let target_index = document.getElementById('container').dataset.index;
	toc_window.children[0].children[target_index].scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
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
