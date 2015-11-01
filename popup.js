$(document).ready(function(){
  fetch(new Date());
  setOnClick(1, '#yesterday');
  setOnClick(2, '#day-before-yesterday');
});

function setOnClick(delta, selector){
  var target = new Date();
  target.setDate(target.getDate() - delta);
  $(selector).on('click', function(){ fetch(target); });
}

function fetch(date){
  $('ul').empty();
  showStatus('#loading');

  var storage = localStorage;
  var team = storage.getItem('team') ? storage.getItem('team') :'';
  var token = storage.getItem('token') ? storage.getItem('token') :'';

  if(team === '' || token === ''){
    showStatus('#nooptions');
    chrome.runtime.openOptionsPage();
    return;
  }

  $.ajax({
    url: 'https://' + team + '.qiita.com/api/v2/authenticated_user/items?page=1&per_page=20',
    type: 'GET',
    headers: { 'Authorization': 'Bearer ' + token },
    success: function(result){
      var targetDate = date.toDateString();
      var copyString = '';
      for(var i = 0; i < result.length; i++){
        var post = result[i];
        var createdAt = new Date(post.created_at).toDateString();
        if(targetDate !== createdAt){
          continue;
        }
        var listItem = '<li><a href="' + post.url + '">' + post.title + '</a>';
        copyString = copyString + '- [' + post.title + '](' + post.url + ")\n";
        $('ul').append(listItem);
      }
      if(copyString === ''){
        showStatus('#nopost');
      }else{
        showStatus('#copied');
        $('#date').text(date.toLocaleDateString());
      }
      $('#links').text(copyString);
      copy();
    }});
}

function showStatus(selector){
  $('#loading').hide();
  $('#nopost').hide();
  $('#copied').hide();
  $('#nooptions').hide();
  $(selector).show();
}

function copy(){
  $('#links').show();  
  $('#links').focus();  
  $('#links').select();  
  document.execCommand("Copy");
  window.getSelection().removeAllRanges();  
  $('#links').hide();  
}
