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
function UrlEncode(str){
    var ret="";
    var strSpecial="!\"#$%&'()*+,/:;<=>?[]^`{|}~%";
    var tt= "";
    for(var i=0;i<str.length;i++){
        var chr = str.charAt(i);
        var c=str2asc(chr);
        tt += chr+":"+c+"n";
        if(parseInt("0x"+c) > 0x7f){
            ret+="%"+c.slice(0,2)+"%"+c.slice(-2);
        }
        else{
            if(chr==" "){
                ret+="+";
            }
            else if(strSpecial.indexOf(chr)!=-1){
                ret+="%"+c.toString(16);
            }
            else{
                ret+=chr;
            }
        }
    }
return ret;
}
function UrlDecode(str){
    var ret="";
    for(var i=0;i<str.length;i++){
        var chr = str.charAt(i);
        if(chr == "+"){
            ret+=" ";
        }
        else if(chr=="%"){
            var asc = str.substring(i+1,i+3);
            if(parseInt("0x"+asc)>0x7f){
            ret+=asc2str(parseInt("0x"+asc+str.substring(i+4,i+6)));
            i+=5;
            }
            else{
                ret+=asc2str(parseInt("0x"+asc));
                i+=2;
            }
        }
        else{
            ret+= chr;
        }
    }
    return ret;
} 