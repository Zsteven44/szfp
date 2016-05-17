function createRequest() {
  try {
    request = new XMLHttpRequest();
  } catch (tryMS) {
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (otherMS) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (failed) {
        request = null;
      }
    }
  }
  return request;
}


// This function simply adds an event listener. Make sure the eventName does not include "on".
// Call example: addEventHandler(RegisterButton, "mouseclick", SubmitThis);
function addEventHandler(obj, eventName, handler) {
    if (document.attachEvent) {
        obj.attachEvent("on" + eventName, handler);
    } else if (document.addEventListener) {
        obj.addEventListener(eventName, handler, false);
    }
}