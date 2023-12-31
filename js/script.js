const player = document.querySelector("#name");
const btnSubmit = document.querySelector("#btnSubmit");

player.value = localStorage.getItem('player');

player.addEventListener("input", (event) => {
    const inputValue = event.target.value.trim();
    if (/\S/.test(inputValue) && event.target.value.length > 2) {
        btnSubmit.removeAttribute("disabled");
    } else {
        btnSubmit.setAttribute('disabled', '');
    }
});

btnSubmit.addEventListener('click', (event) => {
    if (!btnSubmit.disabled) {
        event.preventDefault();
        window.location.href = 'page/game.html';
        localStorage.setItem('player', player.value);
    }
});