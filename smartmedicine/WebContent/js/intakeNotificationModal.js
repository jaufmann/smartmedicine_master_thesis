var i = 0;
var lightState = "";
var medicineNameBox1 = "";
var notificationTriggered = false;
var objMedicineInformation = new Object();
var objTriggeredMedicine = new Object();

var isBox1DispensingTriggered = false;
var isBox2DispensingTriggered = false;
var isBox3DispensingTriggered = false;

var listBoxTriggered = new Array();
var listMedicineDispensed = new Array();

var host = "http://"+window.location.hostname;
var port = "8080";
var arrTriggereredMedicine = [];

	
$(document).ready(function() {	
	setInterval(function(){ 
		getNotificationTriggeredState();
	    console.log(lightState); 
	    
	    if(lightState=="ON" && notificationTriggered==false){
	    		
	    	getTriggeredMedicine();
	    	
	    	showIntakeStatusModal(0);
	    	$("#btnNotificationStatus").click();
	    	notificationTriggered=true;
	    } else if(lightState=="OFF" && notificationTriggered==true){
	    	$('#test').hide(); 
	    	notificationTriggered=false;
	    }
	}, 5000);
});

function showIntakeStatusModal (){
	console.log(arrTriggereredMedicine);
	
	$("#spanMedicineName").empty(); 
	$("#spanNote").empty(); 
	$("#spanIntakeTime").empty(); 
	
	$("#divBtnInformation").empty(); 
	$("#divBtnDispense").empty(); 
	
	var hours = 0;
	var minutes = 0;
	var intakeTime = new Date(arrTriggereredMedicine[0].intakeTime);
	
	if(intakeTime.getHours()<10){
		hours = 0+""+intakeTime.getHours();
	} else {
		hours = intakeTime.getHours();
	}
	
	if(intakeTime.getMinutes()<10){
		minutes = 0+""+intakeTime.getMinutes();
	} else {
		minutes = intakeTime.getMinutes();
	}
	
	
	$("#spanMedicineName").append("<font>"+arrTriggereredMedicine[0].medicineName+"</font>");
	$("#spanNote").append("<font>"+arrTriggereredMedicine[0].note+"</font>");
	$("#spanIntakeTime").append("<font>Einnahme: "+hours+":"+minutes+"</font>");
	
	$("#divBtnInformation").append("<button id='btnNoteInformation' value='"+arrTriggereredMedicine[0].boxID+"' type='button' class='btn btn-primary btn-block'><font>Information</font></button>");
	$("#divBtnDispense").append("<button id='btnDispense' value='"+arrTriggereredMedicine[0].boxID+"|"+arrTriggereredMedicine[0].pillQuantity+"' " +
			" type='button' class='btn btn-success btn-block'><font>Ausgeben</font></button>");
	
	
	$("#btnDispense").click(function(){
		var value = $(this).val();
		var pillQuantity = value.substring(parseInt(value.indexOf("|"))+1, value.length);
		var boxID = value.substring(0, value.indexOf("|"));
		dispenseMedicineBox(boxID);
		setNewQuantity(boxID, pillQuantity);
		setIntakeStatus(arrTriggereredMedicine[0].intakeTimeID);
		
		arrTriggereredMedicine.splice(0, 1);
		
		if(arrTriggereredMedicine!=0){
			setTimeout(
				    function() {
				    	showIntakeStatusModal();
			}, 2000);
		} else {
			$('#test').modal('hide');
		}

		
			


		
		
		/*if(boxID==1){
			setNewQuantity(boxID, pillQuantity);
			dispenseMedicineBox1();
			$(this).prop('disabled', true);
			listMedicineDispensed.push($(this).attr("name"));
			closeModal(listMedicineDispensed);
		}  else if(boxID==2){
			setNewQuantity(boxID, pillQuantity);
			dispenseMedicineBox2();
			$(this).prop('disabled', true);
			listMedicineDispensed.push($(this).attr("name"));
			closeModal(listMedicineDispensed);
		} else if (boxID==3){
			setNewQuantity(boxID, pillQuantity);
			dispenseMedicineBox3();
			$(this).prop('disabled', true);
			listMedicineDispensed.push($(this).attr("name"));
			closeModal(listMedicineDispensed);
		}*/
	})
	
	$("#btnNoteInformation").click(function(){
		if($(this).val()==1) {
			playNote1();
		} 
		
		if ($(this).val()==2){
			playNote2();
		} 
		
		if ($(this).val()==3){
			playNote3();
		} 
	})
	
	
}




function getTriggeredMedicine()
{
    var request = $.ajax
    ({
        type       : "GET",
        async		: false,
        url        : host+":"+port+"/rest/items/arrTriggeredMedicine/state"
    });

    request.done( function(data) 
    { 
    	var triggeredMedicine = JSON.parse(data);
    	var objTriggeredMedicine = new Object();
    	
    	for (var i = 0; i < triggeredMedicine.triggeredMedicine.length; i++) {
    		objTriggeredMedicine = new Object();
    		var intakeTime = new Date(triggeredMedicine.triggeredMedicine[i].intakeTime*1000);
    		objTriggeredMedicine.intakeTime = intakeTime;
    		objTriggeredMedicine.boxID = triggeredMedicine.triggeredMedicine[i].boxID;	
    		objTriggeredMedicine.medicineName = triggeredMedicine.triggeredMedicine[i].medicineName;
    		objTriggeredMedicine.pillQuantity = triggeredMedicine.triggeredMedicine[i].pillQuantity;
    		objTriggeredMedicine.note = triggeredMedicine.triggeredMedicine[i].note;
    		objTriggeredMedicine.intakeTimeID = triggeredMedicine.triggeredMedicine[i].intakeTimeID;
    		arrTriggereredMedicine.push(objTriggeredMedicine);
    	}
    });

    request.fail( function(jqXHR, textStatus ) 
    { 
        console.log( "Failure: " + textStatus );
    }); 
}



/*
function getTriggeredMedicine()
{
    var request = $.ajax
    ({
        type       : "GET",
        url        : host+":"+port+"/rest/items/arrTriggeredMedicine/state"
    });

    request.done( function(data) 
    { 
    	var triggeredMedicine = JSON.parse(data);
    	console.log(data);
    	listMedicineDispensed=[];
    	listBoxTriggered=[];
    	listMedicineIDs = [];
    	var objMedicineIDs = new Object();
    	
    	var hours = 0;
    	var minutes = 0;
    	
    	$("#trMedicineName").empty();
    	$("#trButtonNavigation").empty();
    	$("#trMedicineIcon").empty();
    	$("#trIntakeTime").empty();

    	if(triggeredMedicine.triggeredMedicine.length==1){
    		$('#btnNoteInformationBox2').prop('disabled', true);
    		$('#btnNoteInformationBox3').prop('disabled', true);	
    		
    		$('#dispenseMedicineBox2').prop('disabled', true);
    		$('#dispenseMedicineBox3').prop('disabled', true);	
     		
    	} else if(triggeredMedicine.triggeredMedicine.length==2) {
    		$('#btnNoteInformationBox3').prop('disabled', true);
    		$('#dispenseMedicineBox3').prop('disabled', true);
    	}
    	
    	
    	for (var i = 0; i < triggeredMedicine.triggeredMedicine.length; i++) {
    		var intakeTime = new Date(triggeredMedicine.triggeredMedicine[i].intakeTime*1000);
    		listBoxTriggered.push(triggeredMedicine.triggeredMedicine[i].boxID);
    		objMedicineIDs.medicineID = triggeredMedicine.triggeredMedicine[i].medicineID;
    		objMedicineIDs.boxID = triggeredMedicine.triggeredMedicine[i].boxID;
    		listMedicineIDs.push(objMedicineIDs);
    		
    		$("#trMedicineName").append("" +
    				"<b><font>"+triggeredMedicine.triggeredMedicine[i].medicineName+"</b></font>");
    		
    		$("#trButtonNavigation").append("<td><button type='button' class='btn btn-success btn-lg' id='dispenseMedicineBox"+(i+1)+"' value='"+triggeredMedicine.triggeredMedicine[i].boxID+"|"+triggeredMedicine.triggeredMedicine[i].pillQuantity+"' name="+triggeredMedicine.triggeredMedicine[i].intakeTimeID+">Ausgeben</button>"
           	+	 "<button type='button' class='btn btn-secondary btn-lg'  id='btnNoteInformationBox"+(i+1)+"'  value='"+triggeredMedicine.triggeredMedicine[i].boxID+"'>Info</button></td>");
    		 		
    		$("#trMedicineIcon").append("<td><img width='100' height='100' src='img/pill_blue.png'></td>");
    		
    		$("#note").append("<font>"+triggeredMedicine.triggeredMedicine[i].note+"</font>");
    		
    		if(intakeTime.getHours()<10){
    			hours = 0+""+intakeTime.getHours();
    		} else {
    			hours = intakeTime.getHours();
    		}
    		
    		if(intakeTime.getMinutes()<10){
    			minutes = 0+""+intakeTime.getMinutes();
    		} else {
    			minutes = intakeTime.getMinutes();
    		}
    		
    		$("#trIntakeTime").append("<td><font><b>Einnahme:</b> "+hours+":"+minutes+" Uhr</b></font></td>");
    		
    		$("#dispenseMedicineBox"+(i+1)).click(function(){
    			var value = $(this).val();
    			var pillQuantity = value.substring(parseInt(value.indexOf("|"))+1, value.length);
    			var boxID = value.substring(0, value.indexOf("|"));
    			
    			if(boxID==1){
    				setNewQuantity(boxID, pillQuantity);
    				dispenseMedicineBox1();
    				$(this).prop('disabled', true);
    				listMedicineDispensed.push($(this).attr("name"));
    				closeModal(listMedicineDispensed);
    			}  else if(boxID==2){
    				setNewQuantity(boxID, pillQuantity);
    				dispenseMedicineBox2();
    				$(this).prop('disabled', true);
    				listMedicineDispensed.push($(this).attr("name"));
    				closeModal(listMedicineDispensed);
    			} else if (boxID==3){
    				setNewQuantity(boxID, pillQuantity);
    				dispenseMedicineBox3();
    				$(this).prop('disabled', true);
    				listMedicineDispensed.push($(this).attr("name"));
    				closeModal(listMedicineDispensed);
    			}
    		})

    		$("#btnNoteInformationBox"+(i+1)).click(function(){
    			if($(this).val()==1) {
    				playNote1();
    			} 
    			
    			if ($(this).val()==2){
    				playNote2();
    			} 
    			
    			if ($(this).val()==3){
    				playNote3();
    			}     
    		})
    	}
    	
    	$("#btnNotificationStatus").click();
    	
    });

    request.fail( function(jqXHR, textStatus ) 
    { 
        console.log( "Failure: " + textStatus );
    }); 
}
*/
function closeModal(listMedicineDispensed){
	if(listMedicineDispensed.length==listBoxTriggered.length){
		turnOffNotification();
		
    	setTimeout(function () {
    		$('#btnCloseNotificationModal').click();
        }, 1000);
    	
	
		for(i=0;i<listMedicineDispensed.length;i++){
			localStorage.setItem("intakeTimeID", listMedicineDispensed[i]);
			setIntakeStatus();
		}	
	}
	//
}

	
function playNote1 ( )
{
    var request = $.ajax
    ({
        type       : "GET",
        url        : host+":"+port+"/CMD?playNote1=ON"
    });

    request.done( function(data) 
    { 
    	
    });

    request.fail( function(jqXHR, textStatus ) 
    { 
        console.log( "Failure: " + textStatus );
    });
}

function playNote2 ( )
{
    var request = $.ajax
    ({
        type       : "GET",
        url        : host+":"+port+"/CMD?playNote2=ON"
    });

    request.done( function(data) 
    { 
    	
    });

    request.fail( function(jqXHR, textStatus ) 
    { 
        console.log( "Failure: " + textStatus );
    });
}

function playNote3 ( )
{
    var request = $.ajax
    ({
        type       : "GET",
        url        : host+":"+port+"/CMD?playNote3=ON"
    });

    request.done( function(data) 
    { 
    	
    });

    request.fail( function(jqXHR, textStatus ) 
    { 
        console.log( "Failure: " + textStatus );
    });
}


function dispenseMedicineBox(boxID)
{
    var request = $.ajax
    ({
        type       : "GET",
        url        : host+":"+port+"/CMD?checkMainBoxStatus"+boxID+"=ON"
    });

    request.done( function(data) 
    { 
    	
    });

    request.fail( function(jqXHR, textStatus ) 
    { 
        console.log( "Failure: " + textStatus );
    });
}

function dispenseMedicineBox2( )
{
    var request = $.ajax
    ({
        type       : "GET",
        url        : host+":"+port+"/CMD?checkMainBoxStatus2=ON"
    });

    request.done( function(data) 
    { 
    	
    });

    request.fail( function(jqXHR, textStatus ) 
    { 
        console.log( "Failure: " + textStatus );
    });
}

function dispenseMedicineBox3( )
{
    var request = $.ajax
    ({
        type       : "GET",
        url        : host+":"+port+"/CMD?checkMainBoxStatus3=ON"
    });

    request.done( function(data) 
    { 
    	
    });

    request.fail( function(jqXHR, textStatus ) 
    { 
        console.log( "Failure: " + textStatus );
    });
}

function getMedicineChamberStatus( )
{
    var request = $.ajax
    ({
        type       : "GET",
        url        : host+":"+port+"/CMD?medicineChamberStatus=ON"
    });

    request.done( function(data) 
    { 
    	
    });

    request.fail( function(jqXHR, textStatus ) 
    { 
        console.log( "Failure: " + textStatus );
    });
}

function getNotificationTriggeredState()
{
    var request = $.ajax
    ({
        type       : "GET",
        url        : host+":"+port+"/rest/items/notificationTriggered/state"
    });

    request.done( function(data) 
    { 
    	window.lightState = data;
    	console.log(data);
    });

    request.fail( function(jqXHR, textStatus ) 
    { 
        console.log( "Failure: " + textStatus );
    });
}


function turnOffNotification( )
{
    var request = $.ajax
    ({
        type       : "GET",
        url        : host+":"+port+"/CMD?notificationTriggered=OFF"
    });

    request.done( function(data) 
    { 
    	
    });

    request.fail( function(jqXHR, textStatus ) 
    { 
        console.log( "Failure: " + textStatus );
    });
}


function setNewQuantity(boxID, pillQuantity){
	  $.ajax({
		    dataType: 'json',
		    async:false,
		    success: function(data) {

			   },
		    url: host+':'+port+'/smartmedicine/rest/medicineinformation/setNewStockAmount/'+boxID+'/'+pillQuantity
		});
}

function setIntakeStatus(intakeTimeID){
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {

				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/setIntakeStatus/'+intakeTimeID+'/1'
			});
}
