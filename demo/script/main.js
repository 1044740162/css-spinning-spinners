$(function() {
	$(".load-container a").on("click",function() {
		var hash = $(this).attr("href");
		var clas = "\\"+hash.replace("#",".") + " ";
		$(".overlay,"+hash).removeClass("hidden");
		
		return false;
	});
	$(".overlay").on("click",function() {
		$(".source,.overlay").addClass("hidden");

	});
});
