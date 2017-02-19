/**
 * @author Waldemar Jaufmann
 */
$(function(){ 
	$('#bootstrap-table').ready(function() {
		
		  /*getMedicineInformation();
		  $('#bootstrap-table').bdt();
	      $("#page-rows-form").children("option[value='3']").prop('selected',true)*/
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
			    		+ "<td align='center'><button value="+data.medicine[i].id+" id='deleteMedicine"+i+"' type='button' class='btn btn-danger'><img class='btnClass' src='img/delete_icon.png' width='40' heigth='40'/></button></td>").appendTo("table[id='bootstrap-table']");
					    
			    		$("#intakeTime"+i).unbind('click').click(function () {
				    		init_value = ($(this).val());
				    		localStorage.setItem('medicineID', init_value);
				    		$('#divContainer').load('deleteIntakeTime.html');
			    		});
			    		
			    		$("#deleteMedicine"+i).unbind('click').click(function () {
				    		init_value = ($(this).val());
				    		deleteMedicineInformation(init_value);
				    		$('#divContainer').load('deleteMedicine.html');
			    		});
			    	}		    
				   },
			    url: 'http://localhost:8080/smartmedicine/rest/medicineinformation/getMedicineInformation'
			});
	};
	
	
	
	function deleteMedicineInformation(medicineID) {
		$.ajax({
	        type: 'DELETE',
	        contentType: 'application/json',
	        url: 'http://localhost:8080/smartmedicine/rest/medicineinformation/deleteMedicineInformation/'+medicineID,
	        dataType: "json",
	        success: function(data, textStatus, jqXHR){
	            
	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            alert('Medicine information could be deleted');
	        }
	    });
	}
	
	function countIntakeTimeIDs(medicineID) {
		 var result = "";
		  $.ajax({
			    async: false,  
			    dataType: 'json',
			    success: function(data) {
			    	result = data.intaketime.length;
				   },
			    url: 'http://localhost:8080/smartmedicine/rest/medicineinformation/getIntakeTimeByMedicineID/'+medicineID
			});
		  
		  return result;
	};
	
	
});