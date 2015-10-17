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

function method_room(){}
method_room.prototype = new base_page();
method_room.prototype.extend({
    on_init : function(){

    },
    routing : function(page_name){
        switch(page_name.page){
            case '404':
                checkout_content('page_fund/html/404.html');
        }
    }
})
