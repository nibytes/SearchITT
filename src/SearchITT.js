// ==UserScript==
// @name         Search ITT
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       nbytes
// @match        *://arhivach.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var css = ".search-button {position: fixed;width: 250px;height: 23px;background: #fafafa;top: 40%;display: block;z-index: 20000;left: -115px;text-align: center;cursor: pointer;-webkit-transform: rotate(90deg);transform: rotate(90deg);border: 2px solid #ef5b06;}",
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
    var div = document.createElement('div');
    div.className = "search-button";
    div.innerText = "ИСКАТЬ В ТРЕДЕ";
    var searchState = false;
    var searched = [];
    var prev;
    div.onclick = function(){
        if(!searchState){
            var query = prompt('Что ищем?', "");
            if(query!==""){
                searched = Array.prototype.slice.call(document.querySelectorAll('.post_comment_body')).filter((x)=>{ return x.innerText.includes(query)}).reverse();
                console.log(searched);
                if(prev){
                    prev.style.border = "";
                }
                prev = searched.pop()
                prev.style.border = "3px solid red";
                window.scrollTo(0, prev.offsetTop);
                div.innerText = "Следующий";
                searchState = true;
            }

        }else{
            if(searched.length!==0){
                prev.style.border = "";
                prev = searched.pop()
                prev.style.border = "3px solid red";
                window.scrollTo(0, prev.offsetTop);
            }else{
                prev.style.border = "";
                div.innerText = "ИСКАТЬ В ТРЕДЕ"
                searchState = false;
            }
        }
    }
    var body = document.body;
    body.appendChild(div);
    // Your code here...
})();