let CODES = {
    0: "0".charCodeAt(0),
    9: "9".charCodeAt(0),
    "a": "a".charCodeAt(0),
    "z": "z".charCodeAt(0),
    isLowerAlpha: function(str) {
        for (let i = 0; i < str.length; i++) {
            if (!(str.charCodeAt(i) >= CODES.a && str.charCodeAt(i) <= CODES.z)) {
                return false;
            }
        }
        return true;
    },
    isNumeric: function(str) {
        for (let i = 0; i < str.length; i++) {
            if (!(str.charCodeAt(i) >= CODES[0] && str.charCodeAt(i) <= CODES[9])) {
                return false;
            }
        }
        return true;
    }
}
let users_json = {};
(async function() { users_json = await(fetch(chrome.runtime.getURL('data/users.json')).then((response) => response.json())); })();
console.log(users_json["krishi"]);



chrome.contextMenus.onClicked.addListener(function (info) {
    let infoStr = String(info.selectionText).trim();

    if (info.menuItemId === "piazza") {
        if (CODES.isNumeric(infoStr)) {
            chrome.tabs.create({ "url": "https://piazza.com/class/kdcju7ogpl21lq?cid=" + infoStr });
        } else {
            console.error("Cannot open a piazza post with a non-numeric cid");
        }
    }
    else if (info.menuItemId[0] === "p") {
        if (CODES.isLowerAlpha(infoStr) && infoStr.length >= 3 && infoStr.length <= 8) {
            let url = "https://github.com/eecs482/";
            if (info.menuItemId[1] == "1") {
                chrome.tabs.create({ "url": url + infoStr + ".1" });
            } else {
                if (infoStr in users_json) {
                    chrome.tabs.create({ "url": url + users_json[infoStr].join(".") + "." + info.menuItemId[1] });
                } else {
                    chrome.tabs.create({ "url": url + infoStr + "." + info.menuItemId[1] });
                }
            }
        } else {
            console.error("Cannot open a repo for an invalid uniqname");
        }
    }
});

// See https://its.umich.edu/accounts-access/getting-access/uniqnames-accounts/changing-your-uniqname
// TODO: Do not present context menus when a string not representing a uniqname is selected
// function canRepresentUniqname(selection) {
//     let selectionAsString = String(selection)
//     if (selectionAsString.length < 3 || selectionAsString.length > 8) return false;
//     if (selectionAsString !== selectionAsString.toLowerCase()) return false;
//     for (let i = 0; i < selectionAsString.length; i++) {
//         if (!selectionAsString.charAt(i).toLowerCase().match(/[a-z]/)) return false;
//     }
// }

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function () {
    // chrome.contextMenus.create({"title": "Project Repos", "id": "parent", "contexts": ["selection"]})
    chrome.contextMenus.create({"title": "Piazza", "id": "piazza", "contexts": ["selection"]})
    let N_482_PROJECTS = 4;
    for (let i = 0; i <= N_482_PROJECTS; i++) {
        chrome.contextMenus.create({ "title": "p" + i, "id": "p" + i, "contexts": ["selection"]});
    }
});
