function slideUpIn() {
  $("#login").velocity("transition.slideUpIn", 1250)
};

function slideLeftIn() {
  $(".row").delay(500).velocity("transition.slideLeftIn", {stagger: 500})
}

function shake() {
  $(".password-row").velocity("callout.shake");
}

function animation(){
  slideUpIn();
  slideLeftIn();
}


animation();






$("button").on("click", function () {
  shake();
});
