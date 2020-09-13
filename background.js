chrome.contextMenus.onClicked.addListener(function (info) {
    chrome.tabs.create({ "url": "https://github.com/eecs482/" + info.selectionText + "." + info.menuItemId[1] });
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
    chrome.contextMenus.create({"title": "Project Repos", "id": "parent", "contexts": ["selection"]})
    let N_482_PROJECTS = 4;
    for (let i = 0; i <= N_482_PROJECTS; i++) {
        chrome.contextMenus.create({ "title": "p" + i, "id": "p" + i, "parentId": "parent", "contexts": ["selection"]});
    }
});
