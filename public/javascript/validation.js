window.onload = initPage1;
console.log('This is the window location: ' + window.location.href);

// REGISTRATION SIDE


function initPage1() {
    if ( $('#register') ) {
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
        });
        $('#lastname').on({
                           change: checkLastName,
                           focus: function () {
                                  autoRegisterTooltip('lastname');
                               }
        });
        $('#register').click(checkRegister);
        $('#siteLogin').click(siteLogin);
        console.log('registration button recognized.');
    } else if ($('#nav-logout-button')) {
        $('#nav-logout-button').click(siteLogout);
        console.log('logout button recognized.');
    }


}

function autoRegisterTooltip(object) {
    var regtooltip = $('#registerTooltip');
    switch (object) {
        case 'username':

            regtooltip.html('<h6>Username must be at least 4 characters.</h6>')
            break;
        case 'password':

            regtooltip.html('<h6>Password must be at least 6 characters.</h6>')
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
    //Update the page to show whether the username is okay.

    if (request.readyState == 4) {
        if (request.status == 200) {
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

                    usernameEx.text(' Verified');
                    usernameEx.removeClass('rejected');
                    usernameEx.removeClass('reviewing');
                    usernameEx.addClass('verified');
                    regtooltip.html('<h6>Username is accepted.</h6>');

                    // if its okay, no error message ot show
                } else {
                    usernameEx.text(' Rejected');
                    usernameEx.removeClass('verified');
                    usernameEx.removeClass('reviewing');
                    usernameEx.addClass('rejected');
                    regtooltip.html('<h6>Sorry, this username is already in use.</h6>');

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
        passwordEx.removeClass('reviewing');
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
            var theEmail= email;
            var Email = escape(theEmail);
            //escape cleans the entered text, like spaces and question marks.
            var url = ('/checkEmail?email=' + Email);
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
                        emailEx.text(' Verified');
                        emailEx.removeClass('rejected');
                        emailEx.removeClass('reviewing');
                        emailEx.addClass('verified');
                        regtooltip.html('<h6>Email is accepted.</h6>');

                        // if its okay, no error message ot show
                    } else {
                        emailEx.text(' Rejected');
                        emailEx.removeClass('verified');
                        emailEx.removeClass('reviewing');
                        emailEx.addClass('rejected');
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
    var user_name = $('#username').val();
    var password = $('#password').val();
    var fname = $('#firstname').val();
    var lname = $('#lastname').val();
    var email = $('#email').val();

    regtooltip.html('<h6>Checking registration fields...</h6>');
    if ( usernameEx.hasClass('verified') == true  ) {

            if ( passwordEx.hasClass('verified') == true ) {
                    if (fnameEx.hasClass('verified') == true) {
                        if (lnameEx.hasClass('verified') == true) {
                            if (emailEx.hasClass('verified') == true ) {
                                registerAccount(user_name, password, fname, lname, email);
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

function registerAccount(user_name, password, fname, lname, email) {

    $.post("/registerAccount",
        { username: user_name , fname: fname, lname: lname, password: password, email: email},
        function(data, status){
            alert("Data: " + data + "\nStatus: " + status);
            window.location = '/registering';
        }

    );
    console.log("username: " + user_name + ".  Email: " + email +
                    ". Full name: " + fname + " " + lname);


}

// LOGIN/LOGOUT SIDE

function siteLogin() {
   var username = $('#usernameLogin').val();
   var password = $('#passwordLogin').val();
   var tooltip = $('loginTooltip');
   var data = {username: username, password: password};
   $.ajax({
        url: "/sitelogin",
        type: "get",
        data: data,
        complete: function (response, textStatus, jqXHR){
            // Log a message to the console
            console.log(response);
            console.log(response.responseText);
            console.log(textStatus);

            if (response.responseText == 'denied') {
                console.log('denied');
                var logtooltip = $('#loginTooltip');
                logtooltip.html('<h6>The username/password entered are incorrect.</h6>');
            } else if (response.responseText == 'okay') {
                console.log('okay');
                window.location = '/';


            }
        }
    });
};

function siteLogout() {
    var data;
    $.ajax({
        url:"/sitelogout",
        type:"get",
        data:data,
        complete:function (response, textStatus, jqXHR) {
            if (response.responseText = 'okay') {
                window.location = '/';
            } else {
                console.log('There was an error with the res.status.')
            }


        }

    });
}