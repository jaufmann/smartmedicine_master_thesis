

$(document).ready(function() {
	var objEditMedicineInformation = new Object();
	var objContactPerson = new Object();
	
	/* addIntakeTime variables */
	var objSingleIntakeTime = new Object();
	var arrMedicineAndIntakeTimeInformation = [];
	var test = "";
	var arrIntakeTimes = []; 
	
	
	//addMedicine variables
	var arrayObjectMedicineInformation = [];
	var arrayEditedIntakeTime = [];
	var host = "http://"+window.location.hostname;
	var port = "8080";
	
	var jsonObjIntakeTimeInformations = new Object();
	
	
	var objMedicineInformation = new Object();
	var objEditedIntakeTime = new Object();
	
	//addIntakeTime variables
	var clickedInterval = "";
	
	var addMoreIntakeTime = false;
	
	var objCreateContactPerson = new Object();
	
	$('#btnNo').click(function(){
		if(localStorage.getItem("destination")=="addOnlyIntakeTime"){
			jsonObjIntakeTimeInformations.medicineID = localStorage.getItem("medicineID");		
			createIntakeTimeInformation();
			//saveMedicineInformation();
		} else {
			saveMedicineInformation();
		}

 //   	createIntakeTimeInformation();
	})
	
	$('#bootstrap-table').ready(function() {
			
		
		//$('#divHeader').append("<img width='300' src='img/SmartMedicineLogo.png'><hr>");
		console.log(host);
		
		var destination = localStorage.getItem("destination");
		
		if(destination=="deleteMedicine"){
			loadDeleteMedicineInformationTable();
		} else if(destination == "deleteIntakeTimeSortMedicine"){
			if(jQuery.isEmptyObject(getIntakeAllTimes())==true){
				localStorage.setItem("destination", "manageIntakeTime");
				 window.location = "manageIntakeTime.html";
			} else {
				loadDeleteIntakeTimeInformationTable();
			}
			
			
		} else if(destination == "intakeTimeOverview_2"){
			loadMedicineOverviewIntakeTime();
		} else if(destination == "editIntakeTime"){
			loadEditIntakeTimeOverviewTable_2();
		} else if(destination == "managePsychologicalParent"){
			if(jQuery.isEmptyObject(getContactPerson())==true){
				
				
				$("#btnContactPersonOverview").empty();
				$("#btnContactPersonOverview").append("<img width='300' src='img/keine_pers_logo_edit.png'/>");
				$("#btnContactPersonOverview").attr('disabled','disabled');
				
				$("#btnEditPsychologicalParent").empty();
				$("#btnEditPsychologicalParent").append("<img width='300' src='img/keine_pers_logo_übersicht.png'/>");
				$("#btnEditPsychologicalParent").attr('disabled','disabled');
				
				$("#btnDeleteContactPerson").empty();
				$("#btnDeleteContactPerson").append("<img width='300' src='img/keine_pers_logo_delete.png'/>");
				$("#btnDeleteContactPerson").attr('disabled','disabled');
			}  else {
				$("#btnContactPersonOverview").removeAttr('disabled');
				$("#btnEditPsychologicalParent").removeAttr('disabled');
				$("#btnDeleteContactPerson").removeAttr('disabled');
			}
		}
		
		else if(destination == "intakeTimeVacation"){
			loadIntakeTimeVacationInformationTable();
		} else if(destination == "manageMedicine"){
			
			if(getMedicineInformation().length==3){
				$("#tdAddMedicine").empty();
				$("#tdAddMedicine").append("<button id='btnAddMedicine' class='size btn btn-success' ><img width='300' src='img/kein_platz_logo.png'></button>");
				$("#btnAddMedicine").attr('disabled','disabled');
			} else if(getMedicineInformation().length==0){
				
				
				$("#btnMedicineOverview").empty();
				$("#btnMedicineOverview").append("<img width='300' src='img/keine_medi_logo_übersicht.png'/>");
				
				$("#btnMedicineOverview").attr('disabled','disabled');
				
				
				$("#btnEditMedicine").empty();
				$("#btnEditMedicine").append("<img width='300' src='img/keine_medi_logo_edit.png'/>");
				
				$("#btnDeleteMedicine").empty();
				$("#btnDeleteMedicine").append("<img width='300' src='img/keine_medi_logo_delete.png'/>");

				$("#btnEditMedicine").attr('disabled','disabled');
				$("#btnDeleteMedicine").attr('disabled','disabled');
			} else {
				$("#btnMedicineOverview").removeAttr('disabled');
				$("#btnEditMedicine").removeAttr('disabled');
				$("#btnDeleteMedicine").removeAttr('disabled');
			}
			/*if(jQuery.isEmptyObject(getMedicineInformation())==true){
				
			}  else {
			
			}*/
		} else if(destination == "manageOptionSelection"){
			
		
			if(getMedicineInformation().length==0){
				$("#tdManageIntakeTime").empty();
				$("#tdManageIntakeTime").append("<button id='btnManageIntakeTime' class='size btn btn-primary'><img width='300' src='img/keine_termine_logo.png' /></button>");
				$("#btnManageIntakeTime").attr('disabled','disabled');
			}  else {
				$("#btnManageIntakeTime").removeAttr('disabled');
			}
		} else if(destination == "manageIntakeTime"){
			if(jQuery.isEmptyObject(getIntakeAllTimes())==true){
				$("#btnIntakeTimeOverview_2").attr('disabled','disabled');
				$("#btnEditIntakeTime").attr('disabled','disabled');
				$("#btnDeleteIntakeTimeSortMedicine").attr('disabled','disabled');
			}  else {
				$("#btnIntakeTimeOverview_2").removeAttr('disabled');
				$("#btnEditIntakeTime").removeAttr('disabled');
				$("#btnDeleteIntakeTimeSortMedicine").removeAttr('disabled');
			}
		}
		
		else if(destination == "editMedicine"){
			$("#divMainHeader").append("<img src='img/medikament_bearbeiten_logo_1.png'>");
			$('#divStatus').append("<img src='img/status_allgemein_bearbeiten.png'>");
			$("#tdIntakeTimeInformation").empty();
			laodEditMedicineInformation();
		} else if(destination == "editMedicine2"){
			$("#divMainHeader").append("<img src='img/medikament_bearbeiten_logo_1.png'>");
			$('#divStatus').append("<img src='img/status_einnahme_bearbeiten.png'>");
			$("#tdIntakeTimeInformation").empty();
			laodEditMedicineInformation();
		}
		else if(destination=="psychologicalParent"){
			loadDeletePsychologicalParent();
		} else if(destination=="fromEditPsychologicalParent"){
			$('#divHeader').empty();
			$('#divHeader').append("<img src='img/Personen_bearbeiten_logo_1.png'>");
			loadEditPsychologicalParentInformation();
		} else if(destination == "contactPersonOverview"){
			
			loadContactPersonOverviewTable();
		} 
		
		else if (destination=="addPsychologicalParent"){
			$("#btnImportant").trigger("click");
			$("#btnMale").trigger("click");
			$("#btnSendMailYes").trigger("click");
			$("#btnContactTypePrivate").trigger("click");
			
			
			
		} else if(destination == "contactPersonInformation"){
			loadContactPersonInformation();
        	
		}
		
		else if(destination=="editPsychologicalParent"){
		
			loadEditPsychologicalParent();
		} else if(destination=="travel"){
			setDateInput();
			setTimeInput();
		}

		else if(destination=="medicineDetailedInformation"){
			loadMedicineDetailedInformation();
		} else if(destination=="editMedicineInformationOverview"){
		/*	var stock = "";
			var savetyStock = "";
			var boxID = "";
			var listBoxIDs = [];

			setTimeout(
				    function() {
				    	for(i=0; i<getMedicineInformation().length;i++){

							stock = parseInt(getMedicineInformation()[i].stock);
							savetyStock = parseInt(getMedicineInformation()[i].savetyStock);
							boxID = parseInt(getMedicineInformation()[i].boxID);
							listBoxIDs.push(boxID);
							if(savetyStock<=stock){
								turnOffStockNotificationLED(boxID, "OFF");
							} else {
								turnOffStockNotificationLED(boxID, "ON");
							}
						}
						
						for(i=1; i<=3;i++){
							if(isInArray(i, listBoxIDs)!=true){
								turnOffStockNotificationLED(i, "OFF");
							} else {
								turnOffStockNotificationLED(i, "ON");
							}
						}
			}, 1000);
			
		
		*/
			loadEditMedicineInformationTable();
		} else if(destination=="medicineOverview"){
			loadMedicineOverviewTable();
	 	} else if(destination=="medicineOverviewIntakeTime"){
	 		loadIntakeTimeOverview2();
	 		
	 		$('#tdBack').empty();
			$("<button id='btnBackMedicineOverview' class='btn btn-primary'><font class='fontButtonNavigation'>zur&uuml;ck</font></button>").appendTo("td[id='tdBack']");
			$('#btnBackMedicineOverview').click(function(){
				localStorage.setItem("destination", "medicineOverview");
				window.location = 'medicineOverview.html';
			})
	 	} else if(destination=="addOnlyIntakeTimeOverview"){
	 		
	 		$('#tdBack').empty();
			$("<button id='btnBackToAddIntakeTimeOverview' class='btn btn-primary'><font class='fontButtonNavigation'>zur&uuml;ck</font></button>").appendTo("td[id='tdBack']");
			$('#btnBackToAddIntakeTimeOverview').click(function(){
				localStorage.setItem("destination", "addIntakeTimeOverview");
				window.location ='addIntakeTimeOverview.html';
			})	
			
			loadIntakeTimeOverview2();
	 	} else if(destination=="medicineIntakeTimeOverview"){
	 		$('#tdBack').empty();
			$("<button id='btnBackToMedicineOverview' class='btn btn-primary'><font class='fontButtonNavigation'>zur&uuml;ck</font></button>").appendTo("td[id='tdBack']");
			$('#btnBackToMedicineOverview').click(function(){
				localStorage.setItem("destination", "medicineOverview");
				window.location='medicineOverview.html';
			})	
			
			loadIntakeTimeOverview2();
	 	}
		
		else if(destination=="addOnlyIntakeTime"){
			$("#divMainHeader").append("<img src='img/Termine_hinzufügen_1_logo_.png'>");
			$('#divStatus').empty();
			$('#txtCurrentStock').val(getMedicineInformationByMedicineID().stock);
			
			
			var pickerStartDate = $startDate.pickadate('picker');
        	var date = new Date();
        	pickerStartDate.set("select", date);
        	pickerStartDate.set("min", date);
			
			$("#btnNoInterval").trigger("click");
			setDateInput();
			setTimeInput();
			$('#txtIteration').attr('disabled', true);
			
			$('#tdBackAddIntakeTime').empty();
			$("<button id='btnBackToAddIntakeTimeOverview' class='btn btn-lg btn-primary'><font class='fontButtonNavigation'>zur&uuml;ck</font></button>").appendTo("td[id='tdBackAddIntakeTime']");
			$('#btnBackToAddIntakeTimeOverview').click(function(){
				localStorage.setItem("destination", "addIntakeTimeOverview");
				window.location = 'addIntakeTimeOverview.html';
			})	
		} 
		
		
		else if(destination=="addIntakeTimeOverview"){
			loadAddIntakeTimeOverviewTable();
		} else if(destination=="deleteIntakeTime"){
			loadDeleteIntakeTimeTable();
		} else if(destination=="editIntakeTimeOverview"){
			loadEditIntakeTimeOverviewTable();
		} else if(destination=="intakeTimeOverview"){
			loadDeleteIntakeTimeTable();
		} else if(destination=="editIntakeItem"){
			
			$('#txtCurrentStock').val(getMedicineInformationByMedicineID().stock);

			
			$("#divMainHeader").append("<img src='img/Termine_bearbeiten_1_logo.png'>");
			$('#divStatus').empty();
			var pickerStartDate = $startDate.pickadate('picker');
			$("#tblRepeatIntakeTime").hide();
			$("#btnNoInterval").trigger("click");
			$('#txtIteration').attr('disabled', true);
			var newObjIntakeTime = getIntakeTimeByIntakeTimeID(localStorage.getItem("intakeTimeID"));
			var date = new Date();	
			pickerStartDate.set('min', date);

			$('#tdBackAddIntakeTime').empty();
			$("<button id='btnBackToEditIntakeItemOverview' class='btn btn-lg btn-primary'><font class='fontButtonNavigation'>zur&uuml;ck</font></button>").appendTo("td[id='tdBackAddIntakeTime']");
			$('#btnBackToEditIntakeItemOverview').click(function(){
				localStorage.setItem("destination", "editIntakeTimeOverview");
				window.location = 'editIntakeTimeOverview.html';

			})	
			
			date.setTime(newObjIntakeTime.intakeTime*1000);

			var time = parseHour(date.getHours())+":"+parseMinute(date.getMinutes());
			var day = ("0" + date.getDate()).slice(-2);
			var month = ("0" + (date.getMonth()	 + 1)).slice(-2);
			var dateTime = date.getFullYear()+"-"+(month)+"-"+(day);

			pickerStartDate.set('select', dateTime, { format: 'yyyy-mm-dd' });
			
			
			setTimeInput();
			//$('#dtStartDate').val(dateTime);
			$('#alarm').val(time);
			$('#txtPillQuantity').val(newObjIntakeTime.pillQuantity);
		} 
		
		else if(destination=="addMedicine"){
			localStorage.getItem("contactType");
			$("#divMainHeader").append("<img src='img/medikament_hinzufügen_logo_1.png'>");
			$('#divStatus').append("<img width='500px' height='50px' src='img/status_allgemein_hinzufügen.png'>");
			
			$('#divContactPerson').hide();
			$('#txtMedicineName').val(localStorage.getItem("medicineName"));
			$('#txtDisease').val(localStorage.getItem("disease"));
			
			
			if(localStorage.getItem("sendNotification")==null){
				$('#btnNormal').click();
				localStorage.setItem("contactType", "none");
			} else if(localStorage.getItem("sendNotification")=="true"){
				$('#btnImportant').click();
				var contactType = localStorage.getItem("contactType");
				if(contactType=="doctor"){
					$('#btnContactTypeDoctor ').click();
				} else if(contactType=="private"){
					$('#btnContactTypePrivate').click();
				} else {
					$('#btnContactTypeMisc').click();
				}
			} else {
				$('#btnNormal').click();
			}

			
			for(k = 1; k<= 3;k++){
				if(isInArray(k, getActiveMedicineBoxes())==true){
					$("#btnBox"+k).addClass("btn btn-danger");
					$("#btnBox"+k).prop("disabled",true);
					$("#btnBox"+k).empty();	
					$("#btnBox"+k).append("<img class='interval' src='img/sockel"+k+"_belegt.png'></img></button>");
					
					
				} else {
					if(localStorage.getItem("boxID")!=null){
						if(localStorage.getItem("boxID")=="1"){
							$("#btnBox1").click();
						} else if(localStorage.getItem("boxID")=="2"){
							$("#btnBox2").click();
						} else if(localStorage.getItem("boxID")=="3"){
							$("#btnBox3").click();
						} 
					} else {
						$("#btnBox"+k).click();
					}
					$("#btnBox"+k).addClass("btn btn-primary");
					$("#btnBox"+k).empty();
					$("#btnBox"+k).append("<img class='interval' src='img/sockel"+k+".png'></img></button>");
				}
			}

		
		} else if(destination=="addMedicine2"){
			$("#divMainHeader").append("<img src='img/medikament_hinzufügen_logo_1.png'>");
			$('#divStatus').append("<img width='500px' height='50px' src='img/status_einnahme_hinzufügen.png'>");
			if(localStorage.getItem("stock")==null){
				$('#txtSavetyStock').attr('disabled', true);
			} else {
				$('#txtSavetyStock').attr('disabled', false);
			}
			
			if(localStorage.getItem("sourceType") != ""){
				if(localStorage.getItem("sourceType") == "drugStore"){
					$('#btnSourceTypeDrugStore').click();
				} else if(localStorage.getItem("sourceType") == "doctor"){
					$('#btnSourceTypeDoctor').click();
				} else {
					$('#btnSourceTypeMisc').click();
				}
			}
				
		   
		    if(localStorage.getItem("sendOrder") != ""){
		    	if(localStorage.getItem("sendOrder") == "true"){
					$('#btnSendOrderYes').click();
				} else {
					$('#btnSendOrderNo').click();
				}
		    } else {
		    	$('#btnSendOrderNo').click();
		    }	
			
			
			$("#txtNote").val(localStorage.getItem("note"));
			$("#txtStock").val(localStorage.getItem("stock"));
			$("#txtSavetyStock").val(localStorage.getItem("savetyStock"));
		} else if(destination=="addIntakeTime"){
			$("#divMainHeader").append("<img src='img/medikament_hinzufügen_logo_1.png'>");
			$('#divStatus').append("<img width='500px' height='50px' src='img/status_termine.png'>");
			$('#txtCurrentStock').val(localStorage.getItem("stock"));
			
			var pickerStartDate = $startDate.pickadate('picker');
        	var date = new Date();
        	pickerStartDate.set("select", date);
        	pickerStartDate.set("min", date);
        	
        	if(localStorage.getItem("intervalType")=="none"){
        		$("#btnNoInterval").trigger("click");
        		$('#txtIteration').attr('disabled', true);
        	} else if(localStorage.getItem("intervalType")=="daily"){
        		$("#btnDaily").trigger("click");
        	} else if(localStorage.getItem("intervalType")=="weekly"){
        		$("#btnWeekly").trigger("click");
        	} else if(localStorage.getItem("intervalType")=="monthly"){
        		$("#btnMonthly").trigger("click");
        	} else {
        		$("#btnNoInterval").trigger("click");
        		$('#txtIteration').attr('disabled', true);
        	}
        	
		
			$('#tblHeaderOverview').empty();
			$("<tr><td><img class='transparent headerNavigation' src='img/pills-blue.png'><font style='color:2875bd' class='transparent'><b>Allgemein</b></font></h4></td>" +
			  "<td><img class='transparent headerNavigation'  src='img/Information_icon.png'><font style='color:2875bd' class='transparent'><b>Info</b></font></td>" +
			  "<td><img class='headerNavigation'  src='img/clock.png'><font style='color:2875bd'><b>Zeitpunkt</b></font></h4></td></tr>").appendTo("table[id='tblHeaderOverview']");
			
			
			if(localStorage.getItem("iteration")!=null){
				$('#txtIteration').val(localStorage.getItem("iteration"));
			}
			
			if(localStorage.getItem("pillQuantity")!=null){
				$('#txtPillQuantity').val(localStorage.getItem("pillQuantity"));
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
			
			
			
			$('#tdBackAddIntakeTime').empty();
			$("<button id='btnBackToAddMedicine' class='btn btn-lg btn-primary'><font class='fontButtonNavigation'>zur&uuml;ck</font></button>").appendTo("td[id='tdBackAddIntakeTime']");
			$('#btnBackToAddMedicine').click(function(){
				localStorage.setItem("iteration", $('#txtIteration').val());
				localStorage.setItem("startDate", $('#txtStartDate').val());
				localStorage.setItem("alarm", $('#alarm').val());
				localStorage.setItem("pillQuantity", $('#txtPillQuantity').val());
				localStorage.setItem("destination", "addMedicine2");
				window.location = 'addMedicine2.html';
			})	
		}
		
		
		if(destination=="deleteMedicine" || destination=="editMedicineInformationOverview" || destination=="medicineOverview"
			|| destination=="deleteIntakeTime" || destination=="editIntakeTimeOverview" || destination=="intakeTimeOverview"
			|| destination =="addIntakeTimeOverview" || destination=="addOnlyIntakeTimeOverview" || destination=="medicineIntakeTimeOverview"
			|| destination == "medicineOverviewIntakeTime" || destination=="psychologicalParent" || destination=="editPsychologicalParent"
			|| destination == "contactPersonOverview" || destination == "intakeTimeVacation" || destination=="deleteIntakeTimeSortMedicine"
			|| destination == "intakeTimeOverview_2" || destination == "editIntakeTime"	){
	
		    $('#example').DataTable( {	
		    	
		    	"lengthChange": false,
		    	 columnDefs: [
		             {
		                 targets: [0, 1, 2],
		                 className: 'mdl-data-table__cell--non-numeric'
		             }
		         ],
		    	"lengthMenu": [[2, 25, 50, -1], [2, 25, 50, "All"]],
		    } );	 
       }
	});
	
	/**
	 * addIntakeTimeOverview.html functions
	 */

	function isInArray(value, array) {
		  return array.indexOf(value) > -1;
	}
	function getActiveMedicineBoxes() {
		  var listActiveMedicineBoxes = [];
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
			    	for(i=0;i<data.activeMedicineBoxes.length;i++){
			    		listActiveMedicineBoxes.push(data.activeMedicineBoxes[i]);
			    	}
			    	
				},
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getActiveMedicineBoxes/'
			});
		  return listActiveMedicineBoxes;
	};

	
	$('#btnSendOrderYes').click(function(){
		$("#trSourceOfSuplly").show();
		$("#trSourceOfSupllyTitle").show();
		
		localStorage.setItem("sendOrder", "true");
		$("#btnSendOrderYes").removeClass("btn btn-primary").addClass("btn btn-success");
		$("#btnSendOrderNo").removeClass("btn btn-success").addClass("btn btn-primary");
		$('#txtSavetyStock').attr('disabled', false);

		if(localStorage.getItem("sourceType")==null){
			$('#btnSourceTypeMisc').click();
		}
		
		
		
		$('#btnSourceTypeDoctor').attr('disabled', false);
		$('#btnSourceTypeDrugStore').attr('disabled', false);
		$('#btnSourceTypeMisc').attr('disabled', false);
	})
	
	$('#btnSendOrderNo').click(function(){
		$("#trSourceOfSuplly").hide();
		
		$("#trSourceOfSupllyTitle").hide();
		$('#txtSavetyStock').attr('disabled', true);
		localStorage.setItem("sendOrder", "false");
		localStorage.setItem("sourceType", "none");
		$("#btnSendOrderNo").removeClass("btn btn-primary").addClass("btn btn-success");
		$("#btnSendOrderYes").removeClass("btn btn-success").addClass("btn btn-primary");
		$('#btnSourceTypeDoctor').attr('disabled', true);
		$('#btnSourceTypeDrugStore').attr('disabled', true);
		$('#btnSourceTypeMisc').attr('disabled', true);
	})
	
	
	function loadIntakeTimeVacationInformationTable() {
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
				    	for(var i=0;i<data.intakeTime.length;i++){
				    		
				    		var unparsedDate = new Date();
				    		unparsedDate.setTime(data.intakeTime[i].intakeTimeUnix*1000);
				    		var dayName = parseDayToDayName(unparsedDate.getDay());
				    		var monthName = parseMonthToMonthName(unparsedDate.getMonth());
				    		var date = ""+dayName+", "+unparsedDate.getDate()+". "+monthName+" "+unparsedDate.getFullYear();
				    		var time = ""+parseHour(unparsedDate.getHours())+":"+parseMinute(unparsedDate.getMinutes());	
				    		localStorage.setItem("medicineID", data.intakeTime[i].medicineID);
				    		var medicineName = getMedicineInformationByMedicineID().medicineName;
				    		
				    		$("<tr><td><font>"+date+"</font></td>" 
				    		+ "<td><font>"+time+"</font></td>"
				    		+ "<td><font>"+medicineName+"</font></td>"
				    		+ "<td><font>"+data.intakeTime[i].pillQuantity+"</font></td>" 
				    		+ "<td><font><button type='button' id='btnDispense"+i+"' class='btn btn-custom btn-success' value='"+data.intakeTime[i].intakeTimeID+"/"+data.intakeTime[i].medicineID+"'><img class='btnClass' src='img/ausgeben_icon.png' width='40' heigth='40'/></button></font></td></tr>").appendTo("table[id='example']");
				    		
				    		
				    		$('#btnDispense'+i).click(function(){
				    			intakeTimeID = $(this).val().substring(0, $(this).val().indexOf("/"));
				    			medicineID = $(this).val().substring(parseInt($(this).val().indexOf("/"))+1, $(this).val().length);
				    			console.log("medicineID: "+medicineID);
				    			localStorage.setItem("medicineID", medicineID);
				    			var boxID = getMedicineInformationByMedicineID().boxID;
				    			setNewQuantity(boxID, 1);
				    			localStorage.setItem("boxID", boxID);
				    			dispenseMedicineBox();
				    		})
				    	}	
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getIntakeTimeByStartAndEndDate/'+localStorage.getItem("startDateUnix")+"/"+localStorage.getItem("endDateUnix"),
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
	
	
	function dispenseMedicineBox( )
	{
	    var request = $.ajax
	    ({
	        type       : "GET",
	        url        :  host+":"+port+"/CMD?checkMainBoxStatus"+localStorage.getItem("boxID")+"=ON"
	    });

	    request.done( function(data) 
	    { 
	    	
	    });

	    request.fail( function(jqXHR, textStatus ) 
	    { 
	        console.log( "Failure: " + textStatus );
	    });
	}

	
	function loadIntakeTimeOverviewTable1() {
		  $.ajax({
			    dataType: 'json',
			    
			    async:false,
			    success: function(data) {
			    	for(var i=0;i<data.intaketime.length;i++){
			    		var unparsedDate = new Date();
			    		unparsedDate.setTime(data.intaketime[i].intakeTime*1000);
			    		var dayName = parseDayToDayName(unparsedDate.getDay());
			    		var monthName = parseMonthToMonthName(unparsedDate.getMonth());
			    		var date = ""+dayName+", den "+unparsedDate.getDate()+" "+monthName;
			    		var time = ""+parseHour(unparsedDate.getHours())+":"+parseMinute(unparsedDate.getMinutes());
			    		var notificationTrigegered = "";
			    		var intakeStatus = "";
			  
			    		if(data.intaketime[i].notificationTriggered==true){
			    			notificationTrigegered = "Ausgelöst";
			    			console.log(data.intaketime[i].intakeTriggered);
			    			if(data.intaketime[i].intakeTriggered==true){
			    				intakeStatus = "Eingenommen"
			    			} else {
			    				intakeStatus = "Einnahme verpasst"
			    			}
			    		} else {
			    			notificationTrigegered = "Aussteffhend";
			    			intakeStatus = "Ausstaehend"
			    		}
			    		
			    		$("<tr><td><font>"+date+"</font></td>" 
			    		+ "<td><font>"+time+"</font></td>" 
			    		+ "<td><font>"+data.intaketime[i].pillQuantity+"</font></td>" 
			    		+ "<td><font>"+notificationTrigegered+"</font></td>" 
			    		+ "<td><font>"+intakeStatus+"</font></td></tr>").appendTo("table[id='example']");
					    
			    	}		    
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getIntakeTimeByMedicineID/'+localStorage.getItem('medicineID')
			});
	};
	
	function loadAddIntakeTimeOverviewTable() {
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
			    	for(var i=0;i<data.medicine.length;i++){
			    		var intakeTimes = countIntakeTimeIDs(data.medicine[i].id);
			    		var buttonIntakeTime ="";
			    		if(intakeTimes>0){
			    			buttonIntakeTime="<td align='center'><button width='40' heigth='40' value="+data.medicine[i].id+" id='intakeTime"+i+"' type='button' class='btn btn-custom btn-primary'><font style='color:white'>"+intakeTimes+"</font>&nbsp;</button></td>";
			    		} else {
			    			buttonIntakeTime="<td align='center'><button value="+data.medicine[i].id+" id='intakeTime"+i+"' type='button' class='btn  btn-custom btn-primary' disabled><font style='color:white'>"+intakeTimes+"</font></button></td>";
			    		}
			    		
			    		
			    		$("<tr><td><font>"+data.medicine[i].medicineName+"</font></td>"  
			            + buttonIntakeTime
			    		+ "<td align='center'><button value="+data.medicine[i].id+" id='addIntakeTime"+i+"' type='button' class='btn btn-custom btn-success'><img class='btnClass' src='img/add_termin_1.png' width='40' heigth='40'/></button></td>").appendTo("table[id='example']");
					    
			    		$("#intakeTime"+i).unbind('click').click(function () {
				    		init_value = ($(this).val());
				    		localStorage.setItem('medicineID', init_value);
				    		localStorage.setItem("destination", "addOnlyIntakeTimeOverview");
				    		window.location= 'intakeTimeOverview.html';
			    		});
			    		
			    		$("#addIntakeTime"+i).unbind('click').click(function () {
				    		init_value = ($(this).val());
				    		localStorage.setItem('medicineID', init_value);
				    		console.log(init_value);
				    		localStorage.setItem('destination', "addOnlyIntakeTime");
				    		window.location = 'addIntakeTime.html';
			    		});
			    	}		    
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getMedicineInformation'
			});
	};
	
	$('#btnSaveIntakeTime').click(function(){
		var iteration;
		var medicineID = "";	
		
		var isIntervalCorrect = true;
		var isPillQuantityCorrect = true;
		
	
		if($('#txtIteration').val()==""){
			iteration = 1;
		} else {
			iteration = $('#txtIteration').val();
		}
	
		if(localStorage.getItem("destination")=="editIntakeItem"){
			var selectedDate = new Date($('#dtStartDate').val()/*localStorage.getItem("objStartDate")*/);
		} else {
			var selectedDate = new Date(localStorage.getItem("objStartDate"));
		}
		
		var selectedTime = $('#alarm').val();
		var pillQuantity = parseInt($('#txtPillQuantity').val());
		
		
		var hours = "";
		var minutes = "";
		var convertedTime = convertTo24Hour(selectedTime);
		
		if(convertedTime.charAt(1)!=":"){
			hours = convertedTime.substring(0,2);
			minutes=convertedTime.substring(3, convertedTime.length);
		} else {
			hours = convertedTime.substring(0,1);
			minutes = convertedTime.substring(2, convertedTime.length);
		}
		
		selectedDate.setHours(hours);
		selectedDate.setMinutes(minutes);
		
		if(	localStorage.getItem("destination")=="addIntakeTime" || localStorage.getItem("destination")=="addOnlyIntakeTime"){
			if(localStorage.getItem("destination")=="addIntakeTime"){
				
			} else {
				medicineID=localStorage.getItem("medicineID");
			}	
		} else {
			if(isNaN(pillQuantity)!=true && pillQuantity!=0)
			{
				$('#aMedicineQuantity').empty();
				
				objEditedIntakeTime.intakeTimeID = localStorage.getItem('intakeTimeID');
		    	objEditedIntakeTime.pillQuantity = pillQuantity;
		    	objEditedIntakeTime.intakeTime = selectedDate.getTime()/1000;
		    	arrayEditedIntakeTime.push(objEditedIntakeTime);
		    	editIntakeTime();
			}
			else {
				$('#aMedicineQuantity').empty();
				$('#aMedicineQuantity').append("<img class='imgAttention'width='200' height='20' src='img/attention_icon.png'>");
			}
	    	
		}
		

		if(localStorage.getItem("destination")!="editIntakeItem"){
			if(isNaN(pillQuantity)!=true && pillQuantity!=0)
			{
				//arrMedicineAndIntakeTimeInformation.push(getIntakeTimesInputValues(pillQuantity, selectedDate, iteration, medicineID));
				jsonObjIntakeTimeInformations.intakeTimes = getIntakeTimesInputValues(pillQuantity, selectedDate, 
						iteration, medicineID, selectedTime);
				$('#aMedicineQuantity').empty();
				isPillQuantityCorrect = true;
			}
			
			else {
				isPillQuantityCorrect = false;
				$('#aMedicineQuantity').empty();
				$('#aMedicineQuantity').append("<img class='imgAttention'width='200' height='20' src='img/attention_icon.png'>");
			}
			
			if(localStorage.getItem("intervalType") != "none" && $('#txtIteration').val()==""){
				$('#aInterval').empty();
				$('#aInterval').append("<img class='imgAttention'width='200' height='20' src='img/attention_icon.png'>");
				isIntervalCorrect = false;
			} else {
				$('#aInterval').empty();
				isIntervalCorrect  = true;
			}

			if(isPillQuantityCorrect==true && isIntervalCorrect == true){
				$('#saveStatusModal').click();
			}
		}
		
		
		
	})
	
	function getIntakeTimesInputValues(pillQuantity, selectedDate, iteration){
		var jsonObjSingleIntakeTime = "";
		if(clickedInterval=="weekly"){
			
			objSingleIntakeTime = new Object();
			objSingleIntakeTime.unixTimeStamp = (selectedDate.getTime()/1000);
			objSingleIntakeTime.pillQuantity = pillQuantity;
			jsonObjSingleIntakeTime = JSON.stringify(objSingleIntakeTime);
			arrIntakeTimes.push(jsonObjSingleIntakeTime);
			
			var newDate = new Date(selectedDate.getTime());
			for(var i=1;i<=(iteration-1);i++){
				objSingleIntakeTime = new Object();
				newDate.setDate(selectedDate.getDate() + ((i)*7));
				objSingleIntakeTime.unixTimeStamp =(newDate.getTime()/1000);
				objSingleIntakeTime.pillQuantity = pillQuantity;
				jsonObjSingleIntakeTime = JSON.stringify(objSingleIntakeTime);
				arrIntakeTimes.push(jsonObjSingleIntakeTime);
			}
		} else if(clickedInterval=="monthly"){
			objSingleIntakeTime = new Object();
			objSingleIntakeTime.unixTimeStamp = (selectedDate.getTime()/1000);
			objSingleIntakeTime.pillQuantity = pillQuantity;
			jsonObjSingleIntakeTime = JSON.stringify(objSingleIntakeTime);
			arrIntakeTimes.push(jsonObjSingleIntakeTime);
			
			var newDate = new Date(selectedDate.getTime());
			for(var i=1;i<iteration;i++){
				objSingleIntakeTime = new Object();
				newDate.setMonth(selectedDate.getMonth() + (i));
				objSingleIntakeTime.unixTimeStamp =(newDate.getTime()/1000);
				objSingleIntakeTime.pillQuantity = pillQuantity;
				jsonObjSingleIntakeTime = JSON.stringify(objSingleIntakeTime);
				arrIntakeTimes.push(jsonObjSingleIntakeTime);
			}
		} else if(clickedInterval=="daily"){
			objSingleIntakeTime = new Object();
			objSingleIntakeTime.unixTimeStamp = (selectedDate.getTime()/1000);
			objSingleIntakeTime.pillQuantity = pillQuantity;
			jsonObjSingleIntakeTime = JSON.stringify(objSingleIntakeTime);
			arrIntakeTimes.push(jsonObjSingleIntakeTime);
			
			for(var i=0;i<(iteration-1);i++){
				objSingleIntakeTime = new Object();
				objSingleIntakeTime.unixTimeStamp = (selectedDate.getTime()/1000)+((i+1)*86400);
				objSingleIntakeTime.pillQuantity = pillQuantity;
				jsonObjSingleIntakeTime = JSON.stringify(objSingleIntakeTime);
				arrIntakeTimes.push(jsonObjSingleIntakeTime);
			}
		} else {
			objSingleIntakeTime = new Object();
			objSingleIntakeTime.unixTimeStamp = selectedDate.getTime()/1000;
			objSingleIntakeTime.pillQuantity = pillQuantity;
			jsonObjSingleIntakeTime = JSON.stringify(objSingleIntakeTime);
			arrIntakeTimes.push(jsonObjSingleIntakeTime);
		}
		return arrIntakeTimes;
	}
	
	
	$('#btnSourceTypeDoctor').click(function(){
		localStorage.setItem("sourceType", "doctor");
		$("#btnSourceTypeDoctor").removeClass("btn btn-primary").addClass("btn btn-success");
		$("#btnSourceTypeDrugStore").removeClass("btn btn-success").addClass("btn btn-primary");
		$("#btnSourceTypeMisc").removeClass("btn btn-success").addClass("btn btn-primary");
	})
	
	$('#btnSourceTypeDrugStore').click(function(){
		localStorage.setItem("sourceType", "drugStore");
		$("#btnSourceTypeDrugStore").removeClass("btn btn-primary").addClass("btn btn-success");
		$("#btnSourceTypeDoctor").removeClass("btn btn-success").addClass("btn btn-primary");
		$("#btnSourceTypeMisc").removeClass("btn btn-success").addClass("btn btn-primary");
	})
	
	$('#btnSourceTypeMisc').click(function(){
		localStorage.setItem("sourceType", "misc");
		$("#btnSourceTypeDrugStore").removeClass("btn btn-success").addClass("btn btn-primary");
		$("#btnSourceTypeDoctor").removeClass("btn btn-success").addClass("btn btn-primary");
		$("#btnSourceTypeMisc").removeClass("btn btn-primary").addClass("btn btn-success");
	})
	
	
	
	/**
	 * addIntakeTime.html functions
	 */
	/*
	$('#btnSaveIntakeTime').click(function(){
		
		var arrIntakeTimes = [];
		var hours = "";
		var minutes = "";
		var objIntakeTime = new Object();
		var objSingleIntakeTime = new Object();
		var convertedTime = convertTo24Hour(selectedTime);
		
		var date = new Date();
		arrObjIntakeTime = [];
		
		
		if(convertedTime.charAt(1)!=":"){
			hours = convertedTime.substring(0,2);
			minutes=convertedTime.substring(3, convertedTime.length);
		} else {
			hours = convertedTime.substring(0,1);
			minutes = convertedTime.substring(2, convertedTime.length);
		}
		
		
	
		selectedDate.setHours(hours);
		selectedDate.setMinutes(minutes);
		
		if(clickedInterval=="weekly"){
			for(var i=0;i<iteration;i++){
				objSingleIntakeTime = new Object();
				objSingleIntakeTime.unixTimeStamp =(selectedDate.getTime()/1000)+((i+1)*604800);
				//arrIntakeTimes.push((selectedDate.getTime()/1000)+((i+1)*604800));
				objSingleIntakeTime.pillQuantity = pillQuantity;
				arrIntakeTimes.push(objSingleIntakeTime);
			}	
		} else if(clickedInterval=="monthly"){
			for(var i=0;i<iteration;i++){
				objSingleIntakeTime = new Object();
				objSingleIntakeTime.unixTimeStamp = (selectedDate.getTime()/1000)+((i+1)*2629743);
				objSingleIntakeTime.pillQuantity = pillQuantity;
				arrIntakeTimes.push(objSingleIntakeTime);
				//arrIntakeTimes.push((selectedDate.getTime()/1000)+((i+1)*2629743));
			}
		} else if(clickedInterval=="daily"){
			for(var i=0;i<iteration;i++){
				objSingleIntakeTime = new Object();
				objSingleIntakeTime.unixTimeStamp = (selectedDate.getTime()/1000)+((i+1)*86400);
				objSingleIntakeTime.pillQuantity = pillQuantity;
				arrIntakeTimes.push(objSingleIntakeTime);
				//arrIntakeTimes.push((selectedDate.getTime()/1000)+((i+1)*86400));
			}
		} else {
			objSingleIntakeTime = new Object();
			objSingleIntakeTime.unixTimeStamp = selectedDate.getTime()/1000;
			objSingleIntakeTime.pillQuantity = pillQuantity;
			arrIntakeTimes.push(objSingleIntakeTime);
			//arrIntakeTimes.push((selectedDate.getTime()/1000));
		}
		
		if(localStorage.getItem("destination")=="addIntakeTime" || localStorage.getItem("destination")=="addOnlyIntakeTime"){
			if(localStorage.getItem("destination")=="addIntakeTime"){
				objIntakeTime.medicineID=getLastMedicineID()+1;	

				if(addMoreIntakeTime==false){
					saveMedicineInformation();
				} 
			} else {
				objIntakeTime.medicineID=localStorage.getItem("medicineID");
			}	
			
			objIntakeTime.intakeTime=arrIntakeTimes;

		    jsonObjectIntakeTime = JSON.stringify(objIntakeTime);	
		    alert(jsonObjectIntakeTime);
		    //arrObjIntakeTime.push(jsonObjectIntakeTime);

	    	createIntakeTimeInformation();
		} else {
	    	objEditedIntakeTime.intakeTimeID = localStorage.getItem('intakeTimeID');
	    	arrayEditedIntakeTime.push(objEditedIntakeTime);
	    	objEditedIntakeTime.intakeTime = selectedDate.getTime()/1000;
	    	
	    	editIntakeTime();
		}
	})*/
	
	
	function saveMedicineInformation(){
		objMedicineInformation.medicineName = localStorage.getItem("medicineName");
		objMedicineInformation.disease = localStorage.getItem("disease");
		objMedicineInformation.note = localStorage.getItem("note");
		objMedicineInformation.stock = localStorage.getItem("stock");
		objMedicineInformation.sendNotification = localStorage.getItem("sendNotification");
		objMedicineInformation.savetyStock = localStorage.getItem("savetyStock");
		objMedicineInformation.contactType = localStorage.getItem("contactType");
		objMedicineInformation.boxID = localStorage.getItem("boxID");
		objMedicineInformation.sourceType = localStorage.getItem("sourceType");
		
		if(localStorage.getItem("sendOrder") == "true"){
			objMedicineInformation.sendOrder = true;
		} else {
			objMedicineInformation.sendOrder = false;
		}
		
		
	    jsonObjMedicineInformation = JSON.stringify(objMedicineInformation);
	    console.log(jsonObjMedicineInformation);
		arrayObjectMedicineInformation.push(jsonObjMedicineInformation);
		createMedicineInformation();
	}
	
	function createIntakeTimeInformation() {
	    $.ajax({
	        type: 'POST',
	        contentType: 'application/json',
	        url: host+":"+port+"/smartmedicine/rest/medicineinformation/createIntakeTimeInformation",
	        dataType: "json",
	        data: JSON.stringify(jsonObjIntakeTimeInformations),
	        success: function(data, textStatus, jqXHR){
	        	var destination = localStorage.getItem("destination");
	        
	        	if(destination=="addOnlyIntakeTime"){
	        		localStorage.setItem("destination", "addIntakeTimeOverview");
	        		window.location = 'addIntakeTimeOverview.html';
	        	} else {
		        	localStorage.setItem("destination", "manageMedicine");
		        	window.location = "manageMedicine.html";
	        	}

	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            alert('Problem adding intakeTime: ' + textStatus+ " "+errorThrown);
	        }
	    });
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
		  
		  
			$( "#alarm1" ).timeDropper();
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
	
		$('#txtStartDate').val(today);
	}
	
	$('#btnSaveContactPerson').click(function(){
		//this part will be triggered, when the user is editing the contact person
		var isFirstNameFieldCorrect = true;
		var isSecondNameFieldCorrect = true;
		var isEmailFieldCorrec = true;
		var allFieldsCorrect = true;
		
		if($('#txtName').val()==""){
			isFirstNameFieldCorrect = false;
			$('#aFirstName').empty();
			$('#aFirstName').append("<img class='imgAttention'width='200' height='20' src='img/attention_icon.png'>");
		}  else {
			isFirstNameFieldCorrect = true;
			$('#aFirstName').empty();
		}
		
		if($('#txtSurname').val()==""){
			isSecondNameFieldCorrect = false;
			$('#aSecondName').empty();
			$('#aSecondName').append("<img class='imgAttention'width='200' height='20' src='img/attention_icon.png'>");
		} else {
			isSecondNameFieldCorrect = true;
			$('#aSecondName').empty();
		}
		
		if($('#txtEmail').val()==""){
			isEmailFieldCorrec = false;
			$('#aEmail').empty();
			$('#aEmail').append("<img class='imgAttention'width='200' height='20' src='img/attention_icon.png'>");
		} else {
			$('#aEmail').empty();
			isEmailFieldCorrec = true;
		}
		
		if(localStorage.getItem("psychologicalParentID")!=null){
			if(isEmailFieldCorrec==true && isSecondNameFieldCorrect == true && isFirstNameFieldCorrect == true){
				objCreateContactPerson.name=$('#txtName').val();
				objCreateContactPerson.surname=$('#txtSurname').val();
				objCreateContactPerson.email=$('#txtEmail').val();
				objCreateContactPerson.sex=localStorage.getItem("sex");
				objCreateContactPerson.id = localStorage.getItem("psychologicalParentID");
				objCreateContactPerson.contactType = localStorage.getItem("contactType");
				objCreateContactPerson.recieveNotification = localStorage.getItem("recieveNotification");
				
				editPsychologicalParent();
			}
			
		} 
		//this part will be triggered, when the user is adding a new contact person 
		else {
			if(isEmailFieldCorrec==true && isSecondNameFieldCorrect == true && isFirstNameFieldCorrect == true){
				objCreateContactPerson.name=$('#txtName').val();
				objCreateContactPerson.surname=$('#txtSurname').val();
				objCreateContactPerson.email=$('#txtEmail').val();
				objCreateContactPerson.sex=localStorage.getItem("sex");
				objCreateContactPerson.contactType = localStorage.getItem("contactType");
				objCreateContactPerson.recieveNotification = localStorage.getItem("recieveNotification");
				createContactPerson(objCreateContactPerson);
			}
			
		}
		
	})
	
	function createContactPerson(x){
		    $.ajax({
		        type: 'POST',
		        async:false,
		        contentType: 'application/json',
		        url: host+":"+port+"/smartmedicine/rest/medicineinformation/createContactPerson",
		        dataType: "json",
		        data: JSON.stringify(x),
		        success: function(data, textStatus, jqXHR){
		        	$('#btnShowPsychologicalParentSaveModal').trigger("click");
		        	setTimeout(function () {
		        		$('#btnCloseModalPsychologicalParent').trigger("click");
		            }, 2000);
		        },
		        error: function(jqXHR, textStatus, errorThrown){
		            alert('Fehler beim Speichern der Kontaktpersondaten aufgetreten: ' + textStatus);
		        }
		    });
	}


	$('#btnCloseModalPsychologicalParent').click(function(){
		console.log(localStorage.getItem("destination"));
		if(localStorage.getItem("destination") ==  "addPsychologicalParent"){
			window.location = "managePsychologicalParent.html";
		} else {
			localStorage.setItem("destination", "editPsychologicalParent");
			window.location = "editPsychologicalParent.html";
		}
		
	})
	
	$('#btnDaily').click(function(){
		localStorage.setItem("intervalType", "daily");
		clickedInterval = "daily";
		$('#txtIteration').attr('disabled', false);
		$("#btnDaily").removeClass("btn btn-primary").addClass("btn btn-success"); 
		$("#btnWeekly").removeClass("btn btn-success").addClass("btn btn-primary");
		$("#btnMonthly").removeClass("btn btn-success").addClass("btn btn-primary");
		$("#btnNoInterval").removeClass("btn btn-success").addClass("btn btn-primary");
	})
	
	$('#btnWeekly').click(function(){
		localStorage.setItem("intervalType", "weekly");
		clickedInterval = "weekly";
		$('#txtIteration').attr('disabled', false);
		$("#btnWeekly").removeClass("btn btn-primary").addClass("btn btn-success");
		$("#btnDaily").removeClass("btn btn-success").addClass("btn btn-primary"); 
		$("#btnMonthly").removeClass("btn btn-success").addClass("btn btn-primary");
		$("#btnNoInterval").removeClass("btn btn-success").addClass("btn btn-primary");
	})
	
	$('#btnMonthly').click(function(){
		localStorage.setItem("intervalType", "monthly");
		clickedInterval = "monthly";
		$('#txtIteration').attr('disabled', false);
		$("#btnMonthly").removeClass("btn btn-primary").addClass("btn btn-success");
		$("#btnDaily").removeClass("btn btn-success").addClass("btn btn-primary");
		$("#btnWeekly").removeClass("btn btn-success").addClass("btn btn-primary");
		$("#btnNoInterval").removeClass("btn btn-success").addClass("btn btn-primary");
		
	})
	
	$('#btnNoInterval').click(function(){
		localStorage.setItem("intervalType", "none");
		clickedInterval = "none";
		$('#txtIteration').attr('disabled', true);
		$("#btnNoInterval").removeClass("btn btn-primary").addClass("btn btn-success"); 
		$("#btnDaily").removeClass("btn btn-success").addClass("btn btn-primary");
		$("#btnWeekly").removeClass("btn btn-success").addClass("btn btn-primary");
		$("#btnMonthly").removeClass("btn btn-success").addClass("btn btn-primary");
	})
	
	/**
	 * addMedicineInformation.html functions for the first and second page
	 */
		
	$("#btnSaveMedicineInformation").click(function(){
		objMedicineInformation.medicineName = localStorage.getItem("medicineName");
		objMedicineInformation.disease = localStorage.getItem("disease");
		objMedicineInformation.note = localStorage.getItem("note");
		objMedicineInformation.stock = localStorage.getItem("stock");
		objMedicineInformation.boxID = localStorage.getItem("boxID");
		objMedicineInformation.sourceType = localStorage.getItem("sourceType");
		
		if(localStorage.getItem("sendOrder") == "true"){
			objMedicineInformation.sendOrder = true;
		} else {
			objMedicineInformation.sendOrder = false;
		}
		

	    jsonObjMedicineInformation = JSON.stringify(objMedicineInformation);
		
		arrayObjectMedicineInformation.push(jsonObjMedicineInformation);
		createMedicineInformation();
	})
	
	
	$('#btnAddMedicineForwardFirst').click(function(){
		
		var isMedicineNameCorrect = true;
		var isDiseaseCorrect = true;
		
		if($('#txtMedicineName').val() != ""){
			isMedicineNameCorrect = true;
			$('#aMedicineName').empty();
		} else {
			isMedicineNameCorrect = false;
			$('#aMedicineName').empty();
			$('#aMedicineName').append("<img class='imgAttention'width='200' height='20' src='img/attention_icon.png'>");
		}
		
		
		
		if($('#txtDisease').val() != ""){
			isDiseaseCorrect = true;
			$('#aDisease').empty();
		} else {
			isDiseaseCorrect = false;
			$('#aDisease').empty();
			$('#aDisease').append("<img class='imgAttention' src='img/attention_icon.png'>");
		}
		
		if(isMedicineNameCorrect == true && isDiseaseCorrect == true){
			localStorage.setItem("disease", $('#txtDisease').val());
			localStorage.setItem("medicineName", $('#txtMedicineName').val());
			localStorage.setItem("destination","addMedicine2");
			localStorage.getItem("boxID");
			window.location = 'addMedicine2.html';
		}
		/*if(medicineName!=""){
			
		/*} else {
			console.log("affe");
		}*/
		
	})
	
	$('#btnContactTypePrivate').click(function(){
		localStorage.setItem("contactType", "private");
		$("#btnContactTypePrivate").removeClass("btn btn-primary").addClass("btn btn-success");
		$("#btnContactTypeDoctor").removeClass("btn btn-success").addClass("btn btn-primary");
		$("#btnContactTypeMisc").removeClass("btn btn-success").addClass("btn btn-primary");
	})
	
	$('#btnBox1').click(function(){
		localStorage.setItem("boxID", 1);
		$("#btnBox1").removeClass("btn btn-primary").addClass("btn btn-success");
		$("#btnBox2").removeClass("btn btn-success").addClass("btn btn-primary");
		$("#btnBox3").removeClass("btn btn-success").addClass("btn btn-primary");
	})
	
	$('#btnBox2').click(function(){
		localStorage.setItem("boxID", 2);
		$("#btnBox2").removeClass("btn btn-primary").addClass("btn btn-success");
		$("#btnBox1").removeClass("btn btn-success").addClass("btn btn-primary");
		$("#btnBox3").removeClass("btn btn-success").addClass("btn btn-primary");
	})
	
		
	$('#btnBox3').click(function(){
		localStorage.setItem("boxID", 3);
		$("#btnBox3").removeClass("btn btn-primary").addClass("btn btn-success");
		$("#btnBox2").removeClass("btn btn-success").addClass("btn btn-primary");
		$("#btnBox1").removeClass("btn btn-success").addClass("btn btn-primary");
	})
	
	
	$('#btnContactTypeDoctor').click(function(){
		localStorage.setItem("contactType", "doctor");
		$("#btnContactTypeDoctor").removeClass("btn btn-primary").addClass("btn btn-success");
		$("#btnContactTypePrivate").removeClass("btn btn-success").addClass("btn btn-primary");
		$("#btnContactTypeMisc").removeClass("btn btn-success").addClass("btn btn-primary");
	})
	
	$('#btnContactTypeMisc').click(function(){
		localStorage.setItem("contactType", "misc");
		$("#btnContactTypeMisc").removeClass("btn btn-primary").addClass("btn btn-success");
		$("#btnContactTypePrivate").removeClass("btn btn-success").addClass("btn btn-primary");
		$("#btnContactTypeDoctor").removeClass("btn btn-success").addClass("btn btn-primary");
	})
	
	$('#btnSendMailYes').click(function(){
		localStorage.setItem("recieveNotification", true);
		$("#btnSendMailYes").removeClass("btn btn-primary").addClass("btn btn-success");
		$("#btnSendMailNo").removeClass("btn btn-success").addClass("btn btn-primary");
	})
	
	$('#btnSendMailNo').click(function(){
		localStorage.setItem("recieveNotification", false);
		$("#btnSendMailNo").removeClass("btn btn-primary").addClass("btn btn-success");
		$("#btnSendMailYes").removeClass("btn btn-success").addClass("btn btn-primary");
	})
	
	$('#btnFemale').click(function(){
		localStorage.setItem("sex", "female");
		$("#btnFemale").removeClass("btn btn-primary").addClass("btn btn-success"); 
		$("#btnMale").removeClass("btn btn-success").addClass("btn btn-primary");
	})
	
	$('#btnMale').click(function(){
		localStorage.setItem("sex", "male");
		
		$("#btnFemale").removeClass("btn btn-success").addClass("btn btn-primary");
		$("#btnMale").removeClass("btn btn-primary").addClass("btn btn-success");
	})
	
	$('#btnImportant').click(function(){
		localStorage.setItem("sendNotification", true);
		$("#btnImportant").removeClass("btn btn-primary").addClass("btn btn-success");
		$("#btnNormal").removeClass("btn btn-success").addClass("btn btn-primary");
		
		if(localStorage.getItem("contactType")=="none"){
			$("#btnContactTypeMisc").click(); 
		}
		
		
		$('#divContactPerson').show();
	})
	
	$('#btnNormal').click(function(){
		localStorage.setItem("contactType", "none");
		localStorage.setItem("sendNotification", false);
		$("#btnImportant").removeClass("btn btn-success").addClass("btn btn-primary");      
		$("#btnNormal").removeClass("btn btn-primary").addClass("btn btn-success");
		$('#divContactPerson').hide();
	})
	
	
	$('#btnAddMedicineForwardSecond').click(function(){
		var isStockCorrect = true;
		var isNoteCorrect = true;
		var isSendOrder = true;
		var isSavetyStockCorrect = true;
		
		if($("#txtStock").val()!=""){
			isStockCorrect = true;
			$('#stock').empty();
		} else {
			isStockCorrect = false;
			$('#stock').empty();
			$('#stock').append("<img class='imgAttention' src='img/attention_icon.png'>");
		}
		
		if($("#txtNote").val()!=""){
			isNoteCorrect = true;
			$('#note').empty();
		} else {
			isNoteCorrect = false;
			$('#note').empty();
			$('#note').append("<img class='imgAttention' src='img/attention_icon.png'>");
		}
		
		if(localStorage.getItem("sendOrder") == "true"){
			if($('#txtSavetyStock').val() == ""){
				isSavetyStockCorrect = false;
				$('#savetyStock').empty();
				$('#savetyStock').append("<img class='imgAttention' src='img/attention_icon.png'>");
			}	else {
				if(parseInt($('#txtSavetyStock').val()) >= parseInt($('#txtStock').val())){
					isSavetyStockCorrect = false;
					$('#savetyStock').empty();
					$('#savetyStock').append("<img class='imgAttention' src='img/attention_icon.png'>");
				} else {
					$('#savetyStock').empty(); 
					isSavetyStockCorrect = true;
					
				}
			}
		} else {
			$('#txtSavetyStock').val(0);
			isSendOrder = true;
		}
		
		if(isStockCorrect == true && isNoteCorrect == true && isSavetyStockCorrect == true){
			localStorage.setItem("note", $("#txtNote").val());
			localStorage.setItem("stock", $("#txtStock").val());
			if($("#txtSavetyStock").val()==""){
				localStorage.setItem("savetyStock", 0);
			} else {
				localStorage.setItem("savetyStock", $("#txtSavetyStock").val());
			}
			
			localStorage.setItem("destination", "addIntakeTime");
			window.location = 'addIntakeTime.html';
		}
	})
	
	$('#btnCloseEditMedicineModal').click(function(){
		localStorage.setItem("destination", "editMedicineInformationOverview");
		window.location = "editMedicine.html";
	})
	
	function saveEditMedicineInformation() {
	    $.ajax({
	        type: 'POST',
	        contentType: 'application/json',
	        url: host+":"+port+"/smartmedicine/rest/medicineinformation/editMedicineInformation",
	        dataType: "json",
	        data: JSON.stringify(objEditMedicineInformation),
	        success: function(data, textStatus, jqXHR){
	        	var stock = parseInt(objEditMedicineInformation.stock);
	        	var savetyStock = parseInt(objEditMedicineInformation.savetyStock);
	        	if(stock>savetyStock){
	        		turnOffStockNotificationLED(objEditMedicineInformation.boxID, "OFF");
	        	}
	        	$('#btnOpenEditMedicineModal').trigger("click"); 
	        	
	        	setTimeout(function () {
	        		localStorage.clear();
	        		$('#btnCloseEditMedicineModal').trigger("click");
	            }, 2000);
	        	
	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            console.log('Problem adding medicine information: ' + textStatus+ " "+jqXHR+" "+errorThrown);
	        }
	    });
	}
	
	function turnOffStockNotificationLED(ledID, ledStatus)
	{
	    var request = $.ajax
	    ({
	        type       : "GET",
	        url        : host+':'+port+'/CMD?ledNumber='+ledID+'&ledStatus='+ledStatus
	    });

	    request.done( function(data) 
	    { 
	    	
	    });

	    request.fail( function(jqXHR, textStatus ) 
	    { 
	        console.log( "Failure: " + textStatus );
	    });
	}
	
	function createMedicineInformation() {
	    $.ajax({
	        type: 'POST',
	        contentType: 'application/json',
	        url: host+":"+port+"/smartmedicine/rest/medicineinformation/createMedicineInformation",
	        dataType: "json",
	        data: JSON.stringify(arrayObjectMedicineInformation),
	        success: function(data, textStatus, jqXHR){
	        	jsonObjIntakeTimeInformations.medicineID=0;	
	        	createIntakeTimeInformation();
	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            console.log('Problem adding medicine information: ' + textStatus+ " "+jqXHR+" "+errorThrown);
	        }
	    });
	}
	
	/**
	 * intakeTimeOverview.html functions
	 */
	
	
	/*function loadContactPersonInformation(){
		 var isInformationAvailable = false;
		 $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
			    		if(data.name != null){
			    			$('#txtName').val(data.name);
			    			$('#txtSurname').val(data.surname);
			    			$('#txtEmail').val(data.email);
			    			
			    			if(data.sex=="male"){
			    				$('#btnMale').click();
			    			} else {
			    				$('#btnFemale').click();
			    			}
			    			
			    			isInformationAvailable = true;
			    		} else {
			    			$('#btnMale').click();
			    		}
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getContactPerson'
		});
		
	}*/
	
	function loadIntakeTimeOverviewTable() {
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    
			    success: function(data) {
			    	for(var i=0;i<data.intaketime.length;i++){
			    		var unparsedDate = new Date();
			    		unparsedDate.setTime(data.intaketime[i].intakeTime*1000);
			    		var dayName = parseDayToDayName(unparsedDate.getDay());
			    		var monthName = parseMonthToMonthName(unparsedDate.getMonth());
			    		var date = ""+dayName+", den "+unparsedDate.getDate()+" "+monthName;
			    		var time = ""+parseHour(unparsedDate.getHours())+":"+parseMinute(unparsedDate.getMinutes());
			    		
			    		
			    		var notificationTrigegered = "";
			    		var intakeStatus = "";
			  
			    		if(data.intaketime[i].notificationTriggered==true){
			    			notificationTrigegered = "Ausgelöst";
			    			console.log(data.intaketime[i].intakeTriggered);
			    			if(data.intaketime[i].intakeTriggered==true){
			    				intakeStatus = "Eingenommen"
			    			} else {
			    				intakeStatus = "Einnahme verpasset"
			    			}
			    		} else {
			    			notificationTrigegered = "Ausstehend";
			    			intakeStatus = "Ausstehend"
			    		}
			    		
			    		console.log("no"+notificationTrigegered+ " intake "+intakeStatus);
			    		
			    		
			    		
			    		$("<tr><td><font>"+date+"</font></td>" 
			    		+ "<td><font>"+time+"</font></td>" 
			    		+ "<td><font>asdf</font></td>" 
			    		+ "<td><font>eins</font></td>" +
			    		+ "<td><font>zwei</font></td></tr>").appendTo("table[id='example']");
			    		
			    	}		    
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getIntakeTimeByMedicineID/'+localStorage.getItem('medicineID')
			});
	};
	
	/**
	 * editIntakeTime functions
	 */
	
	function editIntakeTime() {
	    $.ajax({
	        type: 'POST',
	        contentType: 'application/json',
	        url: host+":"+port+"/smartmedicine/rest/medicineinformation/editIntakeTime",
	        dataType: "json",
	        data: JSON.stringify(arrayEditedIntakeTime),
	        success: function(data, textStatus, jqXHR){
	        	localStorage.setItem('destination', "editIntakeTimeOverview");
	        	window.location = 'editIntakeTimeOverview.html';
	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            alert('addWine error: ' + textStatus);
	        }
	    });
	}
	
	function editPsychologicalParent() {
	    $.ajax({
	        type: 'POST',
	        contentType: 'application/json',
	        url: host+":"+port+"/smartmedicine/rest/medicineinformation/editPsychologicalParent",
	        dataType: "json",
	        data: JSON.stringify(objCreateContactPerson),
	        success: function(data, textStatus, jqXHR){
	        	$('#btnShowPsychologicalParentSaveModal').trigger("click");
	        	setTimeout(function () {
	        		$('#btnCloseModalPsychologicalParent').trigger("click");
	            }, 2000);
	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            alert('addWine error: ' + textStatus);
	        }
	    });
	}
	
	/**
	 * editIntakeTime.html function
	 */
	function loadEditIntakeTimeOverviewTable() {
		  $.ajax({
			    dataType: 'json',
			    async:false,
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
			    		+ "<td align='center'><button value="+data.intaketime[i].intakeTimeID+" id='editIntakeTime"+i+"' type='button' class='btn btn-custom btn-warning'><img class='btnClass' src='img/edit_icon.png'/></button></td></tr>").appendTo("table[id='example']");
			    		
			    		$("#editIntakeTime"+i).unbind('click').click(function () {
				    		init_value = ($(this).val());
				    		localStorage.setItem('intakeTimeID', init_value);	
				    		localStorage.setItem('destination', "editIntakeItem");	
				    		window.location = 'addIntakeTime.html';
			    		});

			    	}		    
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getIntakeTimeByMedicineID/'+localStorage.getItem('medicineID')
			});
	};
	
	
	/**
	 * deleteIntakeTime.html function
	 * 
	 */
	function loadDeleteIntakeTimeTable() {
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
			    	if(data.intaketime.length != 0){
				    	for(var i=0;i<data.intaketime.length;i++){
				    		var unparsedDate = new Date();
				    		unparsedDate.setTime(parseInt(data.intaketime[i].intakeTime)*1000);
				    		
				    		var dayName = parseDayToDayName(unparsedDate.getDay());
				    		var monthName = parseMonthToMonthName(unparsedDate.getMonth());
				    		var date = ""+dayName+", den "+unparsedDate.getDate()+" "+monthName;
				    		var time = ""+parseHour(unparsedDate.getHours())+":"+parseMinute(unparsedDate.getMinutes());
				    		
				    		$("<tr><td><font>"+date+"</font></td>" 
				    		+ "<td><font>"+time+"</font></td>" 
				    		+ "<td align='center'><button value="+data.intaketime[i].intakeTimeID+" id='deleteIntakeTime"+i+"' type='button' class='btn btn-custom btn-danger'>" +
				    				"<img src='img/delete_icon.png' class='btnClass'/></button></td></tr>").appendTo("table[id='example']");
				    		
				    		$("#deleteIntakeTime"+i).unbind('click').click(function () {
					    		init_value = ($(this).val());
					    		deleteIntakeTimeInformation(init_value);
					    		window.location = 'deleteIntakeTime.html';
				    		});
				    	}	
			    	} else {
			    		localStorage.setItem("destination", "deleteIntakeTimeSortMedicine");
			    		window.location = 'deleteIntakeTimeSortMedicine.html';
			    	}
	    
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getIntakeTimeByMedicineID/'+localStorage.getItem('medicineID')
			});
	};
	
	function deleteIntakeTimeInformation(intakeTimeID) {
		$.ajax({
	        type: 'DELETE',
	        async: false,
	        contentType: 'application/json',
	        url: host+':'+port+'/smartmedicine/rest/medicineinformation/deleteIntakeTimeInformation/'+intakeTimeID,
	        dataType: "json",
	        success: function(data, textStatus, jqXHR){
	            
	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            alert('Intake time information could be deleted');
	        }
	    });
	}
	
	
	
	/*
	 * medicineOverview.html functions
	 */
	

	
	function loadMedicineOverviewTable() {
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
			    	for(var i=0;i<data.medicine.length;i++){
			    		var intakeTimes = countIntakeTimeIDs(data.medicine[i].id);
			    		var buttonIntakeTime ="";
			    		if(intakeTimes>0){
			    			buttonIntakeTime="<td align='center'><button width='40' heigth='40' value="+data.medicine[i].id+" id='intakeTime"+i+"' type='button' class='btn btn-primary custom' style='background: url(img/calendar_2.png) no-repeat;'><font style='color:blue'>"+intakeTimes+"</font></button></td></tr>";
			    		} else {
			    			buttonIntakeTime="<td align='center'><button value="+data.medicine[i].id+" id='intakeTime"+i+"' type='button' class='btn btn-primary custom' style='background: url(img/calendar_2.png) no-repeat;' disabled><font style='color:blue'>"+intakeTimes+"</font></button></td></tr>";
			    		}
			    		
			    		$("<tr><td><font>"+data.medicine[i].medicineName+"</font></td>"  
			            + "<td><font>"+data.medicine[i].disease+"</font></td>"
			            + "<td align='center'><button value="+data.medicine[i].id+" id='medicineInformation"+i+"' type='button' class='btn btn-custom btn-success'>" +
	    				"<img class='btnClass' src='img/zoom_icon.png' width='40' heigth='40'/></button></td></tr>").appendTo("table[id='example']");
					    
			    		$("#intakeTime"+i).unbind('click').click(function () {
				    		init_value = ($(this).val());
				    		localStorage.setItem('medicineID', init_value);
				    		localStorage.setItem('destination', "medicineOverviewIntakeTime");
				    		window.location = 'intakeTimeOverview.html';
			    		});
			    		
			    		$("#medicineInformation"+i).unbind('click').click(function () {
				    		init_value = ($(this).val());
				    		localStorage.setItem('medicineID', init_value);
				    		localStorage.setItem('destination', "medicineDetailedInformation");
				    		window.location = 'medicineInformation.html';
			    		});
			    	}		    
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getMedicineInformation'
			});
	};
	
	
	function loadMedicineOverviewIntakeTime() {
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
			    	for(var i=0;i<data.medicine.length;i++){
			    		var intakeTimes = countIntakeTimeIDs(data.medicine[i].id);
			    		var buttonIntakeTime ="";
			    		if(intakeTimes>0){
			    			buttonIntakeTime="<td align='center'><button width='40' heigth='40' value="+data.medicine[i].id+" id='intakeTime"+i+"' type='button' class='btn btn-primary btn-custom'><font style='color:white'>"+intakeTimes+"</font></button></td>";
			    		} else {
			    			buttonIntakeTime="<td align='center'><button value="+data.medicine[i].id+" id='intakeTime"+i+"' type='button' class='btn btn-primary btn-custom' disabled><font style='color:white'>"+intakeTimes+"</font></button></td>";
			    		}
			    		
			    		$("<tr><td><font>"+data.medicine[i].medicineName+"</font></td>"  
			            + "<td><font>"+data.medicine[i].disease+"</font></td>"
			    		+ buttonIntakeTime).appendTo("table[id='example']");
					    
			    		$("#intakeTime"+i).unbind('click').click(function () {
				    		init_value = ($(this).val());
				    		localStorage.setItem('medicineID', init_value);
				    		localStorage.setItem('destination', "medicineOverviewIntakeTime");
				    		window.location = 'intakeTimeOverview.html';
			    		});
			    		
			    		$("#medicineInformation"+i).unbind('click').click(function () {
				    		init_value = ($(this).val());
				    		localStorage.setItem('medicineID', init_value);
				    		localStorage.setItem('destination', "medicineDetailedInformation");
				    		window.location = 'medicineInformation.html';
			    		});
			    	}		    
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getMedicineInformation'
			});
	};
	
	
	function loadContactPersonOverviewTable() {
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
			    	for(var i=0;i<data.psychologicalParent.length;i++){
			    		
			    		$("<tr><td><font>"+data.psychologicalParent[i].surname+"</font></td>" +
			    		  "<td><font>"+data.psychologicalParent[i].name+"</font></td>" +
			    		  "<td align='center'><button value="+data.psychologicalParent[i].id+" id='contactPersonInformation"+i+"' " +
			    		  "type='button' class='btn btn-custom btn-success'><img class='btnClass' src='img/zoom_icon.png' width='40' heigth='40'/></button></td></tr>").appendTo("table[id='example']");
			    		
			    		$("#contactPersonInformation"+i).unbind('click').click(function () {
				    		init_value = ($(this).val());
				    		localStorage.setItem("psychologicalParentID", init_value);
				    		localStorage.setItem("destination", "contactPersonInformation");
				    		window.location = "contactPersonInformation.html";
				    		
			    		});
			    	}	
			    	
			    	
			    	
			    	
			    	
			    	
			    	
			    	
			    	
		    	
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getContactPerson'
			});
	};
	
	function laodEditMedicineInformation(){
		var newObjMedicineInformation = new Object();
		var destination = localStorage.getItem("destination");
		newObjMedicineInformation = getMedicineInformationByMedicineID();
		console.log(localStorage.getItem("sendNotification"));
		if(destination=="editMedicine"){
			
			var boxID = parseInt(newObjMedicineInformation.boxID);
			localStorage.setItem("oldBoxID", boxID);
			
			$("#btnBox"+boxID).addClass("btn btn-danger");
		
			$("#btnBox"+boxID).empty();	
			$("#btnBox"+boxID).append("<img class='interval' src='img/sockel"+boxID+"_belegt.png'></img></button>");
			
			$("#btnBox"+boxID).click();
			

			for(i=1;i<=3;i++){
				if(boxID!=i){
					$("#btnBox"+i).addClass("btn btn-primary");
					$("#btnBox"+i).empty();
					$("#btnBox"+i).append("<img class='interval' src='img/sockel"+i+".png'></img></button>");
				}
				
				
			}
			/*
			for(k = 1; k<= 3;k++){
				if(isInArray(k, getActiveMedicineBoxes())==true){
					$("#btnBox"+k).addClass("btn btn-danger");
					$("#btnBox"+k).prop("disabled",true);
					$("#btnBox"+k).empty();	
					$("#btnBox"+k).append("<img class='interval' src='img/box"+k+"_belegt.png'></img></button>");
					
					
				} else {
					$("#btnBox"+k).click();
					$("#btnBox"+k).addClass("btn btn-primary");
					$("#btnBox"+k).empty();
					$("#btnBox"+k).append("<img class='interval' src='img/box"+k+".png'></img></button>");
				}
			}*/
			
			
			
			//this part will be triggered, when the user clicked back on the second edit medicine site and was redirected to the first add medicine page
			//last edit values from the user will be loaded by the localStorage 
			if(localStorage.getItem("medicineName")!=null && localStorage.getItem("disease")!=null) {
				$('#txtMedicineName').val(localStorage.getItem("medicineName"));
				$("#txtDisease").val(localStorage.getItem("disease"));
				
				if(localStorage.getItem("sendNotification")==true || localStorage.getItem("sendNotification")=="true"){
					$('#btnImportant').trigger("click");
				} else {
					$('#btnNormal').trigger("click");
				}

				if(localStorage.getItem("contactType")=="private"){
					$("#btnContactTypePrivate").trigger("click");
				} else if(localStorage.getItem("contactType")=="doctor"){
					$("#btnContactTypeDoctor").trigger("click");
				} else{
					$("#btnContactTypeMisc").trigger("click");
				}
			} 
			
			// this spart will be triggered, when the edit informations are loaded the first time
			// input fields will be loaded by the values from the database 
			else {
				$('#txtMedicineName').val(newObjMedicineInformation.medicineName);
				$("#txtDisease").val(newObjMedicineInformation.disease);
				if(newObjMedicineInformation.sendNotification==true){
					$('#btnImportant').trigger("click");
				} else {
					$('#btnNormal').trigger("click");
				}

				if(newObjMedicineInformation.contactType=="private"){
					$("#btnContactTypePrivate").trigger("click");
				} else if(newObjMedicineInformation.contactType=="doctor"){
					$("#btnContactTypeDoctor").trigger("click");
				} else{
					$("#btnContactTypeMisc").trigger("click");
				}
			}
			
			
			
			//
			$('#tdForwardFirstAddMedicine').empty();
			$('#tdForwardFirstAddMedicine').append("<button id='btnAddMedicineForwardFirst' class='btn btn-lg btn-warning' value='editMedicine2'><font class='fontButtonNavigation'>weiter</font></button>");
			
			$('#btnAddMedicineForwardFirst').click(function(){
				var isMedicineNameCorrect = true;
				var isDiseasseCorrect = true;
				
				if($("#txtMedicineName").val()==""){
					isMedicineNameCorrect = false;
				} else {
					$('#aMedicineName').empty();
					isMedicineNameCorrect = true;
				}
				
				if($("#txtDisease").val() == ""){
					isDiseasseCorrect = false;
				} else {
					$('#aDisease').empty();
					isDiseasseCorrect = true;
				}
				
				if(isDiseasseCorrect==true && isMedicineNameCorrect == true){
					localStorage.setItem("destination", $(this).val());
					localStorage.setItem("medicineName", $("#txtMedicineName").val());
					localStorage.setItem("disease", $("#txtDisease").val());
					window.location = "addMedicine2.html";
				} else {
					if(isMedicineNameCorrect==false){
						$('#aMedicineName').empty();
						$('#aMedicineName').append("<img class='imgAttention'width='200' height='20' src='img/attention_icon.png'>");
					} 
					
					if(isDiseasseCorrect==false){
						$('#aDisease').empty();
						$('#aDisease').append("<img class='imgAttention'width='200' height='20' src='img/attention_icon.png'>");
					}
					
				}
				
			})
			
			//changing the original button redirect destination to the editMedicineOverview.html destination
			$('#tdBackFirstAddMedicine').empty();
			$('#tdBackFirstAddMedicine').append("<button id='btnBackToEditMedicineOverview' class='btn btn-lg btn-primary'><font class='fontButtonNavigation'>zurück</font></button>")
			$('#btnBackToEditMedicineOverview').click(function(){
				localStorage.clear();
				localStorage.setItem("destination", "editMedicineInformationOverview");
				window.location = "editMedicine.html";
			})
			
		} 
		
		
		// this part will be triggered, when the destination is the second add medicine information page
		else {

			var isNoteCorrect = true;
			var isStockCorrect = true;
			var isSavetyStockCorrect = true;
			
			
			
			if(localStorage.getItem("sourceType")!=null){
				if(localStorage.getItem("sourceType")=="misc"){
					$('#btnSourceTypeMisc').click();
				} else if(localStorage.getItem("sourceType")=="doctor"){
					$('#btnSourceTypeDoctor').click();
				} else {
					$('#btnSourceTypeDrugStore').click();
				}
			} else {
				if(newObjMedicineInformation.sourceType == "misc"){
					$('#btnSourceTypeMisc').click();
				} else if(newObjMedicineInformation.sourceType == "doctor"){
					$('#btnSourceTypeDoctor').click();
				} else {
					$('#btnSourceTypeDrugStore').click();
				}
			} 
			

		
			if(localStorage.getItem("sendOrder") != null){
				if(localStorage.getItem("sendOrder") == "true"){
					$("#btnSendOrderYes").click();
				} else{
					$("#btnSendOrderNo").click();
				}
			} else {
				if(newObjMedicineInformation.sendOrder == true){
					$('#btnSendOrderYes').click();
				} else {
					$('#btnSendOrderNo').click();
				}
			}
				
				
			if(localStorage.getItem("stock")==null && localStorage.getItem("savetyStock")==null && localStorage.getItem("note")==null){
				$('#txtNote').val(newObjMedicineInformation.note);
				$('#txtStock').val(newObjMedicineInformation.stock);
				$('#txtSavetyStock').val(newObjMedicineInformation.savetyStock);
			} else {
				$('#txtNote').val(localStorage.getItem("note"));
				$('#txtStock').val(localStorage.getItem("stock"));
				$('#txtSavetyStock').val(localStorage.getItem("savetyStock"));
			}
			
			$('#tdBackToFirstAddMedicine').empty();
			$('#tdBackToFirstAddMedicine').append("<button value='backFromEditMedicine' id='btnBackToFirstAddMedicine' class='btn btn-lg btn-primary'><font class='fontButtonNavigation'>zurück</font></button>");
			
			$('#btnBackToFirstAddMedicine').click(function(){
				localStorage.setItem("destination", "editMedicine");
				localStorage.setItem("note", $('#txtNote').val());
				localStorage.setItem("stock", $('#txtStock').val());
				localStorage.setItem("savetyStock", $('#txtSavetyStock').val());

				window.location = "addMedicine.html";
			})
			
			$('#tdAddMedicineForwardSecond').empty();
			$('#tdAddMedicineForwardSecond').append("<button id='btnSaveEditMedicineInformation' class='btn btn-lg btn-success'><font class='fontButtonNavigation'>speichern</font></button>");
			$('#btnSaveEditMedicineInformation').click(function(){
				
				
				
				
				if($('#txtNote').val()==""){
					$('#note').empty();
					$('#note').append("<img class='imgAttention'width='200' height='20' src='img/attention_icon.png'>");
					isNoteCorrect = false;
				} else {
					$('#note').empty();
					isNoteCorrect = true;
				}

				if($('#txtStock').val()==""){
					$('#stock').empty();
					$('#stock').append("<img class='imgAttention'width='200' height='20' src='img/attention_icon.png'>");
					isStockCorrect = false;
				} else {
					$('#stock').empty();
					isStockCorrect = true;
				}
				
				if($('#txtSavetyStock').val()==""){
					if(localStorage.getItem("sendOrder") == "true"){
						isSavetyStockCorrect = false;
						$('#savetyStock').empty();
						$('#savetyStock').append("<img class='imgAttention'width='200' height='20' src='img/attention_icon.png'>");
					} else {
						$('#txtSavetyStock').val(0);
						isSavetyStockCorrect = true;
					}
				} else {
					var stock = parseInt($('#txtStock').val());
					var savetyStock = parseInt($('#txtSavetyStock').val());
					if(savetyStock>stock){
						isSavetyStockCorrect = false;
						$('#savetyStock').empty();
						$('#savetyStock').append("<img class='imgAttention'width='200' height='20' src='img/attention_icon.png'>");	
					} else {
						$('#savetyStock').empty();
						isSavetyStockCorrect = true;
					}
				}
				
				if(isNoteCorrect == true && isStockCorrect == true && isSavetyStockCorrect == true){
					localStorage.setItem("note", $('#txtNote').val());
					localStorage.setItem("stock", $('#txtStock').val());
					localStorage.setItem("savetyStock", $('#txtSavetyStock').val());
					
					createEditMedicineInformationObject();
				}
				
			})
		}
	}
	
	function createEditMedicineInformationObject(){
		objEditMedicineInformation = new Object();
		objEditMedicineInformation.medicineName = localStorage.getItem("medicineName");
		objEditMedicineInformation.disease = localStorage.getItem("disease");
		objEditMedicineInformation.sendNotification = localStorage.getItem("sendNotification");	
		objEditMedicineInformation.contactType = localStorage.getItem("contactType");
		objEditMedicineInformation.note = localStorage.getItem("note");
		objEditMedicineInformation.stock = localStorage.getItem("stock");
		objEditMedicineInformation.savetyStock = localStorage.getItem("savetyStock");
		objEditMedicineInformation.id = localStorage.getItem("medicineID");
		objEditMedicineInformation.boxID = localStorage.getItem("boxID");
		objEditMedicineInformation.oldBoxID = localStorage.getItem("oldBoxID");
		objEditMedicineInformation.sourceType = localStorage.getItem("sourceType");
		objEditMedicineInformation.sendOrder = localStorage.getItem("sendOrder");
		saveEditMedicineInformation();
	}
	
	
	
	function getMedicineInformationByMedicineID() {
		objMedicineInformation = new Object();
		$.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
			    	objMedicineInformation.sendNotification = data.sendNotification;
			    	objMedicineInformation.medicineName = data.medicineName;
			    	objMedicineInformation.disease = data.disease;
			    	objMedicineInformation.stock = data.stock;
			    	objMedicineInformation.savetyStock = data.savetyStock;
			    	objMedicineInformation.contactType = data.contactType;
			    	objMedicineInformation.note = data.note;
			    	objMedicineInformation.boxID = data.boxID;
			    	objMedicineInformation.sendOrder = data.sendOrder;
			    	objMedicineInformation.sourceType = data.sourceType;
			    },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getMedicineInformationByMedicineID/'+localStorage.getItem("medicineID")
			});
		return objMedicineInformation;
	};
	
	function getMedicineInformation() {
		objMedicineInformation = new Object();
		arrMedicineInformationObj = [];
		$.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {	       
			    	
			    	if(data.medicine.length!=0){
			    		for(var i=0;i<data.medicine.length;i++){
			    			objMedicineInformation.boxID = data.medicine[i].boxID;
			    			objMedicineInformation.savetyStock = data.medicine[i].savetyStock;
			    			objMedicineInformation.stock = data.medicine[i].stock;
			    			arrMedicineInformationObj.push(objMedicineInformation);
				    	}		
			    	} else {
			    		
			    	}
			    	    
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getMedicineInformation'
			});
		return arrMedicineInformationObj;
	};
	
	
	
	function loadMedicineDetailedInformation() {
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
			    	var intakeTimes = countIntakeTimeIDs(data.id);
			    	var notificationTriggered = loadMedicineIntakeTimeInformation().notificationTriggered;
			    	var notificationNotTriggered = loadMedicineIntakeTimeInformation().notificationNotTriggered;
			    	var intakeTriggered = loadMedicineIntakeTimeInformation().intakeTriggered;
			    	var intakeMissed = loadMedicineIntakeTimeInformation().intakeMissed;
			    	var intakeNotTriggered = loadMedicineIntakeTimeInformation().intakeNotTriggered;
			    	var sendNotification = "";
			    	var contactType = "";
			    	
			    	if(data.contactType=="misc"){
			    		contactType = "Sonstige";
			    	} else if(data.contactType=="doctor"){
			    		contactType = "Arzt";
			    	} else if(data.contactType=="private"){
			    		contactType = "Privat";
			    	} else {
			    		contactType = "Nicht hinterlegt";
			    	}
			    	
			    	
			    	if(data.sendNotification==true){
			    		sendNotification = "wird gesendet";
			    	} else {
			    		sendNotification = " wird nicht gesendet";
			    	}
			    	
			    	 $('#tdNotificationTriggered').append(notificationTriggered);
			    	 $('#tdIntakeTriggered').append(intakeTriggered);
			    	 $('#tdIntakeMissed').append(intakeMissed);

			    	 $('#tdMedicineName').append(data.medicineName);
			    	 $('#tdDisease').append(data.disease);
			    	 $('#tdStock').append(data.stock);
			    	 $('#tdIntakeTimes').append(intakeTimes);
			    	 $('#tdPertinence').append(sendNotification);
			    	 $('#tdSavetyStock').append(data.savetyStock);
			    	 $('#tdContactType').append(contactType);
			    	  
			    	 
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getMedicineInformationByMedicineID/'+localStorage.getItem("medicineID")
			});
	};
	
	/*
	 * deleteMedicine.html functions
	 */
	function loadDeleteMedicineInformationTable() {
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
			    	//this part will be triggered, when NO all medicine informations are deleted
			    	if(data.medicine.length==0){
			    		localStorage.setItem("destination", "manageMedicine");
			    		window.location = "manageMedicine.html";
			    	} 
			    	
			    	//this part will be triggered, when NOT ALL medicine informations are deleted
			    	else {
				    	for(var i=0;i<data.medicine.length;i++){
				    		var intakeTimes = countIntakeTimeIDs(data.medicine[i].id);
				    		var buttonIntakeTime ="";
				    		if(intakeTimes>0){
				    			buttonIntakeTime="<td align='center'><button width='40' heigth='40' value="+data.medicine[i].id+" id='intakeTime"+i+"' type='button' class='btn btn-primary custom' style='background: url(img/calendar_2.png) no-repeat;'><font style='color:blue'>"+intakeTimes+"</font></button></td>";
				    		} else {
				    			buttonIntakeTime="<td align='center'><button value="+data.medicine[i].id+" id='intakeTime"+i+"' type='button' class='btn btn-primary custom' style='background: url(img/calendar_2.png) no-repeat;' disabled><font style='color:blue'>"+intakeTimes+"</font></button></td>";
				    		}
				    		
				    		$("<tr><td><font>"+data.medicine[i].medicineName+"</font></td>"  
				    		+ "<td><font>"+data.medicine[i].disease+"</font></td>"  
				    		+ "<td align='center'><button value="+data.medicine[i].id+" id='deleteMedicine"+i+"' type='button' class='btn btn-custom btn-danger'><img class='btnClass' src='img/delete_icon.png' /></button></td>").appendTo("table[id='example']");
						    
				    		$("#intakeTime"+i).unbind('click').click(function () {
					    		init_value = ($(this).val());
					    		localStorage.setItem('medicineID', init_value);
					    		localStorage.setItem('destination', "deleteIntakeTime");
					    		window.location ='deleteIntakeTime.html';
				    		});
				    		
				    		$("#deleteMedicine"+i).unbind('click').click(function () {
					    		init_value = ($(this).val());
					    		localStorage.setItem("medicineID", init_value);
					    		var boxID = getMedicineInformationByMedicineID().boxID;
					    		deleteMedicineInformation(init_value, boxID);
					    		window.location ='deleteMedicine.html';
				    		});
				    	}	
			    	}
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getMedicineInformation'
			});
	};
	
	
	function loadDeleteIntakeTimeInformationTable() {
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
			    	//this part will be triggered, when NO all medicine informations are deleted
			    	if(data.medicine.length==0){
			    		localStorage.setItem("destination", "manageMedicine");
			    		window.location = "manageMedicine.html";
			    	} 
			    	
			    	//this part will be triggered, when NOT ALL medicine informations are deleted
			    	else {
				    	for(var i=0;i<data.medicine.length;i++){
				    		var intakeTimes = countIntakeTimeIDs(data.medicine[i].id);
				    		var buttonIntakeTime ="";
				    		if(intakeTimes>0){
				    			buttonIntakeTime="<td align='center'><button width='40' heigth='40' value="+data.medicine[i].id+" id='intakeTime"+i+"' type='button' class='btn btn-custom btn-primary'><font style='color:white'>"+intakeTimes+"</font></button></td></tr>";
				    		} else {
				    			buttonIntakeTime="<td align='center'><button value="+data.medicine[i].id+" id='intakeTime"+i+"' type='button' class='btn btn-primary btn-custom' disabled><font style='color:white'>"+intakeTimes+"</font></button></td></tr>";
				    		}
				    		
				    		$("<tr><td><font>"+data.medicine[i].medicineName+"</font></td>"  
				            + "<td><font>"+data.medicine[i].disease+"</font></td>"  
				    		+ buttonIntakeTime).appendTo("table[id='example']");
						    
				    		$("#intakeTime"+i).unbind('click').click(function () {
					    		init_value = ($(this).val());
					    		localStorage.setItem('medicineID', init_value);
					    		localStorage.setItem('destination', "deleteIntakeTime");
					    		window.location ='deleteIntakeTime.html';
				    		});
				    		
				    		$("#deleteMedicine"+i).unbind('click').click(function () {
					    		init_value = ($(this).val());
					    		deleteMedicineInformation(init_value);
					    		window.location ='deleteMedicine.html';
				    		});
				    	}	
			    	}
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getMedicineInformation'
			});
	};
	
	
	function loadDeletePsychologicalParent() {
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
			    	
			    	if(data.psychologicalParent.length!=0){
			    		for(var i=0;i<data.psychologicalParent.length;i++){
					    	  console.log(data.psychologicalParent[i].id);
					    		$("<tr><td><font>"+data.psychologicalParent[i].surname+"</font></td>"  
					    		+ "<td><font>"+data.psychologicalParent[i].name+"</font></td>" 
					    		+ "<td align='center'><button value="+data.psychologicalParent[i].id+" id='deletePsychologicalParent"+i+"' type='button' class='btn btn-custom btn-danger'>" +
					    		"<img class='btnClass' src='img/delete_icon.png' width='40' heigth='40'/></button></td></tr>").appendTo("table[id='example']");
					    		
					    		$("#deletePsychologicalParent"+i).unbind('click').click(function () {
					    			init_value = ($(this).val());
					    			deletePsychologicalPerson(init_value);
						    		
						    		window.location ='deleteContactPerson.html';
					    		});
					    	}    
			    	} else {
			    		localStorage.setItem("destination", "managePsychologicalParent");
			    		window.location ='managePsychologicalParent.html';
			    	}
			    	
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getContactPerson'
			});
	};
	
	
	function loadEditPsychologicalParent() {
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
			    	
			    	for(var i=0;i<data.psychologicalParent.length;i++){
			    	  console.log(data.psychologicalParent[i].id);
			    		$("<tr><td><font>"+data.psychologicalParent[i].surname+"</font></td>"  
			    		+ "<td><font>"+data.psychologicalParent[i].name+"</font></td>" 
			    		+ "<td align='center'><button value="+data.psychologicalParent[i].id+" id='editPsychologicalParent"+i+"' type='button' class='btn btn-custom btn-warning'>" +
			    		"<img class='btnClass' src='img/edit_icon.png'/></button></td></tr>").appendTo("table[id='example']");
			    		
			    		$("#editPsychologicalParent"+i).unbind('click').click(function () {
			    			init_value = ($(this).val());
			    			
			    			localStorage.setItem("psychologicalParentID",init_value);
			    			localStorage.setItem("destination", "fromEditPsychologicalParent")
			    			window.location = "psychologicalParent.html"
				    		
			    		});
			    		

			    	}    
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getContactPerson'
			});
	};
	
	function loadEditPsychologicalParentInformation() {
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
			    		$("#txtName").val(data.name);
			    		$("#txtSurname").val(data.surname);
			    		$("#txtEmail").val(data.email);
			    		
			    		if(data.sex=="male"){
			    			$('#btnMale').trigger("click");
			    		} else {
			    			$('#btnFemale').trigger("click");
			    		}
			    		
			    		if(data.recieveNotification == true){
			    			$("#btnSendMailYes").trigger("click");
			    		} else {
			    			$("#btnSendMailNo").trigger("click");
			    		}
			    		
			    		if(data.contactType == "private"){
			    			$("#btnContactTypePrivate").trigger("click"); 
			    		} else if(data.contactType == "doctor"){
			    			$("#btnContactTypeDoctor").trigger("click"); 
			    		} else {
			    			$("#btnContactTypeMisc").trigger("click"); 
			    		}
			    		
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getPsychologicalParentByPsychologicalParentID/'+localStorage.getItem("psychologicalParentID")
			});
	};
	

	function loadContactPersonInformation() {
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
			    	var contactType = data.contactType;
			    	
			    	$('#tdSurname').append(data.surname);
			    	$('#tdName').append(data.name);
			    	if(data.sex == "male"){
			    		$('#tdSex').append("Herr");
			    	} else {
			    		$('#tdSex').append("Frau");
			    	}
			    	
			    	if(contactType == "doctor"){
			    		$("#tdContactType").append("Arzt");
			    	} else if(contactType=="misc"){
			    		$("#tdContactType").append("Sonstige");
			    	} else {
			    		$("#tdContactType").append("Privat");
			    	}
			    	
			    	
			    	
			    	
			    	
			    	
			    	$("#tdEmail").append(data.email);
			    	if(data.recieveNotification == true){
			    		$("#tdRecieveNotification").append("Wenn eine wichtige Einnahme vergessen wurde, dann wird eine E-Mail gesendet");
			    	} else {
			    		$("#tdRecieveNotification").append("Wenn eine wichtige Einnahme vergessen wurde, dann wird keine E-Mail gesendet");
			    	}
			    	
			    		
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getPsychologicalParentByPsychologicalParentID/'+localStorage.getItem("psychologicalParentID")
			});
	};

	
	function loadMedicineIntakeTimeInformation() {
		  var objMedicineIntakeTimeInformation = new Object();
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
		    		var notificationTriggered = 0;
		    		var notificationNotTriggered = 0;
		    		   		
		    		var intakeTriggered = 0;
		    		var intakeMissed = 0;
		    		var intakeNotTriggered = 0;
			    	for(var i=0;i<data.intaketime.length;i++){

			    		if(data.intaketime[i].notificationTriggered==true){
			    			notificationTriggered = notificationTriggered +1;
			    			
			    			if(data.intaketime[i].intakeTriggered==true){
			    				intakeTriggered = intakeTriggered +1;
			    			} else {
			    				intakeMissed = intakeMissed +1;
			    			}
			    		} else {
			    			notificationNotTriggered = notificationNotTriggered +1;
			    			intakeNotTriggered = intakeNotTriggered +1;
			    		}
			    	}
					  objMedicineIntakeTimeInformation.notificationTriggered=notificationTriggered;
					  objMedicineIntakeTimeInformation.notificationNotTriggered=notificationNotTriggered;
					  objMedicineIntakeTimeInformation.intakeTriggered=intakeTriggered;
					  objMedicineIntakeTimeInformation.intakeMissed=intakeMissed;
					  objMedicineIntakeTimeInformation.intakeNotTriggered=intakeNotTriggered;
				   },
				    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getIntakeTimeByMedicineID/'+localStorage.getItem('medicineID')
		});
		  
		
		  
		  return objMedicineIntakeTimeInformation;
		  
		  
	};
	
	
	
	function loadIntakeTimeOverview2() {
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
			    	for(var i=0;i<data.intaketime.length;i++){
			    		var unparsedDate = new Date();
			    		unparsedDate.setTime(data.intaketime[i].intakeTime*1000);
			    		var dayName = parseDayToDayName(unparsedDate.getDay());
			    		var monthName = parseMonthToMonthName(unparsedDate.getMonth());
			    		var date = ""+dayName+", den "+unparsedDate.getDate()+" "+monthName;
			    		var time = ""+parseHour(unparsedDate.getHours())+":"+parseMinute(unparsedDate.getMinutes());
			    		
			    		var nofiticationStatus = "";
			    		var intakeStatus = "";
			  
			    		if(data.intaketime[i].notificationTriggered==true){
			    			nofiticationStatus = "Ausgelöst";
			    			if(data.intaketime[i].intakeTriggered==true){
			    				intakeStatus = "Eingenommen"
			    			} else {
			    				intakeStatus = "Einnahme verpasset"
			    			}
			    		} else {
			    			nofiticationStatus = "Ausstehend";
			    			intakeStatus = "Ausstehend"
			    		}
			    		
			    		$("<tr><td><font>" +date+"</font></td>"+
			    		  "<td><font>"+time+"</td>" +
			    		  "<td><font>"+data.intaketime[i].pillQuantity+"</td>" +
			    		  "<td><font>"+nofiticationStatus+"</font></td>" +
			    		  "<td><font>"+intakeStatus+"</font></td></tr>").appendTo("table[id='example']");
			    	}		    
				   },
				    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getIntakeTimeByMedicineID/'+localStorage.getItem('medicineID')
			});
	};
	
	
	function deletePsychologicalPerson(psychologicalParentID) {
		$.ajax({
	        type: 'DELETE',
	        async:false,
	        contentType: 'application/json',
	        url: host+':'+port+'/smartmedicine/rest/medicineinformation/deletePsychologicalPerson/'+psychologicalParentID,
	        dataType: "json",
	        success: function(data, textStatus, jqXHR){
	            
	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            alert('Medicine information could be deleted');
	        }
	    });
	}
	
	function deleteMedicineInformation(medicineID, boxID) {
		$.ajax({
	        type: 'DELETE',
	        async:false,
	        contentType: 'application/json',
	        url: host+':'+port+'/smartmedicine/rest/medicineinformation/deleteMedicineInformation/'+medicineID,
	        dataType: "json",
	        success: function(data, textStatus, jqXHR){
	        	turnOffStockNotificationLED(boxID, "OFF");
	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            alert('Medicine information could be deleted');
	        }
	    });
	}
	
	
	/*
	 * editMedicine.html functions
	 */
	function loadEditMedicineInformationTable() {
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {	       
			    	for(var i=0;i<data.medicine.length;i++){
			    		var intakeTimes = countIntakeTimeIDs(data.medicine[i].id);
			    		var buttonIntakeTime ="";
			    		if(intakeTimes>0){
			    			buttonIntakeTime="<td align='center'><button width='40' heigth='40' value="+data.medicine[i].id+" id='intakeTime"+i+"' type='button' class='btn btn-primary btn-custom' ><font style='color:white'>"+intakeTimes+"</font></button></td>";
			    		} else {
			    			buttonIntakeTime="<td align='center'><button value="+data.medicine[i].id+" id='intakeTime"+i+"' type='button' class='btn btn-primary btn-custom' disabled><font style='color:white'>"+intakeTimes+"</font></button></td>";
			    		}
			    		
			    		$("<tr><td><font>"+data.medicine[i].medicineName+"</font></td>"  
			    		+ "<td><font>"+data.medicine[i].disease+"</font></td>"
			    		+ "<td align='center'><button value="+data.medicine[i].id+" id='editMedicine"+i+"' type='button' class='btn btn-custom btn-warning'>" +
			    				"<img class='btnClass' src='img/edit_icon.png'/></button></td>").appendTo("table[id='example']");
					    
			    		$("#intakeTime"+i).unbind('click').click(function () {
				    		init_value = ($(this).val());
				    		localStorage.setItem('medicineID', init_value);
				    		localStorage.setItem('destination', "editIntakeTimeOverview");
				    		window.location = 'editIntakeTimeOverview.html';
			    		});
			    		
			    		$("#editMedicine"+i).unbind('click').click(function () {
				    		init_value = ($(this).val());
				    		localStorage.setItem('medicineID', init_value);
				    		localStorage.setItem('destination', "editMedicine");
				    		window.location = "addMedicine.html";
				    		
				    		
			    		});
			    	}		    
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getMedicineInformation'
			});
	};
	
	function loadEditIntakeTimeOverviewTable_2() {
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {	       
			    	for(var i=0;i<data.medicine.length;i++){
			    		var intakeTimes = countIntakeTimeIDs(data.medicine[i].id);
			    		var buttonIntakeTime ="";
			    		if(intakeTimes>0){
			    			buttonIntakeTime="<td align='center'><button width='40' heigth='40' value="+data.medicine[i].id+" id='intakeTime"+i+"' type='button' class='btn btn-primary btn-custom' ><font style='color:white'>"+intakeTimes+"</font></button></td></tr>";
			    		} else {
			    			buttonIntakeTime="<td align='center'><button value="+data.medicine[i].id+" id='intakeTime"+i+"' type='button' class='btn btn-primary btn-custom'  disabled><font style='color:white'>"+intakeTimes+"</font></button></td></tr>";
			    		}
			    		
			    		$("<tr><td><font>"+data.medicine[i].medicineName+"</font></td>"  
			    		+ "<td><font>"+data.medicine[i].disease+"</font></td>" 
			    		+ buttonIntakeTime).appendTo("table[id='example']");
					    
			    		$("#intakeTime"+i).unbind('click').click(function () {
				    		init_value = ($(this).val());
				    		localStorage.setItem('medicineID', init_value);
				    		localStorage.setItem('destination', "editIntakeTimeOverview");
				    		window.location = 'editIntakeTimeOverview.html';
			    		});
			    		
			    		$("#editMedicine"+i).unbind('click').click(function () {
				    		init_value = ($(this).val());
				    		localStorage.setItem('medicineID', init_value);
				    		localStorage.setItem('destination', "editMedicine");
				    		window.location = "addMedicine.html";
				    		
				    		
			    		});
			    	}		    
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getMedicineInformation'
			});
	};
	
	
	/*
	 * General functions
	 */
	function countIntakeTimeIDs(medicineID) {
		 var result = "";
		  $.ajax({
			    async: false,  
			    dataType: 'json',
			    success: function(data) {
			    	result = data.intaketime.length;
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getIntakeTimeByMedicineID/'+medicineID
			});	  
		  return result;
	};
	
	
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
		if(hour<10){
			newHour = "0"+hour;
		} else {
			newHour = hour;
		}
		return newHour;
	}
	
	function parseMinute(minute){

		var newMinute;
		if(minute<10){
			newMinute = "0"+minute;
		} else {
			newMinute = minute;
		}
		return newMinute;
	}
	
	function convertTo24Hour(time) {
	    
		
		var hours = parseInt(time.substr(0, 2));
	    if(time.indexOf('am') != -1 && hours == 12) {
	        time = time.replace('12', '0');
	    }
	    if(time.indexOf('pm')  != -1 && hours < 12) {
	        time = time.replace(hours, (hours + 12));
	    }
	    return time.replace(/(am|pm)/, '').trim();
		
		
	}
	
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
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getMedicineInformation'
			});
		  return result;
	};
	
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
			    		newObjIntakeTime.pillQuantity = data.intaketime[i].pillQuantity;
			    	}		    
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getIntakeTimeByIntakeTimeID/'+localStorage.getItem('intakeTimeID')
			});
		  return newObjIntakeTime;
	};
	
	function intakeTimeByMedicineID() {
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
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getIntakeTimeByMedicineID/'+localStorage.getItem('medicineID')
			});
		  return newObjIntakeTime;
	};
	
	
	function getContactPerson() {
		  var listContactPerson = [];
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
			    		for(var i=0;i<data.psychologicalParent.length;i++){
			    			objContactPerson = new Object();
			    			objContactPerson.surname = data.psychologicalParent[i].surname;
			    			listContactPerson.push(objContactPerson);
			    		}	
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getContactPerson'
			})
		  return listContactPerson;
	}
	
	function getIntakeAllTimes() {
		  var listIntakeTime = [];
		  var objAllIntakeTimes = new Object();
		  $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
			    		for(var i=0;i<data.intaketime.length;i++){
			    			objAllIntakeTimes = new Object();
			    			listIntakeTime.push(objAllIntakeTimes);
			    		}	
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getIntakeTimeInformation'
			})
		  return listIntakeTime;
	}
});
 