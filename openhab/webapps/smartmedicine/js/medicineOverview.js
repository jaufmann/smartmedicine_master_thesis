/**
 * @author Waldemar Jaufmann
 */
$(function(){ 
	$('#bootstrap-table').ready(function() {
		getMedicineInformation();
		  $('#bootstrap-table').bdt();
	      $("#page-rows-form").children("option[value='3']").prop('selected',true)
	});
	
	function getMedicineInformation() {
		  $.ajax({
			    dataType: 'json',
			    success: function(data) {
			    	for(var i=0;i<data.medicine.length;i++){
			    		var intakeTimes = countIntakeTimeIDs(data.medicine[i].id);
			    		var buttonIntakeTime ="";
			    		if(intakeTimes>0){
			    			buttonIntakeTime="<td align='center'><button width='40' heigth='40' value="+data.medicine[i].id+" id='intakeTime"+i+"' type='button' class='btn btn-primary custom' style='background: url(img/calendar_2.png) no-repeat;'><font style='color:blue'>"+intakeTimes+"</font></button></td>";
			    		} else {
			    			buttonIntakeTime="<td align='center'><button value="+data.medicine[i].id+" id='intakeTime"+i+"' type='button' class='btn btn-primary custom' style='background: url(img/calendar_2.png) no-repeat;' disabled><font style='color:blue'>"+intakeTimes+"</font></button></td>";
			    		}
			    		
			    		$("<tr><td><font>"+data.medicine[i].medicineName+"</font></td>"  
			    	    + buttonIntakeTime
			    		+ "<td align='center'><button value="+data.medicine[i].id+" id='medicineDetails"+i+"' type='button' class='btn btn-success'><img class='btnClass' src='img/zoom_icon.png' width='40' heigth='40'/></button></td>").appendTo("table[id='bootstrap-table']");
					    
			    		$("#intakeTime"+i).unbind('click').click(function () {
				    		init_value = ($(this).val());
				    		localStorage.setItem('medicineID', init_value);
				    		localStorage.setItem('destination', 'medicineOverview');
				    		 $('#divContainer').load('intakeTimeOverview.html');
			    		});
			    		
			    		$("#medicineDetails"+i).unbind('click').click(function () {
				    		init_value = ($(this).val());
				    		console.log(init_value);
			    		});
			    	
			    	}		    
				   },
			    url: 'http://localhost:8080/smartmedicine/rest/medicineinformation/getMedicineInformation'
			});
		};
		
		function countIntakeTimeIDs(medicineID) {
			 var result = "";
			  $.ajax({
				    async: false,  
				    dataType: 'json',
				    success: function(data) {
				    	result = data.intaketime.length;
				    	localStorage.setItem("intakeTimes", data.intaketime.length);
					   },
				    url: 'http://localhost:8080/smartmedicine/rest/medicineinformation/getIntakeTimeByMedicineID/'+medicineID
				});
			  
			  return result;
		};
});