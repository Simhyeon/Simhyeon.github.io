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

function toggle_psat_answer(buttonObject) {
	let current_status = buttonObject.dataset.status;
	let elems = document.getElementsByClassName("psat-answer");

	if (elems.length === 0 ) {
		return;
	}

	/* Loop elems and set style*/
	switch (current_status) {
		case 'hidden':
			Array.from(elems).forEach(e => { 
				e.classList.add('highlight');
				e.classList.remove('hidden');
				}
			);
			buttonObject.dataset.status = 'highlight';
			break;
		case 'highlight':
			Array.from(elems).forEach(e => { e.classList.add('hidden') });
			buttonObject.dataset.status = 'hidden';
			break;
		case 'normal':
			break;
		default:
			break;
			
	}
}

// This function is reserved for toggle switch
function toggle_dark_mode(input) {
	let value = input.checked;
	if (value === true) {
		localStorage.setItem("dark_mode", true); 
	} else {
		localStorage.setItem("dark_mode", false); 
	}

	// This is inefficient, but I'm the only user so why not.
	init_theme();
}

function toggle_draggable(input) {
	let value = input.checked;
	if (value === true) {
		localStorage.setItem("drag_able", true); 
	} else {
		localStorage.setItem("drag_able", false); 
	}
}

function get_dark_mode() {
    return localStorage.getItem("dark_mode"); 
}

function get_draggable() {
    return localStorage.getItem("drag_able"); 
}

function init() {
	init_local_storage();
	init_switch(document.getElementById("dark_switch"),'dark_mode')
	init_switch(document.getElementById("drag_switch"),'drag_able')
}

function init_local_storage() {
	if (localStorage.getItem("dark_mode") === null) {
		localStorage.setItem("dark_mode",true)
		localStorage.setItem("darg_able",false)
	}
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

function law_init() {
	init_local_storage();

	let elems = document.getElementsByTagName("span");
	Array.from(elems).forEach(e => { 
		e.onclick = function(){toggle_view(e);}
	});
	let drag_able = get_draggable();
	if (drag_able === "true") {
		let cont = document.getElementsByClassName("container")[0];
		cont.classList.remove("non_dragable");
	} 
}

function init_switch(obj, keyword) {
	switch (keyword) {
		case 'dark_mode':
			var option = get_dark_mode();
			if (option === null || option === "true") {
				obj.checked = true;
			} else {
				obj.checked = false;
			}
			break;
		case 'drag_able':
			var option = get_draggable();
			if (option === "true") {
				obj.checked = true;
			} else {
				obj.checked = false;
			}
			break;
		default:
			break;
			
	}
}

/* This is equal or bigger than 1*/
function getRandomInt(max) {
	return Math.max(Math.floor(Math.random() * max), 1);
}

function getRandomIntRange(min,max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.max(Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)); // The maximum is exclusive and the minimum is inclusive
}

function print_equations_to_blackboard() {
	var sep = document.getElementById("answer-sep").dataset.status;
	var bb = document.getElementById("blackboard")
	bb.textContent = '';
	bb.appendChild(document.createElement('hr'));
	var raw_dig = document.getElementById("digit").value;
	var dig = Math.pow(10,raw_dig);
	var cnt = document.getElementById("count").value;
	/* 더하기 */
	for (var i = 0; i < cnt; i++) {
		var newdiv = document.createElement('div');
		newdiv.classList.add("eq-padding");
		var answer = document.createElement('span');
		answer.classList.add("hidden");
		answer.classList.add("psat-answer");
		var num = (i+1).toString().padStart(raw_dig,'0');
		var first = getRandomInt(dig);
		var second = getRandomInt(dig);
		var third = first + second
		var fpad = "0".repeat(raw_dig - first.toString().length + 1);
		var spad = "0".repeat(raw_dig - second.toString().length + 1);
		var tpad = "0".repeat(raw_dig - third.toString().length + 1);
		newdiv.innerHTML = `[${num}] &nbsp:&nbsp <span class="noview">${fpad}</span>${first} &nbsp + &nbsp <span class="noview">${spad}</span>${second} &nbsp = &nbsp`;
		answer.innerHTML = `<span class="noview">${tpad}</span>${third}`;
		if (sep === "sep") {
			answer.classList.add("sep_answer");
		}
		bb.appendChild(newdiv);
		newdiv.appendChild(answer);
	}
	bb.appendChild(document.createElement('hr'));
	/* 빼기 */
	for (var i = 0; i < cnt; i++) {
		var newdiv = document.createElement('div');
		newdiv.classList.add("eq-padding");
		var answer = document.createElement('span');
		answer.classList.add("hidden");
		answer.classList.add("psat-answer");
		var num = (i+1).toString().padStart(raw_dig,'0');
		var second = getRandomInt(dig - 1);
		var first = getRandomIntRange(second + 1, dig);
		var third = first - second
		var fpad = "0".repeat(raw_dig - first.toString().length + 1);
		var spad = "0".repeat(raw_dig - second.toString().length + 1);
		var tpad = "0".repeat(raw_dig - third.toString().length + 1);
		newdiv.innerHTML = `[${num}] &nbsp:&nbsp <span class="noview">${fpad}</span>${first} &nbsp - &nbsp <span class="noview">${spad}</span>${second} &nbsp = &nbsp`;
		answer.innerHTML = `<span class="noview">${tpad}</span>${third}`;
		if (sep === "sep") {
			answer.classList.add("sep_answer");
		}
		bb.appendChild(newdiv);
		newdiv.appendChild(answer);
	}
	bb.appendChild(document.createElement('hr'));
}

function separate_answers(btnObj) {
	let current_status = btnObj.dataset.status;
	switch (current_status) {
		case "no-sep":
			btnObj.dataset.status = "sep"
			btnObj.innerHTML = "정답 간격 줄이기"
			break;
		case "sep":
			btnObj.dataset.status = "no-sep"
			btnObj.innerHTML = "정답 간격 늘리기"
			break;
		default:
			break;
	}
}
