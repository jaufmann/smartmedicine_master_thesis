package classes;

 
public class NotificationSetting {

	private int notificationConfigurationID;
	private boolean useLight;
	private boolean useSpeaker;
	private String lightColor;
	private String notificationSoundName;
	
	
	public boolean isUseLight() {
		return useLight;
	}
	public void setUseLight(boolean useLight) {
		this.useLight = useLight;
	}
	public boolean isUseSpeaker() {
		return useSpeaker;
	}
	public void setUseSpeaker(boolean useSpeaker) {
		this.useSpeaker = useSpeaker;
	}
	public int getNotificationConfigurationID() {
		return notificationConfigurationID;
	}
	public void setNotificationConfigurationID(int notificationConfigurationID) {
		this.notificationConfigurationID = notificationConfigurationID;
	}
	
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return "useLight:"+useLight;
	}
	public String getLightColor() {
		return lightColor;
	}
	public void setLightColor(String lightColor) {
		this.lightColor = lightColor;
	}
	public String getNotificationSoundName() {
		return notificationSoundName;
	}
	public void setNotificationSoundName(String notificationSoundName) {
		this.notificationSoundName = notificationSoundName;
	}
}
