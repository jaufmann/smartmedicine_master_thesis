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

/*-------------------------------------START--GET FUNCTIONS--START------------------------------------------------------------------------------*/
	  /**
	  * Return medicine informations as a JSON-Response 
	  *
	  * @return A RESPONSE-Object with all medicine informations
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  *
	  */
	  @GET
	  @Path("/getMedicineInformation")
	  @Produces("application/json")
	  public Response getMedicineInformation() throws JSONException, ClassNotFoundException, SQLException, IOException  {
	  	jsonObject = new JSONObject();
	  	dbstatement = new DBStatements();
	  	
		jsonObject.put("medicine", dbstatement.getMedicineInformation());
		return Response.status(200).entity(jsonObject.toString()).build();
	  }
	  

	  /**
	  * Return all intake times from the start and end date 
	  *
	  * @return A JSON-Object with all the intake time informations
	  * 
	  * @param startDateUnix
	  * 	the start date in unix format
	  * 
	  * @param endDateUnix
	  * 	the end date in unix format
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  *
	  */	  
	  @GET
	  @Path("/getIntakeTimeByStartAndEndDate/{startDateUnix}/{endDateUnix}")
	  @Produces("application/json")
	  public Response getIntakeTimeByStartAndEndDate(@PathParam("startDateUnix") int startDateUnix, @PathParam("endDateUnix") int endDateUnix) throws JSONException, ClassNotFoundException, SQLException, IOException {
		  	jsonObject = new JSONObject();
		  	dbstatement = new DBStatements();
		  	
			jsonObject.put("intakeTime", dbstatement.getIntakeTimeForVacation(startDateUnix, endDateUnix));
			return Response.status(200).entity(jsonObject.toString()).build();
	  }
	  
	  
	  /**
	  * Return all medicine box informations 
	  *
	  * @return A RESPONSE-Object with all active medicine boxes
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  *
	  * @throws ParseException
	  * 	Signals that an error has been reached unexpectedly while parsing.
	  */
	  @GET @Path("/getActiveMedicineBoxes") 
	  @Produces("application/json")
	  public Response getActiveMedicineBoxes() throws JSONException, ClassNotFoundException, SQLException, IOException, ParseException {
	  	dbstatement = new DBStatements();
	  	jsonObject = new JSONObject();
	  	
	  	jsonObject.put("activeMedicineBoxes", dbstatement.getActiveMedicineBoxes());
	  	return Response.status(200).entity(jsonObject.toString()).build();
	  }	 
	 
	  
	  /**
	  * Return all notification setting informations  
	  *
	  * @return A NotificationSetting-Object with all the notification informations
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  * 
	  * @throws ParseException
	  * 	Signals that an error has been reached unexpectedly while parsing.
	  *
	  */
	  @GET @Path("/getNotificationConfiguration") 
	  @Produces("application/json")
	  public NotificationSetting getNotificationConfiguration() throws JSONException, ClassNotFoundException, SQLException, IOException, ParseException {
	  	dbstatement = new DBStatements();
	  	
		return dbstatement.getNotificationConfiguration();
	  }

	  
	  /**
	  * Return all contact person informations  
	  *
	  * @return A RESPONSE-Object with all contact person informations
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  * 
	  * @throws ParseException
	  * 	Signals that an error has been reached unexpectedly while parsing.
	  *
	  */
	  @GET @Path("/getContactPerson") 
	  @Produces("application/json")
	  public Response getContactPerson() throws JSONException, ClassNotFoundException, SQLException, IOException, ParseException {
	  	dbstatement = new DBStatements();
		jsonObject = new JSONObject();
	  	
		jsonObject.put("psychologicalParent", dbstatement.getContactPerson());
		jsonObject.put("numberOfContactPersons", dbstatement.getContactPerson().size());
		return Response.status(200).entity(jsonObject.toString()).build();
	  }
	  
	  
	  
	  /**
	  * Return all source of supply informations  
	  *
	  * @return A RESPONSE-Object with all source of supply informations
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  * 
	  * @throws ParseException
	  * 	Signals that an error has been reached unexpectedly while parsing.
	  *
	  */
	  @GET @Path("/getSourceOfSupply") 
	  @Produces("application/json")
	  public Response getSourceOfSupply() throws JSONException, ClassNotFoundException, SQLException, IOException, ParseException {
	  	dbstatement = new DBStatements();
		jsonObject = new JSONObject();
	  	
		jsonObject.put("sourceOfSupply", dbstatement.getSourceOfSupply());
		return Response.status(200).entity(jsonObject.toString()).build();
	  }
	  
	  
	  /**
	  * Return all intake time informations by medicine id  
	  *
	  * @return A RESPONSE-Object with all filtered intake time informations
	  * 
	  * @param medicineID
	  * 	The medicine id
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  *
	  */
	  @GET
	  @Path("/getIntakeTimeByMedicineID/{medicineID}")
	  @Produces("application/json")
	  public Response getIntakeTimeByMedicineID(@PathParam("medicineID") int medicineID) throws JSONException, ClassNotFoundException, SQLException, IOException {
	  	jsonObject = new JSONObject();
	  	dbstatement = new DBStatements();
	  	
		jsonObject.put("intaketime", dbstatement.getIntakeTimeByMedicineID(medicineID));
		return Response.status(200).entity(jsonObject.toString()).build();
	  }
	  
	  
	  /**
	  * Return the contact person by contact person id
	  *
	  * @return A ContactPerson-Object with the contact person
	  * 
	  * @param psychologicalParentID
	  * 	The psychological parent id (ContactPersonID)
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  *
	  */
	  @GET
	  @Path("/getPsychologicalParentByPsychologicalParentID/{psychologicalParentID}")
	  @Produces("application/json")
	  public ContactPerson getPsychologicalParentByPsychologicalParentID(@PathParam("psychologicalParentID") int psychologicalParentID) throws JSONException, ClassNotFoundException, SQLException, IOException {
	  	dbstatement = new DBStatements();
	  	
	  	System.out.println(psychologicalParentID);
		return dbstatement.getPsychologicalParentByPsychologicalParentID(psychologicalParentID);
	  }
	  
	  
	  /**
	  * Return all intake time informations by intake time id  
	  *
	  * @return A RESPONSE-Object with all intake time informations filtered by intakeTimeID
	  * 
	  * @param intakeTimeID
	  * 	The intakeTime ID 
	  *  
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  *
	  */
	  @GET
	  @Path("/getIntakeTimeByIntakeTimeID/{intakeTimeID}")
	  @Produces("application/json")
	  public Response getIntakeTimeByIntakeTimeID(@PathParam("intakeTimeID") int intakeTimeID) throws JSONException, ClassNotFoundException, SQLException, IOException {
	  	jsonObject = new JSONObject();
	  	dbstatement = new DBStatements();
	  	
		jsonObject.put("intaketime", dbstatement.getIntakeTimeByIntakeTimeID(intakeTimeID));
		return Response.status(200).entity(jsonObject.toString()).build();
	  }
	  
	  
	  /**
	  * Return all medicine informations by medicine id  
	  *
	  * @return A Medicine-Object with all medicine informations filtered by medicineID
	  * 
	  * @param medicineID
	  * 	The medicine id
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  *
	  */	  
	  @GET
	  @Path("/getMedicineInformationByMedicineID/{medicineID}")
	  @Produces("application/json")
	  public Medicine getMedicineInformationByMedicineID(@PathParam("medicineID") int medicineID) throws JSONException, ClassNotFoundException, SQLException, IOException {
	  	dbstatement = new DBStatements();

		return  dbstatement.getMedicineInformationByMedicineID(medicineID);
	  }

	  
	  /**
	  * Return all source of supply informations by source of supply id  
	  *
	  * @return A SourceOfSupply-Object with all source of supply informations filtered by source of supply id
	  * 
	  * @param sourceOfSupplyID
	  * 	The source of supply id 
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  *
	  */
	  @GET
	  @Path("/getSourceOfSupplyBySourceOfSupplyID/{sourceOfSupplyID}")
	  @Produces("application/json")
	  public SourceOfSupply getSourceOfSupplyBySourceOfSupplyID(@PathParam("sourceOfSupplyID") int sourceOfSupplyID) throws JSONException, ClassNotFoundException, SQLException, IOException {
	  	dbstatement = new DBStatements();

		return  dbstatement.getSourceOfSupplyBySourceOfSupplyID(sourceOfSupplyID);
	  }

	  
	  
	  /**
	  * Return all intake time informations 
	  * 
	  * @return A RESPONSE-Object with all intake time informations
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  * 
	  * @throws ParseException
	  * 	Signals that an error has been reached unexpectedly while parsing.
	  */
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
	  
	  /*
	   * -------------------------------------END--GET FUNCTIONS--END------------------------------------------------------------------------------
	   */
	  
	  /*
	   * -------------------------------------START--SET AND EDIT FUNCTIONS--START--------------------------------------------------------------------------
	   */
	  
	  /**
	  * Saves the notification status 
	  * 
	  * @return String with a notification status
	  * 
	  * @param intakeTimeID
	  * 	The intake time id
	  * 
	  * @param notificationStatus
	  * 	The notification status
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  *
	  */
	  @GET
	  @Path("/setNotificationStatus/{intakeTimeID}/{notificationStatus}")
	  @Produces("application/json")
	  public String setNotificationStatus(@PathParam("intakeTimeID") int intakeTimeID, @PathParam("notificationStatus") int notificationStatus) throws JSONException, ClassNotFoundException, SQLException, IOException {
		  	jsonObject = new JSONObject();
		  	dbstatement = new DBStatements();
		  	
			dbstatement.setNotificationStatus(intakeTimeID, notificationStatus);
			return "set";
	  }

	  /**
	  * Saves the intake status  
	  * 
	  * @return String with a notification status
	  * 
	  * @param intakeTimeID
	  * 	The intake time id 
	  * 
	  * @param intakeStatus
	  * 	The intake status
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  *
	  */
	  @GET
	  @Path("/setIntakeStatus/{intakeTimeID}/{intakeStatus}")
	  @Produces("application/json")
	  public String setIntakeStatus(@PathParam("intakeTimeID") int intakeTimeID, @PathParam("intakeStatus") int intakeStatus) throws JSONException, ClassNotFoundException, SQLException, IOException {
		  	jsonObject = new JSONObject();
		  	dbstatement = new DBStatements();
		  	
			dbstatement.setIntakeStatus(intakeTimeID, intakeStatus);
			return "set";
	  }
	   
	
	  /**
	  * Saves edited medicine informations   
	  * 
	  * @param objEditMedicineInformation
	  * 	The object with all edited medicine informations
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  * 
	  * @throws ParseException
	  * 	Signals that an error has been reached unexpectedly while parsing.
	  * 
	  * @throws org.codehaus.jettison.json.JSONException
	  * 	The JSONException is thrown by the JSON.org classes then things are amiss.
	  *
	  */
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

	  /**
	  * Saves edited source of supply informations   
	  * 
	  * @param objEditSourceOfSupply
	  * 	The object with all edited source of supply informations
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  * 
	  * @throws ParseException
	  * 	Signals that an error has been reached unexpectedly while parsing.
	  * 
	  * @throws org.codehaus.jettison.json.JSONException
	  * 	The JSONException is thrown by the JSON.org classes then things are amiss.
	  *
	  *
	  */
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

	  
	  /**
	  * Saves edited intake time informations   
	  * 
	  * @param objIntakeTimeInformation
	  * 	The object with all intake time informations
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  * 
	  * @throws ParseException
	  * 	Signals that an error has been reached unexpectedly while parsing.
	  * 
	  * @throws org.codehaus.jettison.json.JSONException
	  * 	The JSONException is thrown by the JSON.org classes then things are amiss.
	  *
	  *
	  */
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

	  /**
	  * Saves edit psychological parent (contact person) informations    
	  * 
	  * @param objEditPsychologicalParent
	  * 	The object with edited psychological parent informations
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  * 
	  * @throws ParseException
	  * 	Signals that an error has been reached unexpectedly while parsing.
	  *
	  *
	  * @throws org.codehaus.jettison.json.JSONException
	  * 	The JSONException is thrown by the JSON.org classes then things are amiss.
	  *
	  */
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
	  
	  /*
	   * -------------------------------------END--SET AND EDIT FUNCTIONS--END------------------------------------------------------------------------------
	   */	 
	  
	  /*
	   * -------------------------------------START--DELETE FUNCTIONS--START-----------------------------------------------------------------------
	   */		  
	  
	  /**
	  * delete psychological parent (contact person)    
	  * 
	  * @param psychologicalParentID (contactPersonID)
	  * 	The psychologicalParentID
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  * 
	  */	  
	  @DELETE @Path("/deletePsychologicalPerson/{psychologicalParentID}")
	  @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  public void deletePsychologicalPerson(@PathParam("psychologicalParentID") int psychologicalParentID) throws JSONException, SQLException {
		    dbstatement = new DBStatements();
			
		    dbstatement.deletePsychologicalParent(psychologicalParentID);
	  }

	  
	  /**
	  * delete source of supply    
	  * 
	  * @param sourceOfSupplyID 
	  * 	The sourceOfSupplyID
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  * 
	  */
	  @DELETE @Path("/deleteSourceOfSupply/{sourceOfSupplyID}")
	  @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  public void deleteSourceOfSupply(@PathParam("sourceOfSupplyID") int sourceOfSupplyID) throws JSONException, SQLException {
		    dbstatement = new DBStatements();
			
		    dbstatement.deleteSourceOfSupply(sourceOfSupplyID);
	  }

	  /**
	  * delete medicine information    
	  * 
	  * @param medicineID 
	  * 	The medicineID
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  * 
	  */
	  @DELETE @Path("/deleteMedicineInformation/{medicineID}")
	  @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  public void deleteMedicineInformation(@PathParam("medicineID") int medicineID) throws JSONException, SQLException {
		    dbstatement = new DBStatements();
			
		    dbstatement.deleteMedicineInformation(medicineID);
	  }
	  

	  /**
	  * delete intake time information    
	  * 
	  * @param intakeTimeID 
	  * 	The intakeTimeID
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  * 
	  */
	  @DELETE @Path("/deleteIntakeTimeInformation/{intakeTimeID}")
	  @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  public void deleteIntakeTimeInformation(@PathParam("intakeTimeID") int intakeTimeID) throws JSONException, SQLException {
		    dbstatement = new DBStatements();
			
		    dbstatement.deleteIntakeTimeInformation(intakeTimeID);
	  }
	    
	  
	  /*
	   * -------------------------------------END--DELETE FUNCTIONS--END------------------------------------------------------------------------------
	   */	
	  
	  /*
	   * -------------------------------------START--CREATE FUNCTIONS--START---------------------------------------------------------------------------
	   */	
	 
	  /**
	  * creates create medicine information    
	  * 
	  * @param objMedicineInformation
	  * 	The object with the medicine informations
	  *  
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  * 
	  * @throws ParseException
	  * 	Signals that an error has been reached unexpectedly while parsing.
	  * 
	  * @throws org.codehaus.jettison.json.JSONException
	  * 	The JSONException is thrown by the JSON.org classes then things are amiss.
	  *
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
			medicine.setSourceType(jsonMedicineObject.getString("sourceType"));
			medicine.setSendOrder(jsonMedicineObject.getBoolean("sendOrder"));
			
			DBStatements.createMedicine(medicine);
		}	
	  }
	  
	  /**
	  * creates intake time informations    
	  * 
	  * @param objIntakeTimeInformation
	  * 	The object with the intake time informations
	  *  
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  * 
	  * @throws ParseException
	  * 	Signals that an error has been reached unexpectedly while parsing.
	  *
	  * @throws org.codehaus.jettison.json.JSONException
	  * 	The JSONException is thrown by the JSON.org classes then things are amiss.
	  */	  
	  @POST
	  @Path("/createIntakeTimeInformation")
	  @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	  public void createIntakeTimeInformation(Object objIntakeTimeInformation) throws JSONException, ClassNotFoundException, SQLException, ParseException, IOException, org.codehaus.jettison.json.JSONException {
			dbstatement = new DBStatements();
		  		  
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
	  

	  /**
	  * creates contact person    
	  * 
	  * @param objCreateContactPerson
	  * 	The object with the contact person informations
	  *  
	  * @throws JsonGenerationException 
	  * 	JsonGenerationException indicates an incorrect JSON is being generated.
	  * 
	  * @throws JsonMappingException 
	  * 	Checked exception used to signal fatal problems with mapping of content.
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  */
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
	  

	  /**
	  * creates source of supply    
	  * 
	  * @param objSourceOfSupply
	  * 	The object with the source of supply informations
	  *  
	  * @throws JsonGenerationException 
	  * 	JsonGenerationException indicates an incorrect JSON is being generated.
	  * 
	  * @throws JsonMappingException 
	  * 	Checked exception used to signal fatal problems with mapping of content.
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  *
	  */
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
	  
	  
	  /**
	  * Saves accoustical settings    
	  * 
	  * @param objAccousticalSettings
	  * 	The object with the accoustical settings
	  *  
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  * 
	  * @throws ParseException
	  * 	Signals that an error has been reached unexpectedly while parsing.
	  * 
	  * @throws org.codehaus.jettison.json.JSONException
	  * 	The JSONException is thrown by the JSON.org classes then things are amiss.
	  * 
	  */
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
	  
	  
	  
	  /**
	  * Saves visual settings    
	  * 
	  * @param objVisualSettings
	  * 	The object with the visual settings
	  *  
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws JSONException 
	  * 	JsonException indicates that some exception happened during JSON processing.
	  * 
	  * @throws ParseException
	  * 	Signals that an error has been reached unexpectedly while parsing.
	  *
	  * @throws org.codehaus.jettison.json.JSONException
	  * 	The JSONException is thrown by the JSON.org classes then things are amiss.
	  *
	  */
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
	  
	  /*
	   * -------------------------------------END--CREATE FUNCTIONS--END---------------------------------------------------------------------------
	   */	
}