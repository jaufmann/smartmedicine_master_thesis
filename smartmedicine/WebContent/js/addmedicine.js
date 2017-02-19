/**
 * 
 */

$(function(){
	var objMedicineInformation = new Object();
	var arrayObjectMedicineInformation = [];
	var jsonObjMedicineInformation = "";
	
	$(document).ready(function(){
		$('#txtMedicineName').val(localStorage.getItem("medicineName"));
		$('#txtDisease').val(localStorage.getItem("disease"));
		$("#txtNote").val(localStorage.getItem("note"));
		$("#txtStock").val(localStorage.getItem("stock"));
	})
	
	
	$("#btnSaveMedicineInformation").click(function(){
		objMedicineInformation.medicineName = localStorage.getItem("medicineName");
		objMedicineInformation.disease = localStorage.getItem("disease");
		objMedicineInformation.note = localStorage.getItem("note");
		objMedicineInformation.stock = localStorage.getItem("stock");

	    jsonObjMedicineInformation = JSON.stringify(objMedicineInformation);
		
		arrayObjectMedicineInformation.push(jsonObjMedicineInformation);
		createMedicineInformation();
	})
	
	$('#btnAddMedicineForwardFirst').click(function(){
		localStorage.setItem("disease", $('#txtDisease').val());
		localStorage.setItem("medicineName", $('#txtMedicineName').val());
	})
	
	$('#btnAddMedicineForwardSecond').click(function(){
		localStorage.setItem("note", $("#txtNote").val());
		localStorage.setItem("stock", $("#txtStock").val());
		localStorage.setItem("destination", "addItem");
	})
	
	
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
})