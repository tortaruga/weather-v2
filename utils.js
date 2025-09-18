import * as DOMvars from './DOMvariables.js';
import * as units from './unitLogic.js';


export function getFormattedDate(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const dateObj = new Date(date);
    return dateObj.toLocaleDateString([], options);
}   

export function getFormattedTime(date) {
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };

    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString([], options);
}


export function displayMoonPhaseIcon(phase) {
    const normalizedPhase = phase.toLowerCase().replace(' ', '-');
    DOMvars.phaseIconElement.src = `./images/icons/${normalizedPhase}.svg`;
}
 
let img;
export function handleImage(conditionCode, isDay) { 
    if (conditionCode === 1000) {
        img = isDay ? '/images/clear.png' : '/images/night.png';  
    } else if (conditionCode === 1237 || conditionCode === 1261) {
        img = '/images/rainy.png';
    } else if (conditionCode === 1276 || conditionCode === 1282) {
        img = '/images/stormy.png';
    } else if (conditionCode === 1003 || conditionCode === 1006 || conditionCode === 1009) {
        img = '/images/cloudy.png';
    } else if (conditionCode === 1147 || conditionCode === 1030 || conditionCode === 1135) {
        img = '/images/foggy.png';
    } else if (conditionCode === 1087 || conditionCode === 1273 || conditionCode === 1279) {
        img = '/images/stormy.png';
    } else if (conditionCode === 1171 ||  
            conditionCode === 1186 ||
            conditionCode === 1189 ||
            conditionCode === 1192 ||
            conditionCode === 1195 ||
            conditionCode === 1202 ||
            conditionCode === 1243 ||
            conditionCode === 1246) {
                img = '/images/rainy.png';
        } else if (conditionCode === 1198 ||
            conditionCode === 1240 ||
            conditionCode === 1168 ||
            conditionCode === 1063 ||
            conditionCode === 1072 ||
            conditionCode === 1180 ||
            conditionCode === 1150 ||
            conditionCode === 1183 ||
            conditionCode === 1153
        ) {
            img = '/images/rainy.png';
        } else if (conditionCode === 1255 ||
            conditionCode === 1258 ||
            conditionCode === 1225 ||
            conditionCode === 1219 ||
            conditionCode === 1222 ||
            conditionCode === 1213 ||
            conditionCode === 1216 ||
            conditionCode === 1114 ||
            conditionCode === 1066 
        ) {
            img= '/images/snowy.png';
        } else if (conditionCode === 1207 ||
            conditionCode === 1069 ||
            conditionCode === 1204 ||
            conditionCode === 1249 ||
            conditionCode === 1252 ||
            conditionCode === 1117
        ) {
            img = '/images/snowy.png';
        }

        return img;
}


export function createDailyHourElements(hours, localTime) {
    DOMvars.hourlyForecastContainer.innerHTML = '';
    const hourNow = new Date(localTime).getHours();
    console.log(hourNow)
    
    if ((24 - hourNow) < 8) {
        DOMvars.hourlyForecastContainer.classList.add('justify-start');
        DOMvars.hourlyForecastContainer.classList.remove('justify-around');
    } else {
       DOMvars.hourlyForecastContainer.classList.add('justify-around');
        DOMvars.hourlyForecastContainer.classList.remove('justify-start'); 
    }
    
    for (let i = hourNow; i < 24; i++) {
        const div = document.createElement('div');
        div.classList.add("rounded-md", "bg-sky-800/10", "p-4", "text-center", "dark:bg-sky-200/10");     
        DOMvars.hourlyForecastContainer.appendChild(div);

        const hour = document.createElement('p');
        hour.textContent = getFormattedTime(hours[i].time);
        div.appendChild(hour); 
        const icon = document.createElement('img');
        icon.classList.add("w-[2rem]", "d-block", "m-auto");       
        icon.src = hours[i].condition.icon; 
        div.appendChild(icon);  
        const temp = document.createElement('p');
        temp.textContent =  units.handleUnit('temp', hours[i][`temp_${units.identifiers.temp}`]);   
        div.appendChild(temp);
    }

}
