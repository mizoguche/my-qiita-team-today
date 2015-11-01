$(function(){
  var storage = localStorage;
  var team = storage.getItem('team') ? storage.getItem('team') :'';
  var token = storage.getItem('token') ? storage.getItem('token') :'';
  $('#team').val(team);
  $('#token').val(token);

  $('#save').on('click', function(){
    storage.setItem('team', $('#team').val());
    storage.setItem('token', $('#token').val());
    $('.alert').slideDown(100);
    setTimeout(function(){
      $('.alert').slideUp(100);
    }, 3000);
  });
});
