window.onload = initPage1;
console.log('This is the window location: ' + window.location.href);

function initPage1() {
    if ( window.location.href == 'http://localhost:3000/login' ) {
        console.log("running initpage1");
        $('#username').on('blur', checkUsername);
        $('#password').on('blur', passwordStatus);
        $('#email').on('blur', emailStatus);
        $('#register').prop("disabled", true);
    }
}

function checkUsername() {
    document.getElementById("username").className = "thinking";
    $('#usernameEx').text(' Verifying...');
    $('#usernameEx').removeClass('rejected');
    $('#usernameEx').removeClass('verified');
    $('#usernameEx').addClass('reviewing');
    //get a request object and send it to the server
    request = createRequest();
        if (request == null) {
            alert('Unable to create request');
        } else {
        var theName = document.getElementById('username').value;
        var username = escape(theName);
        //escape cleans the entered text, like spaces and question marks.
        var url = ('/checkName?username=' + username);
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
            console.log(request.responseText);
            $('#usernameEx').text(' Verified');
            $('#usernameEx').removeClass('rejected');
            $('#usernameEx').addClass('verified');
            // if its okay, no error message ot show
            } else {
            $('#usernameEx').text(' Rejected');
            $('#usernameEx').removeClass('verified');
            $('#usernameEx').addClass('rejected');
            document.getElementById('username').className = 'denied';
            console.log(request.responseText);
            }
        }

    }
    checkRegister();
}

function passwordStatus() {
    console.log("Running passwordStatus");
    if ( $('#password').value = null ) {
        $('#passwordEx').text(' Rejected');
        $('#passwordEx').removeClass('verified');
        $('#passwordEx').addClass('rejected');
        $('#registerTooltip').html('<h6>Password requires at least 6 characters.</h6>');
    } else {
        $('#passwordEx').text(' Verified');
        $('#passwordEx').removeClass('rejected');
        $('#passwordEx').addClass('verified');

    }
    checkRegister();

}

function emailStatus() {
    console.log("Running emailStatus");
    if ( $('#email').value = null) {
        $('#emailEx').text(' Rejected');
        $('#emailEx').removeClass('verified');
        $('#emailEx').addClass('rejected');
        $('#registerTooltip').html('<h6>Valid email is required.</h6>');
    } else {
        $('#emailEx').text(' Verified');
        $('#emailEx').removeClass('rejected');
        $('#emailEx').addClass('verified');
    }
    checkRegister();
}

function checkRegister() {
    console.log("Checking register button");
    if ( $('#usernameEx').hasClass('verified') == true ) {
        if ( $('#passwordEx').hasClass('verified') == true ) {
            if ( $('emailEx').hasClass('verified') == true ) {
                $('#register').prop("disabled", false);
                console.log("register is enabled.")
            } else {
                $('#register').prop("disabled", true);
                console.log("register is disabled.")
            }

        } else {
            $('#register').prop("disabled", true);
            console.log("register is disabled.")
        }
    } else {
        $('#register').prop("disabled", true);
        console.log("register is disabled.")
    }

}
