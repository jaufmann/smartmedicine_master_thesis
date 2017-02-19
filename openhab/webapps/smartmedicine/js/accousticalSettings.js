var host = "http://"+window.location.hostname;
var port = "8080";

$(document).ready(function(){
		 $("#divNotificationSoundSelection").hide();
		 setIcons();
		 loadAccousticalSettings();
    	 
         
     })
     
     $('#toggle-event').bootstrapToggle({
	      on: 'An',
	      off: 'Aus'
	 });
 
 
     function mouseOverNot1(x) {
			document.getElementById("aNotification1").style.opacity = 1; 
			$("#tdNameNot1").css("visibility", "visible");
	 }
     function mouseOverNot2(x) {
			document.getElementById("aNotification2").style.opacity = 1; 
			$("#tdNameNot2").css("visibility", "visible");
	 }
     function mouseOverNot3(x) {
			document.getElementById("aNotification3").style.opacity = 1; 
			$("#tdNameNot3").css("visibility", "visible");
	 }
     
     
     function mouseOutNot1(x) {
    	    $("#tdNameNot1").css("visibility", "hidden");
			document.getElementById("aNotification1").style.opacity = 0.3; 
	 }
 	 function mouseOutNot2(x) {
 			$("#tdNameNot2").css("visibility", "hidden");
			document.getElementById("aNotification2").style.opacity = 0.3; 
	 }
 	 function mouseOutNot3(x) {
 			$("#tdNameNot3").css("visibility", "hidden");
			document.getElementById("aNotification3").style.opacity = 0.3; 
	 }
 	 
 	 
    $('#aNotification1').click(function(){
    		localStorage.setItem("playStatus", "OFF");
    		testNotificationSound();
    	 	localStorage.setItem('notificationSound', "notification1");
    		$("#tdNameNot2").css("visibility", "hidden");
    		$("#tdNameNot3").css("visibility", "hidden");
    		
    		$("#tdNameNot1").empty();
		 	$("#tdNameNot1").append("<button id='btnStartNot1' type='button' class='btn btn-primary btn-lg'>Start</button><button id='btnStopNot1' type='button' class='btn btn-primary btn-lg'>Stop</button>");
		 	
		 	$("#btnStopNot1").addClass('disabled');
		 	$("#btnStartNot1").click(function(){
		 		$("#btnStopNot1").removeClass('disabled');
		 		$("#btnStartNot1").addClass('disabled');
		 		localStorage.setItem("playStatus", "ON")
		 		localStorage.setItem('notificationSound', "notification1");
		 		testNotificationSound();
		 	})
		 	
		 	$("#btnStopNot1").click(function(){
		 		$("#btnStartNot1").removeClass('disabled');
		 		$("#btnStopNot1").addClass('disabled');
		 		localStorage.setItem("playStatus", "OFF")
		 		localStorage.setItem('notificationSound', "notification1");
		 		testNotificationSound();
				
		 	})
		 	
		
		 	
		 	
		 	$("#tdNameNot2").empty();
		 	$("#tdNameNot2").append("<font size='4'>Aurora</font>");
		 	
		 	$("#tdNameNot3").empty();
		 	$("#tdNameNot3").append("<font size='4'>Chord</font>");
		
    		
			document.getElementById("aNotification1").style.opacity = 1; 
			document.getElementById("aNotification2").style.opacity = 0.3; 
			document.getElementById("aNotification3").style.opacity = 0.3; 
			$("#aNotification1").empty();
			$("#aNotification1").append("<img src='img/icon-audio.png' width='70' height='80'>");
			
			$("#aNotification2").empty();
			$("#aNotification2").append("<img onmouseover='mouseOverNot2(this)' onmouseout='mouseOutNot2(this)' src='img/icon-audio.png' width='70' height='80'>");
			
			$("#aNotification3").empty();
			$("#aNotification3").append("<img onmouseover='mouseOverNot3(this)' onmouseout='mouseOutNot3(this)' src='img/icon-audio.png' width='70' height='80'>");
    })
    
	    $('#aNotification2').click(function(){
	    	localStorage.setItem("playStatus", "OFF");
	    	testNotificationSound();
		    localStorage.setItem('notificationSound', "notification2");
		 	$("#tdNameNot1").css("visibility", "hidden");
		 	$("#tdNameNot3").css("visibility", "hidden");
		 	
		 	$("#tdNameNot2").empty();
		 	$("#tdNameNot2").append("<button id='btnStartNot2' type='button' class='btn btn-primary btn-lg'>Start</button><button id='btnStopNot2' type='button' class='btn btn-primary btn-lg'>Stop</button>");
		
		 	$("#btnStopNot2").addClass('disabled');
		 	$("#btnStartNot2").click(function(){
		 		$("#btnStopNot2").removeClass('disabled');
		 		$("#btnStartNot2").addClass('disabled');
		 		localStorage.setItem("playStatus", "ON")
		 		localStorage.setItem('notificationSound', "notification2");
		 		testNotificationSound();
		 	})
		 	
		 	$("#btnStopNot2").click(function(){
		 		$("#btnStartNot2").removeClass('disabled');
		 		$("#btnStopNot2").addClass('disabled');
		 		localStorage.setItem("playStatus", "OFF")
		 		localStorage.setItem('notificationSound', "notification2");
		 		testNotificationSound();				
		 	})
		 	
		 	$("#tdNameNot3").empty();
		 	$("#tdNameNot3").append("<font size='4'>Chord</font>");
		 	
		 	$("#tdNameNot1").empty();
		 	$("#tdNameNot1").append("<font size='4'>SMS</font>");
		 	
			document.getElementById("aNotification2").style.opacity = 1; 
			document.getElementById("aNotification3").style.opacity = 0.3; 
			document.getElementById("aNotification1").style.opacity = 0.3; 
			$("#aNotification2").empty();
			$("#aNotification2").append("<img src='img/icon-audio.png' width='70' height='80'>");
			
			$("#aNotification1").empty();
			$("#aNotification1").append("<img onmouseover='mouseOverNot1(this)' onmouseout='mouseOutNot1(this)' src='img/icon-audio.png' width='70' height='80'>");
			
			$("#aNotification3").empty();
			$("#aNotification3").append("<img onmouseover='mouseOverNot3(this)' onmouseout='mouseOutNot3(this)' src='img/icon-audio.png' width='70' height='80'>");
			
	 })
	 
	  $('#aNotification3').click(function(){
		  	localStorage.setItem("playStatus", "OFF");
		  	testNotificationSound();
			document.getElementById("aNotification3").style.opacity = 1; 
			document.getElementById("aNotification2").style.opacity = 0.3; 
			document.getElementById("aNotification1").style.opacity = 0.3; 
			
		    localStorage.setItem('notificationSound', "notification3");
		 	$("#tdNameNot1").css("visibility", "hidden");
		 	$("#tdNameNot2").css("visibility", "hidden");
		 	$("#tdNameNot3").empty();
		 	$("#tdNameNot3").append("<button id='btnStartNot3' type='button' class='btn btn-primary btn-lg'>Start</button><button id='btnStopNot3' type='button' class='btn btn-primary btn-lg'>Stop</button>");
		 	$('#btnStopNot3').addClass('disabled');
		 	
		 	$("#btnStopNot3").addClass('disabled');
		 	$("#btnStartNot3").click(function(){
		 		$("#btnStopNot3").removeClass('disabled');
		 		$("#btnStartNot3").addClass('disabled');
		 		localStorage.setItem("playStatus", "ON")
		 		localStorage.setItem('notificationSound', "notification3");
		 		testNotificationSound();
		 	})
		 	
		 	$("#btnStopNot3").click(function(){
		 		$("#btnStartNot3").removeClass('disabled');
		 		$("#btnStopNot3").addClass('disabled');
		 		localStorage.setItem("playStatus", "OFF")
		 		localStorage.setItem('notificationSound', "notification3");
		 		testNotificationSound();
				
		 	})
		 	
		 	$("#tdNameNot2").empty();
		 	$("#tdNameNot2").append("<font size='4'>Aurora</font>");
		 	
		 	$("#tdNameNot1").empty();
		 	$("#tdNameNot1").append("<font size='4'>SMS</font>");
		 	
			document.getElementById("aNotification3").style.opacity = 1; 
			document.getElementById("aNotification2").style.opacity = 0.3; 
			document.getElementById("aNotification1").style.opacity = 0.3; 
			$("#aNotification3").empty();
			$("#aNotification3").append("<img src='img/icon-audio.png' width='70' height='80'>");
			
			$("#aNotification2").empty();
			$("#aNotification2").append("<img onmouseover='mouseOverNot2(this)' onmouseout='mouseOutNot2(this)' src='img/icon-audio.png' width='70' height='80'>");
			
			$("#aNotification1").empty();
			$("#aNotification1").append("<img  onmouseover='mouseOverNot1(this)' onmouseout='mouseOutNot1(this)' src='img/icon-audio.png' width='70' height='80'>");
	 })
	 
	 
	    var jsonArrayAccousticalSettings = [];
	    var objAccousticalSettings = new Object();
		 
		 $('#toggle-event').change(function() {
			localStorage.setItem("playStatus", "OFF");
			testNotificationSound();
			localStorage.setItem("useSpeaker", $(this).prop('checked'));
		    if($(this).prop('checked')==true){
			  	  $("#divNotificationSoundSelection").show();
		    } else {
			  	  $("#divNotificationSoundSelection").hide();
			} 	
		})
		
		$("#btnSaveAcousticalConfiguration").click(function(){
			localStorage.setItem("playStatus", "OFF");
			testNotificationSound();
			objAccousticalSettings.useSpeaker = localStorage.getItem("useSpeaker");
			objAccousticalSettings.notificationSoundName = localStorage.getItem('notificationSound');
			jsonArrayAccousticalSettings.push(objAccousticalSettings);
			saveAccousticalSettings();
		})
		
		function testNotificationSound() {
		  $.ajax({
			    type:"POST",
			    dataType: 'xml',
			    url: host+':'+port+'/CMD?AccousticalTest='+localStorage.getItem('notificationSound')+'&playStatus='+localStorage.getItem("playStatus")
			});
		};
		
		function loadAccousticalSettings() {
			  $.ajax({
				    dataType: 'json',
				    success: function(data) {
				    	if(data.useSpeaker==true){
				    		$("#divNotificationSoundSelection").show();	
				    		$('#toggle-event').bootstrapToggle('on')
				    		
				    		if(data.notificationSoundName=="notification1"){
				    			$('#aNotification1').click();
				    		} else if(data.notificationSoundName=="notification2"){
				    			$('#aNotification2').click();
				    			
				    		} else if(data.notificationSoundName=="notification3"){
				    			$('#aNotification3').click();
				    			
				    		}
				    	} else {
				    		$("#divNotificationSoundSelection").hide();	
				    		$('#toggle-event').bootstrapToggle('off');
				    		if(data.notificationSoundName=="notification1"){
				    			$('#aNotification1').click();
				    		} else if(data.notificationSoundName=="notification2"){
				    			$('#aNotification2').click();
				    			
				    		} else if(data.notificationSoundName=="notification3"){
				    			$('#aNotification3').click();
				    			
				    		}
				    		
				    	}
				    	
					 },
				    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getNotificationConfiguration'
				});
		};
		$('#btnCloseModal').click(function(){
			window.location = "manageNotification.html";
		})
		
		function setIcons(){
			$('#aNotification1').empty();
			$('#aNotification1').append("<img onmouseover='mouseOverNot1(this)' onmouseout='mouseOutNot1(this)' src='img/icon-audio.png' width='70' height='80'>");
		
			$('#tdNameNot1').empty();
			$('#tdNameNot1').append("<font size='4'>SMS</font>");		
			
			$('#aNotification2').empty();
			$('#aNotification2').append("<img onmouseover='mouseOverNot2(this)' onmouseout='mouseOutNot2(this)' src='img/icon-audio.png' width='70' height='80'>");
			
			$('#tdNameNot2').empty();
			$('#tdNameNot2').append("<font size='4'>Aurora</font>");
			
			$('#aNotification3').empty();
			$('#aNotification3').append("<img onmouseover='mouseOverNot3(this)' onmouseout='mouseOutNot3(this)' src='img/icon-audio.png' width='70' height='80'>");
		
			$('#tdNameNot3').empty();
			$('#tdNameNot3').append("<font size='4'>Chord</font>");
		}
		
		function saveAccousticalSettings() {
		    $.ajax({
		        type: 'POST',
		        contentType: 'application/json',
		        url: host+":"+port+"/smartmedicine/rest/medicineinformation/saveAccousticalSettings",
		        dataType: "json",
		        data: JSON.stringify(jsonArrayAccousticalSettings),
		        success: function(data, textStatus, jqXHR){
		        	$('#btnSaveAccousticalNotification').trigger("click"); 
		        	
		        	setTimeout(function () {
		        		$('#btnCloseModal').trigger("click");
		            }, 2000);
		        },
		        error: function(jqXHR, textStatus, errorThrown){
		            alert('addWine error: ' + textStatus);
		        }
		    });
		}
		
		
		$('#btnManageNotification').click(function(){
			localStorage.setItem("playStatus", "OFF");
			testNotificationSound();
			
			setTimeout(function () {
				window.location = 'manageNotification.html';
		    }, 1000);
			
			
		})
		
		
	  	