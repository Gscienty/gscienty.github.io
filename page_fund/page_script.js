function base_page(){
}
base_page.prototype = {
    //initialize method
    initialize : function(){
        this.on_init();
    },
    extend : function(object){
        for(property in object){
            this[property] = object[property];
        }
    }
}

//face page
function face_room(){}
face_room.prototype = new base_page();
face_room.prototype.extend({
    on_init : function(){

    },
    render : function(){
        checkout_content('page_fund/html/face.html');
    }
});

//method page (404 500 etc.)
function method_room(){}
method_room.prototype = new base_page();
method_room.prototype.extend({
    on_init : function(){

    },
    routing : function(parameters){
        switch(parameters.page){
            case '404':
                checkout_content_use_html(cache_strock.get_data("404"));
                break;
            case '500':
                checkout_content_use_html(cache_strock.get_data("500"));
                break;
        }
    }
});

//journal page involve theme list render & render journal content (html) & render markdown to journal content
function journal_room(){
    //theme list json data method
    this.journal_list = {};
    //all journal theme list indexs
    this.journal_theme_indexs = {};
    //replace flag set
    this.replace_flag_set = {};

    //render list page by theme
    this.render_list_model = function(theme){
        var render_list = this.journal_theme_indexs[theme];
        
    }

    //construct content that render markdown to content model and return content

    //***need code***

    //load markdown content

    //***need code***

}
journal_room.prototype = new base_page();
journal_room.prototype.extend({
    on_init : function(){
        //load journal theme list model
        this.journal_theme_indexs = cache_strock.get_data("journal-theme");

        //load content replace flags key-value pairs
        this.replace_flag_set = cache_strock.get_data("replace-flag");

    },
    routing : function(parameters){
        switch(parameters.page){
            case "list":
                //set default value
                if(parameters["theme"] === undefined){
                    parameters["theme"] = "default";
                }

                //render journal model list by theme
                checkout_content_use_html(cache_strock.get_data("journal-list-model"));

                //render list page model
                this.render_list_model(parameters["theme"]);
                break;
            case "journal":
                //render journal content by journal identity

                //***need code***

                break;
            default:
                //not found
                checkout_content('page_fund/html/404.html');
                break;
        }
    }
})
