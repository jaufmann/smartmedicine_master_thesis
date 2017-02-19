/**
 * 
 */

$(document).ready(function() {

   

   
   $("#btnAddMedicineForwardSecond").click(function(event){
       $('#divContainer').load('addIntakeTime.html');
   });
   
   

   
  
   

   $("#btnAddIntakeTime").click(function(event){
       $('#divContainer').load('addIntakeTime.html');
   });
   
   $("#btnBackToIntakeTime").click(function(event){
       $('#divContainer').load('editMedicine.html');
   });
   
   $("#btnBackToDeleteMedicine").click(function(event){
       $('#divContainer').load('deleteMedicine.html');
   });


   
   $("#btnVisual").click(function(event){
       $('#divContainer').load('visual.html');
   });

   $("#btnAcoustical").click(function(event){
       $('#divContainer').load('acoustical.html');
   });
   
   $("#btnAddMedicineForwardFirst").click(function(event){
       $('#divContainer').load('addMedicine2.html');
   });
   	
   $("#btnBackToAddMedicine").click(function(event){
       $('#divContainer').load('acoustical.html');
   });
   
      
   $("#btnAddMedicineSecondBack").click(function(event){
       $('#divContainer').load('addMedicine.html');
   });
  
   
   $("#btnEinstellungen").click(function(event){
       $('#divContainer').load('einstellungen.html');
   });

   $("#btnManageContactPerson").click(function(event){
       $('#divContainer').load('manageContactPerson.html');
   });
   
   $("#btnStart").click(function(event){
       $('#mainContainer').load('start.html');
   });
   
   $("#btnBackToManageMedicine").click(function(event){
       $('#divContainer').load('manageMedicine.html');
   });
   
   
   $("#btnManageNotification").click(function(event){
       $('#divContainer').load('manageNotification.html');
   });
   

   

});