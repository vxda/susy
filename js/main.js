$(document).ready(function(){
	'use strict';
	console.log('mssssdsga');
	$('.content .wrapper').addClass('dupa');
	$('.dupa').on('mouseover',function(){
		$(this).css('background','aqua');
	});
	$('.dupa').on('mouseleave',function(){
		$(this).css('background','');
	});
});