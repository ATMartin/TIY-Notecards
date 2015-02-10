$workspace = $('.workspace');
$selectNewCard = $('.choose-new-notecard');


$templateStory = _.template($('[data-template-name=story-card').text());
$templateCrc = _.template($('[data-template-name=crc-card').text());

var getOpts = function(cardType) {
  var opts = {};
  switch (cardType) {
    case 'story-jake':
      opts = {
        cond1: 'Given...',
        cond2: '...when...',
        cond3: '...then...'
      };
      break;
    case 'story-user':
      opts = {
        cond1: 'As a...',
        cond2: '...I want...',
        cond3: '...so that...'
      };
      break;
    case 'story-jobs':
      opts = {
        cond1: 'When I...',
        cond2: '...I want...',
        cond3: '...so that...'
      }
      break;
  }
  return opts;
}; 

$('.pane-hide').on('click', function(e) {
  $('.sidebar').css('left', '-300px');  
});

$('.pane-show').on('click', function(e) {
  $('.sidebar').css('left', '0px');  
});

$('.add-card').on('click', function(e) {
  var cardType = $selectNewCard.val();
  if (cardType.indexOf('crc') > -1) {
    $workspace.append($templateCrc({}));
   } else {
     $workspace.append($templateStory(getOpts(cardType)));
   }
   $('.notecard').draggable();
});
