/* globals $ rivetsBindings rivets apiRoot refreshTable */
'use strict';
var profile = {
  username: ''
};

var apiRoot = 'https://archive-api.lcogt.net/';

// rivets.bind($('#profile'), profile);

function getProposals(){
  $.getJSON(apiRoot + 'profile/', function(data){
    profile.username = data.username || '';
  });
}

function login(username, password, callback){
  $.post(
    apiRoot + 'api-token-auth/',
    {
      'username': username,
      'password': password
    }
  ).done(function(data){
    localStorage.setItem('token', data.token);
    getProposals();
    callback(true);
  }).fail(function(){
    callback(false);
  });
}

function logout(){
  localStorage.removeItem('token');
  profile.username = '';
}

$('#logout').click(function(){
  logout();
  $('#login-form').show();
  $('#logout').hide();
  refreshTable();
});

if(localStorage.getItem('token') !== null){
  $('#login-form').hide();
  $('#logout').show();
  getProposals();
}

$('.alert .close').on('click', function(){
    $(this).parent().hide();
});
