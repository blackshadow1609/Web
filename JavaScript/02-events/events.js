// JavaScript source code
function setImage() {
    let filename = document.getElementById("image-file");

    if (filename.files.length === 0) {
        return; // Ничего не выбрано
    }

    let reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("photo").src = e.target.result;
    }
    reader.readAsDataURL(filename.files[0]);
}

function setBackground() {
    let color_tool = document.getElementById('choose-color');
    let color = color_tool.value;
    document.getElementById('color-sample').style.backgroundColor = color;
    document.getElementById('color-sample').style.width = "200px";
    document.getElementById('color-sample').style.height = "200px";
}

function switchBackground() {
    let delay = document.getElementById("delay").value;

    document.body.style.transition = `color ${delay}s, background ${delay}s`;

    const imgElement = document.getElementById("switch-background");

    if (document.body.classList.contains('white')) {
        document.body.classList.remove('white');
        document.body.classList.add('dark');
        imgElement.src = 'image/sun.png';
    } else {
        document.body.classList.remove('dark');
        document.body.classList.add('white');
        imgElement.src = 'image/moon.png';
    }
}
document.addEventListener
    (
        "mousemove",
        function (event) {
            let x = event.clientX;
            let y = event.clientY;
            document.getElementById("mouse").innerHTML = `X = ${x}, Y = ${y}`;

        }
    );
/*----------------------------------------------------------------------------------------*/
function addLeadingZero(number) {
    return number < 10 ? "0" + number : number;
}
document.body.onload = function tick_timer() {
    let time = new Date();
    document.getElementById("full-time").innerHTML = time;

    document.getElementById("hours").innerHTML = addLeadingZero(time.getHours());
    document.getElementById("minutes").innerHTML = addLeadingZero(time.getMinutes());
    document.getElementById("seconds").innerHTML = addLeadingZero(time.getSeconds());

    document.getElementById("years").innerHTML = addLeadingZero(time.getFullYear());
    document.getElementById("months").innerHTML = addLeadingZero(time.getMonth() +1);
    document.getElementById("days").innerHTML = addLeadingZero(time.getDate());


    document.getElementById("day-of-week").innerHTML = time.toLocaleDateString("ru", { weekday: 'long' });

    document.getElementById('current-date').style.visibility = document.getElementById('show-date').checked ? "visible" : "hidden";
    document.getElementById('day-of-week').style.visibility = document.getElementById('show-weekday').checked ? "visible" : "hidden";

    setTimeout(tick_timer, 100);
}