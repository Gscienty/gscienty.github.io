function base_page(){
}
base_page.prototype = {
    //initialize method
    initialize : function(){
        this.on_init();
    },
    punish : function(){
        this.on_finish();
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
    on_init : function(){},
    on_finish : function(){},
    render : function(){
        checkout_content('page_fund/html/face.html');
    }
});

//method page (404 500 etc.)
function method_room(){}
method_room.prototype = new base_page();
method_room.prototype.extend({
    on_init : function(){},
    on_finish : function(){},
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
    //replace flag set
    this.replace_flag_set = {};
    //current theme
    this.theme = "default";

    //has rendered journal's count
    this.rendered_count = 0;

    //render minimum distance
    var RERENDER_MINIMUM_SIZE = 1;
    //render block
    var RENDER_BLOCK = '.journal-list'

    //===================================================================
    //all journal theme list indexs
    this.journal_theme_indexs = {};

    //render list page
    this.render_list_model = function(size){
        //cache inner html
        var page_inner_html = "";
        for(render_index = 0; render_index < size; render_index++){
            //calculate offset index
            var offset_index = this.rendered_count + render_index;

            //judge spill out
            if(offset_index >= this.journal_theme_indexs[this.theme].length) break;

            //construct journal item html text
            //postscript: I think this method to solve render item very FOOOOOLISH!!
            page_inner_html = page_inner_html + (function(info){
                return '<div class="list-group">\
                  <a journal=' + info.index + ' class="list-group-item journal-item">\
                    <h3 class="list-group-item-heading">《 ' + info.title + ' 》</h3>\
                    <p class="list-group-item-text" style="padding-top:100px">' + info.innerText + '</p>\
                  </a>\
              </div>'
            })(this.journal_theme_indexs[this.theme][offset_index]);
        }
        //add rendered item count
        this.rendered_count = this.rendered_count + size;

        //append to journal list page
        $(RENDER_BLOCK).append(page_inner_html);

        //register .journal-item click event
        $(".journal-item").click(function(){
            //change url
            window.location.href = "#room=journal&page=journal&index="+$(this).attr("journal");

            //update address information by url
            route.update_address_info();
            //container apdate route change.
            container_adapt();
        });
    }

    //on scrolling event
    this.on_scrolling = function(e){
        //check if window arrive bottom side
        if($(window).scrollTop() == $(document).height() - $(window).height()){
            this.render_list_model(5);
        }
    }

    //construct content that render markdown to content model and return content
    this.render_content = function(content){
        var model = cache_strock.get_data("journal-display-model");
        model = model.replace(this.replace_flag_set["flag-start"] + this.replace_flag_set["flag-content"] + this.replace_flag_set["flag-end"], content);

        checkout_content_use_html(model);
    }

    //load markdown content
    this.load_journal = function(index){
        var result = "";
        $.ajax({
            url : 'docs/'+index+'.md',
            async : false,
            cache : false,
            complete : function(data){
                result = data.responseText;
            }
        });
        return markdown.toHTML(result);
    }

}
journal_room.prototype = new base_page();
journal_room.prototype.extend({
    on_init : function(){
        //load journal theme list model
        this.journal_theme_indexs = cache_strock.get_data("journal-theme");

        //load content replace flags key-value pairs
        this.replace_flag_set = cache_strock.get_data("replace-flag");

    },
    on_finish : function(){
        //cancel event listener which on scrolling
        window.onscroll = null;
    },
    routing : function(parameters){
        switch(parameters.page){
            case "list":
                //set default value
                if(parameters["theme"] != undefined){
                    this.theme = parameters["theme"];
                }

                //render journal model list by theme
                checkout_content_use_html(cache_strock.get_data("journal-list-model"));

                //render list page model
                this.render_list_model(5);


                //register event listener which on scrolling
                var self = this;
                window.onscroll = function(e){
                    self.on_scrolling(e);
                };
                break;
            case "journal":
                //render markdown to model used by journal identity
                this.render_content(this.load_journal(parameters["index"]));

                break;
            default:
                //not found
                checkout_content('page_fund/html/404.html');
                break;
        }
    }
})
