import fn3 from './modules/module2';
fn3();
console.log("part3");

var Handlebars = require("hbsfy/runtime");
Handlebars.registerHelper("upcase", function(s) {
    return s.toUpperCase();
});
