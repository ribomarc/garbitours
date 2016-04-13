;(function() {
    'use strict';

    var weddingDate = 1471644000000,
        millisecondsToDays = 1.15741e-8,
        menuText = {
            br: {
                brand: 'Casamento Andressa e Marc',
                home: 'Home',
                aboutUs: 'Sobre nós',
                program: 'Programa',
                gallery: 'Fotos',
                tips: 'Dicas',
                gifts: 'Presentes',
                contact: 'Confirmação de presença'
            },
            en: {
                brand: 'Wedding Andressa and Marc',
                home: 'Home',
                aboutUs: 'About us',
                program: 'Program',
                gallery: 'Photos',
                tips: 'Tips',
                gifts: 'Gifts',
                contact: 'Confirmation of assistance'
            },
            cat: {
                brand: 'Casament Andressa i Marc',
                home: 'Home',
                aboutUs: 'Sobre nos.',
                program: 'Programa',
                gallery: 'Fotos',
                tips: 'Consells',
                gifts: 'Regals',
                contact: 'Confirmació de presencia'
            }
        };

    function config($routeProvider) {
        $routeProvider
            .when('/:language?', {
                templateUrl: function() {
                    return 'templates/home.html';
                },
                controller: 'homeCtrl'
            })
            .when('/:language?/about-us', {
                templateUrl: function(params) {
                    var lang = params.language || 'br';

                    return 'templates/' + lang + '/about-us.html';
                }
            })
            .when('/:language?/program', {
                templateUrl: function(params) {
                    var lang = params.language || 'br';

                    return 'templates/' + lang + '/program.html';
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    function getParams($location) {

        return {
            language: function () {
                var path = $location.path(),
                    language = 'br';

                if (~path.indexOf('/en')) {
                    language = 'en';
                } else if (~path.indexOf('/cat')) {
                    language = 'cat';
                }

                return language;
            },
            section: function() {
                var path = $location.path(),
                    pageSections = ['about-us', 'gallery', 'gifts', 'program', 'tips'],
                    index = pageSections.length,
                    section = '';

                while(index--) {
                    if(~path.indexOf(pageSections[index])) {
                        section = pageSections[index];
                    }
                }

                return section;
            }
        }
    }

    function navBarCtrl($scope, getParams) {

        function setParams() {
            $scope.language = getParams.language();
            $scope.section = getParams.section();
            $scope.menuText = menuText[$scope.language || 'br'];
        }

        $scope.$on('$locationChangeSuccess', function() {
            setParams();
        });

        setParams();
    }

    function homeCtrl($scope, getParams) {
        var language = getParams.language();

        if(language === 'en') {
            $scope.counterText = 'We\'re getting married in ';
        } else if(language === 'cat') {
            $scope.counterText = 'Ens casem en ';
        } else {
            $scope.counterText = 'Nos casamos em ';
        }

        $scope.remainingDays = parseInt((weddingDate - Date.now()) * millisecondsToDays, 10);

        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        $scope.slides = [
            'http://andressaemarc.com/img/carousel/DSC_4568.JPG',
            'http://andressaemarc.com/img/carousel/DSC_4453.JPG',
            'http://andressaemarc.com/img/carousel/DSC_5039.JPG',
            'http://andressaemarc.com/img/carousel/DSC_5015.JPG',
            'http://andressaemarc.com/img/carousel/DSC_4761.JPG',
            'http://andressaemarc.com/img/carousel/DSC_4474.JPG',
            'http://andressaemarc.com/img/carousel/DSC_4573.JPG'
        ];
    }

    angular.module('app', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
        .config(['$routeProvider', config])
        .factory('getParams', ['$location', getParams])
        .controller('navBarCtrl', ['$scope', 'getParams', navBarCtrl])
        .controller('homeCtrl', ['$scope', 'getParams', homeCtrl]);
})();
