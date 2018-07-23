let versesArr = document.querySelector('.resized-text').innerHTML.trim().replace(/(?:\r\n|\r|\n)/g, '').split('<br><br>');
if (versesArr.length === 1) versesArr = document.querySelector('.resized-text').innerHTML.trim().replace(/(?:\r\n|\r|\n)/g, '').split('<br> <br>');
let chorus = null;
let verses = [];
let index = 0;

versesArr.forEach((verse, index) => {
    if (verse[0].toUpperCase() === 'R' && (verse[1] === '.' || verse[1] === ':' || verse[1] === ' ')) {
        chorus = verse;
        versesArr.splice(index, 1);
        
        if (index === 0) {
            verses.push(chorus);
        }
    }
});

let verseIndex = 0;
for (i = 0; i <= versesArr.length*2; i++) {
    if (i % 2 === 0 || chorus === null) {
        verses.push(versesArr[verseIndex]);
        verseIndex++;
    } else {
        verses.push(chorus);
    }

    if (versesArr[verseIndex] === undefined) {
        if (chorus !== null) verses.push(chorus);
        break;
    }
}

let slider = document.createElement('div');
let id = document.createAttribute('id');
let style = document.createAttribute('style');
id.value = 'slide_text';
style.value = `position: fixed; 
            width: 100%; 
            height: 100%; 
            top: 0; 
            background-color: 
            black; 
            color: white; 
            font-size: 80px; 
            z-index: 99999999999; 
            padding: 50px; 
            text-align: center; 
            overflow: auto;
            display: flex;
            justify-content: center;
            align-items: center;`;

slider.setAttributeNode(id);
slider.setAttributeNode(style);
show();

let slideBtn = document.createElement('button');
let btnClass = document.createAttribute('class');
btnClass.value = 'btn btn-sm';
slideBtn.setAttributeNode(btnClass);
slideBtn.appendChild(document.createTextNode('PPT'));
slideBtn.onclick = function() {
    document.querySelector('body').appendChild(slider);
};
document.querySelector('.titleContent').appendChild(slideBtn);

function next() {
    if (index >= verses.length - 1) return;
    index++;
    show();
}

function prev() {
    if (index <= 0) return;
    index--;
    show();
}

function show() {
    slider.innerHTML = verses[index];
}

document.onkeydown = function (e) {
    let key = e.keyCode;
    if (key == 37) {
        prev();
    } else if (key == 39 || key == 32) {
        next();
    } else if (key == 27) { // esc
        document.querySelector('body').removeChild(slider);
        index = 0;
    }
};
