function base_page(){
}
base_page.prototype = {
    initialize : function(){
        this.on_init();
    },
    extend : function(object){
        for(property in object){
            this[property] = object[property];
        }
    }
}
function face_page(){}
face_page.prototype = new base_page();
face_page.prototype.extend({
    on_init : function(){
        alert(1);
    }
})
