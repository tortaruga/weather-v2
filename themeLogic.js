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
   
    document.documentElement.classList.toggle('dark', isDark);  
    handleIcons(); 
}

DOMvars.themeToggle.addEventListener('click', handleThemeToggle);

function handleIcons() { 
    const arrowIconPath = document.querySelector('#arrow-icon path');
    const settingsIconPaths = document.querySelectorAll('#settings-icon path');

    arrowIconPath.setAttribute('fill', isDark ? '#1C274C' : '#b8e6fe');
    settingsIconPaths.forEach(path => {
        path.setAttribute('fill', isDark ? '#1C274C' : '#b8e6fe')
    })
    
    DOMvars.themePaths.forEach(path => {
        path.setAttribute('fill', isDark ? '#b8e6fe' : '#052f4a');
    })
}    


