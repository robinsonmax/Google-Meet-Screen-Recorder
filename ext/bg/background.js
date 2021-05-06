chrome.browserAction.onClicked.addListener(function(tab) {

  chrome.windows.create({
    url: "/convert/convert.html",
    type: "popup",
    width: 540,
    height: 310
  })

});
