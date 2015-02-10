$workspace = $('.workspace');
$selectNewCard = $('.choose-new-notecard');

$templateStory = _.template($('[data-template-name=story-card').text());
$templateCrc = _.template($('[data-template-name=crc-card').text());

var notecardData = function(type, left, top, data) {
  this.type = type;
  this.loc = [left, top];
  this.data = data;
}

var getOpts = function(cardType) {
  var opts = {};
  switch (cardType) {
    case 'story-jake':
      opts = {
        type: 'jake',
        cond1: 'Given...',
        cond2: '...when...',
        cond3: '...then...'
      };
      break;
    case 'story-user':
      opts = {
        type: 'user',
        cond1: 'As a...',
        cond2: '...I want...',
        cond3: '...so that...'
      };
      break;
    case 'story-jobs':
      opts = {
        type: 'jobs',
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

var populateStoryCard = function($card, data) {
  $card.find('.one+textarea').val(data['one']);
  $card.find('.two+textarea').val(data['two']);
  $card.find('.three+textarea').val(data['three']);
  return $card;
}

var populateCRCCard = function($card, data) {
  $card.find('.crc-class').val(data['class']);
  $card.find('.crc-roles>textarea').val(data['roles']);
  $card.find('.crc-collaborators>textarea').val(data['collab']);
  return $card;
}

var positionCard = function($card, x, y) {
  $card.css({'top': y +'px', 'left': x + 'px'});
  return $card;
};

var loadCard = function(cardData) {
  var $thisCard = $(buildCard(cardData.type));
  if (cardData.type.indexOf('crc') > -1) {
    $thisCard = populateCRCCard($thisCard, cardData.data);
  } else {
    $thisCard = populateStoryCard($thisCard, cardData.data);
  }
  $thisCard = positionCard($thisCard, cardData.loc[0], cardData.loc[1]);
  return $thisCard; 
};

var packageCard = function($card) {
  var cardData = new notecardData(null, null, null, null);
  var subType = $card.attr('class').match(/(jake|jobs|user|crc)/)[0];
  if (subType == 'crc') {
    cardData.type = 'crc-card';
    cardData.data = {
      'class' : $card.find('.crc-class').val(),
      'roles' : $card.find('.crc-roles textarea').val(),
      'collab' : $card.find('.crc-collaborators textarea').val() 
    };
  } else {
    cardData.type = 'story-' + subType;
    cardData.data = {
      'one': $card.find('.one+textarea').val(),
      'two': $card.find('.two+textarea').val(),
      'three': $card.find('.three+textarea').val()
    };
  }
  cardData.loc = [$card.offset().left, $card.offset().top];
  return cardData;
};

var addCard = function() {
  var cardType = $selectNewCard.val();
  var newCard = buildCard(cardType);
  $workspace.append(newCard);
  $('.notecard').draggable();
};

var addCardAtPointer = function(x, y) {
  var cardType = $selectNewCard.val();
  var newCard = buildCard(cardType);
  var wrappedCard = positionCard($(newCard), x, y);
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



var getNotecardData = function() {

  console.log($('.notecard'));
};

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

$('.mobile').on('click', function(e) {
  $('.notecard').toggleClass('mobile');  
});

$('.save').on('click', function(e) {
  getNotecardData();  
});

$workspace.on('dblclick', '.notecard', function(e) {
  e.preventDefault();
  deleteArm($(this)); 
  e.stopPropagation(); 
});

$workspace.on('click', '.notecard', function(e) {
  deletePoof($(this));
});

$workspace.on('click', '.clickbait', function(e) {
  deleteArm($(this).parent());
  e.stopPropagation();
});

$workspace.on('dblclick', function(e) {
  e.preventDefault();
  addCardAtPointer(e.pageX, e.pageY);
});

$

$(document).ready(function() {
  console.log("******Hi there!********");
  console.log("If you're interested enough to check your console, you must be having fun!");
  console.log("Why not get in touch with me @ADotMartin (Twitter) or @ATMartin (Github)?");
  console.log("I'd love to hear your thoughts!");
  console.log("*******Thanks!*********");
  console.log("                  -- Alex");  
});

