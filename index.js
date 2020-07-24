function repoContent(repoLink, callb) {
    var contentsLink = repoLink + "/contents";
    var req = new XMLHttpRequest();
    req.open("GET", contentsLink);
    req.send();
    req.onloadend = function (e) {
        var responseObject = JSON.parse(req.responseText);
        callb(responseObject);
    };
}
;
function renderSingleBlogHTML(content) {
    var html = "<div>";
    var title = content.name;
    var subtitle = "";
    title = content.name.split("##")[0];
    subtitle = content.name.split("##")[1];
    html += "<h1>" + title + "</h1>";
    if (undefined != subtitle) {
        html = html + "<h3>" + subtitle + "</h3>";
    }
    html = html + "</div>";
    return html;
}
function renderContenHTML(contents) {
    var html = "<div id='content'>";
    contents.forEach(function (element) {
        html += renderSingleBlogHTML(element);
    });
    html = html + "</div>";
    return html;
}
function repoToBlog(repoLink, htmlElementID) {
    var bodyElement = document.getElementById(htmlElementID);
    bodyElement.innerHTML = "";
    bodyElement.innerText = "Yükleniyor.";
    repoContent(repoLink, function (contents) {
        console.log("c : ", contents);
        bodyElement.innerHTML = renderContenHTML(contents);
    });
}
