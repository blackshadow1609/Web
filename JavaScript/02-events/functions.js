// JavaScript source code
function setImage() {
    let filename = document.getElementById("image-file");
    let reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("photo").src = e.target.result;
    }
    reader.readAsDataURL(filename.files[0]);
}
function setBackground() {
    let color_tool = document.getElementById('choose-color');
    let color = color_tool.value;
    //document.body.style.backgroundImage = null;
    //document.body.style.backgroundColor = color;
    document.getElementById('color-sample').style.backgroundColor = color;
    document.getElementById('color-sample').style.width = "200px";
    document.getElementById('color-sample').style.height = "200px";
}
function switchBackground() {
    const imgElement = document.getElementById("switch-background");
    const currentFile = imgElement.src.split('/').pop();

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


