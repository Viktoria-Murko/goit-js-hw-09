!function(){var t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]"),bodyEl:document.querySelector("body")},n=null;t.startBtn.addEventListener("click",(function(e){t.startBtn.disabled=!0,t.stopBtn.disabled=!1,n=setInterval((function(){t.bodyEl.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)})),t.stopBtn.addEventListener("click",(function(e){t.startBtn.disabled=!1,t.stopBtn.disabled=!0,clearInterval(n)}))}();
//# sourceMappingURL=01-color-switcher.86fdc904.js.map