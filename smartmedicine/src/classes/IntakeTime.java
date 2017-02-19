package classes;

import java.security.Timestamp;
import java.util.ArrayList;

public class IntakeTime {
	private int intakeTimeID;
	private int medicineID;
	private ArrayList<Integer> listIntakteTimeUnix;
	private Integer intakeTimeUnix;
	private String intakeTime;
	private boolean isNotificationTriggered;
	private boolean isIntakeTriggered;
	private int pillQuantity;
	
	public int getIntakeTimeID() {
		return intakeTimeID;
	}
	public void setIntakeTimeID(int intakeTimeID) {
		this.intakeTimeID = intakeTimeID;
	}
	public int getMedicineID() {
		return medicineID;
	}
	public void setMedicineID(int medicineID) {
		this.medicineID = medicineID;
	}

	public String getIntakeTime() {
		return intakeTime;
	}
	public void setIntakeTime(String intakeTime) {
		this.intakeTime = intakeTime;
	}
	public ArrayList<Integer> getListIntakteTimeUnix() {
		return listIntakteTimeUnix;
	}
	public void setListIntakteTimeUnix(ArrayList<Integer> listIntakteTimeUnix) {
		this.listIntakteTimeUnix = listIntakteTimeUnix;
	}
	public Integer getIntakeTimeUnix() {
		return intakeTimeUnix;
	}
	public void setIntakeTimeUnix(Integer intakeTimeUnix) {
		this.intakeTimeUnix = intakeTimeUnix;
	}
	public boolean isIntakeTriggered() {
		return isIntakeTriggered;
	}
	public void setIntakeTriggered(boolean isIntakeTriggered) {
		this.isIntakeTriggered = isIntakeTriggered;
	}
	public boolean isNotificationTriggered() {
		return isNotificationTriggered;
	}
	public void setNotificationTriggered(boolean isNotificationTriggered) {
		this.isNotificationTriggered = isNotificationTriggered;
	}
	public int getPillQuantity() {
		return pillQuantity;
	}
	public void setPillQuantity(int pillQuantity) {
		this.pillQuantity = pillQuantity;
	}

}
