package classes;

import java.util.ArrayList;

public class Medicine {
	private int medicineID;
	private String medicineName;
	private boolean sendNotification;
	private String note;
	private int stock;
	private int savetyStock;
	private String disease;
	private String contactType;
	private int boxID;
	private int oldBoxID;
	private String sourceType;
	private boolean sendOrder;

	public int getId() {
		return medicineID;
	}

	public void setId(int id) {
		this.medicineID = id;
	}

	public String getMedicineName() {
		return medicineName;
	}

	public void setMedicineName(String medicineName) {
		this.medicineName = medicineName;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getDisease() {
		return disease;
	}

	public void setDisease(String disease) {
		this.disease = disease;
	}
	
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return "pertinence";
	}

	public int getSavetyStock() {
		return savetyStock;
	}

	public void setSavetyStock(int savetyStock) {
		this.savetyStock = savetyStock;
	}

	public String getContactType() {
		return contactType;
	}

	public void setContactType(String contactType) {
		this.contactType = contactType;
	}

	public boolean isSendNotification() {
		return sendNotification;
	}

	public void setSendNotification(boolean sendNotification) {
		this.sendNotification = sendNotification;
	}

	public int getBoxID() {
		return boxID;
	}

	public void setBoxID(int boxID) {
		this.boxID = boxID;
	}

	public int getOldBoxID() {
		return oldBoxID;
	}

	public void setOldBoxID(int oldBoxID) {
		this.oldBoxID = oldBoxID;
	}

	public String getSourceType() {
		return sourceType;
	}

	public void setSourceType(String sourceType) {
		this.sourceType = sourceType;
	}

	public boolean isSendOrder() {
		return sendOrder;
	}

	public void setSendOrder(boolean sendOrder) {
		this.sendOrder = sendOrder;
	}

}
