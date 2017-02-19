$(document).ready(function() {
	getMedicineInformation();
	
    $('#example').DataTable( {	
    	 columnDefs: [
             {
                 targets: [ 0, 1, 2 ],
                 className: 'mdl-data-table__cell--non-numeric'
             }
         ],
    	"lengthMenu": [[3, 25, 50, -1], [3, 25, 50, "All"]],
        columns: [
            { title: "Medikament" },
            { title: "Termine" },
            { title: "Löschen" }
        ]
    } );
       
    
	
});




function getMedicineInformation() {

	$.ajax({
		    dataType: 'json',
		    async:false,
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
		    		+ "<td align='center'><button value="+data.medicine[i].id+" id='deleteMedicine"+i+"' type='button' class='btn btn-danger'><img class='btnClass' src='img/delete_icon.png' width='40' heigth='40'/></button></td>").appendTo("table[id='example']");
				    
		    		$("#intakeTime"+i).unbind('click').click(function () {
			    		init_value = ($(this).val());
			    		localStorage.setItem('medicineID', init_value);
			    		$('#divContainer').load('deleteIntakeTime.html');
		    		});
		    		
		    		$("#deleteMedicine"+i).unbind('click').click(function () {
			    		init_value = ($(this).val());
			    		deleteMedicineInformation(init_value);
			    		window.location = 'test.html';
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
			   },
		    url: 'http://localhost:8080/smartmedicine/rest/medicineinformation/getIntakeTimeByMedicineID/'+medicineID
		});
	  
	  return result;
};



function deleteMedicineInformation(medicineID) {
	$.ajax({
        type: 'DELETE',
        async: false,  
        contentType: 'application/json',
        url: 'http://localhost:8080/smartmedicine/rest/medicineinformation/deleteMedicineInformation/'+medicineID,
        dataType: "json",
        success: function(data, textStatus, jqXHR){
            console.log("deleted");
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('Medicine information could be deleted+e'+textStatus);
        }
    });
}

