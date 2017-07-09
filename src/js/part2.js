import fn2 from './modules/module2';
import template from "./templates/test.hbs";

fn2();

console.log("part2");
// var template = require("./templates/test.hbs");

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        document.body.innerHTML = template({ name: "Epeli" });
    }
}
