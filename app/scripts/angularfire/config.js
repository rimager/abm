angular.module('firebase.config', [])
  .constant('FBURL', 'https://artboardmatch.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','facebook','google','twitter'])

  .constant('loginRedirectPath', '/login');
