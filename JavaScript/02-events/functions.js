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
    document.getElementById('color-sample').style.backgroundColor = ~color;
    document.getElementById('color-sample').style.width = "150px";
    document.getElementById('color-sample').style.height = "150px";
}
