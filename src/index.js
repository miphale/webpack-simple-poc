import feather from 'feather-icons';
import Router from 'vanilla-router';
import handlebars  from 'handlebars';
import 'bootstrap';

require('./uihelper');
window.feather = feather;
window.handlebars = handlebars;
window.countries = require("./countries");

const WebApi = require("./wptapi");

window.webApi = new WebApi.WebTheatricsRest(`https://restcountries.com/v3.1/`);

var appDiv;
var navDiv;
var navTemplate;
var countriesTemplate;

var router = new Router({
    mode: 'hash',
    hooks: {
        before: function (newPage) {
            console.info('Before page loads hook', newPage);
        }
    },
    page404: function (path) {
        console.error('"/' + path + '" Page not found');
    }
});

function configureRoutes() {
    router.add('countries', function () {
        appDiv.html(countriesTemplate());
        //window.countries.load();
    });
}

var templates = 0;

function templateLoaded() {
    templates--;

    if (templates==0){
        configureRoutes();
        $('.nav-link').removeClass('disabled');

        navDiv.html(navTemplate())
        feather.replace();

        $('a').on('click', (event) => {
            // Block browser page load
            event.preventDefault();
          
            // Highlight Active Menu on Click
            const target = $(event.target);
            $('.nav-link').removeClass('active');
            target.addClass('active');
          
            // Navigate to clicked url
            const href = target.attr('href');
            const path = href;
        
            window.router.navigateTo(path);
        });
        
        //appDiv.html(window.countriesTemplate());
        appDiv.html(countriesTemplate());
    }
}

function loadTemplate(location,assignFunction){
    templates++;
    $.get(location,null,function(data,status){
        assignFunction(handlebars.compile(data));
        templateLoaded();
    });
}

function loadTemplates() {

    loadTemplate("tpl/countries.html",function(template){
        countriesTemplate = template;
    });

    loadTemplate("tpl/countrylist.html",function(template){
        window.countryListTemplate = template;
    });

    loadTemplate("tpl/nav.html",function(template){
        navTemplate = template;
    });
}

window.addEventListener('load', () => {
    feather.replace()
    router.addUriListener();
    window.router = router;

    appDiv = $('#app');
    navDiv = $('#navdiv');

    loadTemplates();
    window.countries.load();
});
