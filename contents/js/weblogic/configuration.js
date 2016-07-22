angular.module('blog', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl : '/views/welcome.html'
            })
            .when('/blog-list:category:page', {
                templateUrl : '/views/blog-list.html',
                controller : 'blog-list-controller'
            })
            .when('/article:article_path', {
                templateUrl : '/views/article.html',
                controller : 'article-controller'
            })
            .otherwise({ redirectTo : '/' });
    }]);
