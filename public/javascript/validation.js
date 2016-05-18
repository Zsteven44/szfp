window.onload = initPage1;
console.log('This is the window location: ' + window.location.href);

function initPage1() {
    if ( window.location.href == 'http://localhost:3000/login' ) {
        console.log("running initpage1");
        $('#username').on('blur', checkUsername);
        $('#password').on('blur', passwordStatus);
        $('#email').on('blur', emailStatus);

        $('#register').click(checkRegister);
    }
}

function checkUsername() {
    $('#usernameEx').text(' Verifying...');
    $('#usernameEx').removeClass('rejected');
    $('#usernameEx').removeClass('verified');
    $('#usernameEx').addClass('reviewing');
    //get a request object and send it to the server
    request = createRequest();
        if (request == null) {
            alert('Unable to create request');
        } else {
        var theName = $('#username').val();
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
            var usernamebox = $('#username');
            var usernameEx = $('#usernameEx');
            var user = usernamebox.val();
            var regtooltip = $('#registerTooltip');

            if (user.length < 4) {
                usernameEx.text('Rejected');
                usernameEx.removeClass('verified');
                usernameEx.removeClass('reviewing');
                usernameEx.addClass('rejected');
                regtooltip.html('<h6>Username must be at least 4 characters.</h6>');

            } else {
                if (request.responseText == 'okay') {

                    console.log(request.responseText);
                    usernameEx.text(' Verified');
                    usernameEx.removeClass('rejected');
                    usernameEx.removeClass('reviewing');
                    usernameEx.addClass('verified');
                    regtooltip.html('<h6>Username is accepted.</h6>');

                    // if its okay, no error message ot show
                } else {
                    usernameEx.text(' Rejected');
                    usernameEx.removeClass('verified');
                    usernameEx.addClass('rejected');
                    usernameEx.addClass('denied');
                    regtooltip.html('<h6>Sorry, this username is already in use.</h6>');

                    console.log(request.responseText);

                }
            }
        }

    }
}

function passwordStatus() {
    var passwordBox = $('#password');
    var password = passwordBox.val();
    var passwordlen = password.length;
    var passwordEx = $('#passwordEx');
    var regtooltip = $('#registerTooltip');
    console.log("Running passwordStatus, value: " + password + ", length: " + passwordlen);
    if ( passwordlen < 6 ) {
        passwordEx.text(' Rejected');
        passwordEx.removeClass('verified');
        passwordEx.addClass('rejected');
        regtooltip.html('<h6>Password requires at least 6 characters.</h6>');
    } else {
        passwordEx.text(' Verified');
        passwordEx.removeClass('rejected');
        passwordEx.addClass('verified');
        regtooltip.html('<h6>Password is accepted.</h6>');

    }
}

function emailStatus() {
    var emailBox = $('#email');
    var email = emailBox.val();
    var emailEx = $('#emailEx');
    var regtooltip = $('#registerTooltip');
    console.log("Running emailStatus");
    if ( $('#email').value = null) {
        emailEx.text(' Rejected');
        emailEx.removeClass('verified');
        emailEx.addClass('rejected');
        regtooltip.html('<h6>Valid email is required.</h6>');
    } else {
        emailEx.text(' Verified');
        emailEx.removeClass('rejected');
        emailEx.addClass('verified');
        regtooltip.html('<h6>Email is accepted.</h6>');
    }
}

function checkRegister() {
    var regtooltip = $('#registerTooltip');
    var usernameEx = $('#usernameEx');
    var passwordEx = $('#passwordEx');
    var emailEx = $('#emailEx');
    regtooltip.html('<h6>Checking registration fields...</h6>');
    if ( usernameEx.hasClass('verified') == true  ) {

            if ( passwordEx.hasClass('verified') == true ) {
                    if (emailEx.hasClass('verified') == true ) {


                    } else {
                    regtooltip.html('<h6>Email entered is invalid.</h6>');
                    }

            } else {
            regtooltip.html('<h6>Password entered is invalid.</h6>');
            }

    } else {
    regtooltip.html('<h6>Username entered is invalid.</h6>');
    }

}

function registerAccount() {
    // do
    var user_name = $('#username').value;
    var password = $('#password').value;
    var name = $('#firstName').value + ' ' + $('#lastName').value;
    var email = $('#email').value;

    $.post("/registerAccount",
        { username: user_name , name: name, password: password, email: email},
        function(data, status){
            alert("Data: " + data + "\nStatus: " + status);
        }
    );
}
