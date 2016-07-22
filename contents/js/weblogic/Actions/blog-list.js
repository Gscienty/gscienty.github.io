angular.module('blog').controller('blog-list-controller', function($window, $location, $routeParams, $http, $scope){
    $scope.go_back = function(){
        $window.history.back();
    };

    $http.get('/contents/data/blog-category.json').success(function(data){
        $scope.blog_category = data;
    });

    var category = $routeParams['category'];
    if(category == ':Default:'){
        $scope.display_hello_flag = true;
        return;
    }
    $scope.display_hello_flag = false;
    while(category.indexOf('-') != -1){
        category = category.replace('-', ' ');
    }
    while(category.indexOf(':') != -1){
        category = category.replace(':', '');
    }
    var current_page = $routeParams['page'];
    while(current_page.indexOf(':') != -1){
        current_page = current_page.replace(':', '');
    }
    current_page = parseInt(current_page);

    $scope.Category = category;
    $http.get('/contents/data/'+category + '-articles.json').success(function(data){
        var page_size = 10;
        var result = [];
        var length = data.length;
        for(var i = (current_page - 1) * page_size; i < current_page * page_size && i < length && i >= 0; i++){
            result.push(data[i]);
        };
        /*need filter*/
        $scope.articles = result;
    });

    $scope.preview_page_btn_color = '#aaa';
    $scope.next_page_btn_color = '#aaa';

    $scope.category_go_page = function(p){
        p = parseInt(p);

        $location.path('/blog-list:' + category + ':' + (current_page + p));
    };
});
