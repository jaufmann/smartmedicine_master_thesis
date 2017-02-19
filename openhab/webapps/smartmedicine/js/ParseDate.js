/**
 * 
 */

function parseDayToDayName(dayNumber){
	var dayName;
	if(dayNumber==0){
		dayName="Sonntag";
	} else if(dayNumber==1){
		dayName="Montag";
	} else if (dayNumber==2) {
		dayName="Dienstag";
	} else if (dayNumber==3){
		dayName="Mittwoch";
	} else if (dayNumber==4){
		dayName="Donnestag";
	} else if (dayNumber==5){
		dayName="Freitag";
	} else if (dayNumber==6){
		dayName="Samstag";
	}
	return dayName;
}


function parseMonthToMonthName(monthNumber){
	var dayName;
	if(monthNumber==0){
		dayName="Januar";
	} else if(monthNumber==1){
		dayName="Februar";
	} else if (monthNumber==2) {
		dayName="März";
	} else if (monthNumber==3){
		dayName="April";
	} else if (monthNumber==4){
		dayName="Mai";
	} else if (monthNumber==5){
		dayName="Juni";
	} else if (monthNumber==6){
		dayName="Juli";
	} else if(monthNumber==1){
		dayName="Juni";
	} else if (monthNumber==7) {
		dayName="August";
	} else if (monthNumber==8){
		dayName="September";
	} else if (monthNumber==9){
		dayName="Oktober";
	} else if (monthNumber==10){
		dayName="November";
	} else if (monthNumber==11){
		dayName="Dezember";
	}
	return dayName;
}
	