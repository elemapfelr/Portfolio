$(document).ready(function(){
	var gnb_top_focusL = $(".gnb_top li.focus").offset().left;
	$(".gnb_topBox").scrollLeft(gnb_top_focusL - 20);
});