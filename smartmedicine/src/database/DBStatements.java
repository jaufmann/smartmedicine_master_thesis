package database;

import java.io.IOException;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

import org.json.JSONException;

import classes.ContactPerson;
import classes.IntakeTime;
import classes.Medicine;
import classes.NotificationSetting;
import classes.SourceOfSupply;

public class DBStatements {
	

	
	private static DBConnection dbconnection = null;
		
	
	  /**
	  * This method returns all medicine informations from the database   
	  * 
	  * @return
	  * 	All medicine informations in a arraylist
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  *
	  */
	public ArrayList<Medicine> getMedicineInformation() throws ClassNotFoundException, SQLException, IOException{
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		Medicine medicine = null;

		String query = " SELECT *"
				+ 	   " FROM medicine "
				+      " GROUP BY medicineID ";
		ArrayList<Medicine> listMedicine = new ArrayList<Medicine>();
		
		try{
			con = DBConnection.getConnection();
			stmt = con.createStatement();
			rs = stmt.executeQuery(query);
			while(rs.next()){
				medicine = new Medicine();
				medicine.setId(rs.getInt("medicineID"));
				medicine.setStock(rs.getInt("stock"));
				medicine.setMedicineName(rs.getString("medicineName"));
				medicine.setNote(rs.getString("note"));
				medicine.setDisease(rs.getString("disease"));
				medicine.setSourceType(rs.getString("sourceType"));
				medicine.setSendOrder(rs.getBoolean("sendOrder"));
				medicine.setBoxID(rs.getInt("boxID"));
				listMedicine.add(medicine);
			}
		}finally{
			if(rs != null) rs.close();
			if(stmt != null)stmt.close();			
			if(con !=null)con.close();
		}	
		return listMedicine;		
	}
	

	  /**
	  * This method returns intake time informations filtered by medicine id from the database  
	  * 
	  * @param medicineID
	  * 	The medicine id
	  * 
	  * @return
	  * 	All intake time informations in a arraylist
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  *
	  */
	public ArrayList<IntakeTime> getIntakeTimeByMedicineID(int medicineID) throws SQLException, ClassNotFoundException, IOException{
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		IntakeTime intaketime = null;
		String query = "SELECT * FROM intaketime WHERE medicineID="+medicineID;
		ArrayList<IntakeTime> listIntaketimes = new ArrayList<IntakeTime>();
		
		try{
			con = DBConnection.getConnection();
			stmt = con.createStatement();
			rs = stmt.executeQuery(query);
			while(rs.next()){
				intaketime = new IntakeTime();
				intaketime.setIntakeTimeID(rs.getInt("intakeTimeID"));
				intaketime.setMedicineID(rs.getInt("medicineID"));
				intaketime.setIntakeTime(rs.getString("intakeTime"));
				intaketime.setIntakeTriggered(rs.getBoolean("intakeStatus"));
				intaketime.setNotificationTriggered(rs.getBoolean("NotificationStatus"));
				intaketime.setPillQuantity(rs.getInt("pillQuantity"));
				listIntaketimes.add(intaketime);
			}
		}finally{
			if(rs != null) rs.close();
			if(stmt != null)stmt.close();			
			if(con !=null)con.close();
		}	
		return listIntaketimes;		
	}
	

	  /**
	  * This method returns all intake time informations from the database  
	  * 
	  * @return
	  * 	All intake time informations in a arraylist
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  *
	  * @throws ParseException
	  * 	Signals that an error has been reached unexpectedly while parsing.
	  * 
	  */
	public ArrayList<IntakeTime> getIntakeTimeInformation() throws ClassNotFoundException, SQLException, ParseException, IOException{
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		IntakeTime intaketime = null;
		String query = "SELECT * FROM intaketime";
		ArrayList<IntakeTime> listIntaketimes = new ArrayList<IntakeTime>();
		
		try{
			con = DBConnection.getConnection();
			stmt = con.createStatement();
			rs = stmt.executeQuery(query);
			while(rs.next()){
				intaketime = new IntakeTime();
				intaketime.setIntakeTimeID(rs.getInt("intakeTimeID"));
				intaketime.setMedicineID(rs.getInt("medicineID"));
				intaketime.setIntakeTime(rs.getString("intakeTime"));
				intaketime.setNotificationTriggered(rs.getBoolean("NotificationStatus"));
				intaketime.setIntakeTriggered(rs.getBoolean("intakeStatus"));
				intaketime.setPillQuantity(rs.getInt("pillQuantity"));
				listIntaketimes.add(intaketime);
			}
		}finally{
			if(rs != null) rs.close();
			if(stmt != null)stmt.close();			
			if(con !=null)con.close();
		}	
		return listIntaketimes;		
	}
	

	  /**
	  * This method returns all notification informations from the database  
	  * 
	  * @return
	  * 	A NotificationSetting-Object with all notification settings
	  * 
	  * @throws SQLException 
	  * 	An exception that provides information on a database access error or other errors.
	  * 
	  * @throws ClassNotFoundException 
	  * 	No definition for the class with the specified name could be found.
	  * 
	  * @throws IOException 
	  * 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	  *
	  * @throws ParseException
	  * 	Signals that an error has been reached unexpectedly while parsing.
	  * 
	  */
	public NotificationSetting getNotificationConfiguration() throws ClassNotFoundException, SQLException, ParseException, IOException{
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		String query = "SELECT * FROM notificationconfiguration";
		NotificationSetting notificationConfiguration = new NotificationSetting();
		
		try{
			con = DBConnection.getConnection();
			stmt = con.createStatement();
			rs = stmt.executeQuery(query);
			while(rs.next()){
				notificationConfiguration.setNotificationConfigurationID(rs.getInt("notificationConfigurationID"));
				notificationConfiguration.setUseLight(rs.getBoolean("useLight"));
				notificationConfiguration.setUseSpeaker(rs.getBoolean("useSpeaker"));
				notificationConfiguration.setLightColor(rs.getString("lightColor"));
				notificationConfiguration.setNotificationSoundName(rs.getString("notificationSoundName"));
			}
		}finally{
			if(rs != null) rs.close();
			if(stmt != null)stmt.close();			
			if(con !=null)con.close();
		}	
		return notificationConfiguration;		
	}

	/**
	* This method deletes medicine informations in the database  
	* 
	* @param medicineID
	* 	The medicine id
	* 
	* @throws SQLException 
	* 	An exception that provides information on a database access error or other errors.
	* 
	*/
	public void deleteMedicineInformation(int medicineID) throws SQLException {
		    Connection con = null;
	        Statement stmt = null;
	        try
	        {
	        	con = DBConnection.getConnection();
	             
	            stmt = con.createStatement();
	            stmt.execute("DELETE FROM medicine WHERE medicineID ="+medicineID);
	        } 
	        catch (Exception e) {
	            e.printStackTrace();
	        }finally {
	            try {   
	                stmt.close();
	                con.close();
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
	        }
	 }
	

	/**
	* This method is used to delete a intake time by a given intakeTimeID
	* 
	* @param intakeTimeID
	* 	The intake time id
	* 
	*/
	public void deleteIntakeTimeInformation(int intakeTimeID) {
		 Connection con = null;
	        Statement stmt = null;
	        try
	        {
	        	con = DBConnection.getConnection();
	            stmt = con.createStatement();
	            stmt.execute("DELETE FROM intaketime WHERE intakeTimeID ="+intakeTimeID);
	        } 
	        catch (Exception e) {
	            e.printStackTrace();
	        }finally {
	            try {   
	                stmt.close();
	                con.close();
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
	        }
	}	 
	

	/**
	* This method creates medicine informations in the database
	* 
	* @param medicine
	* 	The Medicine Class with all medicine informations
	* 
	* @throws IOException 
	* 	Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.
	* 
	*/
	public static void createMedicine(Medicine medicine) throws IOException {
		 	Connection conn = null;
			PreparedStatement pstmtMedicine = null;
			
			try{					 
				  conn = DBConnection.getConnection();
				 
		    	  String sqlProduct = " insert into medicine (medicineName, disease, sendNotification, contactType, "
		    	  		+ " note, stock, savetyStock, boxID, sourceType, sendOrder)"
					        + " values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		    	  
		    	  pstmtMedicine = conn.prepareStatement(sqlProduct);
		    	  pstmtMedicine.setString(1, medicine.getMedicineName());
		    	  pstmtMedicine.setString(2, medicine.getDisease());
		    	  pstmtMedicine.setBoolean(3, medicine.isSendNotification());
		    	  pstmtMedicine.setString(4, medicine.getContactType());
		    	  pstmtMedicine.setString(5, medicine.getNote());
		    	  pstmtMedicine.setInt(6, medicine.getStock());
		    	  pstmtMedicine.setInt(7, medicine.getSavetyStock());
		    	  pstmtMedicine.setInt(8, medicine.getBoxID());
		    	  pstmtMedicine.setString(9, medicine.getSourceType());
		    	  pstmtMedicine.setBoolean(10, medicine.isSendOrder());
			      
		    	  pstmtMedicine.executeUpdate();
			 } catch(Exception e){
				 
			 }  finally {
		            try {   
		            	pstmtMedicine.close();
		                conn.close();
		            } catch (Exception e) {
		                e.printStackTrace();
		            }
		        }
		 }

	

	  /**
	  * This method creates all intake time informatios in the database
	  * 
	  * @param ListIntakeTime
	  * 	A list with all intake time informations
	  * 
	  * @param medicineID
	  * 	The medicine id
	  * 
	  */
	public void createIntakeTimeInformation(ArrayList<IntakeTime> ListIntakeTime, int medicineID) {
	 	Connection conn = null;
		PreparedStatement pstmtProduct = null;
		PreparedStatement pstmtLastMedicineID = null; 
		ResultSet rs = null;

		try{					 
			  conn = DBConnection.getConnection();
			 
	    	  String sqlProduct = " insert into intaketime (intakeTime, medicineID, NotificationStatus, intakeStatus, pillQuantity)"
				        + " values (?, ?, ?, ?, ?)";
	    	  
	    	  if(medicineID==0){
		    	  String sqlLastMedicineID = "SELECT medicineID from medicine ORDER BY medicineID DESC LIMIT 1";
		    	  pstmtLastMedicineID = conn.prepareStatement(sqlLastMedicineID);
		    	  rs = pstmtLastMedicineID.executeQuery();
		    	 
		    	  while(rs.next()){
					medicineID = rs.getInt("medicineID");	
		    	  }
	    	  }	  
	    	  
		      for (IntakeTime outputIntakeTime: ListIntakeTime) {
			      pstmtProduct = conn.prepareStatement(sqlProduct);
			      pstmtProduct.setInt(1, outputIntakeTime.getIntakeTimeUnix());
				  pstmtProduct.setInt(2, medicineID);
				  pstmtProduct.setInt(3, 0);
				  pstmtProduct.setInt(4, 0);
				  pstmtProduct.setInt(5, outputIntakeTime.getPillQuantity());
			      pstmtProduct.addBatch();
			      pstmtProduct.executeBatch();
		    	}
		      
		 } catch(Exception e){
			 
		 }  finally {
	            try {   
	            	pstmtProduct.close();
	                conn.close();
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
	       }
	}

	  /**
	  * This method return all intake time informations by intake time from the database
	  * 
	  * @param intakeTimeID
	  * 	The intake time id
	  * 
	  * @return
	  * 	A arraylist with all intake time informations
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
	  * 
	  */
	public ArrayList<IntakeTime> getIntakeTimeByIntakeTimeID(int intakeTimeID) throws ClassNotFoundException, SQLException, IOException {
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		IntakeTime intaketime = null;

		String query = "SELECT * FROM intaketime WHERE intakeTimeID="+intakeTimeID;
		ArrayList<IntakeTime> listIntaketimes = new ArrayList<IntakeTime>();
		
		try{
			con = DBConnection.getConnection();
			stmt = con.createStatement();
			rs = stmt.executeQuery(query);
			while(rs.next()){
				intaketime = new IntakeTime();
				intaketime.setIntakeTimeID(rs.getInt("intakeTimeID"));
				intaketime.setMedicineID(rs.getInt("medicineID"));
				intaketime.setIntakeTime(rs.getString("intakeTime"));
				intaketime.setPillQuantity(rs.getInt("pillQuantity"));
				listIntaketimes.add(intaketime);
			}
		}finally{
			if(rs != null) rs.close();
			if(stmt != null)stmt.close();			
			if(con !=null)con.close();
		}	
		return listIntaketimes;		
	}

	
	  /**
	  * This method is used to save the edited intake time informations in the database
	  * 
	  * @param intakeTime
	  * 	The IntakTime-Object with all intake time informations
	  * 
	  */
	public void editIntakeTime(IntakeTime intakeTime) {
		Connection conn = null;
		PreparedStatement pstmtProduct = null;

		try{					 
			  conn = DBConnection.getConnection();
			 
	    	  String sqlProduct = " UPDATE intaketime SET intakeTime = ?, pillQuantity = ? WHERE intakeTimeID = ?";
	    	  
		      pstmtProduct = conn.prepareStatement(sqlProduct);
		      pstmtProduct.setInt(1, intakeTime.getIntakeTimeUnix());
		      pstmtProduct.setInt(2, intakeTime.getPillQuantity());
			  pstmtProduct.setInt(3, intakeTime.getIntakeTimeID());
		      pstmtProduct.executeUpdate();
		 } catch(Exception e){
			 
		 }  finally {
	            try {   
	            	pstmtProduct.close();
	                conn.close();
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
	        }
		
	}

	  /**
	  * This method is used to save the visual settings in the database
	  * 
	  * @param notificationSettings
	  * 	The notificationSettings-Object with notification informations
	  * 
	  */
	public void saveVisualSettings(NotificationSetting notificationSettings) {
		Connection conn = null;
		PreparedStatement pstmtProduct = null;

		try{					 
			  conn = DBConnection.getConnection();
			 
	    	  String sqlProduct = " UPDATE notificationconfiguration SET useLight = ?, lightColor = ? ";
	    	  
		      pstmtProduct = conn.prepareStatement(sqlProduct);
		      pstmtProduct.setString(2, notificationSettings.getLightColor());
		      pstmtProduct.setBoolean(1, notificationSettings.isUseLight());
		      
		      pstmtProduct.executeUpdate();
		 } catch(Exception e){
			 
		 }  finally {
	            try {   
	            	pstmtProduct.close();
	                conn.close();
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
	        }	
	}
	
	
	  /**
	  * This method is used to save the visual settings in the database
	  * 
	  * @param notificationSettings
	  * 	The notificationSettings-Object with notification informations
	  * 
	  */
	public void saveAccousticalSettings(NotificationSetting notificationSettings) {
		Connection conn = null;
		PreparedStatement pstmtProduct = null;

		try{					 
			  conn = DBConnection.getConnection();
			 
	    	  String sqlProduct = " UPDATE notificationconfiguration SET useSpeaker = ?, notificationSoundName = ?";
	    	  
		      pstmtProduct = conn.prepareStatement(sqlProduct);
		      pstmtProduct.setBoolean(1, notificationSettings.isUseSpeaker());
		      pstmtProduct.setString(2, notificationSettings.getNotificationSoundName());
		      pstmtProduct.executeUpdate();
		 } catch(Exception e){
			 
		 }  finally {
	            try {   
	            	pstmtProduct.close();
	                conn.close();
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
	        }
	}

	  /**
	  * This method is used to get the medicine informations by the medicine id
	  * 
	  * @param medicineID
	  * 	The Medicine-Object with all medicine informations
	  * 
	  * @return 
	  * 	A Medicine-Object with all medicine informations
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
	  */
	public Medicine getMedicineInformationByMedicineID(int medicineID) throws ClassNotFoundException, SQLException, IOException {
			Connection con = null;
			Statement stmt = null;
			ResultSet rs = null;
			Medicine medicine = null;
			String query = " SELECT * "
					+ 	   " FROM medicine "
					+ 	   " WHERE medicineID = "+medicineID+""
					+      " GROUP BY medicineID ";
			
			try{
				con = DBConnection.getConnection();
				stmt = con.createStatement();
				rs = stmt.executeQuery(query);
				while(rs.next()){
					medicine = new Medicine();
					medicine.setId(rs.getInt("medicineID"));
					medicine.setStock(rs.getInt("stock"));
					medicine.setMedicineName(rs.getString("medicineName"));
					medicine.setNote(rs.getString("note"));
					medicine.setDisease(rs.getString("disease"));
					medicine.setSendNotification(rs.getBoolean("sendNotification"));
					medicine.setSavetyStock(rs.getInt("savetystock"));
					medicine.setContactType(rs.getString("contactType"));
					medicine.setBoxID(rs.getInt("boxID"));
					medicine.setSourceType(rs.getString("sourceType"));
					medicine.setSendOrder(rs.getBoolean("sendOrder"));
				}
			}finally{
				if(rs != null) rs.close();
				if(stmt != null)stmt.close();			
				if(con !=null)con.close();
			}	
			return medicine;		
		}

	
	  /**
	  * This method is used to create contact a person
	  * 
	  * @param contactPerson
	  * 	The ContactPerson-Object with all contact person informations
	  * 
	  */
	public void createContactPerson(ContactPerson contactPerson) {
		Connection conn = null;
		PreparedStatement pstmtContactPerson = null;
		
		try{					 
			  conn = DBConnection.getConnection(); 
			  String sqlContactPerson = " insert into psychologicalparent (name, surname, email, sex, contactType, recieveNotification)"
				        + " values (?, ?, ?, ?, ?, ?)";
	    	  
	    	  pstmtContactPerson = conn.prepareStatement(sqlContactPerson);
	    	  pstmtContactPerson.setString(1, contactPerson.getName());
		      pstmtContactPerson.setString(2, contactPerson.getSurname());
		      pstmtContactPerson.setString(3, contactPerson.getEmail());
		      pstmtContactPerson.setString(4, contactPerson.getSex());
		      pstmtContactPerson.setString(5, contactPerson.getContactType());
		      pstmtContactPerson.setBoolean(6, contactPerson.isRecieveNotification());
		      
		      pstmtContactPerson.executeUpdate();
		 } catch(Exception e){
			 
		 }  finally {
	            try {   
	            	pstmtContactPerson.close();
	                conn.close();
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
	        }
	}

	  /**
	  * This method is used to get all contact persons from the database
	  * 
	  * @return 
	  * 	A Arraylist with all contact person informations
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
	  */
	public ArrayList<ContactPerson> getContactPerson() throws SQLException, ClassNotFoundException, IOException {
		ContactPerson contactPerson = null;
		
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		ArrayList<ContactPerson> listContactPerson = new ArrayList<ContactPerson>();
		
		String sqlContactPerson = "SELECT * FROM psychologicalparent";
		int numberOfContactPersons = 0;
		
		try{
			con = DBConnection.getConnection();
			pstmt = con.prepareStatement(sqlContactPerson);
			
			rs = pstmt.executeQuery();
			while(rs.next()){
				contactPerson = new ContactPerson();
				contactPerson.setName(rs.getString("name"));
				contactPerson.setSurname(rs.getString("surname"));
				contactPerson.setEmail(rs.getString("email"));
				contactPerson.setSex(rs.getString("sex"));
				contactPerson.setId(rs.getInt("psychologicalParentID"));
				contactPerson.setRecieveNotification(rs.getBoolean("recieveNotification"));
				contactPerson.setContactType(rs.getString("contactType"));
				listContactPerson.add(contactPerson);
			}
			
		}finally{
			if(rs != null) rs.close();
			if(pstmt != null)pstmt.close();			
			if(con !=null)con.close();
		}		
		
		return listContactPerson;
	}

	  /**
	  * This method is used to delete a specific contact person the contact person id
	  * 
	  * @param psychologicalParentID (contactPersonID)
	  * 	The contact person id
	  * 
	  */
	public void deletePsychologicalParent(int psychologicalParentID) {
		Connection con = null;
        Statement stmt = null;
        try
        {
        	con = DBConnection.getConnection();
             
            stmt = con.createStatement();
            stmt.execute("DELETE FROM psychologicalparent WHERE psychologicalParentID ="+psychologicalParentID);
        } 
        catch (Exception e) {
            e.printStackTrace();
        }finally {
            try {   
                stmt.close();
                con.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
		
	}

	  /**
	  * This method is used to get a specific contact persons from the database by the psychologicalParentID
	  * 
	  * @param psychologicalParentID
	  * 	A psychologicalParentID (contactpersonid) 
	  * 
	  * @return 
	  * 	A ContactPerson-Object with all informations of the contact person
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
	  */
	public ContactPerson getPsychologicalParentByPsychologicalParentID(int psychologicalParentID) throws ClassNotFoundException, SQLException, IOException {
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		ContactPerson contactPerson = new ContactPerson();
		String query = " SELECT * "
				+ 	   " FROM psychologicalparent "
				+ 	   " WHERE psychologicalParentID = "+psychologicalParentID+"";
		
		try{
			con = DBConnection.getConnection();
			stmt = con.createStatement();
			rs = stmt.executeQuery(query);
			while(rs.next()){
				contactPerson.setName(rs.getString("name"));
				contactPerson.setSurname(rs.getString("surname"));
				contactPerson.setEmail(rs.getString("email"));
				contactPerson.setSex(rs.getString("sex"));
				contactPerson.setId(rs.getInt("psychologicalParentID"));
				contactPerson.setRecieveNotification(rs.getBoolean("recieveNotification"));
				contactPerson.setContactType(rs.getString("contactType"));
			}
		}finally{
			if(rs != null) rs.close();
			if(stmt != null)stmt.close();			
			if(con !=null)con.close();
		}	
		return contactPerson;	
	}


	  /**
	  * This method is used to save the edited contact person informations
	  * 
	  * @param contactPerson 
	  * 	A ContactPerson-Object with all contact person informations
	  * 
	  */
	public void editPsychologicalParent(ContactPerson contactPerson) {
		Connection conn = null;
		PreparedStatement pstmtProduct = null;

		try{					 
			  conn = DBConnection.getConnection();
			 	  
	    	  String sqlProduct = " UPDATE psychologicalparent SET name = ?, surname = ?, email = ?, sex = ?, contactType = ?, recieveNotification = ? WHERE psychologicalParentID = ?";
	    	  
		      pstmtProduct = conn.prepareStatement(sqlProduct);
		      pstmtProduct.setString(1, contactPerson.getName());
		      pstmtProduct.setString(2, contactPerson.getSurname());
		      pstmtProduct.setString(3, contactPerson.getEmail());
		      pstmtProduct.setString(4, contactPerson.getSex());
		      
		      pstmtProduct.setString(5, contactPerson.getContactType());
		      pstmtProduct.setBoolean(6, contactPerson.isRecieveNotification());
		      pstmtProduct.setInt(7, contactPerson.getId());
		    
		      pstmtProduct.executeUpdate();
		 } catch(Exception e){
			 
		 }  finally {
	            try {   
	            	pstmtProduct.close();
	                conn.close();
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
	        }	
	}
	
	  /**
	  * This method is used to save all edited medicine informations 
	  * 
	  * @param medicine
	  * 	A Medicine-Object with all medicine informations
	  * 
	  */
	public void editMedicine(Medicine medicine) {
		Connection conn = null;
		PreparedStatement pstmtEditMedicine = null;
		PreparedStatement pstmtSwitchBoxID = null;
		PreparedStatement pstmtGetBoxID = null;

		try{					 
			  conn = DBConnection.getConnection();
			 
	    	  String sqlSwitchBoxID = " UPDATE medicine SET boxID = ? WHERE boxID = ?";
	    	  pstmtSwitchBoxID = conn.prepareStatement(sqlSwitchBoxID);
	    	  pstmtSwitchBoxID.setInt(1, medicine.getOldBoxID());
	    	  pstmtSwitchBoxID.setInt(2, medicine.getBoxID());
	    	  pstmtSwitchBoxID.executeUpdate();
			  
	    	  String sqlEditMedcine = " UPDATE medicine SET medicineName = ?, disease = ?, sendNotification = ?, "
	    	  		+ "contactType = ?, note = ?, stock = ?, savetyStock = ?, boxID = ?, sourceType = ?, sendOrder = ? WHERE medicineID = ?";
	    	  
	    	  pstmtEditMedicine = conn.prepareStatement(sqlEditMedcine);
	    	  pstmtEditMedicine.setString(1, medicine.getMedicineName());
	    	  pstmtEditMedicine.setString(2, medicine.getDisease());
	    	  pstmtEditMedicine.setBoolean(3, medicine.isSendNotification());
	    	  pstmtEditMedicine.setString(4, medicine.getContactType());
		      
	    	  pstmtEditMedicine.setString(5, medicine.getNote());
	    	  pstmtEditMedicine.setInt(6, medicine.getStock());
	    	  pstmtEditMedicine.setInt(7, medicine.getSavetyStock());

	    	  pstmtEditMedicine.setInt(8, medicine.getBoxID());
	    	  pstmtEditMedicine.setString(9, medicine.getSourceType());
	    	  pstmtEditMedicine.setBoolean(10, medicine.isSendOrder());
	    	  pstmtEditMedicine.setInt(11, medicine.getId());
	    	  pstmtEditMedicine.executeUpdate();
	    	  
		 } catch(Exception e){
			 
		 }  finally {
	            try {   
	            	pstmtEditMedicine.close();
	            	pstmtSwitchBoxID.close();
	                conn.close();
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
	        }
		
	}
	

	  /**
	  * This method is used to get all intake time informations for the manual dispense 
	  * 
	  * @param startDateUnix
	  * 	The start date in a unix timestamp
	  * 
	  * @param endDateUnix
	  * 	The end date in a unix timestamp
	  * 
	  * @return 
	  * 	A Arraylist with all intake time informations 
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
	  */
	public ArrayList<IntakeTime> getIntakeTimeForVacation(int startDateUnix, int endDateUnix) throws ClassNotFoundException, SQLException, IOException{
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		IntakeTime intaketime = null;
		String intakeTimeQuery = "SELECT * FROM intaketime WHERE intaketime BETWEEN "+startDateUnix+" AND "+endDateUnix+" ";
		
		ArrayList<IntakeTime> listIntakeTime = new ArrayList<IntakeTime>();
		
		try{
			con = DBConnection.getConnection();
			stmt = con.createStatement();
			rs = stmt.executeQuery(intakeTimeQuery);
			while(rs.next()){
				intaketime = new IntakeTime();
				intaketime.setIntakeTimeID(rs.getInt("intakeTimeID"));
				intaketime.setMedicineID(rs.getInt("medicineID"));
				intaketime.setIntakeTimeUnix(rs.getInt("intakeTime"));
				intaketime.setPillQuantity(rs.getInt("pillQuantity"));
				listIntakeTime.add(intaketime);
			}
		}finally{
			if(rs != null) rs.close();
			if(stmt != null)stmt.close();			
			if(con !=null)con.close();
		}	
		return listIntakeTime;	
	}

	  /**
	  * This method is used to set the notification status
	  * 
	  * @param intakeTimeID
	  * 	The intake time id
	  * 
	  * @param notificationStatus
	  * 	The notifications status (triggered or not triggered)
	  * 
	  */
	public void setNotificationStatus(int intakeTimeID, int notificationStatus) {
		Connection conn = null;
		PreparedStatement pstmtEditMedicine = null;

		try{					 
			  conn = DBConnection.getConnection();
			 
			  
	    	  String sqlEditMedcine = " UPDATE intaketime SET NotificationStatus = ? WHERE intakeTimeID = ?";
	    	  
	    	  pstmtEditMedicine = conn.prepareStatement(sqlEditMedcine);
	    	  pstmtEditMedicine.setInt(1, notificationStatus);
	    	  pstmtEditMedicine.setInt(2, intakeTimeID);
		    
	    	  pstmtEditMedicine.executeUpdate();
		 } catch(Exception e){
			 
		 }  finally {
	            try {   
	            	pstmtEditMedicine.close();
	                conn.close();
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
	        }
	}

	  /**
	  * This method is used to set the intake status 
	  * 
	  * @param intakeTimeID
	  * 	The intake time id
	  * 
	  * @param intakeStatus
	  * 	The notifications status (medicine taken or not taken)
	  * 
	  */
	public void setIntakeStatus(int intakeTimeID, int intakeStatus) {
		Connection conn = null;
		PreparedStatement pstmtEditMedicine = null;

		try{					 
			  conn = DBConnection.getConnection();
						  
	    	  String sqlEditMedcine = " UPDATE intaketime SET intakeStatus = ? WHERE intakeTimeID = ?";
	    	  
	    	  pstmtEditMedicine = conn.prepareStatement(sqlEditMedcine);
	    	  pstmtEditMedicine.setInt(1, intakeStatus);
	    	  pstmtEditMedicine.setInt(2, intakeTimeID);
		    
	    	  pstmtEditMedicine.executeUpdate();
		 } catch(Exception e){
			 
		 }  finally {
	            try {   
	            	pstmtEditMedicine.close();
	                conn.close();
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
	        }
		
	}

	public Collection<?> getActiveMedicineBoxes() throws ClassNotFoundException, SQLException, IOException {
			Connection con = null;
			Statement stmt = null;
			ResultSet rs = null;
			
			String query = " SELECT boxID"
					+ 	   " FROM medicine ";
			
			ArrayList<Integer> listActiveMedicineBoxes = new ArrayList<Integer>();
			
			try{
				con = DBConnection.getConnection();
				stmt = con.createStatement();
				rs = stmt.executeQuery(query);
				while(rs.next()){
					listActiveMedicineBoxes.add(rs.getInt("boxID"));
					
				}
			}finally{
				if(rs != null) rs.close();
				if(stmt != null)stmt.close();			
				if(con !=null)con.close();
			}	
			return listActiveMedicineBoxes;		
		}


	  /**
	  * This method is used to create a source of supply 
	  * 
	  * @param sourceOfSupply
	  * 	The SourceOfSupply-Object with all source of supply informations
	  * 
	  */
	public void createSourceOfSupply(SourceOfSupply sourceOfSupply) {
		Connection conn = null;
		PreparedStatement pstmtSourceOfSupply = null;
		
		try{					 
			  conn = DBConnection.getConnection(); 
			  String sqlSourceOfSupply = " insert into sourceofsupply (name, address, email, sourceType, recieveMail)"
				        + " values (?, ?, ?, ?, ?)";
	    	  
			  pstmtSourceOfSupply = conn.prepareStatement(sqlSourceOfSupply);
			  pstmtSourceOfSupply.setString(1, sourceOfSupply.getName());
			  pstmtSourceOfSupply.setString(2, sourceOfSupply.getAddress());
			  pstmtSourceOfSupply.setString(3, sourceOfSupply.getEmail());
		      pstmtSourceOfSupply.setString(4, sourceOfSupply.getSourceType());
		      pstmtSourceOfSupply.setBoolean(5, sourceOfSupply.isRecieveMail());
		      
		      pstmtSourceOfSupply.executeUpdate();
		 } catch(Exception e){
			 
		 }  finally {
	            try {   
	            	pstmtSourceOfSupply.close();
	                conn.close();
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
	        }
		
	}


	  /**
	  * This method is used to get all sourc of supply informations from the database
	  * 
	  * @return 
	  * 	A Arraylist with all source of supply informations
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
	  */
	public ArrayList<SourceOfSupply> getSourceOfSupply() throws ClassNotFoundException, SQLException, IOException {
				SourceOfSupply sourceOfSupply= null;
				
				Connection con = null;
				PreparedStatement pstmt = null;
				ResultSet rs = null;
				ArrayList<SourceOfSupply> listSourceOfSupply = new ArrayList<SourceOfSupply>();
				
				String sqlSourceOfSupply = "SELECT * FROM sourceofsupply";
				
				try{
					con = DBConnection.getConnection();
					pstmt = con.prepareStatement(sqlSourceOfSupply);
					
					rs = pstmt.executeQuery();
					while(rs.next()){
						sourceOfSupply = new SourceOfSupply();
						sourceOfSupply.setName(rs.getString("name"));
						sourceOfSupply.setEmail(rs.getString("email"));
						sourceOfSupply.setId(rs.getInt("id"));
						sourceOfSupply.setAddress(rs.getString("address"));
						sourceOfSupply.setRecieveMail(rs.getBoolean("recieveMail"));
						sourceOfSupply.setSourceType(rs.getString("sourceType"));
						listSourceOfSupply.add(sourceOfSupply);
					}
					
				}finally{
					if(rs != null) rs.close();
					if(pstmt != null)pstmt.close();			
					if(con !=null)con.close();
				}		
				
				return listSourceOfSupply;
	}

	  /**
	  * This method is used to delete a specific source of supply by the source of supply id
	  * 
	  * @param sourceOfSupplyID
	  * 	The source of supply id
	  * 
	  */
	public void deleteSourceOfSupply(int sourceOfSupplyID) {
		Connection con = null;
        Statement stmt = null;
        try
        {
        	con = DBConnection.getConnection();
            stmt = con.createStatement();
            stmt.execute("DELETE FROM sourceofsupply WHERE id ="+sourceOfSupplyID);
        } 
        catch (Exception e) {
            e.printStackTrace();
        }finally {
            try {   
                stmt.close();
                con.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
	}

	  /**
	  * This method is used to get all source of supply informations from the database
	  * 
	  * @return SourceOfSupply
	  * 	The SourceOfSupply-Object with all source of supply informations
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
	  */
	
	public SourceOfSupply getSourceOfSupplyBySourceOfSupplyID(int sourceOfSupplyID) throws ClassNotFoundException, SQLException, IOException {
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		SourceOfSupply sourceOfSupply = null;
		String query = " SELECT * FROM sourceofsupply WHERE id = "+sourceOfSupplyID+"";
		
		try{
			con = DBConnection.getConnection();
			stmt = con.createStatement();
			rs = stmt.executeQuery(query);
			while(rs.next()){
				sourceOfSupply = new SourceOfSupply();
				sourceOfSupply.setId(rs.getInt("id"));
				sourceOfSupply.setName(rs.getString("name"));
				sourceOfSupply.setAddress(rs.getString("address"));
				sourceOfSupply.setEmail(rs.getString("email"));
				sourceOfSupply.setSourceType(rs.getString("sourcetype"));
				sourceOfSupply.setRecieveMail(rs.getBoolean("recievemail"));
			}
		}finally{
			if(rs != null) rs.close();
			if(stmt != null)stmt.close();			
			if(con !=null)con.close();
		}	
		return sourceOfSupply;		
	}


	  /**
	  * This method is used to save the edited source of supply informations
	  * 
	  * @param sourceOfSupply
	  * 	The sourceOfSupply-Object with all source of supply informations
	  * 
	  */
	public static void editSourceOfSupply(SourceOfSupply sourceOfSupply) {
		Connection conn = null;
		PreparedStatement pstmtEditSourceOfSupply= null;

		try{					 
			 conn = DBConnection.getConnection();
			 
	    	 String sqlEditSourceOfSupply = " UPDATE sourceofsupply SET name = ?, address = ?, email = ?, "
	    	 		+ " sourceType = ?, recieveMail = ? WHERE id = ?";
	    	 
	    	 pstmtEditSourceOfSupply = conn.prepareStatement(sqlEditSourceOfSupply);
	    	 pstmtEditSourceOfSupply.setString(1, sourceOfSupply.getName());
	    	 pstmtEditSourceOfSupply.setString(2, sourceOfSupply.getAddress());
	    	 pstmtEditSourceOfSupply.setString(3, sourceOfSupply.getEmail());
	    	 pstmtEditSourceOfSupply.setString(4, sourceOfSupply.getSourceType());
	    	 pstmtEditSourceOfSupply.setBoolean(5, sourceOfSupply.isRecieveMail());
	     	 pstmtEditSourceOfSupply.setInt(6, sourceOfSupply.getId());
	     	 pstmtEditSourceOfSupply.executeUpdate();
	    	  
		 } catch(Exception e){
			 
		 }  finally {
	            try {   
	            	pstmtEditSourceOfSupply.close();
	                conn.close();
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
	        }
	}


	public void setNewStockAmount(int dispenseAmount, int boxID) {
		Connection conn = null;
		PreparedStatement pstmtStock = null; 
		PreparedStatement pstmtNewStock = null; 
		ResultSet rs = null;
		
		int stock = 0;	

		try{					 
			  conn = DBConnection.getConnection();
			 
		      String sqlLastMedicineID = "SELECT stock from medicine WHERE boxID = ?";
		      pstmtStock = conn.prepareStatement(sqlLastMedicineID);
		      pstmtStock.setInt(1, boxID);
		      rs = pstmtStock.executeQuery();
		    	 
		      while(rs.next()){
					stock = (rs.getInt("stock"))-dispenseAmount;	
		       }
		      
		      if(stock<0){
		    	  stock=0;
		      }
		      
		      String sqlSetNewStock = " UPDATE medicine SET stock = ? WHERE boxID = ?";
		    	 
		      pstmtNewStock = conn.prepareStatement(sqlSetNewStock);
		      pstmtNewStock.setInt(1, stock);
		      pstmtNewStock.setInt(2, boxID);
		      pstmtNewStock.executeUpdate();
	    	 
		 } catch(Exception e){
			 
		 }  finally {
	            try {   
	            	pstmtStock.close();
	            	pstmtNewStock.close();
	                conn.close();
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
	       }
	}


	public Medicine getMedicineInformationByBoxID(int boxID) throws ClassNotFoundException, SQLException, IOException {
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		Medicine medicine = null;
		String query = " SELECT * "
				+ 	   " FROM medicine "
				+ 	   " WHERE boxID = "+boxID+"";
		
		try{
			con = DBConnection.getConnection();
			stmt = con.createStatement();
			rs = stmt.executeQuery(query);
			while(rs.next()){
				medicine = new Medicine();
				medicine.setId(rs.getInt("medicineID"));
				medicine.setStock(rs.getInt("stock"));
				medicine.setMedicineName(rs.getString("medicineName"));
				medicine.setNote(rs.getString("note"));
				medicine.setDisease(rs.getString("disease"));
				medicine.setSendNotification(rs.getBoolean("sendNotification"));
				medicine.setSavetyStock(rs.getInt("savetystock"));
				medicine.setContactType(rs.getString("contactType"));
				medicine.setBoxID(rs.getInt("boxID"));
				medicine.setSourceType(rs.getString("sourceType"));
				medicine.setSendOrder(rs.getBoolean("sendOrder"));
			}
		}finally{
			if(rs != null) rs.close();
			if(stmt != null)stmt.close();			
			if(con !=null)con.close();
		}	
		return medicine;		
	}
}