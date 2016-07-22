var fs = require('fs');
fs.readFile('config.zl', 'utf8', (err, data) => {
    var file_list = data.split('\n');
    var file_length = file_list.length;
    var content_result = '';
    for(var i = 0; i < file_length; i++){
        var current = file_list[i];
        if(current != ''){
            var data = fs.readFileSync(current, 'utf8');
            while(data.indexOf('\r\n') != -1) {
                data = data.replace('\r\n', '');
            }
            content_result += data.trim();
        }
    }
    var content_result_length = content_result.length;
    var content = '';
    var left_is_space = false;
    for(var i = 0; i < content_result_length; i++) {
        if(content_result[i] == ' ' && left_is_space == false) {
            content += ' ';
            left_is_space = true;
        }
        else if(content_result[i] != ' '){
            content += content_result[i];
            left_is_space = false;
        }
    }

    fs.writeFileSync('bundle.js', content);
});
