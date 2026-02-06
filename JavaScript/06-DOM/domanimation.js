// JavaScript source code
function Move() {
    const elem = document.getElementById("animation");
    let pos = 0;
    let id = setInterval(frame, 5);
    function frame() {
        if (pos == 250) clearInterval(id);
        else {
            pos++;
            elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
        }
    }
}