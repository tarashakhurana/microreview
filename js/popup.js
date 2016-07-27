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

/*function utility() {
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
                            finalString += '<tr> <td> <p style="font-size: 1.4em;">' + arrayList[i].review + '</p> <br/> <div id="datasubscript"> <b> <i>' + arrayList[i].username + " </i> </b> </div> </td> </tr>";
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
*/
$(document).ready(function(){

  /*var acc = localStorage.getItem('Acc');
  acc = JSON.parse(acc);
  if (acc) {
    console.log("directed to testing2.html");
    window.location.href = "testing2.html";
  }
  else {
    $("#contain").css("visibility", "visible");
    console.log("on testing1.html only");
  }*/

$.post("http://localhost/testforextension/public/issession.php", '', function(data) {
            if (!(data == '')) {
                console.log("directed to testing2.html");
                window.location.href = data;
            }
            else {
                $("#contain").css("visibility", "visible");
                console.log("on testing1.html only");
            }
    }, 'text');

  var w = $(document).width();

  var pos = 0;

  $("#login").click(function(form) {
    form.preventDefault();
    var formData = $("#myform3").serialize();
    var destination = "http://localhost/testforextension/public/login.php";
    $.post(destination, formData, function(response) {
        if (response == "Success") {
            $("#contain").css("visibility", "hidden");
             var acc = {
                User : $("#myform3").find("#loginusername").val()
            };
            console.log("Account made while registering - " + acc["User"]);
            acc = JSON.stringify(acc);
            console.log(acc);
            localStorage.setItem('Acc', acc);
            window.location.href="testing2.html";

        }
        else {
            $("#responseTextAgain").html("<p>"+response+"</p>");
        }
    }, 'text');
  });

  $("#register").click(function(form) {
    form.preventDefault();
    var formData = $("#myform2").serialize();
    var destination = "http://localhost/testforextension/public/register.php";
    $.post(destination, formData, function(data) {
        if (data == "Success") {
            $("#contain").css("visibility", "hidden");
            var acc = {
                User : $("#myform2").find("#registerusername").val()
            };
            console.log("Account made while registering - " + acc["User"]);
            acc = JSON.stringify(acc);
            console.log(acc);
            localStorage.setItem('Acc', acc);
            window.location.href="testing2.html";
        }
        else {
            $("#responseText").html("<p>"+data+"</p>");
        }
    }, 'text');
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
