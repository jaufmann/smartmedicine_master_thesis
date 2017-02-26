package database;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DBConnection {
	public static Connection getConnection() throws ClassNotFoundException, SQLException, IOException {
	   Connection conn = null;	   
	   Properties prop = new Properties();
       InputStream input = null;

       //input = new FileInputStream("/opt/openhab/webapps/config/smartmedicine.properties");
      
       input = new FileInputStream("smartmedicine.properties");
   	
	   prop.load(input);

	   String JDBC_DRIVER = prop.getProperty("JDBC_DRIVER");  
	   String DB_URL = prop.getProperty("DB_URL");
	   String USER = prop.getProperty("USER");
	   String PASS = prop.getProperty("PASS");
	   
	   Class.forName(JDBC_DRIVER);
	   conn = DriverManager.getConnection(DB_URL,USER,PASS);
	   return conn;   
	}
}
