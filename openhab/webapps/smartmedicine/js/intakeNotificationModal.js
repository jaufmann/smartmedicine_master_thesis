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

var host = "http://192.168.0.101";//+window.location.hostname;
var port = "8080";

	
$(document).ready(function() {	
	setInterval(function(){ 
		getNotificationTriggeredState();
	    console.log(lightState); 
	    if(lightState=="ON" && notificationTriggered==false){
	    	
	    	
	    	getTriggeredMedicine();
	    	notificationTriggered=true;
	    } else if(lightState=="OFF" && notificationTriggered==true){
	    	$('#btnCloseNotificationModal').click(); 
	    	notificationTriggered=false;
	    }
	}, 5000);
	
});


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
    	listMedicineDispensed=[];
    	listBoxTriggered=[];
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
    		$("#trMedicineName").append("" +
    				"<td><b><font>"+triggeredMedicine.triggeredMedicine[i].medicineName+"</b></font></td>");
    		
    		$("#trButtonNavigation").append("<td><button type='button' class='btn btn-success btn-lg' id='dispenseMedicineBox"+(i+1)+"' value='"+triggeredMedicine.triggeredMedicine[i].boxID+"' name="+triggeredMedicine.triggeredMedicine[i].intakeTimeID+">Ausgeben</button>"
           	+	 "<button type='button' class='btn btn-secondary btn-lg'  id='btnNoteInformationBox"+(i+1)+"'  value='"+triggeredMedicine.triggeredMedicine[i].boxID+"'>Info</button></td>");
    		 		
    		$("#trMedicineIcon").append("<td><img width='100' height='100' src='img/pill_blue.png'></td>");
    		
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
    		
    		$("#trIntakeTime").append("<td><b>Einnahme:</b> "+hours+":"+minutes+" Uhr</b></td>");
    		
    		
    		$("#dispenseMedicineBox"+(i+1)).click(function(){
    			if($(this).val()==1) {
    				dispenseMedicineBox1();
    				$(this).prop('disabled', true);
    				listMedicineDispensed.push($(this).attr("name"));
    				closeModal(listMedicineDispensed);
    			} else if($(this).val()==2){
    				dispenseMedicineBox2();
    				$(this).prop('disabled', true);
    				listMedicineDispensed.push($(this).attr("name"));
    				closeModal(listMedicineDispensed);
    			} else if ($(this).val()==3){
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


function dispenseMedicineBox1( )
{
    var request = $.ajax
    ({
        type       : "GET",
        url        : host+":"+port+"/CMD?checkMainBoxStatus1=ON"
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


function setIntakeStatus(){
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {

				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/setIntakeStatus/'+localStorage.getItem("intakeTimeID")+'/1'
			});
}
