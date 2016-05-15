window.onload = initPage1;

function initPage1() {
    document.getElementById('username').onblur =
        checkUsername;
    document.getElementById('register').disabled = true;
}

function checkUsername() {
    document.getElementById("username").className = "thinking";


    //get a request object and send it to the server
    request = createRequest();
        if (request == null) {
            alert('Unable to create request');
        } else {
        var theName = document.getElementById('username').value;
        var username = escape(theName);
        //escape cleans the entered text, like spaces and question marks.
        var url = ('checkName.php?username=' + username);
        console.log(url);
        request.onreadystatechange = showUsernameStatus;
        request.open("GET", url, true);
        request.send(null);

        }
}

function showUsernameStatus () {
    console.log('showUsernameStatus running, state: ' + request.readyState + ' and ready status: ' + request.status);
    //Update the page to show whether the username is okay.

    if (request.readyState == 4) {
        if (request.status == 200) {
            console.log(username.value);
            if (request.responseText == 'okay') {
            document.getElementById('username').className = 'approved';
            document.getElementById('register').disabled = false;
            console.log(request.responseText);
            console.log('okay');
            // if its okay, no error message ot show
            } else {
            //if theres a problem, we'll tell the user
            document.getElementById('username').className = 'denied';
            document.getElementById('register').disabled = true;
            //document.getElementById('username').focus();
            //document.getElementById('username').select();


            console.log(request.responseText);
            console.log('denied');
            }
        }

    }
}


