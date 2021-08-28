let btn = document.querySelector("button");
let form = document.querySelector("form");
let save = document.getElementById("save");
let i=0;

btn.onclick = function(){
    let slide = document.createElement("div");
    let slide1 = document.createElement("div");
    let textarea = document.createElement("textarea");
    textarea.setAttribute("name",`textarea${i}`);
    textarea.setAttribute("id",`textarea${i}`);
    slide1.setAttribute("class","drag");
    slide.setAttribute("class","outer");
    slide1.appendChild(textarea);
    slide.appendChild(slide1);
    form.appendChild(slide);


}

save.onclick = function(){
    document.getElementById("form").submit();
}

let p = document.querySelector("p");
let p1 = p.innerHTML;
let texta = document.querySelectorAll("textarea");
let q = p1.length;
let j=0;
for(let i=0;i<q;i++)
{
    if(p1[i] == j.toString())
    {
        textarea.innerHTML = p1.slice(j,i+1);
        j++;
    }
}