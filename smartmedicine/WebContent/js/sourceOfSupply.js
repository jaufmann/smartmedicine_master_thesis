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
		
		if(destination=="editSourceOfSupply" || destination == "deleteSourceOfSupply" || destination == "sourceOfSupplyOverview"){
			if(destination == "deleteSourceOfSupply"){
				loadSourceOfSupplyDeleteTable();
			}
			
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
			
		} else if(destination == "addSourceOfSupply"){
			$('#btnSourceTypeMisc').click();
			$('#btnDoNotRevieceMail').click();
		} else if(destination == "manageSourceOfSupply"){
			if(getSourceOfSupply().length==0){
				$('#btnContactPersonOverview').prop("disabled", true);
				$('#btnEditPsychologicalParent').prop("disabled", true);
				$('#btnDeleteSourceOfSupply').prop("disabled", true);
			}
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
		localStorage.setItem("sourceType", "durgStore");
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
	 * SAVE SOURVE OF SUPPLY
	 * Click-Functions for saving the source of supply
	 */
	$('#btnSaveSourceOfSupply').click(function(){
		objSourceOfSupply = new Object();
		objSourceOfSupply.name = $('#txtName').val();
		objSourceOfSupply.address = $('#txtAddress').val();
		objSourceOfSupply.email = $('#txtEmail').val();
		objSourceOfSupply.sourceType = localStorage.getItem("sourceType");
		objSourceOfSupply.recieveMail = localStorage.getItem("recieveMail");
		createSourceOfSupply(objSourceOfSupply);
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
		   		
		   		$("<tr><td><font>"+name+"</font></td>" 
		   		+ "<td><font>"+sourceType+"</font></td>" 
		   		+ "<td><button id='btnDeleteSourceOfSupply"+i+"' value="+id+" type='button' class='btn btn-danger'>" 
		   		+ "<img src='img/delete_icon.png' width='40' heigth='40'/></button></td></tr>").appendTo("table[id='example']");
				    		
		   		$('#btnDeleteSourceOfSupply'+i).click(function(){
		   			var sourceOfSupplyID = $(this).val();
		   			deleteSourceOfSupply(sourceOfSupplyID);
		   		})
		   	}	
		}
	}
	
	
	function getSourceOfSupply(){
		 objSourceOfSupply = new Object();
		 listObjSourceOfSupply = [];
		 $.ajax({
			    dataType: 'json',
			    async:false,
			    success: function(data) {
			    	for(var i=0;i<data.sourceOfSupply.length;i++){
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
	        	$('#btnShowSourceOfSupplyStatusModal').trigger("click");
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

