function get_query_params () {
    var query = window.location.href.split('?');
    var params = new Array();
    if(query.length > 1){
        var params_item = query[1].split('&');
        for(var i=0, loop_count=params_item.length;i<loop_count;i++){
            var item = params_item[i].split('=');
            params[item[0]] = item[1];
        }
    }
    return params;
}