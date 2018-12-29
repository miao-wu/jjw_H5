$(document).ready(function() {
	var $winWidth = $(window).width(),
		$winHeight = $(window).height(),
		$sumHeight = $('#scrollWrap').height();
	$('#container').css({
		height: $winHeight+'px',
		overflow: 'hidden',
	});

	var tmv=function(e){e.preventDefault();};
	function stoptouchmove(){
	        document.body.style.overflow='hidden';       
	        document.addEventListener("touchmove",tmv,false);
	};
	stoptouchmove();
	var $audio = document.getElementById('bgm');

	var $loadTime = setInterval(function(){
		if ($('.loadingWrap').is(':hidden')) {
			sliderPage(1,16);			
			if ($audio.paused) {
				$audio.paused = false;
				$audio.play();
			};
			clearInterval($loadTime);
		};
	},200);

	var $value=0;

	function sliderPage($offsetH,$rate) {
		var $h = $offsetH,
			$t = $rate,
			$stop = $sumHeight-$winHeight,
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
		        		5000,function(){
			        			$value = 0;
			        			$('.restartBtn').addClass('bottomIn');
			        			$('.restart img').addClass('topIn');
			        			if (!$audio.paused) {
			        				$audio.paused = true;
			        				$audio.pause();
			        				console.log($audio.currentTime);
		        			};
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
    		    sliderPage(1,16);
    		    if ($audio.paused) {
    		    	$audio.paused = false;
    		    	$audio.play();
    		    };
    	});
    	
    });

});