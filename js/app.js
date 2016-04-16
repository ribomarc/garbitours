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
                templateUrl: 'templates/home.html',
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
            .when('/:language?/tips', {
                templateUrl: function(params) {
                    var lang = params.language || 'br';

                    return 'templates/' + lang + '/tips.html';
                }
            })
            .when('/:language?/gifts', {
                templateUrl: function(params) {
                    var lang = params.language || 'br';

                    return 'templates/' + lang + '/gifts.html';
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

    function navBarCtrl($scope, getParams, $uibModal, $window) {

        function setParams() {
            $scope.language = getParams.language();
            $scope.section = getParams.section();
            $scope.menuText = menuText[$scope.language || 'br'];
        }

        $scope.$on('$locationChangeSuccess', function() {
            setParams();
            $window.scrollTo(0, 0);

            $scope.giftsList = $scope.language === 'br' && $scope.section === 'gifts';
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

    function audioPlayList() {
        var audios = {
                'audio/mpeg': ['audios/06_Pra_Sonhar.mp3', 'audios/Lifehouse.mp3', 'audios/01_Felicidade.mp3', 'audios/01_Try.mp3'],
                'audio/ogg': ['audios/06_Pra_Sonhar.ogg', 'audios/Lifehouse.ogg', 'audios/01_Felicidade.ogg', 'audios/01_Try.ogg']
            };

        return {
            restrict: 'E',
            replace: true,
            template: '<audio controls autoplay preload="auto" src="{{activeAudio}}">Your browser does not support the audio element.</audio>',
            link: function($scope, $element) {
                var type = '',
                    index = -1;

                function next() {
                    index =  (index +1) % audios[type].length;
                    $scope.activeAudio = audios[type][index];
                }

                for(var name in audios) {
                    if(audios.hasOwnProperty(name) && $element[0].canPlayType(name) === 'probably') {
                        type = name;
                        break;
                    }
                }

                if(type) {
                    next();
                    $element.on('ended', function() {
                        next();
                    });
                }
            }
        };
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
