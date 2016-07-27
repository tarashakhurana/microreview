function getCurrentTabUrl(callback) {

  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.log(url);
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

function utility(j) {
    var acc = localStorage.getItem('Acc');
    acc = JSON.parse(acc);
    if (acc) {
        console.log("User is logged in");
        var delUser = acc.User;
    }
    else {
        console.log("User is not logged in");
    }

    getCurrentTabUrl(function(activeUrl) {
            $.ajax({
                url : 'http://localhost/testforextension/public/reviews.php',
                data : {
                    url : activeUrl
                },
                error : function () {
                    $("#id01").html('<p>An error has occurred.</p>');
                    console.log("Fail");
                },
                dataType : 'json',
                crossDomain : true,
                success : function (data) {
                    var stringed = JSON.stringify(data);
                    var arrayList = JSON.parse(stringed);
                    if (arrayList.length == 0) {
                        var finalString = '<div style="height: 100px;"></div> <p style="font-size: 1.6em; color: rgb(220, 220, 220); text-align: center;"> No review to display. </p>';
                    }
                    else {
                        var finalString ='<table> <tbody>';
                        for (var i = 0; i < arrayList.length; i++) {
                            console.log("delUser is " + delUser + " and username is " + arrayList[i].username);
                            if (delUser == arrayList[i].username){
                                finalString += '<tr> <td> <a class="superscript" id="mouse-click">x  </a> <p style="font-size: 1.4em;">' + arrayList[i].review + '</p> <br/> <div id="datasubscript"> <b> <i>' + arrayList[i].username + " </i> </b> </div> </td> </tr>";
                                j++;
                            }
                            else {
                                finalString += '<tr> <td> <p style="font-size: 1.4em;">' + arrayList[i].review + '</p> <br/> <div id="datasubscript"> <b> <i>' + arrayList[i].username + " </i> </b> </div> </td> </tr>";
                            }
                        }
                        finalString += "</tbody></table>";
                    }
                    $("#mytable").html(finalString);
                    console.log(arrayList[0]);
                },
                type : "GET"
            });
        });
}

$(function(){
  var w = $(document).width();
  var j = 0;
  utility(j);
  // chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  //      utility();
  //});
  var pos = 0;

  $("#addReview").click(function(form){
    form.preventDefault();
    var formData = $("#myForm1").serialize();
    var destination = "http://localhost/testforextension/public/sendreview.php";
    $.post(destination, formData, function(data) {
        if (data == "Success") {
            window.location.href="testing2.html";
        }
        else {
            $("#response").html("<p>"+data+"</p>");
        }
        //console.log(data);
    }, 'text');
  });

  $("#logout").click(function(event){
    event.preventDefault();
    var sendData ='';
    var destination = "http://localhost/testforextension/public/logout.php";
    $.post(destination, sendData, function(data) {
        $("#contain").css("visibility", "visible");
        localStorage.removeItem('Acc');
        window.location.href="testing1.html";

    }, 'text');
  });

  $("#mytable").on("click", ".superscript", function(event) {
    console.log("click detected");
    var sendData = $(this).parent().find("p").text();
    getCurrentTabUrl(function(activeUrl) {
        var arrayList = {
            review : sendData,
            url : activeUrl
        };
        console.log(arrayList);
        var destination = "http://localhost/testforextension/public/delete.php";
        $.post(destination, arrayList, function(response) {
            if (response == "Success") {
                console.log(activeUrl);
                window.location.href="testing2.html";
            }
            else {
                console.log("An error occurred. Could not delete your review." + response);
            }
        }, 'text');

    });
  });

  getCurrentTabUrl(function(activeUrl) {
    document.getElementById('myForm1').elements["url"].value = activeUrl;
  });



  $(document).keydown(function(event){
    switch(event.which) {
        case 39:
            pos--;
            if ( pos <= 0 && pos >= -2 ) {
                $('.Slides').animate({ left: (pos * w) + 'px' });
            }
            else {
                pos++;
            }
            break;

        case 37:
            pos++;
            if ( pos <= 0 && pos >= -2 ) {
                $('.Slides').animate({ left: (pos * w) + 'px' });
            }
            else {
                pos--;
            }
            break;
    }

  });
});
