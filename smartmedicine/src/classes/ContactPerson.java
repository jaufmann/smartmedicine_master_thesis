package classes;

public class ContactPerson {
	private String name;
	private String surname;
	private String email;
	private String sex;
	private int id;
	private String contactType;
	private boolean recieveNotification;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getContactType() {
		return contactType;
	}
	public void setContactType(String contactType) {
		this.contactType = contactType;
	}
	public boolean isRecieveNotification() {
		return recieveNotification;
	}
	public void setRecieveNotification(boolean recieveNotification) {
		this.recieveNotification = recieveNotification;
	}
}
