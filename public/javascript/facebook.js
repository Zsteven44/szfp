window.fbAsyncInit = function () {
  FB.init({
    appId: '1027635843994172',
    cookie: true,  // enable cookies to allow the server to access the session
    xfbml: true,  // parse social plugins on this page
    version: 'v2.2' // use version 2.2
  });
};

function logIn() {
  console.log('Running logIn');
  FB.getLoginStatus(function (response) {
    if (response.status === 'connected') {
      checkLoginStatus(response);
    } else {
      FB.login(function (response) {
        checkLoginStatus(response);
      }, {scope: "public_profile"});
    }
  });
}

function checkLoginStatus(response) {
  console.log("checkLoginStatus running now");
  if (response.status === 'connected') {
    console.log("Facebook Response: ", response);
    console.log(response);
    FB.api(
      "/" + response.authResponse.userID,
      function (userObjectResponse) {
        console.log('userObjectResponse running now');
        if (userObjectResponse && !userObjectResponse.error) {
          console.log("User Object ", userObjectResponse);
          FB.api(
            "/" + response.authResponse.userID + "/picture?height=960&width=960&type=square",
            function (pictureObjectResponse) {
              if (pictureObjectResponse && !pictureObjectResponse.error) {
                var photoURL = pictureObjectResponse.data.url;
                var name = userObjectResponse.name;

                $("#loginButton").hide();
                $("#logged").show();
                $("#logged").html(name + "logged in.");
                console.log(name + 'is logged in');


              } else {
                isConnected(false);
              }
            }
          );

        } else {
          isConnected(false);
        }
      }
    );

  } else {
    console.log("Facebook not connected");
    isConnected(false);
  }
};

// Load the SDK asynchronously
(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));