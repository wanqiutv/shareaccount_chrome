function click_func() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/shareaccount/accounts/test/cookies", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // JSON.parse does not evaluate the attacker's scripts.
            var cookieArray = JSON.parse(xhr.responseText);
            importCookies(cookieArray);
            console.log("success!");
        }
    }
    xhr.send();
}
function importCookies(cookieArray) {
    for (var i = 0; i < cookieArray.length; i++) {
        var cJSON = cookieArray[i];
        var cookie = cookieForCreationFromFullCookie(cJSON);
        chrome.cookies.set(cookie);
        console.log(i);
    }
}
function cookieForCreationFromFullCookie(fullCookie) {
    var newCookie = {};
    //If no real url is available use: "https://" : "http://" + domain + path
    newCookie.url = "http" + ((fullCookie.secure) ? "s" : "") + "://" + fullCookie.domain + fullCookie.path;
    newCookie.name = fullCookie.name;
    newCookie.value = fullCookie.value;
    if (!fullCookie.hostOnly)
        newCookie.domain = fullCookie.domain;
    newCookie.path = fullCookie.path;
    newCookie.secure = fullCookie.secure;
    newCookie.httpOnly = fullCookie.httpOnly;
    if (!fullCookie.session)
        newCookie.expirationDate = fullCookie.expirationDate;
    newCookie.storeId = fullCookie.storeId;
    return newCookie;
}
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', click_func);
});