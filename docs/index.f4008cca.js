function showOnlyTag(t,s="default"){var e=document.getElementsByClassName("home-image-parent");if(t.classList.contains("projects-button-active")){clearNavButtons();for(var o=0;o<e.length;o++)e[o].classList.remove("d-none"),e[o].classList.add("d-block");console.log("Returning All Projects to List")}else{clearNavButtons(t),t.classList.add("projects-button-active");for(o=0;o<e.length;o++)e[o].classList.remove("d-block"),e[o].classList.add("d-none");var a=document.getElementsByClassName(s);for(o=0;o<a.length;o++)a[o].classList.remove("d-none"),a[o].classList.add("d-block");console.log("Ran Show on "+a.length+" Items with '"+s+"'")}}function clearNavButtons(t){for(var s=document.getElementsByClassName("projects-button-active"),e=0;e<s.length;e++)s[e].classList.add("projects-button"),s[e].classList.remove("projects-button-active")}
//# sourceMappingURL=index.f4008cca.js.map