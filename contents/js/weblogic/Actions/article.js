angular.module('blog').controller('article-controller', function($http, $scope, $window, $routeParams, $sce){
    $scope.go_back = function(){
        $window.history.back();
    };

    $http.get('/contents/data/blog-category.json').success(function(data){
        $scope.blog_category = data;
    });

    var article_path = $routeParams['article_path'];
    while(article_path.indexOf(':') != -1){
        article_path = article_path.replace(':', '');
    }

    $http.get('/contents/data/articles/' + article_path).success(function(content){
        $scope.content = $sce.trustAsHtml(markdown.toHTML(content));
    });
});
