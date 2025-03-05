var coll = document.getElementsByClassName("collapsible");
var coll1 = document.getElementsByClassName("collapsible1");
var coll2 = document.getElementsByClassName("collapsible2");
var coll3 = document.getElementsByClassName("collapsible3");
var coll4 = document.getElementsByClassName("collapsible4");
openCollapsable(coll);
openCollapsable(coll1);
openCollapsable(coll2);
openCollapsable(coll3);
openCollapsable(coll4);
function openCollapsable(coll) {
    var i;
    for(i = 0; i < coll.length; i++)coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") content.style.display = "none";
        else content.style.display = "block";
    });
}

//# sourceMappingURL=experience.f76cf260.js.map
