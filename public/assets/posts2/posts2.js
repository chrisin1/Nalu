$(".makepost").hide();
$(".showsubmit").click(function(){
  $(".makepost").show();
  $(".yourtake").hide();
  });


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

  });
