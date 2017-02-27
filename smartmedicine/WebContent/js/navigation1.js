

$(document).ready(function() {			
	


	
	

	$("#btnSourceOfSupplyOverview").click(function(event){
		localStorage.setItem("destination", "sourceOfSupplyOverview");
	    window.location = 'sourceOfSupplyOverview.html';
	});
	
	$("#btnEditSourceOfSupply").click(function(event){
		localStorage.setItem("destination", "editSourceOfSupply");
	    window.location = 'editSourceOfSupply.html';
	});
	
	$("#btnAddSourceOfSupply").click(function(event){
		localStorage.setItem("destination", "addSourceOfSupply");
	    window.location = 'addSourceOfSupply.html';
	});

	$("#btnDeleteSourceOfSupply").click(function(event){
		localStorage.setItem("destination", "deleteSourceOfSupply");
	    window.location = 'deleteSourceOfSupply.html';
	});
	
	$("#btnSourceOfSupply").click(function(event){
		localStorage.setItem("destination", "manageSourceOfSupply");
	    window.location = 'manageSourceOfSupply.html';
	});
	
	$("#btnMedicineOptionChoice").click(function(event){
	      window.location = ' medicineOptionChoice.html';
	});
	
	$("#btnManageOptionSelection").click(function(event){
		  localStorage.setItem("destination", "manageOptionSelection");	
	      window.location = ' manageOptionSelection.html';
	});
	
	$("#btnDeleteIntakeTimeSortMedicine").click(function(event){
		  localStorage.setItem("destination", "deleteIntakeTimeSortMedicine");
	      window.location = ' deleteIntakeTimeSortMedicine.html';
	});
	
	$("#btnIntakeTimeOverview_2").click(function(event){
		  localStorage.setItem("destination", "intakeTimeOverview_2");
	      window.location = ' intakeTimeOverview_2.html';
	});
	
	$("#btnEditIntakeTime").click(function(event){
		  localStorage.setItem("destination", "editIntakeTime");
	      window.location = 'editIntakeTime.html';
	});


	
	$("#btnForwardIntakeTimeVacation").click(function(event){
		  localStorage.setItem("destination", "intakeTimeVacation");
		  var endDate = new Date($('#2').val());
		  var startDate = new Date($('#1').val());
		  
		  endDate.setMinutes($('#alarm1').val().substring(3,5));
		  endDate.setHours($('#alarm1').val().substring(0,2));
		  
		  startDate.setMinutes($('#alarm').val().substring(3,5));
		  startDate.setHours($('#alarm').val().substring(0,2));
		  
		  localStorage.setItem("endDateUnix", (endDate/1000));
		  localStorage.setItem("startDateUnix", (startDate/1000));
		  console.log(endDate);
		  console.log(startDate);
		  window.location = ' intakeTimeVacation.html';
	});

	
	
	$("#btnManageIntakeTime").click(function(event){
		 window.localStorage.clear(); 
	      window.location = ' manageIntakeTime.html';
	});
	
	
	
	
	$("#btnTravel").click(function(event){
		 localStorage.setItem("destination","travel");
	      window.location = ' travel.html';
	});
	
	$("#btnManagePsychologicalParent").click(function(event){
	      window.location = 'managePsychologicalParent.html';
	});
	
	$("#btnDeleteContactPerson").click(function(event){
		  localStorage.setItem("destination", "psychologicalParent")
	      window.location = 'deleteContactPerson.html';
	});
	
	$("#btnEditPsychologicalParent").click(function(event){
		  localStorage.setItem("destination", "editPsychologicalParent")
	      window.location = 'editPsychologicalParent.html';
	});
	

	
	$("#btnContactPersonOverview").click(function(event){
		  localStorage.setItem("destination", "contactPersonOverview")
	      window.location = 'contactPersonOverview.html';
	});

	
	$('#btnAcoustical').click(function(){
		window.location = 'acoustical.html';
	})
	
	$('#btnVisual').click(function(){
		window.location = 'visual.html';
	})
  
	$('#btnManageNotification').click(function(){
		window.location = 'manageNotification.html';
	})
	
	$('#btnManageContactPerson').click(function(){
		window.location = 'manageContactPerson.html';
	})
	
	$('#btnBackToFirstAddMedicine').click(function(){
		localStorage.setItem("note", $("#txtNote").val());
		localStorage.setItem("stock", $("#txtStock").val());
		localStorage.setItem("savetyStock", $("#txtStock").val());
		localStorage.setItem("destination","addMedicine");
		window.location = 'addMedicine.html';
	})
	
	$("#btnAddMedicineForwardFirst").click(function(event){
	    //*window.location = 'addMedicine2.html';
	});
	
	$("#btnAddMedicineForwardSecond").click(function(event){
	    //window.location = 'addIntakeTime.html';
	});
	
	/**
   * Navigation links for managenotification.html
   * 
   */
   $("#btnConfiguration").click(function(event){
	   window.localStorage.clear(); 
	   window.location='configuration.html';
  });
   
   $("#btnVisual").click(function(event){
	   window.localStorage.clear(); 
	   window.location='visual.html';
  });
   
   $("#btnAcoustical").click(function(event){
	   window.localStorage.clear(); 
	   window.location='acoustical.html';
  });	
	
	
 /**
 * Navigation links for addTypeSelection.html 
 */
	
  $("#btnAddMedicine").click(function(event){
	  localStorage.setItem("destination", "addMedicine");
	  window.location='addMedicine.html';
  });
  
  $("#btnIntakeTimeOverview").click(function(event){
	  localStorage.setItem("destination", "addIntakeTimeOverview");
	  window.location='addIntakeTimeOverview.html';
  });
	
 /**
  * Navigation links for start.html
  */
  $('#btnConfiguration').click(function(){
	  window.localStorage.clear(); 
      window.location='configuration.html'
  });
 
 $("#btnManageMedicine").click(function(event){
	 window.localStorage.clear();
	 localStorage.setItem("destination","manageMedicine");
	 window.location='manageMedicine.html';
 });
 
 
 $("#btnNo").click(function(event){
	 //window.localStorage.clear(); 
	 //window.location='start.html';
 });
 
 
 $("#btnPsychologicalParent").click(function(event){
	 window.localStorage.clear(); 
	 localStorage.setItem("destination", "addPsychologicalParent");
	 window.location='psychologicalParent.html';
 });
 
 
 
 /**
  *  Navigation links for manageMedicine.html
  */ 
 $("#btnAddTypeSelection").click(function(event){
	 window.localStorage.clear(); 
	 window.location='addTypeSelection.html';
 });
 
 $("#btnEditMedicine").click(function(event){
	 window.localStorage.clear(); 
	 localStorage.setItem("destination", "editMedicineInformationOverview");
	 window.location='editMedicine.html';
 });
 
 $("#btnDeleteMedicine").click(function(event){
	 window.localStorage.clear(); 
	 localStorage.setItem("destination", "deleteMedicine");
	 window.location='deleteMedicine.html';
 });
 
 $("#btnMedicineOverview").click(function(event){
	 window.localStorage.clear(); 
	 localStorage.setItem("destination", "medicineOverview");
	 window.location='medicineOverview.html';
 });
 
 $("#btnStart").click(function(event){
	  window.localStorage.clear(); 
	  window.location='start.html';
 });
 
});