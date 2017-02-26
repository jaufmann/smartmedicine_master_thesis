package classes;



public class SourceOfSupply {

	private int id = 0;
	private String name = "";
	private String address = "";
	private String email = "";
	private String sourceType ="";
	private boolean recieveMail = false;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSourceType() {
		return sourceType;
	}
	public void setSourceType(String sourceType) {
		this.sourceType = sourceType;
	}
	public boolean isRecieveMail() {
		return recieveMail;
	}
	public void setRecieveMail(boolean recieveMail) {
		this.recieveMail = recieveMail;
	}
	
	
}
