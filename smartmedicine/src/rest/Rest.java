package rest;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.concurrent.ArrayBlockingQueue;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jettison.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import classes.ContactPerson;
import classes.IntakeTime;
import classes.Medicine;
import classes.NotificationSetting;
import classes.SourceOfSupply;
import database.DBStatements;


@Path("/medicineinformation")
public class Rest {
	  private DBStatements dbstatement = null;
	  private static JSONObject jsonObject = null;
	  
	  /**
	  * Gibt die Medikamenteninformationen in der Form eines JSON-Resonses zurück
	  *
	  * @return Ein JSON-Objekt mit den Medikamenteninformationen
	  *
	  */
	  
	  @GET
	  @Path("/getMedicineInformation")
	  @Produces("application/json")
	  public Response getMedicineInformation() throws JSONException, ClassNotFoundException, SQLException, IOException {
	  	jsonObject = new JSONObject();
	  	dbstatement = new DBStatements();
	  	
		jsonObject.put("medicine", dbstatement.getMedicineInformation());
		return Response.status(200).entity(jsonObject.toString()).build();
	  }
	  

	  
	  @GET
	  @Path("/getIntakeTimeByStartAndEndDate/{startDateUnix}/{endDateUnix}")
	  @Produces("application/json")
	  public Response getIntakeTimeByStartAndEndDatre(@PathParam("startDateUnix") int startDateUnix, @PathParam("endDateUnix") int endDateUnix) throws JSONException, ClassNotFoundException, SQLException, IOException {
		  	jsonObject = new JSONObject();
		  	dbstatement = new DBStatements();
		  	
			jsonObject.put("intakeTime", dbstatement.getIntakeTimeForVacation(startDateUnix, endDateUnix));
			return Response.status(200).entity(jsonObject.toString()).build();

	  }
	  
	  @GET
	  @Path("/setNotificationStatus/{intakeTimeID}/{notificationStatus}")
	  @Produces("application/json")
	  public String setNotificationStatus(@PathParam("intakeTimeID") int intakeTimeID, @PathParam("notificationStatus") int notificationStatus) throws JSONException, ClassNotFoundException, SQLException, IOException {
		  	jsonObject = new JSONObject();
		  	dbstatement = new DBStatements();
		  	
			dbstatement.setNotificationStatus(intakeTimeID, notificationStatus);
			return "set";
	  }
	  
	  @GET
	  @Path("/setIntakeStatus/{intakeTimeID}/{intakeStatus}")
	  @Produces("application/json")
	  public String setIntakeStatus(@PathParam("intakeTimeID") int intakeTimeID, @PathParam("intakeStatus") int intakeStatus) throws JSONException, ClassNotFoundException, SQLException, IOException {
		  	jsonObject = new JSONObject();
		  	dbstatement = new DBStatements();
		  	
			dbstatement.setIntakeStatus(intakeTimeID, intakeStatus);
			return "set";
	  }
	  
	  @GET @Path("/getActiveMedicineBoxes") 
	  @Produces("application/json")
	  public Response getActiveMedicineBoxes() throws JSONException, ClassNotFoundException, SQLException, IOException, ParseException {
	  	dbstatement = new DBStatements();
	  	jsonObject = new JSONObject();
	  	
	  	jsonObject.put("activeMedicineBoxes", dbstatement.getActiveMedicineBoxes());
	  	return Response.status(200).entity(jsonObject.toString()).build();
	  }	  
	  
	  @GET @Path("/getNotificationConfiguration") 
	  @Produces("application/json")
	  public NotificationSetting getNotificationConfiguration() throws JSONException, ClassNotFoundException, SQLException, IOException, ParseException {
	  	dbstatement = new DBStatements();
	  	
		return dbstatement.getNotificationConfiguration();
	  }
	  
	  @GET @Path("/getContactPerson") 
	  @Produces("application/json")
	  public Response getContactPerson() throws JSONException, ClassNotFoundException, SQLException, IOException, ParseException {
	  	dbstatement = new DBStatements();
		jsonObject = new JSONObject();
	  	
		jsonObject.put("psychologicalParent", dbstatement.getContactPerson());
		jsonObject.put("numberOfContactPersons", dbstatement.getContactPerson().size());
		return Response.status(200).entity(jsonObject.toString()).build();
	  }
	  
	  @GET @Path("/getSourceOfSupply") 
	  @Produces("application/json")
	  public Response getSourceOfSupply() throws JSONException, ClassNotFoundException, SQLException, IOException, ParseException {
	  	dbstatement = new DBStatements();
		jsonObject = new JSONObject();
	  	
		jsonObject.put("sourceOfSupply", dbstatement.getSourceOfSupply());
		return Response.status(200).entity(jsonObject.toString()).build();
	  }
	  
	  @GET
	  @Path("/getIntakeTimeByMedicineID/{medicineID}")
	  @Produces("application/json")
	  public Response getIntakeTimeByMedicineID(@PathParam("medicineID") int medicineID) throws JSONException, ClassNotFoundException, SQLException, IOException {
	  	jsonObject = new JSONObject();
	  	dbstatement = new DBStatements();
	  	
		jsonObject.put("intaketime", dbstatement.getIntakeTimeByMedicineID(medicineID));
		return Response.status(200).entity(jsonObject.toString()).build();
	  }
	  
	  @GET
	  @Path("/getPsychologicalParentByPsychologicalParentID/{psychologicalParentID}")
	  @Produces("application/json")
	  public ContactPerson getPsychologicalParentByPsychologicalParentID(@PathParam("psychologicalParentID") int psychologicalParentID) throws JSONException, ClassNotFoundException, SQLException, IOException {
	  	dbstatement = new DBStatements();
	  	
	  	System.out.println(psychologicalParentID);
		return dbstatement.getPsychologicalParentByPsychologicalParentID(psychologicalParentID);
	  }
	  
	  
	  @GET
	  @Path("/getIntakeTimeByIntakeTimeID/{intakeTimeID}")
	  @Produces("application/json")
	  public Response getIntakeTimeByIntakeTimeID(@PathParam("intakeTimeID") int intakeTimeID) throws JSONException, ClassNotFoundException, SQLException, IOException {
	  	jsonObject = new JSONObject();
	  	dbstatement = new DBStatements();
	  	
		jsonObject.put("intaketime", dbstatement.getIntakeTimeByIntakeTimeID(intakeTimeID));
		return Response.status(200).entity(jsonObject.toString()).build();
	  }
	  
	  
	  @GET
	  @Path("/getMedicineInformationByMedicineID/{medicineID}")
	  @Produces("application/json")
	  public Medicine getMedicineInformationByMedicineID(@PathParam("medicineID") int medicineID) throws JSONException, ClassNotFoundException, SQLException, IOException {
	  	dbstatement = new DBStatements();

		return  dbstatement.getMedicineInformationByMedicineID(medicineID);
	  }
	  
	  @GET
	  @Path("/getSourceOfSupplyBySourceOfSupplyID/{sourceOfSupplyID}")
	  @Produces("application/json")
	  public SourceOfSupply getSourceOfSupplyBySourceOfSupplyID(@PathParam("sourceOfSupplyID") int sourceOfSupplyID) throws JSONException, ClassNotFoundException, SQLException, IOException {
	  	dbstatement = new DBStatements();

		return  dbstatement.getSourceOfSupplyBySourceOfSupplyID(sourceOfSupplyID);
	  }
	  
	  
	  @GET
	  @Path("/getIntakeTimeInformation")
	  @Produces("application/json")
	  public Response getIntakeTimeInformation() throws JSONException, ClassNotFoundException, SQLException, ParseException, 
	  IOException {
	  	jsonObject = new JSONObject();
	  	dbstatement = new DBStatements();
	  	ArrayList<IntakeTime> listIntakeTime = new ArrayList<IntakeTime>(dbstatement.getIntakeTimeInformation());
	  	
		jsonObject.put("intaketime", listIntakeTime);
		jsonObject.put("numberIntakeTimes", listIntakeTime.size());
		return Response.status(200).entity(jsonObject.toString()).build();
	  }
	  
	  
	  @DELETE @Path("/deletePsychologicalPerson/{psychologicalParentID}")
	  @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  public void deletePsychologicalPerson(@PathParam("psychologicalParentID") int psychologicalParentID) throws JSONException, SQLException {
		    dbstatement = new DBStatements();
			
		    dbstatement.deletePsychologicalParent(psychologicalParentID);
	  }
	  
	  @DELETE @Path("/deleteSourceOfSupply/{sourceOfSupplyID}")
	  @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  public void deleteSourceOfSupply(@PathParam("sourceOfSupplyID") int sourceOfSupplyID) throws JSONException, SQLException {
		    dbstatement = new DBStatements();
			
		    dbstatement.deleteSourceOfSupply(sourceOfSupplyID);
	  }
	  
	  @DELETE @Path("/deleteMedicineInformation/{medicineID}")
	  @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  public void deleteMedicineInformation(@PathParam("medicineID") int medicineID) throws JSONException, SQLException {
		    dbstatement = new DBStatements();
			
		    dbstatement.deleteMedicineInformation(medicineID);
	  }
	  
	  
	  @DELETE @Path("/deleteIntakeTimeInformation/{intakeTimeID}")
	  @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  public void deleteIntakeTimeInformation(@PathParam("intakeTimeID") int intakeTimeID) throws JSONException, SQLException {
		    dbstatement = new DBStatements();
			
		    dbstatement.deleteIntakeTimeInformation(intakeTimeID);
	  }
	    
	  /*  @POST @Path("/createMedicineInformation")
	    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	    public void create(Object objMedicineInformation) {
	       System.out.println(objMedicineInformation.toString());
	    }
	  */
	  
	  @POST @Path("/createMedicineInformation")
	  @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  public void createMedicineInformation(Object objMedicineInformation) throws JSONException, ClassNotFoundException, SQLException, ParseException, IOException, org.codehaus.jettison.json.JSONException {
	  	jsonObject = new JSONObject();
	  	dbstatement = new DBStatements();
	  	
	  	JSONArray arr = new JSONArray(objMedicineInformation.toString());
	  	System.out.println(objMedicineInformation);
	  	Medicine medicine = null;
	  	
		for (int i=0; i<arr.length(); i++){
			medicine = new Medicine();
			org.codehaus.jettison.json.JSONObject jsonMedicineObject = arr.getJSONObject(i);
			
			medicine.setNote(jsonMedicineObject.getString("note"));
			medicine.setDisease(jsonMedicineObject.getString("disease"));
			medicine.setMedicineName(jsonMedicineObject.getString("medicineName"));
			medicine.setSendNotification(jsonMedicineObject.getBoolean("sendNotification"));
			
			medicine.setStock(jsonMedicineObject.getInt("stock"));
			medicine.setSavetyStock(jsonMedicineObject.getInt("savetyStock"));
			medicine.setContactType(jsonMedicineObject.getString("contactType"));
			medicine.setBoxID(jsonMedicineObject.getInt("boxID"));
			
			dbstatement.createMedicine(medicine);
		}	
	  }
	  
	  @POST @Path("/editMedicineInformation")
	  @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  public void editMedicineInformation(Object objEditMedicineInformation) throws JSONException, ClassNotFoundException, SQLException, ParseException, IOException, org.codehaus.jettison.json.JSONException {
		  dbstatement = new DBStatements();
			ObjectMapper mapper = new ObjectMapper();
			  	
			String jsonInString = mapper.writeValueAsString(objEditMedicineInformation);
			Medicine medicine = mapper.readValue(jsonInString, Medicine.class);

			dbstatement.editMedicine(medicine);
		
	  }
	  
	  @POST @Path("/editSourceOfSupply")
	  @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  public void editSourceOfSupply(Object objEditSourceOfSupply) throws JSONException, ClassNotFoundException, SQLException, ParseException, IOException, org.codehaus.jettison.json.JSONException {
		  	dbstatement = new DBStatements();
			ObjectMapper mapper = new ObjectMapper();
			  	
			String jsonInString = mapper.writeValueAsString(objEditSourceOfSupply);
			SourceOfSupply sourceOfSupply = mapper.readValue(jsonInString, SourceOfSupply.class);

			DBStatements.editSourceOfSupply(sourceOfSupply);
		
	  }
	 
	  @POST @Path("/editIntakeTime")
	  @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  public void editIntakeTime(Object objIntakeTimeInformation) throws JSONException, ClassNotFoundException, SQLException, ParseException, IOException, org.codehaus.jettison.json.JSONException {
	  	jsonObject = new JSONObject();
	  	dbstatement = new DBStatements();

	  	JSONArray arr = new JSONArray(objIntakeTimeInformation.toString());
	  	IntakeTime intakeTime = null;
	  	
		for (int i=0; i<arr.length(); i++){
			intakeTime = new IntakeTime();
			org.codehaus.jettison.json.JSONObject jsonObjIntakeTimeInformation = arr.getJSONObject(i);
			intakeTime.setIntakeTimeUnix(jsonObjIntakeTimeInformation.getInt("intakeTime"));
			intakeTime.setIntakeTimeID(jsonObjIntakeTimeInformation.getInt("intakeTimeID"));
			intakeTime.setPillQuantity(jsonObjIntakeTimeInformation.getInt("pillQuantity"));
		}

		dbstatement.editIntakeTime(intakeTime);
	  }
	  
	  @POST @Path("/editPsychologicalParent")
	  @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  public void editPsychologicalParent(Object objEditPsychologicalParent) throws JSONException, ClassNotFoundException, SQLException, ParseException, IOException, org.codehaus.jettison.json.JSONException {

	    dbstatement = new DBStatements();
		ObjectMapper mapper = new ObjectMapper();
		  	
		String jsonInString = mapper.writeValueAsString(objEditPsychologicalParent);
		ContactPerson contactPerson = mapper.readValue(jsonInString, ContactPerson.class);

		dbstatement.editPsychologicalParent(contactPerson);
	  }
	  
	  
	public static void main(String[] args) throws JSONException, ClassNotFoundException, SQLException, ParseException, IOException, org.codehaus.jettison.json.JSONException {
		
	
		// TODO Auto-generated method stub
		// TODO Auto-generated method stub

		

		
		/*for(int i = 0; i<jsonObject.getJSONArray("intakeTime").length();i++){
			System.out.println();	
		  	
			intakeTime = new IntakeTime();
			objSingleIntkaeTime = jsonObject.getJSONArray("intakeTime").getJSONArray(i).getJSONObject(0);
			/*intakeTime.setIntakeTimeUnix(objSingleIntkaeTime.getInt("unixTimeStamp"));
			intakeTime.setPillQuantity(objSingleIntkaeTime.getInt("pillQuantity"));
			listIntakeTimes.add(intakeTime);
		  	*/
			/*System.out.println(objSingleIntkaeTime.get("medicineID"));
		}*/
	}

	
	  
	  @POST
	  @Path("/createIntakeTimeInformation")
	  @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  public void createIntakeTimeInformation(Object objIntakeTimeInformation) throws JSONException, ClassNotFoundException, SQLException, ParseException, IOException, org.codehaus.jettison.json.JSONException {
			dbstatement = new DBStatements();
		  
			//String n = "{'intakeTime':[{'medicineID':49,'unixTimeStamp':1484870400,'pillQuantity':3}, {'medicineID':49,'unixTimeStamp':1484956800,'pillQuantity':3}, {'medicineID':49,'unixTimeStamp':1485043200,'pillQuantity':3}, {'medicineID':49,'unixTimeStamp':1485129600,'pillQuantity':3}]}";		  
			JSONObject objSingleIntkaeTime = new JSONObject(); 
			String formatedJSONString = objIntakeTimeInformation.toString().replaceAll("medicineID=", "\"medicineID\":").replaceAll("intakeTimes=", "\"intakeTimes\":");

			jsonObject = new JSONObject(formatedJSONString);
			
			IntakeTime intakeTime = new IntakeTime();	
			ArrayList<IntakeTime> listIntakeTimes =  new ArrayList<IntakeTime>();
			
			int medicineID = jsonObject.getInt("medicineID");
			
			for(int i=0;i<jsonObject.getJSONArray("intakeTimes").length();i++){
				intakeTime = new IntakeTime();
		
				
				objSingleIntkaeTime = jsonObject.getJSONArray("intakeTimes").getJSONObject(i);

				intakeTime.setIntakeTimeUnix(objSingleIntkaeTime.getInt("unixTimeStamp"));
				intakeTime.setPillQuantity(objSingleIntkaeTime.getInt("pillQuantity"));
				listIntakeTimes.add(intakeTime);
			}
  		dbstatement.createIntakeTimeInformation(listIntakeTimes, medicineID);
	  }
	  
	  
	  @POST
	  @Path("/createContactPerson")
	  @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  public void createContactPerson(Object objCreateContactPerson) throws JsonGenerationException, JsonMappingException, IOException  {
	  	dbstatement = new DBStatements();
	  	ObjectMapper mapper = new ObjectMapper();
	  	
	  	String jsonInString = mapper.writeValueAsString(objCreateContactPerson);
	  	ContactPerson contactPerson = mapper.readValue(jsonInString, ContactPerson.class);
	 
  		dbstatement.createContactPerson(contactPerson);
	  }
	  
	  @POST
	  @Path("/createSourceOfSupply")
	  @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  public void createSourceOfSupply(Object objSourceOfSupply) throws JsonGenerationException, JsonMappingException, IOException  {
	  	dbstatement = new DBStatements();
	  	ObjectMapper mapper = new ObjectMapper();
	  	
	  	String jsonInString = mapper.writeValueAsString(objSourceOfSupply);
	  	SourceOfSupply sourceOfSupply = mapper.readValue(jsonInString, SourceOfSupply.class);
	 
  		dbstatement.createSourceOfSupply(sourceOfSupply);
	  }
	  
	  
	  
	  @POST @Path("/saveAccousticalSettings")
	  @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  public void saveAccousticalSettings(Object objAccousticalSettings) throws JSONException, ClassNotFoundException, SQLException, ParseException, IOException, org.codehaus.jettison.json.JSONException {
	  	jsonObject = new JSONObject();
	  	dbstatement = new DBStatements();
	  	NotificationSetting notificationSettings = null;
	  	  	
	  	JSONArray arr = new JSONArray(objAccousticalSettings.toString());
	  	
	  	for(int i=0;i<arr.length();i++){
	  		notificationSettings = new NotificationSetting();
	  		org.codehaus.jettison.json.JSONObject jsonAccousticalSettings = arr.getJSONObject(i);
	  		notificationSettings.setUseSpeaker(jsonAccousticalSettings.getBoolean("useSpeaker"));
	  		notificationSettings.setNotificationSoundName(jsonAccousticalSettings.getString("notificationSoundName"));
	  
	  	}

  		dbstatement.saveAccousticalSettings(notificationSettings);
	  }
	  
	  
	  @POST @Path("/saveVisualSettings")
	  @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  public void saveVisualSettings(Object objVisualSettings) throws JSONException, ClassNotFoundException, SQLException, ParseException, IOException, org.codehaus.jettison.json.JSONException {
	  	jsonObject = new JSONObject();
	  	dbstatement = new DBStatements();
	  	NotificationSetting notificationSettings = null;
	  	  	
	  	JSONArray arr = new JSONArray(objVisualSettings.toString());
	  	
	  	for(int i=0;i<arr.length();i++){
	  		notificationSettings = new NotificationSetting();
	  		org.codehaus.jettison.json.JSONObject jsonVisualSettings = arr.getJSONObject(i);
	  		notificationSettings.setLightColor(jsonVisualSettings.getString("lightColor"));
	  		notificationSettings.setUseLight(jsonVisualSettings.getBoolean("useLight"));
	  
	  	}

  		dbstatement.saveVisualSettings(notificationSettings);
	  }
	  
	  
	  
	  public static Timestamp convertStringToTimestamp(String str_date) {
		    try {
		      DateFormat formatter;
		      formatter = new SimpleDateFormat("");
		       // you can change format of date
		      Date date = formatter.parse(str_date);
		      java.sql.Timestamp timeStampDate = new Timestamp(date.getTime());

		      return timeStampDate;
		    } catch (ParseException e) {
		      System.out.println("Exception :" + e);
		      return null;
		    }
		  }
	  
}