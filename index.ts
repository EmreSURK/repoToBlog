interface Content { 
    name : string
    path : string
    sha : string
    size : string
    url : string
    html_url : string
    git_url : string
    download_url : string
    type : string
}

function repoContent(
    repoLink: string,
    callb : (content : [Content]) => void
) {
    let contentsLink = repoLink + "/contents";
    let req = new XMLHttpRequest();
    req.open("GET", contentsLink);
    req.send();
    req.onloadend = (
        e: Event
    ) => {
        let responseObject: [Content] = JSON.parse(req.responseText);
        callb(responseObject);
    }
};

function renderSingleBlogHTML(content : Content) : string {
    let html = "<div>"
    let title = content.name;
    let subtitle = "";
    title = content.name.split("##")[0]
    subtitle = content.name.split("##")[1];
    html += "<h1>" + title + "</h1>"
    if (undefined != subtitle) {
        html = html + "<h3>" + subtitle + "</h3>"
    }
    html = html + "</div>"
    return html
}

function renderContenHTML(contents: [Content]): string { 
    let html = "<div id='content'>"
    contents.forEach(element => {
        html += renderSingleBlogHTML(element);
    });
    html = html + "</div>"
    return html
}

function repoToBlog (
    repoLink: string,
    htmlElementID : string
){
    const bodyElement = document.getElementById(htmlElementID);
    bodyElement.innerHTML = ""
    bodyElement.innerText = "Yükleniyor."
    repoContent(
        repoLink,
        (contents) => {
            console.log("c : ", contents);
            bodyElement.innerHTML = renderContenHTML(contents)
        }
    );
}
