// JavaScript source code
function GetWindowSize() {
    let window_width = window.innerWidth;
    let window_height = window.innerHeight;
    document.getElementById("window-size").innerHTML = `Размер окна браузера: ${window_width}x${window_height}`;
}
function GetScreenProperties() {
    let screen_width = window.screen.width;
    let screen_height = window.screen.height;
    document.getElementById("screen-resolution").innerHTML = `${screen_width}x${screen_height}`;
    document.getElementById("screen-available-resolution").innerHTML = `${window.screen.availWidth}x${window.screen.availHeight}`;
    document.getElementById("color-depth").innerHTML = `${window.screen.colorDepth} bit`;
    document.getElementById("pixel-depth").innerHTML = `${window.screen.pixelDepth} bit`;
}
function GetLocation() {
    document.getElementById("bom-href").innerHTML = window.location.href;
    document.getElementById("bom-hostname").innerHTML = window.location.hostname;
    document.getElementById("bom-pathname").innerHTML = window.location.pathname;
    document.getElementById("bom-protocol").innerHTML = window.location.protocol;
    document.getElementById("bom-port").innerHTML = window.location.port;
}
function GoTo() {
    let bom_url
    window.location.assign(document.getElementById("bom-url").value);
}
