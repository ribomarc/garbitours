;(function() {
    'use strict';

    var menuText = {            
            en: {
                brand: 'Garbí Tours',
                home: 'Home',
                aboutUs: 'About us',
                program: 'Tours',             
                gallery: 'Book',                                
                contact: 'Contact'
            },
            cat: {
                brand: 'Garbí Tours',
                home: 'Home',
                aboutUs: 'Qui som',
                program: 'Tours',
                gallery: 'Reserva',                
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
                    pageSections = ['about-us', 'gallery', 'program'],
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
            'http://garbitours.com/img/carousel/20201018_150650.JPG',
            'http://garbitours.com/img/carousel/20220608_151748.JPG',
            'http://garbitours.com/img/carousel/DJI_0007.JPG',
            'http://garbitours.com/img/carousel/IMG_5863.JPG',
            'http://garbitours.com/img/carousel/IMG_5888.JPG',
            'http://garbitours.com/img/carousel/IMG_7672.JPG'
        ];
    }

    angular.module('app', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
        .config(['$routeProvider', config])
        .factory('getParams', ['$location', getParams])
        .controller('navBarCtrl', ['$rootScope', 'getParams', '$uibModal', '$window', navBarCtrl])
        .controller('homeCtrl', ['$scope', 'getParams', homeCtrl])        
        .directive('audioPlayList', [audioPlayList]);
})();
