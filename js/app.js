;(function() {
    'use strict';

    var menuText = {            
            en: {
                brand: 'Garbí Tours',
                home: 'Home',
                aboutUs: 'About us',
                program: 'Tours',             
                gallery: 'Gallery',                                
                contact: 'Contact'
            },
            cat: {
                brand: 'Garbí Tours',
                home: 'Home',
                aboutUs: 'Qui som',
                program: 'Tours',
                gallery: 'Fotos',                
                contact: 'Contacte'
            }
        };

    function config($routeProvider) {
        $routeProvider
            .when('/:language?', {
                templateUrl: 'templates/index.html',
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
            .when('/:language?/gallery', {
                templateUrl: 'templates/gallery/gallery-home.html',
                controller: 'galleryCtrl'
            })
            .when('/:language?/gallery/:album', {
                templateUrl: function(params) {
                    var album = params.album;

                    album = ~['book', 'usa', 'dubai', 'israel', 'moroco', 'creta', 'switzerland'].indexOf(album) ? album : 'book';

                    return 'templates/gallery/' + album + '.html';
                },
                controller: 'albumCtrl'
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

    function navBarCtrl($scope, getParams, $uibModal, $window) {

        function setParams() {
            $scope.language = getParams.language();
            $scope.section = getParams.section();
            $scope.menuText = menuText[$scope.language || 'br'];
        }

        $window.body_tag.classList.remove('hidden');

        $scope.$on('$locationChangeSuccess', function() {
            setParams();
            $window.scrollTo(0, 0);

            $scope.giftsList = $scope.language === 'br' && $scope.section === 'gifts';
        });

        $scope.$on('$locationChangeStart', function(event, next) {
            if(~next.indexOf('!/~')) {
                event.preventDefault();
            }
        });

        $scope.open = function() {
            $uibModal.open({
                animation: true,
                templateUrl: function() {
                    return 'templates/' + $scope.language + '/contact.html';
                }
            });
        };

        setParams();
    }

    function homeCtrl($scope, getParams) {
        var language = getParams.language();        

        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        $scope.slides = [
            'http://garbitours.com/img/carousel/DSC_4568.JPG',
            'http://garbitours.com/img/carousel/DSC_4453.JPG',
            'http://garbitours.com/img/carousel/DSC_5039.JPG',
            'http://garbitours.com/img/carousel/DSC_5015.JPG',
            'http://garbitours.com/img/carousel/DSC_4761.JPG',
            'http://garbitours.com/img/carousel/DSC_4474.JPG',
            'http://garbitours.com/img/carousel/DSC_4573.JPG'
        ];
    }

    function galleryCtrl($scope, getParams) {
        var language = getParams.language();

        if(language === 'en') {
            $scope.bookText = 'Our Pre-wedding Book!';
            $scope.travelText = 'We love to travel!';
            $scope.morocoText = 'Moroco';
            $scope.switzerlandText = 'Switzerland';
        } else if(language === 'cat') {
            $scope.bookText = 'El nostre book pre-casament!';
            $scope.travelText = 'Ens encanta viatjar!';
            $scope.morocoText = 'Marroc';
            $scope.switzerlandText = 'Suissa';
        } else {
            $scope.bookText = 'Nosso Pre-wedding Book!';
            $scope.travelText = 'Adoramos viajar!';
            $scope.morocoText = 'Marrocos';
            $scope.switzerlandText = 'Suíça';
        }
    }

    function albumCtrl($scope, getParams) {
        var language = getParams.language();

        if(language === 'en') {
            $scope.back = 'Back to gallery';
        } else if(language === 'cat') {
            $scope.back = 'Enrere';
        } else {
            $scope.back = 'Voltar';
        }
    }   

    angular.module('app', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
        .config(['$routeProvider', config])
        .factory('getParams', ['$location', getParams])
        .controller('navBarCtrl', ['$rootScope', 'getParams', '$uibModal', '$window', navBarCtrl])
        .controller('homeCtrl', ['$scope', 'getParams', homeCtrl])
        .controller('galleryCtrl', ['$scope', 'getParams', galleryCtrl])
        .controller('albumCtrl', ['$scope', 'getParams', albumCtrl])
        .directive('audioPlayList', [audioPlayList]);
})();
