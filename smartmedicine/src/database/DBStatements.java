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

import classes.ContactPerson;
import classes.IntakeTime;
import classes.Medicine;
import classes.NotificationSetting;
import classes.SourceOfSupply;

public class DBStatements {
	

	
	private static DBConnection dbconnection = null;
		
	public ArrayList<Medicine> getMedicineInformation() throws ClassNotFoundException, SQLException, IOException{
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		Medicine medicine = null;
		/*String query = " SELECT medicine.medicineID, GROUP_CONCAT(DISTINCT intaketime.intakeTimeID) AS intakeTimeID, "
				+ 	   " medicine.note, stock, medicineName, disease "
				+ 	   " FROM intaketime INNER JOIN medicine "
				+      " WHERE intaketime.medicineID = medicine.medicineID "
				+      " GROUP BY medicine.medicineID, medicine.note ";
		*/
		
		String query = " SELECT medicineID, note, stock, medicineName, disease "
				+ 	   " FROM medicine "
				+      " GROUP BY medicineID ";
		ArrayList<Medicine> listMedicine = new ArrayList<Medicine>();
		
		try{
			con = dbconnection.getConnection();
			stmt = con.createStatement();
			rs = stmt.executeQuery(query);
			while(rs.next()){
				medicine = new Medicine();
				medicine.setId(rs.getInt("medicineID"));
				medicine.setStock(rs.getInt("stock"));
				medicine.setMedicineName(rs.getString("medicineName"));
				medicine.setNote(rs.getString("note"));
				
				/*
				//convert sql output to string arraylist
				ArrayList<String> listIntakeTimeIDs = new ArrayList<String>(Arrays.asList(rs.getString("intakeTimeID").split(",")));
				//convert arraylist to integer
				ArrayList<Integer> newList = new ArrayList<Integer>(listIntakeTimeIDs.size()) ;
				for (String myInt : listIntakeTimeIDs) 
	            { 
	              newList.add(Integer.valueOf(myInt)); 
	            }
				
				medicine.setListIntakeTimeIDs(newList);
				*/
				
				medicine.setDisease(rs.getString("disease"));
				listMedicine.add(medicine);
			}
		}finally{
			if(rs != null) rs.close();
			if(stmt != null)stmt.close();			
			if(con !=null)con.close();
		}	
		return listMedicine;		
	}
	
	public ArrayList<IntakeTime> getIntakeTimeByMedicineID(int medicineID) throws SQLException, ClassNotFoundException, IOException{
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		IntakeTime intaketime = null;
		String query = "SELECT * FROM intaketime WHERE medicineID="+medicineID;
		ArrayList<IntakeTime> listIntaketimes = new ArrayList<IntakeTime>();
		
		try{
			con = dbconnection.getConnection();
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
	
	
	public ArrayList<IntakeTime> getIntakeTimeInformation() throws ClassNotFoundException, SQLException, ParseException, IOException{
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		IntakeTime intaketime = null;
		String query = "SELECT * FROM intaketime";
		ArrayList<IntakeTime> listIntaketimes = new ArrayList<IntakeTime>();
		
		try{
			con = dbconnection.getConnection();
			stmt = con.createStatement();
			rs = stmt.executeQuery(query);
			while(rs.next()){
				intaketime = new IntakeTime();
				intaketime.setIntakeTimeID(rs.getInt("intakeTimeID"));
				intaketime.setMedicineID(rs.getInt("medicineID"));
				intaketime.setIntakeTime(rs.getString("intakeTime"));
				intaketime.setNotificationTriggered(rs.getBoolean("NotificationStatus"));
				intaketime.setIntakeTriggered(rs.getBoolean("intakeStatus"));
				listIntaketimes.add(intaketime);
			}
		}finally{
			if(rs != null) rs.close();
			if(stmt != null)stmt.close();			
			if(con !=null)con.close();
		}	
		return listIntaketimes;		
	}
	
	
	public NotificationSetting getNotificationConfiguration() throws ClassNotFoundException, SQLException, ParseException, IOException{
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		IntakeTime intaketime = null;
		String query = "SELECT * FROM notificationconfiguration";
		NotificationSetting notificationConfiguration = new NotificationSetting();
		
		try{
			con = dbconnection.getConnection();
			stmt = con.createStatement();
			rs = stmt.executeQuery(query);
			while(rs.next()){
				notificationConfiguration.setNotificationConfigurationID(rs.getInt("notificationConfigurationID"));
				notificationConfiguration.setUseLight(rs.getBoolean("useLight"));
				notificationConfiguration.setUseSpeaker(rs.getBoolean("useSpeaker"));
				notificationConfiguration.setLightColor(rs.getString("lightColor"));
				notificationConfiguration.setNotificationSoundName(rs.getString("notificationSoundName"));
				System.out.println(rs.getString("notificationSoundName"));
			}
		}finally{
			if(rs != null) rs.close();
			if(stmt != null)stmt.close();			
			if(con !=null)con.close();
		}	
		return notificationConfiguration;		
	}

	public void deleteMedicineInformation(int medicineID) throws SQLException {
		    Connection con = null;
	        Statement stmt = null;
	        try
	        {
	        	con = dbconnection.getConnection();
	             
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

	public void deleteIntakeTimeInformation(int intakeTimeID) {
		 Connection con = null;
	        Statement stmt = null;
	        try
	        {
	        	con = dbconnection.getConnection();
	             
	            stmt = con.createStatement();
	            stmt.execute("DELETE FROM intakeTime WHERE intakeTimeID ="+intakeTimeID);
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
	

	public static void createMedicine(Medicine medicine) throws IOException {
		 	Connection conn = null;
			PreparedStatement pstmtMedicine = null;
			
			try{					 
				  conn = dbconnection.getConnection();
				 
		    	  String sqlProduct = " insert into medicine (medicineName, disease, sendNotification, contactType, "
		    	  		+ " note, stock, savetyStock, boxID)"
					        + " values (?, ?, ?, ?, ?, ?, ?, ?)";
		    	  
		    	  pstmtMedicine = conn.prepareStatement(sqlProduct);
		    	  pstmtMedicine.setString(1, medicine.getMedicineName());
		    	  pstmtMedicine.setString(2, medicine.getDisease());
		    	  pstmtMedicine.setBoolean(3, medicine.isSendNotification());
		    	  pstmtMedicine.setString(4, medicine.getContactType());
		    	  pstmtMedicine.setString(5, medicine.getNote());
		    	  pstmtMedicine.setInt(6, medicine.getStock());
		    	  pstmtMedicine.setInt(7, medicine.getSavetyStock());
		    	  pstmtMedicine.setInt(8, medicine.getBoxID());
			      
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

	public ArrayList<IntakeTime> getIntakeTimeByIntakeTimeID(int intakeTimeID) throws ClassNotFoundException, SQLException, IOException {
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		IntakeTime intaketime = null;

		String query = "SELECT * FROM intaketime WHERE intakeTimeID="+intakeTimeID;
		ArrayList<IntakeTime> listIntaketimes = new ArrayList<IntakeTime>();
		
		try{
			con = dbconnection.getConnection();
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

	public void editIntakeTime(IntakeTime intakeTime) {
		Connection conn = null;
		PreparedStatement pstmtProduct = null;

		try{					 
			  conn = dbconnection.getConnection();
			 
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

	public void saveVisualSettings(NotificationSetting notificationSettings) {
		Connection conn = null;
		PreparedStatement pstmtProduct = null;

		try{					 
			  conn = dbconnection.getConnection();
			 
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
	
	
	public void saveAccousticalSettings(NotificationSetting notificationSettings) {
		Connection conn = null;
		PreparedStatement pstmtProduct = null;

		try{					 
			  conn = dbconnection.getConnection();
			 
	    	  String sqlProduct = " UPDATE notificationconfiguration SET useSpeaker = ?, notificationSoundName = ?";
	    	  
		      pstmtProduct = conn.prepareStatement(sqlProduct);
		      pstmtProduct.setBoolean(1, notificationSettings.isUseSpeaker());
		      pstmtProduct.setString(2, notificationSettings.getNotificationSoundName());
		      System.out.println("hier"+notificationSettings.isUseSpeaker());
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
				con = dbconnection.getConnection();
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
				}
			}finally{
				if(rs != null) rs.close();
				if(stmt != null)stmt.close();			
				if(con !=null)con.close();
			}	
			return medicine;		
		}

	
	public void createContactPerson(ContactPerson contactPerson) {
		Connection conn = null;
		PreparedStatement pstmtContactPerson = null;
		
		try{					 
			  conn = DBConnection.getConnection(); 
			  String sqlContactPerson = " insert into psychologicalparent (name, surname, email, sex, contactType, recieveNotification)"
				        + " values (?, ?, ?, ?, ?, ?)";
	    	  
			  System.out.println(contactPerson.getEmail());
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

	public ArrayList<ContactPerson> getContactPerson() throws SQLException, ClassNotFoundException, IOException {
		// TODO Auto-generated method stub
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

	public void deletePsychologicalParent(int psychologicalParentID) {
		Connection con = null;
        Statement stmt = null;
        try
        {
        	con = dbconnection.getConnection();
             
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

	public ContactPerson getPsychologicalParentByPsychologicalParentID(int psychologicalParentID) throws ClassNotFoundException, SQLException, IOException {
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		ContactPerson contactPerson = new ContactPerson();
		String query = " SELECT * "
				+ 	   " FROM psychologicalparent "
				+ 	   " WHERE psychologicalParentID = "+psychologicalParentID+"";
		
		try{
			con = dbconnection.getConnection();
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
	    	  		+ "contactType = ?, note = ?, stock = ?, savetyStock = ?, boxID = ? WHERE medicineID = ?";
	    	  
	    	  pstmtEditMedicine = conn.prepareStatement(sqlEditMedcine);
	    	  pstmtEditMedicine.setString(1, medicine.getMedicineName());
	    	  pstmtEditMedicine.setString(2, medicine.getDisease());
	    	  pstmtEditMedicine.setBoolean(3, medicine.isSendNotification());
	    	  pstmtEditMedicine.setString(4, medicine.getContactType());
		      
	    	  pstmtEditMedicine.setString(5, medicine.getNote());
	    	  pstmtEditMedicine.setInt(6, medicine.getStock());
	    	  pstmtEditMedicine.setInt(7, medicine.getSavetyStock());
	    	  pstmtEditMedicine.setInt(9, medicine.getId());
	    	  pstmtEditMedicine.setInt(8, medicine.getBoxID());
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
				con = dbconnection.getConnection();
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

	public ArrayList<SourceOfSupply> getSourceOfSupply() throws ClassNotFoundException, SQLException, IOException {
		// TODO Auto-generated method stub
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

	
	public static void main(String[] args) {
		
		SourceOfSupply sourceOfSupply = new SourceOfSupply();
		sourceOfSupply.setName("Dr. Haberbeck");
		sourceOfSupply.setAddress("Mainzer Ring 59");
		sourceOfSupply.setEmail("wjaufmann@gmc.de");
		sourceOfSupply.setSourceType("Arzt");
		sourceOfSupply.setId(8);
		sourceOfSupply.setRecieveMail(true);
		editSourceOfSupply(sourceOfSupply);
	}
	
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
}