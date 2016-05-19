window.onload = initPage1;
console.log('This is the window location: ' + window.location.href);

function initPage1() {
    if ( window.location.href == 'http://localhost:3000/login' ) {
        console.log("running initpage1");
        // $('#username').change(checkUsername);
        $('#username').on({
            change: checkUsername,
            focus: function () {
                   autoRegisterTooltip('username');
                }
            });
        $('#password').on({
                           change: passwordStatus,
                           focus: function () {
                                  autoRegisterTooltip('password');
                               }
                           });
        $('#email').on({
                        change: checkEmail,
                        focus: function () {
                               autoRegisterTooltip('email');
                            }
                        });
        $('#firstname').on({
                           change: checkFirstName,
                           focus: function () {
                                  autoRegisterTooltip('firstname');
                               }
                           });;
        $('#lastname').on({
                           change: checkLastName,
                           focus: function () {
                                  autoRegisterTooltip('lastname');
                               }
                           });;
        $('#register').click(checkRegister);
    }
}

function autoRegisterTooltip(object) {
    console.log(object);
    var regtooltip = $('#registerTooltip');
    switch (object) {
        case 'username':

            regtooltip.html('<h6>Username must be at least 4 characters.</h6>')
            break;
        case 'password':

            regtooltip.html('<h6>Password must be at least 4 characters.</h6>')
            break;
        case 'firstname':
            regtooltip.html('<h6>First name must be at least 2 characters.</h6>')
            break;
        case 'lastname':
            regtooltip.html('<h6>Last name must be at least 2 characters.</h6>')
            break;
        case 'email':
            regtooltip.html('<h6>Please enter a valid email address.</h6>')
            break;
        default:
            regtooltip.html('<h6>Please fill in all requested information.</h6>');
            console.log('running autoregister tool tip...');
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

function checkFirstName() {
    var nameBox = $('#firstname');
    var name = nameBox.val();
    var nameEx = $('#firstnameEx');
    var regtooltip = $('#registerTooltip');
    if ( name.length > 1 ) {
        nameEx.text('Ok');
        nameEx.removeClass('rejected');
        nameEx.removeClass('verified');
        nameEx.addClass('verified');
        regtooltip.html('<h6>First name acceptable.</h6>');
    } else {
        nameEx.text('Rejected');
        nameEx.removeClass('rejected');
        nameEx.removeClass('verified');
        nameEx.addClass('rejected');
        regtooltip.html('<h6>Please enter your first name.</h6>');
    }
}

function checkLastName() {
    var nameBox = $('#lastname');
    var name = nameBox.val();
    var nameEx = $('#lastnameEx');
    var regtooltip = $('#registerTooltip');
    if ( name.length > 1 ) {
        nameEx.text(' Ok');
        nameEx.removeClass('rejected');
        nameEx.removeClass('verified');
        nameEx.addClass('verified');
        regtooltip.html('<h6>Last name acceptable.</h6>');
    } else {
        nameEx.text(' Rejected');
        nameEx.removeClass('rejected');
        nameEx.removeClass('verified');
        nameEx.addClass('rejected');
        regtooltip.html('<h6>Please enter your last name.</h6>');
    }
}

function checkEmail() {
    var emailBox = $('#email');
    var email = emailBox.val();
    var emailEx = $('#emailEx');
    var regtooltip = $('#registerTooltip');
    emailEx.text(' Verifying...');
    emailEx.removeClass('rejected');
    emailEx.removeClass('verified');
    emailEx.addClass('reviewing');

    //get a request object and send it to the server
    if (email == null || email.indexOf("@") < 0) {
        emailEx.text('Rejected');
        emailEx.removeClass('verified');
        emailEx.removeClass('reviewing');
        emailEx.addClass('rejected');
        regtooltip.html('<h6>Email is invalid.</h6>');
        console.log("The email supplied is invalid. @'s: " + email.indexOf("@"));
    } else {
        request = createRequest();
        if (request == null) {
            alert('Unable to create request');
        } else {
            var theName = email;
            var username = escape(theName);
            //escape cleans the entered text, like spaces and question marks.
            var url = ('/checkEmail?email=' + email);
            console.log(url);
            request.onreadystatechange = emailStatus;
            request.open("GET", url, true);
            request.send(null);
        }
    }
}

function emailStatus() {
    if (request.readyState == 4) {
            if (request.status == 200) {
                console.log(username.value);
                var emailBox = $('#email');
                var email = emailBox.val();
                var emailEx = $('#emailEx');
                var regtooltip = $('#registerTooltip');

                if (email.length < 4) {
                    emailEx.text('Rejected');
                    emailEx.removeClass('verified');
                    emailEx.removeClass('reviewing');
                    emailEx.addClass('rejected');
                    regtooltip.html('<h6>Email must be at least 4 characters.</h6>');

                } else {
                    if (request.responseText == 'okay') {

                        console.log(request.responseText);
                        emailEx.text(' Verified');
                        emailEx.removeClass('rejected');
                        emailEx.removeClass('reviewing');
                        emailEx.addClass('verified');
                        regtooltip.html('<h6>Email is accepted.</h6>');

                        // if its okay, no error message ot show
                    } else {
                        usernameEx.text(' Rejected');
                        usernameEx.removeClass('verified');
                        usernameEx.addClass('rejected');
                        usernameEx.addClass('denied');
                        regtooltip.html('<h6>Sorry, this email is already in use.</h6>');

                    }
                }
            }

        }
}

function checkRegister() {
    var regtooltip = $('#registerTooltip');
    var usernameEx = $('#usernameEx');
    var passwordEx = $('#passwordEx');
    var emailEx = $('#emailEx');
    var fnameEx = $('#firstnameEx');
    var lnameEx = $('#lastnameEx');

    regtooltip.html('<h6>Checking registration fields...</h6>');
    if ( usernameEx.hasClass('verified') == true  ) {

            if ( passwordEx.hasClass('verified') == true ) {
                    if (fnameEx.hasClass('verified') == true) {
                        if (lnameEx.hasClass('verified') == true) {
                            if (emailEx.hasClass('verified') == true ) {
                                registerAccount();
                            } else {
                                regtooltip.html('<h6>Email entered is invalid.</h6>');
                            }
                        } else {
                            regtooltip.html('<h6>Last name entered is invalid.</h6>');
                        }

                    } else {
                        regtooltip.html('<h6>First name entered is invalid.</h6>');
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
    var fname = $('#firstname').value
    var lname = $('#lastname').value;
    var email = $('#email').value;

    $.post("/registerAccount",
        { username: user_name , fname: fname, lname: lname, password: password, email: email},
        function(data, status){
            alert("Data: " + data + "\nStatus: " + status);

        }
    );
}



function siteLogin(){

}