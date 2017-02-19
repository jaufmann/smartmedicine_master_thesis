/**
 * @author Waldemar Jaufmann
 */

$(function(){ 
	$('#bootstrap-table').ready(function() {
		loadTest();
		  $('#bootstrap-table').bdt();
	      $("#page-rows-form").children("option[value='3']").prop('selected',true)
	      if(localStorage.getItem('destination')== 'medicineOverview'){
	    	   $("#btnMedicineOverview").click(function(event){
	    	       $('#divContainer').load('medicineOverview.html');
	    	   });
		  } else {
	    	   $("#btnMedicineOverview").click(function(event){
	    	       $('#divContainer').load('addIntakeTimeOverview.html');
	    	   });  
		  }
	});
	
	function parseDayToDayName(dayNumber){
		var dayName;
		if(dayNumber==0){
			dayName="Sonntag";
		} else if(dayNumber==1){
			dayName="Montag";
		} else if (dayNumber==2) {
			dayName="Dienstag";
		} else if (dayNumber==3){
			dayName="Mittwoch";
		} else if (dayNumber==4){
			dayName="Donnestag";
		} else if (dayNumber==5){
			dayName="Freitag";
		} else if (dayNumber==6){
			dayName="Samstag";
		}
		return dayName;
	}
	
	
	function parseMonthToMonthName(monthNumber){
		var dayName;
		if(monthNumber==0){
			dayName="Januar";
		} else if(monthNumber==1){
			dayName="Februar";
		} else if (monthNumber==2) {
			dayName="März";
		} else if (monthNumber==3){
			dayName="April";
		} else if (monthNumber==4){
			dayName="Mai";
		} else if (monthNumber==5){
			dayName="Juni";
		} else if (monthNumber==6){
			dayName="Juli";
		} else if(monthNumber==1){
			dayName="Juni";
		} else if (monthNumber==7) {
			dayName="August";
		} else if (monthNumber==8){
			dayName="September";
		} else if (monthNumber==9){
			dayName="Oktober";
		} else if (monthNumber==10){
			dayName="November";
		} else if (monthNumber==11){
			dayName="Dezember";
		}
		return dayName;
	}
	
	function parseHour(hour){
		var newHour;
		if(hour<=12){
			newHour = "0"+hour;
		} else {
			newHour = hour;
		}
		return newHour;
	}
	
	function parseMinute(minute){
		console.log(minute)
		var newMinute;
		if(minute<=12){
			newMinute = "0"+minute;
		} else {
			newMinute = minute;
		}
		return newMinute;
	}
	
	
	function loadTest() {
		  $.ajax({
			    dataType: 'json',
			    success: function(data) {
			    	for(var i=0;i<data.intaketime.length;i++){
			    		var unparsedDate = new Date();
			    		unparsedDate.setTime(data.intaketime[i].intakeTime*1000);
			    		var dayName = parseDayToDayName(unparsedDate.getDay());
			    		var monthName = parseMonthToMonthName(unparsedDate.getMonth());
			    		var date = ""+dayName+", den "+unparsedDate.getDate()+" "+monthName;
			    		var time = ""+parseHour(unparsedDate.getHours())+":"+parseMinute(unparsedDate.getMinutes());
			    		
			    		$("<tr><td><font>"+date+"</font></td>" 
			    		+ "<td><font>"+time+"</font></td>" 
			    		+ "<td align='center'><button value="+data.intaketime[i].intakeTimeID+" id='editMedicine"+i+"' type='button' class='btn btn-warning'><img src='img/edit_icon.png' width='50' heigth='50'/></button></td></tr>").appendTo("table[id='bootstrap-table']");
					    
			    		$("#intakeTime"+i).unbind('click').click(function () {
				    		init_value = ($(this).val());
				    		 $('#divContainer').load('intakeTimeOverview.html');
			    		});
			    		
			    		$("#editMedicine"+i).unbind('click').click(function () {
				    		init_value = ($(this).val());
				    		console.log(init_value);
			    		});
			    	
			    		

			    	}		    
				   },
			    url: 'http://localhost:8080/smartmedicine/rest/medicineinformation/getIntakeTimeByMedicineID/'+localStorage.getItem('medicineID')
			});
	};
});