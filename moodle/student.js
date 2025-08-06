// student.js

if (typeof UMMd !== 'undefined') {
    throw new Error('Double inluded for student.js');j
}
if (window.location.href.slice(0,4)=="file")
    gitUrl = "..";
else
    gitUrl = 'https://tlam64.github.io/moodle'

UMMd = {
    course: '',
    courseInstructor: false,  // not used anymore
    gitUrl
}
console.log('student.js');
loadCSS('style');
window.addEventListener('load', onLoad)

// functions 
function onLoad() {
    let userBtn = document.querySelector('.userbutton .usertext')

    UMMd.course=document.getElementsByTagName('h1')[0].innerText.slice(0,20);
    let uls=document.querySelectorAll('ul[onclick="_M(this)"]');
        // student setting
        for (ul of uls) {
            ul.removeAttribute('onclick')
        }
    // Click to review items
    let elems = document.querySelectorAll(".hide_show_frame");
    for (elem of elems) {
        elem.addEventListener('click',(e)=>{
            let span = e.target.querySelectorAll('span.hide_show');
            for (s of span) {
                s.classList.remove('hide_show');
            }
        })
    }
    elems = document.querySelectorAll(".hide_show")
    for (elem of elems) {
        elem.addEventListener('click',(e)=>{
            console.log(e.target)
            //e.target.style.opacity=1
            e.target.classList.remove('hide_show');
        })
    }
    if (UMMd.course.includes("CISC1001")) {
        loadCSS('prism');
        loadScript('prism');
    }
    // Part 2 of onload (called by note editor as well)
    // onLoad2(document)
}

function formSelectors (list, baseClass) {
    let selector = ''
    for (var i=0; i<list.length; i++) {
        if (list[i] != baseClass)
            selector += `,.${baseClass}.${list[i]}`
    }
    if (selector.length > 1)
        return selector.slice(1)
    else
        return ''
}
    
function onLoad2(doc) {
    // Sync highlighting
    //elems = this.document.querySelectorAll("span.sync_hl")
    elems = doc.querySelectorAll("span.sync_hl")
    for (elem of elems) {
        elem.addEventListener('mouseover', function(e){
            let objs =document.querySelectorAll(formSelectors(e.target.classList, 'sync_hl'))
            for (obj of objs) {
                obj.style.backgroundColor = "#fcc"
            }
        })
        elem.addEventListener('mouseleave', function(e){
            // let gname = e.target.getAttribute('group')
            let objs = document.querySelectorAll(formSelectors(e.target.classList, 'sync_hl'))
            for (obj of objs) {
                obj.style.backgroundColor = null
            }
        })
    }
}
// Load a css file dynmaically
function loadCSS (name) {
    let link = document.createElement('link')
    link.href = UMMd.gitUrl+`/${name}.css`; 
    link.type = 'text/css'
    link.rel= "stylesheet"
    document.head.appendChild(link)
}
// Load a JavaScript file dynamically
function loadScript (js) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = UMMd.gitUrl+`/${js}.js`;
    script.async = true;
    document.head.appendChild(script);
}
