function toggle_view(spanObj) {
	let clsl = spanObj.classList;
	if (clsl.contains('hidden')) {
		if (clsl.contains('disclosed')) {
			clsl.remove('disclosed');
		} else {
			clsl.add('disclosed');
		}
	}
}

function toggle_study_style(buttonObject) {
	let current_status = buttonObject.dataset.status;
	let elems = document.getElementsByTagName("span");

	/* Loop elems and set style*/
	switch (current_status) {
		case 'normal':
			Array.from(elems).forEach(e => { e.classList.add('hidden') });
			buttonObject.dataset.status = 'hidden';
			break;
		case 'hidden':
			Array.from(elems).forEach(e => { 
				e.classList.add('highlight');
				e.classList.remove('hidden');
				}
			);
			buttonObject.dataset.status = 'highlight';
			break;
		case 'highlight':
			Array.from(elems).forEach(e => { e.classList.remove('highlight') });
			buttonObject.dataset.status = 'normal';
			break;
		default:
			break;
			
	}
}

function toggle_dark_mode(input) {
    if (input === "true") {
        localStorage.setItem("dark-mode", true); 
    } else {
        localStorage.setItem("dark-mode", false); 
    }
}

function get_dark_mode() {
    localStorage.getItem("dark-mode"); 
}

function init_theme() {
    let dark_mode = get_dark_mode();

    if (!dark_mode) {
        let html = document.getElementsByTagName("html")[0];
        html.classList.add('dark_mode');
    } else {

    }
}

function law_init() {
	let elems = document.getElementsByTagName("span");
	Array.from(elems).forEach(e => { 
		e.onclick = function(){toggle_view(e);}
	});
}
