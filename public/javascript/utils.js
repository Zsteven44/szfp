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

// This function should be able to perform a quick check when fed the appropriate table data.
// Will send back an error if there exists another entry with the same value.
function checkDBExisting(tableName, tableRow, tableValue) {
    connection.query('SELECT * FROM ' + tableName + ' WHERE ' + tableRow + ' = "' + tableValue + '"',
    function (err, result, fields) {
        console.log('result: '+ result.length);

        if (result.length > 0) {
            res.status(200).send("Denied. " + tableName + ", " + tableRow
                + ", " + tableValue + " already exists.");
        } else {
            res.status(200).send("Okay.");
        }
    });

}