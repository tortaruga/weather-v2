import * as DOMvars from './DOMvariables.js';
let isDark = isNight();

function isNight() {
    const now = new Date().getHours();
    return now >= 17 || now < 6;
}
 
document.documentElement.classList.toggle('dark', isNight());   
handleIcons(); 


function handleThemeToggle() {
    isDark = !isDark;
    DOMvars.themePaths.forEach(path => {
        path.setAttribute('fill', isDark ? '#b8e6fe' : '#052f4a');
    })
    document.documentElement.classList.toggle('dark', isDark);  
    handleIcons(); 
}

DOMvars.themeToggle.addEventListener('click', handleThemeToggle);

function handleIcons() { 
    const arrowIcon = document.querySelector('#arrow-icon');
    const settingsIcon = document.querySelector('#settings-icon');

    arrowIcon.src = isDark ?  
                    './images/icons/arrow-down-dark.svg' :
                    './images/icons/arrow-down.svg'; 

    settingsIcon.src = isDark ?
                    './images/icons/settings.svg' :
                    './images/icons/settings-light.svg';
}


