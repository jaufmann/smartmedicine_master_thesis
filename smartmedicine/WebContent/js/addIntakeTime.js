/**
 * 
 */


$(function(){	
	var clickedInterval = "";
	var objTime = new Object();
	var objIntakeTime = null;
	var arrObjIntakeTime = null;
	var objMedicineInformation = new Object();
	var arrayObjectMedicineInformation = [];
	var jsonObjMedicineInformation = "";
	
	var objEditedIntakeTime = new Object();
	var objCompleteEditIntakeTime = new Object(); 
	var arrayEditedIntakeTime = [];
	

	$(document).ready(function(){	
		console.log(localStorage.getItem('destination'));
		
		if(localStorage.getItem('destination')=="editIntakeTime"){
			var newObjIntakeTime = getIntakeTimeByIntakeTimeID(localStorage.getItem("intakeTimeID"));
			var date = new Date();	
			
			date.setTime(newObjIntakeTime.intakeTime*1000);

			
			var time = date.getHours()+":"+date.getMinutes();
			var day = ("0" + date.getDate()).slice(-2);
			var month = ("0" + (date.getMonth() + 1)).slice(-2);
			var dateTime = date.getFullYear()+"-"+(month)+"-"+(day);
			
            localStorage.setItem("startDate", dateTime);
			localStorage.setItem("alarm", time);
			localStorage.setItem("intakeTime", newObjIntakeTime.intakeTime);
			
			$('#tblNavigation').empty();
			$("<tr><td align='left' ><button id='btnBackToEditIntakeTimeOverview' class='btn btn-primary'><font class='white'>zurück</font></button></td>" +
			 "<td align='right'><button id='btnSaveIntakeTime' class='btn btn-success'><font class='white'>speichern</font></button></td>").appendTo("table[id='tblNavigation']");
			$('#btnBackToEditIntakeTimeOverview').click(function(){
			       $('#divContainer').load('editIntakeTime.html');
			})
			
			
			$('#btnSaveIntakeTime').click(function(){
		
					var iteration = $('#txtIteration').val();
					var selectedDate = new Date($('#txtStartDate').val());
					var selectedTime = $('#alarm').val();
					var arrIntakeTimes = [];
					var hours = "";
					var minutes = "";
					var convertedTime= convertTo24Hour(selectedTime);
					arrObjIntakeTime = [];
					

				
					if(convertedTime.length>5){
						hours = convertedTime.substring(0,2);
						minutes = convertedTime.substring(3, convertedTime.length);
					} else {
						hours = convertedTime.substring(0,1);
						minutes = convertedTime.substring(2, convertedTime.length);
					}
					
					
					selectedDate.setHours(hours);
					selectedDate.setMinutes(minutes);
					console.log("convertedTime"+convertedTime);
					console.log("houers"+hours);
					console.log("minutes"+minutes);
					
					if(clickedInterval=="weekly"){
						for(var i=0;i<iteration;i++){
							arrIntakeTimes.push((selectedDate.getTime()/1000)+((i+1)*604800));
						}	
					} else if(clickedInterval=="monthly"){
						for(var i=0;i<iteration;i++){
							arrIntakeTimes.push((selectedDate.getTime()/1000)+((i+1)*2629743));
						}
					} else if(clickedInterval=="daily"){
						for(var i=0;i<iteration;i++){
							arrIntakeTimes.push((selectedDate.getTime()/1000)+((i+1)*86400));
						}
					} else {
						arrIntakeTimes.push((selectedDate.getTime()/1000));
					}
					objIntakeTime = new Object();
					
					if(localStorage.getItem("destination")=="addItem"){
						objIntakeTime.medicineID=getLastMedicineID()+1;
						saveMedicineInformation();
					} else {
						objIntakeTime.medicineID=localStorage.getItem('medicineID');
					}
					
					objIntakeTime.intakeTime=arrIntakeTimes;
			
				    jsonObjectIntakeTime = JSON.stringify(objIntakeTime);		
				    arrObjIntakeTime.push(jsonObjectIntakeTime);
				    
				  
				    	objEditedIntakeTime.medicineID=localStorage.getItem("medicineID");
				    	
				    	
				    	if(isNaN(selectedDate.getTime())){
				    		objEditedIntakeTime.intakeTime = localStorage.getItem("intakeTime");
				    		

				    	} else {
				    		objEditedIntakeTime.intakeTime = (selectedDate.getTime())/1000;
				    	}
				    	
				    	objEditedIntakeTime.intakeTimeID = localStorage.getItem('intakeTimeID');
				    	arrayEditedIntakeTime.push(objEditedIntakeTime);
				    	editIntakeTime();
				    
				})
			
		}
		
		
		if(localStorage.getItem("iteration")!=null){
			$('#txtIteration').val(localStorage.getItem("iteration"));
		}  
		
		if(localStorage.getItem("startDate")!=null){
			$('#txtStartDate').val(localStorage.getItem("startDate"));
		} else {
			setDateInput();
		} 
		
		if(localStorage.getItem("alarm")!=null){
			setTimeInput();
			$('#alarm').val(localStorage.getItem("alarm"));
		} else {
			setTimeInput();
		}
		
		$('#txtIteration').attr('disabled', true);
		if(localStorage.getItem("destination")=="addItem"){
			
			$('#tblHeaderOverview').empty();
			
			$('#tdBackAddIntakeTime').empty();
			$("<button id='btnBackToAddMedicine' class='btn btn-primary'><font class='white'>zurück</font></button>").appendTo("td[id='tdBackAddIntakeTime']");
			
			
			$('#btnBackToAddMedicine').click(function(){
			       $('#divContainer').load('addMedicine2.html');
					localStorage.setItem("iteration", $('#txtIteration').val());
					localStorage.setItem("startDate", $('#txtStartDate').val());
					localStorage.setItem("alarm", $('#alarm').val());
			})			
			
    		$("<tr><td><img class='transparent' src='img/pills-blue.png'><font class='transparent'><b>Allgemein</b></font></h4></td>" +
    		 " <td><img class='transparent'  src='img/Information_icon.png'><font class='transparent'><b>Zeitpunkt</b></font></td>" +
    		 " <td><img src='img/clock.png'><font ><b>Zeitpunkt</b></font></h4></td></tr>").appendTo("table[id='tblHeaderOverview']");

		} else if("addIntakeTime"){
			$('#tdBackAddIntakeTime').empty();
			$("<button id='btnBackToIntakeTimeOverview' class='btn btn-primary'><font class='white'>zurück</font></button>").appendTo("td[id='tdBackAddIntakeTime']");
			$('#btnBackToIntakeTimeOverview').click(function(){
			       $('#divContainer').load('addIntakeTimeOverview.html');
			})				
		}
	})
	
	
	$('#btnDaily').click(function(){
		clickedInterval = "daily";
		$('#txtIteration').attr('disabled', false);
	})
	
	$('#btnWeekly').click(function(){
		clickedInterval = "weekly";
		$('#txtIteration').attr('disabled', false);
	})
	
	$('#btnMonthly').click(function(){
		clickedInterval = "monthly";
		$('#txtIteration').attr('disabled', false);
	})
	
	$('#btnNoInterval').click(function(){
		clickedInterval = "none";
		$('#txtIteration').attr('disabled', true);
	})
	
	
	function convertTo24Hour(time) {
	    var hours = parseInt(time.substr(0, 2));
	    if(time.indexOf('am') != -1 && hours == 12) {
	        time = time.replace('12', '0');
	    }
	    if(time.indexOf('pm')  != -1 && hours < 12) {
	        time = time.replace(hours, (hours + 12));
	    }
	    return time.replace(/(am|pm)/, '');
	}
	
	
	function setTimeInput(){
		$( "#alarm" ).timeDropper();
		 var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', 'UA-36251023-1']);
		  _gaq.push(['_setDomainName', 'jqueryscript.net']);
		  _gaq.push(['_trackPageview']);
		
		  (function() {
		    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();
	}
	
	function setDateInput(){
		var now = new Date();
		var day = ("0" + now.getDate()).slice(-2);
		var month = ("0" + (now.getMonth() + 1)).slice(-2);
		var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
	
		console.log(today);
		$('#txtStartDate').val(today);
	}
	
	function parseToMYSQLDate(date){
		var date;
		date = new Date();
		date = date.getUTCFullYear() + '-' +
		    ('00' + (date.getMonth()+1)).slice(-2) + '-' +
		    ('00' + date.getDate()).slice(-2) + ' ' + 
		    ('00' + date.getHours()).slice(-2) + ':' + 
		    ('00' + date.getMinutes()).slice(-2) + ':' + 
		    ('00' + date.getSeconds()).slice(-2);
		
		return date;
	}

	$('#btnSaveIntakeTime').click(function(){
		
		var iteration = $('#txtIteration').val();
		var selectedDate = new Date($('#txtStartDate').val());
		var selectedTime = $('#alarm').val();
		
		var arrIntakeTimes = [];
		var hours = "";
		var minutes = "";
		var convertedTime= convertTo24Hour(selectedTime);
		arrObjIntakeTime = [];
	
		if(convertedTime.length>5){
			hours = convertedTime.substring(0,2);
			minutes = convertedTime.substring(3, convertedTime.length);
		} else {
			hours = convertedTime.substring(0,1);
			minutes = convertedTime.substring(2, convertedTime.length);
		}
		
		selectedDate.setHours(hours);
		selectedDate.setMinutes(minutes);
		
		
		if(clickedInterval=="weekly"){
			for(var i=0;i<iteration;i++){
				arrIntakeTimes.push((selectedDate.getTime()/1000)+((i+1)*604800));
			}	
		} else if(clickedInterval=="monthly"){
			for(var i=0;i<iteration;i++){
				arrIntakeTimes.push((selectedDate.getTime()/1000)+((i+1)*2629743));
			}
		} else if(clickedInterval=="daily"){
			for(var i=0;i<iteration;i++){
				arrIntakeTimes.push((selectedDate.getTime()/1000)+((i+1)*86400));
			}
		} else {
			arrIntakeTimes.push((selectedDate.getTime()/1000));
		}
		objIntakeTime = new Object();
		
		if(localStorage.getItem("destination")=="addItem"){
			objIntakeTime.medicineID=getLastMedicineID()+1;
			saveMedicineInformation();
		} else {
			objIntakeTime.medicineID=localStorage.getItem('medicineID');
		}
		
		objIntakeTime.intakeTime=arrIntakeTimes;

	    jsonObjectIntakeTime = JSON.stringify(objIntakeTime);		
	    arrObjIntakeTime.push(jsonObjectIntakeTime);
	    
	    if(localStorage.getItem('destination')=="editIntakeTime"){
	    	objEditedIntakeTime.medicineID=localStorage.getItem("medicineID");
	    	
	    	if(isNaN(selectedDate.getTime())){
	    		objEditedIntakeTime.intakeTime = localStorage.getItem("intakeTime");
	    	} else {
	    		objEditedIntakeTime.intakeTime = (selectedDate.getTime())/1000;
	    	}
	    	
	    	objEditedIntakeTime.intakeTimeID = localStorage.getItem('intakeTimeID');
	    	arrayEditedIntakeTime.push(objEditedIntakeTime);
	    	editIntakeTime();
	    } else {
	    	createIntakeTimeInformation();
	    }
	    
	})
	
	function saveMedicineInformation(){
		objMedicineInformation.medicineName = localStorage.getItem("medicineName");
		objMedicineInformation.disease = localStorage.getItem("disease");
		objMedicineInformation.note = localStorage.getItem("note");
		objMedicineInformation.stock = localStorage.getItem("stock");

	    jsonObjMedicineInformation = JSON.stringify(objMedicineInformation);
		
		arrayObjectMedicineInformation.push(jsonObjMedicineInformation);
		createMedicineInformation();
	}
	
	
	function createIntakeTimeInformation() {
	    $.ajax({
	        type: 'POST',
	        contentType: 'application/json',
	        url: "http://localhost:8080/smartmedicine/rest/medicineinformation/createIntakeTimeInformation",
	        dataType: "json",
	        data: JSON.stringify(arrObjIntakeTime),
	        success: function(data, textStatus, jqXHR){

	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            alert('addWine error: ' + textStatus);
	        }
	    });
	}
	
	function createMedicineInformation() {
	    $.ajax({
	        type: 'POST',
	        contentType: 'application/json',
	        url: "http://localhost:8080/smartmedicine/rest/medicineinformation/createMedicineInformation",
	        dataType: "json",
	        data: JSON.stringify(arrayObjectMedicineInformation),
	        success: function(data, textStatus, jqXHR){

	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            alert('addWine error: ' + textStatus);
	        }
	    });
	}
	
	function getIntakeTimeByIntakeTimeID() {
		  var newObjIntakeTime = new Object();
		  $.ajax({
			    dataType: 'json',
			    async: false,
			    success: function(data) {
			    	for(var i=0;i<data.intaketime.length;i++){
			    		newObjIntakeTime.intakeTimeID = data.intaketime[i].intakeTimeID;
			    		newObjIntakeTime.intakeTime = data.intaketime[i].intakeTime;
			    		newObjIntakeTime.medicineID = data.intaketime[i].medicineID;
			    	}		    
				   },
			    url: 'http://localhost:8080/smartmedicine/rest/medicineinformation/getIntakeTimeByIntakeTimeID/'+localStorage.getItem('intakeTimeID')
			});
		  return newObjIntakeTime;
	};
	
	function getLastMedicineID() {
		var result = "";
		  $.ajax({
			    dataType: 'json',
			    async: false,  
			    success: function(data) {
			    	for(var i=0;i<data.medicine.length;i++){
			    		result = data.medicine[i].id;
			    	}		    
				   },
			    url: 'http://localhost:8080/smartmedicine/rest/medicineinformation/getMedicineInformation'
			});
		  return result;
	};
	
	
	function editIntakeTime() {
	    $.ajax({
	        type: 'POST',
	        contentType: 'application/json',
	        url: "http://localhost:8080/smartmedicine/rest/medicineinformation/editIntakeTime",
	        dataType: "json",
	        data: JSON.stringify(arrayEditedIntakeTime),
	        success: function(data, textStatus, jqXHR){

	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            alert('addWine error: ' + textStatus);
	        }
	    });
	}
})