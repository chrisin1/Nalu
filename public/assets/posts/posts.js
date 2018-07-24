$(".comments").hide();
$(".fa-caret-square-up").hide();

$(".showcomments").click(function(){
  $(".comments").show();
  $(".fa-caret-square-down").hide();
  $(".fa-caret-square-up").show();
  });

$(".hidecomments").click(function(){
  $(".comments").hide();
  $(".fa-caret-square-down").show();
  $(".fa-caret-square-up").hide();
  console.log("hey whore");
  });

$(document).ready(function(){
  console.log('JS connected');

 // ADD ITEMS TO MY LIST
 $('form').on('submit', function() {
   console.log('you are submitting');

   let item = $('form input');
   let todo = {item: item.val()};

   $.ajax({
     type: 'POST',
     url:  '/todo',
     data: todo,
     success: function(data) {
       // some code to do somthing with the response
       location.reload();
     }
   });
  });
})
