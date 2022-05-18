require("@babel/register");
const { registerDecorator } = require("handlebars");
const { stringify } = require("querystring");
const { exit } = require("process");

let disableButton=function(){
    $('#saveButton').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Saving...').addClass('disabled');
}

let enableButton=function(){
    $('#saveButton').html("Save").removeClass('disabled');
}

let removeAlerts=function(){
    $('#alerts').html(``);
}

let addWarning=function(description){
    $('#alerts').html(`
    <div class="alert alert-warning" role="alert">
        ${description}
    </div>`);
}

let addNotice=function(description){
    $('#alerts').html(`
    <div class="alert alert-success" role="alert">
        ${description}
    </div>`);
}

let addError=function(code){
    $('#alerts').html(`
    <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Error ${code} calling server.</h4>
        <hr>
        <p class="mb-0">We have experienced an error calling the server.</p>        
    </div>`);
}

exports.load=function() {
    $('#main').html(`<div class="card-body">
    <div class="spinner-border text-primary" role="status">
    <span class="sr-only">Loading...</span>
    </div>
    </div>
    `);

    window.webApi.country.all(
        {},
        {
            "success":function(movieInfo) {
                window.movieInfo=movieInfo;
                $('#main').html(window.countryListTemplate({
                    "movies":window.movieInfo
                }));
                window.feather.replace();
            },
            "error":function(code) {
                addError(code)
            }
        }
    );
}

exports.search=function(form) {
    disableButton();
    removeAlerts();

    if(form["fullName"].checked) {
        console.log("full name search: "+form["countryName"].value);
        let name = form["countryName"].value;
        window.webApi.country.fullname(
            form["countryName"].value,
            {
                "success":function(movieInfo) {
                    window.movieInfo=movieInfo;
                    $('#main').html(window.countryListTemplate({
                        "movies":window.movieInfo
                    }));
                    window.feather.replace();
                },
                "error":function(code) {
                    addError(code)
                }
            }
        );
    } else {
        console.log("partial name searching: "+form["countryName"].value);
        window.webApi.country.name(
            form["countryName"].value,
            {
                "success":function(movieInfo) {
                    console.log("response: "+movieInfo);
                    window.movieInfo=movieInfo;
                    $('#main').html(window.countryListTemplate({
                        "movies":window.movieInfo
                    }));
                    window.feather.replace();
                },
                "error":function(code) {
                    addError(code)
                }
            }
        );
    }
}