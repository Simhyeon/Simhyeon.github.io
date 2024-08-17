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

/* Constitution 300 problems  */
function load_cons_init() {
	let merged_path = `./cons_input.json`;
	fetch(merged_path)
		.then((res) => {
			if (!res.ok) {
				throw new Error
				(`HTTP error! Status: ${res.status}`);
			}
			return res.json();
		})
		.then((data) => 
			createProblemList(data))
			.catch((error) => 
				console.error("Unable to fetch data:", error));

	// TODO Not yet
	// Add popup close event for window
	// window.addEventListener('mouseup',function(event){
	//        var pol = document.getElementById('popup-hint-window');
	//        if(!event.target.classList.contains("eco-explanation") && event.target != pol && event.target.parentNode != pol){
	// 	pol.style.setProperty('visibility','hidden');
	//        }
	//  });
}


/* Economics 300 problems for micro and macro */
function load_eco_init(eco_type) {
	let merged_path = `./eco_input-${eco_type}.json`;
	fetch(merged_path)
		.then((res) => {
			if (!res.ok) {
				throw new Error
				(`HTTP error! Status: ${res.status}`);
			}
			return res.json();
		})
		.then((data) => 
			createProblemList(data))
			.catch((error) => 
				console.error("Unable to fetch data:", error));

	// Add popup close event for window
	window.addEventListener('mouseup',function(event){
        var pol = document.getElementById('popup-hint-window');
        if(!event.target.classList.contains("eco-explanation") && event.target != pol && event.target.parentNode != pol){
		pol.style.setProperty('visibility','hidden');
        }
  });
}

function createProblemList(jsonObject) {
	// Get parent node
	let parentNode = document.getElementById("container")
	// Start node creation
	let listDiv = document.createElement('div');
	listDiv.classList.add('eco-list-wrapper');
	let probDiv = document.createElement('div');
	probDiv.classList.add('eco-list-problem');
	let answerDiv = document.createElement('div');
	answerDiv.classList.add('eco-list-answer');
	let expDiv = document.createElement('button');
	expDiv.classList.add("eco-explanation");
	expDiv.innerHTML = "&#9432";
	let firstAnswerDiv = document.createElement('button');
	firstAnswerDiv.classList.add('eco-list-answer-first');
	let secondAnswerDiv = document.createElement('button');
	secondAnswerDiv.classList.add('eco-list-answer-second');
	listDiv.appendChild(probDiv);
	probDiv.appendChild(expDiv);
	answerDiv.appendChild(firstAnswerDiv);
	answerDiv.appendChild(secondAnswerDiv);
	listDiv.appendChild(answerDiv);
	// End node creation
	let counter = 0;
	jsonObject.forEach(e => { 
		counter += 1;
		// Temporary fix for skipping empty values
		if (e.problem !== "") {
			let dupNode = listDiv.cloneNode(true);
			parentNode.appendChild(dupNode);
			// NOTE 
			// Index 0 is prob div
			// Index 1 is answer div
			let number = e.number; 
			if (number === undefined) {
				number = counter;
			}
			dupNode.children[0].insertAdjacentHTML("afterbegin",`${number}. ${e.problem}`);
			dupNode.children[1].children[0].textContent = e.first;
			dupNode.children[1].children[1].textContent = e.second;
			dupNode.children[1].children[e.answer].dataset.answer = "true";

			// Add event listener
			if (e.explanation === "")  {
				dupNode.children[0].lastChild.disabled = true;
				dupNode.children[0].lastChild.classList.add('disabled-hint');
			} else {
				dupNode.children[0].lastChild.addEventListener('click', () => {
					show_hint(e.number, e.problem ,e.explanation);
				})
			}
			dupNode.children[1].children[0].addEventListener('click', (vom) => {
				select_answer(vom.target, 0);
			});
			dupNode.children[1].children[1].addEventListener('click', (vom) => {
				select_answer(vom.target, 1);
			});

			// Modify text spacing for specific anwers
			if (e.first.length !== 1) {
				dupNode.children[1].children[0].style.setProperty('padding-right', '0');
				dupNode.children[1].children[0].style.setProperty('padding-left', '0');
			}
			if (e.second.length !== 1) {
				dupNode.children[1].children[1].style.setProperty('padding-right', '0');
				dupNode.children[1].children[1].style.setProperty('padding-left', '0');
			}
		}
	})
}

function show_hint(index,problem, explanation) {
	let hint_container = document.getElementById("popup-hint-window");
	hint_container.style.setProperty('visibility','unset');

	if (hint_container.dataset.index !== index ) {
		hint_container.children[0].innerHTML = `${index}. ${problem}<br class="long-br"/>${explanation}`;
		hint_container.dataset.index = index 
	} 

	// TODO
	//
	// 3. Make ux pleasurable
	
}

function select_answer(button, index) {
	if ( button.dataset.answer === "true" ) {
		button.parentNode.childNodes[index].classList.add("correct_answer")
		button.parentNode.childNodes[index^1].classList.remove("incorrect_answer")
	}  else {
		button.parentNode.childNodes[index].classList.add("incorrect_answer")
		button.parentNode.childNodes[index^1].classList.remove("correct_answer")
	}
}

/* 왼손잡이 모드 */
function toggle_left_hand_mode(input) {
	let elems = document.getElementsByClassName("eco-list-wrapper");
	if (input.checked === true) {
		Array.from(elems).forEach(e => {
			e.classList.add("eco-list-wrapper-from-right");
		});
	} else {
		Array.from(elems).forEach(e => {
			e.classList.remove("eco-list-wrapper-from-right");
		});
	}
}

/* 한손 모드 */
function toggle_single_hand_mode(input) {
	let button = document.getElementById("toggle_single_hand");
	let elems = document.getElementsByClassName("eco-list-answer");
	if (input.checked === true ) {
		button.classList.add("visible");

		Array.from(elems).forEach(e => {
			e.classList.add("eco-list-answer-right");
			e.classList.remove("eco-list-answer-left");
		});
	} else {
		button.classList.remove("visible");
		Array.from(elems).forEach(e => {
			e.classList.remove("eco-list-answer-right");
			e.classList.remove("eco-list-answer-left");
		});
	}
}

/* 한손 모드 :: 왼손잡이 */
function toggle_single_hand_direction(input) {
	let elems = document.getElementsByClassName("eco-list-answer");
	if (input.checked === false) {
		Array.from(elems).forEach(e => {
			e.classList.add("eco-list-answer-right");
			e.classList.remove("eco-list-answer-left");
		});
	} else {
		Array.from(elems).forEach(e => {
			e.classList.add("eco-list-answer-left");
			e.classList.remove("eco-list-answer-right");
		});
	}
}

// HIde pope up window
function close_pop_up(button) {
	button.parentNode.style.setProperty('visibility','hidden');
}
