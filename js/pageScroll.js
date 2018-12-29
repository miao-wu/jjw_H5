$(document).ready(function() {
	var $winWidth = $(window).width(),
		$winHeight = $(window).height(),
		$sumHeight = $('#scrollWrap').height();
	$('#container').css({
		height: $winHeight+'px',
		overflow: 'hidden',
	});

	var $loadTime = setInterval(function(){
		if ($('.loadingWrap').is(':hidden')) {
			sliderPage(1,300);
			clearInterval($loadTime);
		};
	},200);

	var $value=0;

	function sliderPage($offsetH,$speed) {
		var $h = $offsetH,
			$s = $speed,
			$stop = $sumHeight-$winHeight,
			$t = $stop/$s,
			$scroll = $('#container').scrollTop();
	    $('#container').scrollTop(0);

		if ($stop>$scroll) {
			var $Time = setInterval(function(){
				$value += $h;
				$('#container').scrollTop($value);
				if ($stop<=$value) {
		        	clearInterval($Time);
		        	$('.restartWrap').animate({
		        		opacity: 1},
		        		2600,function(){
		        			$value = 0;
		        			$('.restartBtn').addClass('bottomIn');
		        			$('.restart img').addClass('topIn');
		        		});
		        };
			},$t);
		};
		
	};

	var $restartW = $('.restart').width(),
	    $restartH = $('.restart').height(),
	    $loadingW = $('.loading').width(),
	    $loadingH = $('.loading').height(),
	    $rsX = ($winWidth-$restartW)/2,
	    $rsY = ($winHeight-$restartH)/2,
	    $ladX = ($winWidth-$loadingW)/2,
	    $ladY = ($winHeight-$loadingH)/2;
	$('.restart').css({
		position: 'absolute',
		top: $rsY,
		left: $rsX
	});
	$('.loading').css({
		position: 'absolute',
		top: $ladY,
		left: $ladX
	});
    
    $('.restartBtn').on('click', function() {
    	$('.restartWrap').animate({
    		opacity: 0},
    		100, function() {
    			$('#container').scrollTop(0);
    			$('.restartBtn').removeClass('bottomIn');
    			$('.restart img').removeClass('topIn');
    		    sliderPage(1,300);
    	});
    	
    });

});