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

var buildCard = function(cardType) {
  if (cardType.indexOf('crc') > -1) {
    return $templateCrc({});
  } else {
    return $templateStory(getOpts(cardType));
  }
}

var addCard = function() {
  var cardType = $selectNewCard.val();
  var newCard = buildCard(cardType);
  $workspace.append(newCard);
  $('.notecard').draggable();
};

var addCardAtPointer = function(x, y) {
  var cardType = $selectNewCard.val();
  var newCard = buildCard(cardType);
  var wrappedCard = $(newCard).css({'top': y+'px', 'left':x+'px'});
  $workspace.append(wrappedCard);
  $('.notecard').draggable();
}

var deleteArm = function(me) {
    me.attr('armed', true);
    me.css('background-color', '#faa');
    setTimeout(function() {deleteDisarm(me);}, 1000);
}

var deletePoof = function(me) {
  if (me.attr('armed')) { me.remove(); }
}

var deleteDisarm = function(me) {
  if (me.attr('armed')) {
    me.removeAttr('armed');
    me.css('background-color', '#afa');
    setTimeout(function() { me.css('background-color', 'white'); }, 500);
  }
}

$('.pane-hide').on('click', function(e) {
  $('.sidebar').css('left', '-300px');  
});

$('.pane-show').on('click', function(e) {
  $('.sidebar').css('left', '0px');  
});

$('.add-card').on('click', function(e) {
   addCard();
});

$('.clear').on('click', function(e) {
  $workspace.empty();  
});

$workspace.on('dblclick', '.notecard', function(e) {
  e.preventDefault();
  deleteArm($(this)); 
  e.stopPropagation(); 
});

$workspace.on('click', '.notecard', function(e) {
  deletePoof($(this));
});

$workspace.on('dblclick', function(e) {
  e.preventDefault();
  addCardAtPointer(e.pageX, e.pageY);
});

$(document).ready(function() {
  console.log("******Hi there!********");
  console.log("If you're interested enough to check your console, you must be having fun!");
  console.log("Why not get in touch with me @ADotMartin (Twitter) or @ATMartin (Github)?");
  console.log("I'd love to hear your thoughts!");
  console.log("*******Thanks!*********");
  console.log("                  -- Alex");  
});

