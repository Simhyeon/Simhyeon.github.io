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

function init() {
    let dark_mode = get_dark_mode();

    if (!dark_mode) {
        let html = document.getElementsByTagName("html")[0];
        html.classList.add('dark_mode');
    } else {

    }
}
