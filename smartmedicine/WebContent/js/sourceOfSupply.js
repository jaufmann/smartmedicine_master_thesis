/**
 * 
 */
$(document).ready(function(){
	var objSourceOfSupply = new Object();
	var listObjSourceOfSupply = [];
	var host = "http://"+window.location.hostname;
	var port = "8080";
	
	 /**
	 * 
	 * The function "bootstrap-table" is used to load the table with the informations from the database
	 * if it´s the "edit", "delete" or "overview" section of the source of supply feature
	 * if it´s the add section, so the  the misc and recieve emails button will be clicked automatically
	 * 
	*/
	
	$('#bootstrap-table').ready(function() {
		var destination = localStorage.getItem("destination");
		$('#btnShowSourceOfSupplyStatusModal').trigger("click");
		
		if(destination=="editSourceOfSupply" || destination == "deleteSourceOfSupply" || destination == "sourceOfSupplyOverview"){
			if(destination == "deleteSourceOfSupply"){
				loadSourceOfSupplyDeleteTable();
			}else if(destination=="editSourceOfSupply"){
				loadSourceOfSupplyEditTable();
			} else if(destination=="sourceOfSupplyOverview"){
				loadSourceOfSupplyOverviewTable();
			}
			
			$('#example').DataTable( {	
		    	"lengthChange": false,
		    	 columnDefs: [
		             {
		                 targets: [0, 1, 2],
		                 className: 'mdl-data-table__cell--non-numeric'
		             }
		         ],
		    	"lengthMenu": [[2, 25, 50, -1], [3, 25, 50, "All"]],
		    } );	
			
		} else if(destination == "addSourceOfSupply"){
			$('#btnSourceTypeMisc').click();
			$('#btnDoNotRevieceMail').click();
		} else if(destination == "manageSourceOfSupply"){
			if(getSourceOfSupply().length==0){
				$('#btnSourceOfSupplyOverview').prop("disabled", true);
				$('#btnEditSourceOfSupply').prop("disabled", true);
				$('#btnDeleteSourceOfSupply').prop("disabled", true);
			}
		} else if(destination == "editInputFields"){
			$('#divHeader').empty();
			$('#divHeader').append("<img src='img/bezugsquelle_bearbeiten_logo_1.png'>");
			var sourceOfSupplyID = localStorage.getItem("sourceOfSupplyID");
			loadEditSourceOfSupplyFormularInformations(sourceOfSupplyID);
		} else if(destination == "sourceOfSupplyInformation"){
			loadSourceOfSupplyInformationTable();
		}
	})
	
	/**
	 * RECIEVE-MAIL
	 * Click-Functions for the recieve mail feature
	 */
	$('#btnRecieveMail').click(function(){
		localStorage.setItem("recieveMail", true);
		document.getElementById("btnRecieveMail").style.opacity = 1;
		document.getElementById("btnDoNotRevieceMail").style.opacity = 0.3;
	})
	
	$('#btnDoNotRevieceMail').click(function(){
		localStorage.setItem("recieveMail", false);
		document.getElementById("btnRecieveMail").style.opacity = 0.3;
		document.getElementById("btnDoNotRevieceMail").style.opacity = 1;
	})

	/**
	 * SOURCE-TYPE SELECTION
	 * Click-Functions for the source type selection
	*/
	$('#btnSourceTypeDoctor').click(function(){
		localStorage.setItem("sourceType", "doctor");
		document.getElementById("btnSourceTypeDoctor").style.opacity = 1;
		document.getElementById("btnSourceTypeDrugStore").style.opacity = 0.3;
		document.getElementById("btnSourceTypeMisc").style.opacity = 0.3;
	})
	
	$('#btnSourceTypeDrugStore').click(function(){
		localStorage.setItem("sourceType", "drugStore");
		document.getElementById("btnSourceTypeDrugStore").style.opacity = 1;
		document.getElementById("btnSourceTypeDoctor").style.opacity = 0.3;
		document.getElementById("btnSourceTypeMisc").style.opacity = 0.3;
	})
	
	$('#btnSourceTypeMisc').click(function(){
		localStorage.setItem("sourceType", "misc");
		document.getElementById("btnSourceTypeDrugStore").style.opacity = 0.3;
		document.getElementById("btnSourceTypeDoctor").style.opacity = 0.3;
		document.getElementById("btnSourceTypeMisc").style.opacity = 1;
	})
	
		
	 /**
	 * SAVE SOURCE OF SUPPLY
	 * Click-Functions for saving the source of supply
	 */
	
	function checkFields(){
		//this part will be triggered, when the user is editing the contact person
		var isNameFieldCorrect = true;
		var isAddressFieldCorrect = true;
		var isEmailFieldCorrect = true;
		
		if($('#txtName').val()==""){
			isNameFieldCorrect = false;
			$('#aErroIconNameField').empty();
			$('#aErroIconNameField').append("<img class='imgAttention'width='20' height='20' src='img/attention_icon.png'>");
		}  else {
			isNameFieldCorrect = true;
			$('#aErroIconNameField').empty();
		}
		
		if($('#txtAddress').val()==""){
			isAddressFieldCorrect = false;
			$('#aErroIconAddressField').empty();
			$('#aErroIconAddressField').append("<img class='imgAttention'width='20' height='20' src='img/attention_icon.png'>");
		} else {
			isSecondNameFieldCorrect = true;
			$('#aErroIconAddressField').empty();
		}
		
		if($('#txtEmail').val()==""){
			isEmailFieldCorrect = false;
			$('#aErroIconEmailField').empty();
			$('#aErroIconEmailField').append("<img class='imgAttention'width='20' height='20' src='img/attention_icon.png'>");
		} else {
			$('#aErroIconEmailField').empty();
			isEmailFieldCorrect = true;
		}
		
		if(isEmailFieldCorrect==true && isAddressFieldCorrect == true && isNameFieldCorrect == true){
			return true;
		} else {
			return false;
		}
	}
	$('#btnSaveSourceOfSupply').click(function(){
		if(checkFields()==true){
			var destination = localStorage.getItem("destination");
			
			objSourceOfSupply = new Object();
			objSourceOfSupply.name = $('#txtName').val();
			objSourceOfSupply.address = $('#txtAddress').val();
			objSourceOfSupply.email = $('#txtEmail').val();
			objSourceOfSupply.sourceType = localStorage.getItem("sourceType");
			objSourceOfSupply.recieveMail = localStorage.getItem("recieveMail");
			
			if(destination=="addSourceOfSupply"){
				createSourceOfSupply(objSourceOfSupply);
			} else {
				var sourceOfSupplyID = localStorage.getItem("sourceOfSupplyID");
				objSourceOfSupply.id = sourceOfSupplyID;
				editSourceOfSupply(objSourceOfSupply);
			}
		}
	})
	
	
	
	$('#btnCloseSourceOfSupplyStatusModal').click(function(){
		localStorage.setItem("destination", "manageSourceOfSupply");
		window.location = ' manageSourceOfSupply.html';
	});
	
	function deleteSourceOfSupply(sourceOfSupplyID) {
		$.ajax({
	        type: 'DELETE',
	        async: false,
	        contentType: 'application/json',
	        url: host+':'+port+'/smartmedicine/rest/medicineinformation/deleteSourceOfSupply/'+sourceOfSupplyID,
	        dataType: "json",
	        success: function(data, textStatus, jqXHR){
	            window.location = "deleteSourceOfSupply.html";
	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            alert('Intake time information could be deleted');
	        }
	    });
	}
	
	function loadSourceOfSupplyDeleteTable() {
		var listObjSourceOfSupply = getSourceOfSupply();
		if(listObjSourceOfSupply.length== 0){
			localStorage.setItem("destination", "manageSourceOfSupply");
			window.location = "manageSourceOfSupply.html";
		} else {
		   	for(var i=0;i<listObjSourceOfSupply.length;i++){	  
				var name = listObjSourceOfSupply[i].name;
				var sourceType = listObjSourceOfSupply[i].sourceType;
		   		var id = listObjSourceOfSupply[i].id;
		   		
		   		if(sourceType=="doctor"){
		   			sourceType="Arzt";
		   		} else if(sourceType=="drugStore"){
		   			sourceType="Apotheke";
		   		} else if(sourceType=="misc"){
		   			sourceType="Sonstige";
		   		}
				
		   		
		   		$("<tr><td><font>"+name+"</font></td>" 
		   		+ "<td><font>"+sourceType+"</font></td>" 
		   		+ "<td><button id='btnDeleteSourceOfSupply"+i+"' value="+id+" type='button' class='btn btn-custom btn-danger'>" 
		   		+ "<img src='img/delete_icon.png' width='40' heigth='40'/></button></td></tr>").appendTo("table[id='example']");
				    		
		   		$('#btnDeleteSourceOfSupply'+i).click(function(){
		   			var sourceOfSupplyID = $(this).val();
		   			deleteSourceOfSupply(sourceOfSupplyID);
		   		})
		   	}	
		}
	}
	

	function loadSourceOfSupplyOverviewTable() {
		var listObjSourceOfSupply = getSourceOfSupply();
		   	for(var i=0;i<listObjSourceOfSupply.length;i++){	  
				var name = listObjSourceOfSupply[i].name;
				var sourceType = listObjSourceOfSupply[i].sourceType;
		   		var id = listObjSourceOfSupply[i].id;
		   		
		   		if(sourceType=="doctor"){
		   			sourceType="Arzt";
		   		} else if(sourceType=="drugStore"){
		   			sourceType="Apotheke";
		   		} else if(sourceType=="misc"){
		   			sourceType="Sonstige";
		   		}
		   		
		   		$("<tr><td><font>"+name+"</font></td>" 
		   		+ "<td><font>"+sourceType+"</font></td>" 
		   		+ "<td><button id='btnSourceOfSupplyInformation"+i+"' value="+id+" type='button' class='btn btn-custom btn-success'>" 
		   		+ "<img src='img/zoom_icon.png' width='40' heigth='40'/></button></td></tr>").appendTo("table[id='example']");
				    		
		   		$('#btnSourceOfSupplyInformation'+i).click(function(){
		   			var sourceOfSupplyID = $(this).val();
		   			localStorage.setItem("destination", "sourceOfSupplyInformation");
		   			localStorage.setItem("sourceOfSupplyID", sourceOfSupplyID);
		   			window.location = "sourceOfSupplyInformation.html";
		   		})	
		}
	}
	
	function loadSourceOfSupplyEditTable() {
		var listObjSourceOfSupply = getSourceOfSupply();
		   	for(var i=0;i<listObjSourceOfSupply.length;i++){	  
				var name = listObjSourceOfSupply[i].name;
		   		var sourceType = listObjSourceOfSupply[i].sourceType;
		   		var id = listObjSourceOfSupply[i].id;
		   		
		   		if(sourceType=="doctor"){
		   			sourceType="Arzt";
		   		} else if(sourceType=="drugStore"){
		   			sourceType="Apotheke";
		   		} else if(sourceType=="misc"){
		   			sourceType="Sonstige";
		   		}
		   		
		   		$("<tr><td><font>"+name+"</font></td>" 
		   		+ "<td><font>"+sourceType+"</font></td>" 
		   		+ "<td><button id='btnEditSourceOfSupply"+i+"' value="+id+" type='button' class='btn btn-custom btn-warning'>" 
		   		+ "<img src='img/edit_icon.png' width='40' heigth='40'/></button></td></tr>").appendTo("table[id='example']");
				    		
		   		$('#btnEditSourceOfSupply'+i).click(function(){
		   			var sourceOfSupplyID = $(this).val();
		   			localStorage.setItem("destination", "editInputFields");
		   			localStorage.setItem("sourceOfSupplyID", sourceOfSupplyID);
		   			window.location = "addSourceOfSupply.html";
		   		})	
		}
	}
	
	
	function loadSourceOfSupplyInformationTable(){
		var sourceOfSupplyID = localStorage.getItem("sourceOfSupplyID");
		var objSourceOfSupply = getSourceOfSupplyBySourceOfSupplyID(sourceOfSupplyID);
		$('#tdName').append(objSourceOfSupply.name);
		$('#tdEmail').append(objSourceOfSupply.email);
		
		if(objSourceOfSupply.sourceType=="drugStore"){
			$('#tdSourceType').append("Apotheke");
		} else if(objSourceOfSupply.sourceType == "misc"){
			$('#tdSourceType').append("Sonstige");
		} else {
			$('#tdSourceType').append("Arzt");
		}
		
		
		if(objSourceOfSupply.recieveMail==true){
			$('#tdRecieveNotification').append("E-Mail wird gesendet");
		} else {
			$('#tdRecieveNotification').append("E-Mail wird nicht gesendet");
		}
		
		$('#tdAddress').append(objSourceOfSupply.address); 
		
	}

	
	function loadEditSourceOfSupplyFormularInformations(sourceOfSupplyID) {
		var objSourceOfSupply = getSourceOfSupplyBySourceOfSupplyID(sourceOfSupplyID);
		$('#txtName').val(objSourceOfSupply.name);
		$('#txtAddress').val(objSourceOfSupply.address);
		$('#txtEmail').val(objSourceOfSupply.email);
		
		if(objSourceOfSupply.sourceType=="misc"){
			$('#btnSourceTypeMisc').click();
		} else if(objSourceOfSupply.sourceType=="doctor"){
			$('#btnSourceTypeDoctor').click();
		} else if(objSourceOfSupply.sourceType=="drugStore"){
			$('#btnSourceTypeDrugStore').click();
		}
		
		if(objSourceOfSupply.recieveMail==true){
			$('#btnRecieveMail').click();
		} else {
			$('#btnDoNotRevieceMail').click();
		}
	}
	
	function getSourceOfSupplyBySourceOfSupplyID(sourceOfSupplyID){
		objSourceOfSupply = new Object();
		 $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
			    	objSourceOfSupply.name = data.name;
			    	objSourceOfSupply.address = data.address;
				   	objSourceOfSupply.email = data.email;
				   	objSourceOfSupply.sourceType = data.sourceType;
				  	objSourceOfSupply.recieveMail = data.recieveMail;
				    objSourceOfSupply.id = data.id;
			   },
		    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getSourceOfSupplyBySourceOfSupplyID/'+sourceOfSupplyID
		});
		return objSourceOfSupply;
	}
		
		
	function getSourceOfSupply(){
		 listObjSourceOfSupply = [];
		 $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
			    	for(var i=0;i<data.sourceOfSupply.length;i++){
			    		objSourceOfSupply = new Object();
			    		objSourceOfSupply.name = data.sourceOfSupply[i].name;
			    		objSourceOfSupply.address = data.sourceOfSupply[i].address;
				   		objSourceOfSupply.email = data.sourceOfSupply[i].email;
				   		objSourceOfSupply.sourceType = data.sourceOfSupply[i].sourceType;
				  		objSourceOfSupply.recieveMail = data.sourceOfSupply[i].recieveMail;
				    	objSourceOfSupply.id = data.sourceOfSupply[i].id;
				    	listObjSourceOfSupply.push(objSourceOfSupply);
				    }	
			    	
				   },
			    url: host+':'+port+'/smartmedicine/rest/medicineinformation/getSourceOfSupply'
			});
		 return listObjSourceOfSupply;
	}
	
	function createSourceOfSupply(objSourceOfSupply){
	    $.ajax({
	        type: 'POST',
	        async:false,
	        contentType: 'application/json',
	        url: host+":"+port+"/smartmedicine/rest/medicineinformation/createSourceOfSupply",
	        dataType: "json",
	        data: JSON.stringify(objSourceOfSupply),
	        success: function(data, textStatus, jqXHR){
	        	$('#btnShowSourceOfSupplySaveModal').trigger("click");
	        	setTimeout(function () {
	        		$('#btnCloseSourceOfSupplyStatusModal').trigger("click");
	            }, 2000);
	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            alert('Fehler beim Speichern der Bezugsquelle aufgetreten: ' + textStatus);
	        }
	    });
	}
	
	
	function editSourceOfSupply(objSourceOfSupply){
	    $.ajax({
	        type: 'POST',
	        async:false,
	        contentType: 'application/json',
	        url: host+":"+port+"/smartmedicine/rest/medicineinformation/editSourceOfSupply",
	        dataType: "json",
	        data: JSON.stringify(objSourceOfSupply),
	        success: function(data, textStatus, jqXHR){
	        	$('#btnShowSourceOfSupplySaveModal').trigger("click");
	        	setTimeout(function () {
	        		$('#btnCloseSourceOfSupplyStatusModal').trigger("click");
	            }, 2000);
	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            alert('Fehler beim Speichern der Bezugsquelle aufgetreten: ' + textStatus);
	        }
	    });
	}
})

