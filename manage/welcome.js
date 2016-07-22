var url = require('url');
module.exports.enter = function(request, response){
    var url_entity = url.parse(request.url.replace('/manage', ''));
    if(url_entity.pathname == null){
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'Cache-Control' : 'no-cache'
        });
        response.write('<meta charset="utf-8"/>\
        <p style="text-align:center;font-weight:900;margin-top:50px">Hello Bloger~ ♪（＾∀＾●）ﾉ</p>\
        <p style="text-align:center">\
        <a href="/manage/category">Category</a>&nbsp;&nbsp;&nbsp;&nbsp;\
        <a href="/manage/article">Article</a>&nbsp;&nbsp;&nbsp;&nbsp;\
        </p>\
        ');
        response.end();
    }
    else if(url_entity.pathname == '/category'){
        var fs = require('fs');
        var data = eval(fs.readFileSync('./contents/data/blog-category.json', 'utf-8'));
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'Cache-Control' : 'no-cache'
        });
        response.write('<meta charset="utf-8"/>\
        <p style="text-align:center;font-weight:900;margin-top:50px">Hello Bloger this is category manage page ♪（＾∀＾●）ﾉ</p>\
        <p style="text-align:center"><a href="/manage">Go back</a></p><br />\
        <form style="text-align:center" action="/manage/category-add" method="GET"><dl><dt>New Category Name:</b><dt><dd><input type="text" name="category"/><br/></dd><dt><b>Icon Code:</b></dt><dd><input type="text" name="icon"/><br /></dd><dt><br/><input type="submit" value="Add" /></dt></dl></form>\
        <table style="margin:auto">\
        <tr><td style="width:320px;border-bottom:1px solid #000">category\'s name</td><td style="width:120px;border-bottom:1px solid #000">Icon Code</td><td style="border-bottom:1px solid #000">operation</td></tr>'
        +(()=>{
            var length = data.length;
            var result = '';
            for(var i = 0; i < length; i++){
                result += '<tr><td>' + data[i].category + '</td><td>' + data[i].icon + '</td><td><a href="/manage/category-delete?category='+ i +'">Delete it</a></td>';
            }
            return result;
        })() +
        '</table>');
        response.end();
    }
    else if(url_entity.pathname == '/category-delete'){
        var index = parseInt(url_entity.query.split('=')[1]);
        var fs = require('fs');
        var data = eval(fs.readFileSync('./contents/data/blog-category.json', 'utf-8'));
        var category = data[index].category;
        data.splice(index, 1);
        var result = JSON.stringify(data);
        fs.writeFileSync('./contents/data/blog-category.json', result);

        var articles = eval(fs.readFileSync('./contents/data/' + category + '-articles.json'));
        var articles_length = articles.length;
        for(var i = 0; i < articles_length; i++){
            try{fs.unlinkSync('./contents/data/articles/' + data[i].article_path);}catch(ex){};
        }
        try{fs.unlinkSync('./contents/data/' + category + '-articles.json');}catch(ex){};

        response.writeHead(302,{
            "Location" : "/manage/category"
        });
        response.end();
    }
    else if(url_entity.pathname == '/category-add'){
        var query = url_entity.search.split('&');
        var category = query[0].split('=')[1];
        while(category.indexOf('+') != -1){
            category = category.replace('+', '-');
        }
        var icon = query[1].split('=')[1];
        var fs = require('fs');
        var data = eval(fs.readFileSync('./contents/data/blog-category.json', 'utf-8'));
        data.push({"category" : category, "icon" : icon});
        var result = JSON.stringify(data);
        fs.writeFileSync('./contents/data/blog-category.json', result);
        fs.writeFileSync('./contents/data/' + category + '-articles.json', '[]');
        response.writeHead(302,{
            "Location" : "/manage/category"
        });
        response.end();
    }
    else if(url_entity.pathname == "/article"){
        var fs = require('fs');
        var data = eval(fs.readFileSync('./contents/data/blog-category.json', 'utf-8'));
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'Cache-Control' : 'no-cache'
        });
        var uc = '';
        if(url_entity.query != null){
            uc = url_entity.query.split('=')[1];
        }
        response.write('<meta charset="utf-8"/>\
        <p style="text-align:center;font-weight:900;margin-top:50px">Hello Bloger this is article manage page ♪（＾∀＾●）ﾉ</p>\
        <p style="text-align:center"><a href="/manage">Go back</a></p><br />\
        <p style="text-align:center"><a href="/manage/article-write">Add Article</a></p><br />\
        <p style="text-align:center">Select Category:<select id="sc" onchange="var sc=document.getElementById(\'sc\').value;if(sc != \'\'){window.location.href=\'/manage/article?category=\' + sc;}">\
        '+(()=>{
            var data = eval(fs.readFileSync('./contents/data/blog-category.json', 'utf-8'));
            var length = data.length;
            var result = '<option value="">Select Category</option>';
            for(var i = 0; i < length; i++){
                result += '<option ' + ((category)=>{
                    if(url_entity.query == null) return '';
                    if(uc == category) return 'selected="selected"';
                })(data[i].category) + ' value="'+data[i].category+'">'+data[i].category+'</option>';
            };
            return result;
        })()+
        '</select></p>' + (()=>{
            if(url_entity.query == null) return '<p style="text-align:center">You need Select Category First. _(:3 」∠)_ </p>';
            var data = eval(fs.readFileSync('./contents/data/' + uc + '-articles.json', 'utf-8'));
            var result = '<table style="margin:auto"><tr><td style="border-bottom:1px solid #000;">Article Name</td><td style="border-bottom:1px solid #000;">Article Makedown Name</td><td style="border-bottom:1px solid #000">Submit Time</td><td style="border-bottom:1px solid #000">Operation</td></tr>';
            var length = data.length;
            for(var i = 0; i < length; i++){
                result += '<tr><td>' + data[i].title + '</td><td>' + data[i].article_path + '</td><td>' + data[i].submit_time + '</td><td><a href="/manage/article-del?category='+uc+'&article='+ i +'">Delete it</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="/manage/article-write?md='+ data[i].article_path +'">Alter it</a></td></tr>';
            }
            result += '</table>';
            return result;
        })());
        response.end();
    }
    else if(url_entity.pathname == '/article-write'){
        var fs = require('fs');
        if(request.method == 'GET'){
            var content = '';
            if(url_entity.query != null){
                content = fs.readFileSync('./contents/data/articles/' + url_entity.query.split('=')[1], 'utf-8');
            }
            response.write('<meta charset="utf-8"/>\
            <p style="text-align:center;font-weight:900;margin-top:50px">Hello Bloger this is write article manage page ♪（＾∀＾●）ﾉ</p>\
            <p style="text-align:center"><a href="/manage/article">Go back</a></p><br />\
            <form style="text-align:center" action="/manage/article-write" method="POST">\
            <dl><dt>Category</dt><dd>\
            <select name="category">\
            '+(()=>{
                var data = eval(fs.readFileSync('./contents/data/blog-category.json', 'utf-8'));
                var length = data.length;
                var result = '<option value="">Select Category</option>';
                for(var i = 0; i < length; i++){
                    result += '<option ' + ((category)=>{
                        if(url_entity.query == null) return '';
                        if(url_entity.query.split('=')[1] == category) return 'selected="selected"';
                    })(data[i].category) + ' value="'+data[i].category+'">'+data[i].category+'</option>';
                };
                return result;
            })() + '</select><dd><dt>Title</dt><dd><input name="title" style="width:400px" /></dd><dt>File Name</dt><dd><input name="path" style="width:400px" /></dd><dt>Content</dt><dd><textarea name="content" style="width:800px; height:600px">' + content +'</textarea></dd></dl><input type="hidden" name="change_md" value="' + (()=>{
                if(url_entity.query == null) return '';
                return url_entity.query.split('=')[1];
            })() + '"><input type="submit" value="add article" /></form>');
            response.end();
        }
        else{
            var post_data = '';
            request.addListener('data', (chunk) => {
                post_data += chunk;
            });
            request.addListener('end', () => {
                pams = require('querystring').parse(post_data);
                if(pams.change_md != ''){
                    fs.writeFileSync('./contents/data/articles/' + pams.change_md, pams.content);

                    response.writeHead(302, {
                        'Location' : '/manage/article'
                    });
                }
                else if(pams.category == ''){
                    response.writeHead(200, {
                        'Content-Type' : 'text/html'
                    });
                    response.write('<p style="text-align:center">Error! You not selected article\'s category. <a href="javascript:window.history.go(-1)">Click Here to go back</a></p>');
                }
                else{
                    var ar_data = eval(fs.readFileSync('./contents/data/' + pams.category + '-articles.json', 'utf-8'));
                    ar_data.unshift({ "title" : pams.title, "submit_time" : new Date(), "article_path" : pams.path });
                    fs.writeFileSync('./contents/data/' + pams.category + '-articles.json', JSON.stringify(ar_data));

                    fs.writeFileSync('./contents/data/articles/' + pams.path, pams.content);

                    response.writeHead(302, {
                        'Location' : '/manage/article?category='+ pams.category
                    });
                }
                response.end();
            });
        }
    }
    else if(url_entity.pathname == '/article-del'){
        var query = url_entity.query.split('&');
        var index = parseInt(query[1].split('=')[1]);
        var fs = require('fs');
        var ar = eval(fs.readFileSync('./contents/data/' + query[0].split('=')[1] + '-articles.json', 'utf-8'));
        var path = ar[index].article_path;
        ar.splice(index, 1);
        fs.writeFileSync('./contents/data/' + query[0].split('=')[1] + '-articles.json', JSON.stringify(ar));
        fs.unlinkSync('./contents/data/articles/' + path);

        response.writeHead(302, {
            'Location' : '/manage/article?' + query[0]
        });
        response.end();
    }
}
