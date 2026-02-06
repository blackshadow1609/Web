// JavaScript source code

document.title = "DOM";
/*document.head.getElementsByTagName('title')[0].textContent = "DOM";*/

let header1 = document.createElement("h1")
header1.innerHTML = "Document Object Model";
document.body.prepend(header1);
/*document.body.bgColor = "#A7F3D0";*/
document.body.style.background = "#F0F8FF url('image/fone_site.jpg') no-repeat center center fixed";
document.body.style.backgroundSize = "cover";

//Важно!
//bgColor - устаревшее свойство.Рекомендуется использовать современный способ:
//document.body.style.background =
//document.body.style.backgroundColor =


let children = document.body.children;

console.log(children);

children[0].innerHTML = "Объектная модель документа";
console.log(children[0].outerHTML);
/*children[0].outerHTML = "<h2>DOM</h2>";*/

console.log(document.body.outerHTML);
let paragraphs = document.getElementsByTagName("p");
console.log(paragraphs.length);
let statistics = document.createElement("div");
statistics.innerHTML = `Количество абзацев: ${paragraphs.length}; Количество заголовков:${document.getElementsByTagName("h2").length}; Количество картинок:${document.getElementsByTagName("img").length}`;
document.body.prepend(statistics);
