


function initPage() {
//find thumbnails on page.

thumbs = document.getElementById("thumbnailPane").getElementsByTagName("img");
//set the handler for each img.
for (var i=0; i < thumbs.length; i++) {
    image=thumbs[i];
    //create onclick function
    image.onclick=function() {
        //find the fullsize image name
        detailURL = 'img/' + this.title + '-detail.jpg';
        document.getElementById("itemDetail").src = detailURL;
        getDetails(this.title);
        console.log(this);
        }
    }
}




function getDetails(itemName) {
  request = createRequest();
  if (request == null) {
    alert("Unable to create request");
    return;
  }
  var url= "getDetails.php?ImageID=" + escape(itemName);
  console.log(itemName);
  console.log(request);
  request.open("GET", url, true);
  request.onreadystatechange = displayDetails;
  request.send(null);
}

function displayDetails() {
  if (request.readyState == 4) {
    if (request.status == 200) {
      detailDiv = document.getElementById("description");
      detailDiv.innerHTML = request.responseText;
    }
  }
}


