var facebook_login_button;
var facebook_login_button_li;
var facebook_logout_button;
var bft_settingsbutton_li;
var displayModal;
var displayModalTitle;
var displayModalMessage;

$(document).ready(function () {
  console.log("document ready detected");
  facebook_login_button = $("#loginButton2");
  facebook_logout_button = $("#logoutButton");
  console.log(facebook_login_button);

//  facebook_login_button_li = $("#bft_fb_loginbutton_li");
//  bft_settingsbutton_li = $("#bft_settingsbutton_li");
//  displayModal = $("#bft_modal");
//  displayModalTitle = $("#bft_modal_title");
//  displayModalMessage = $("#bft_modal_message");
  facebook_login_button.click(function () {
    logIn();
    console.log('Login detected');
  });

  facebook_logout_button.click(function() {
      logOut();
      console.log('Logout Detected');
  });


});

/**
 *
 * @param connected - boolean, if true, the user is logged in.
 */
function isConnected(connected) {
  console.log("FB Connected");
  /// todo steven make appropriate changes to UI.
  /*if (connected) {
   facebook_login_button_li.show();
   bft_settingsbutton_li.hide();
   } else {
   facebook_login_button_li.hide();
   bft_settingsbutton_li.show();
   }*/
}

function showModal(show, title, message) {
  if (show) {
    displayModal.modal('show');
    setModalTitle(title);
    setModalMessage(message);
  } else {
    displayModal.modal('hide');
  }
}

function setModalTitle(title) {
  displayModalTitle.html(title);
}

function setModalMessage(message) {
  displayModalMessage.html(message);
}
