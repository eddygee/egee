var messageDelay = 2000,  // How long to display status messages (in milliseconds)
	w_h = $(window).height(),
	w_w = $(window).width(),
	src = '';

// Submit the form via Ajax
function submitForm() {
  var $contactForm = $(this);

  // Are all the fields filled in?

	if ( !$('#senderName').val() || !$('#senderEmail').val() || !$('#senderMessage').val() ) {
		
		src = 'http://www.egee.me/wp-content/themes/egee/math/securimage_show.php?' + Math.random();
		$('#captcha').attr('src', src);
		$('#incompleteMessage').fadeIn().delay(messageDelay).fadeOut();
		$contactForm.add($('#stepsNav')).fadeOut().delay(messageDelay).fadeIn();
	} else {		
		
		$('#sendingMessage').fadeIn();
		$contactForm.add( $('#stepsNav') ).fadeOut();
	
		$.ajax( {
		  url: $contactForm.attr( 'action' ) + "?ajax=true",
		  type: $contactForm.attr( 'method' ),
		  data: $contactForm.serialize(),
		  success: submitFinished
		} );
	}
  // Prevent the default form submission occurring
  return false;
}


// Handle the Ajax response
function submitFinished( response ) {
	$('#sendingMessage').fadeOut();
	response = $.trim( response );
	if ( response == "success" ) {

    // Form submitted successfully:
    // 1. Display the success message
    // 2. Clear the form fields
    // 3. Fade the content back in

    $('#successMessage').fadeIn().delay(messageDelay).fadeOut(function(){
    $('#formElem').add($('#stepsNav')).fadeIn();});
	$('#stepsNav ul li span').remove();
	$('#steps').css('margin-left',0);
    $('#senderName').val( "" );
    $('#senderEmail').val( "" );
    $('#senderMessage').val( "" );
	$('#stepsNav ul li.selected').removeClass('selected');
	$('#stepsNav ul li.checked').removeClass('checked');
	$('#stepsNav ul li:eq(0)').addClass('selected');

  } else if( response == "captchaError" ){
		src = 'http://www.egee.me/wp-content/themes/egee/math/securimage_show.php?' + Math.random();
		$('#captcha').attr('src', src);
		$('#invalidCAPTCHA').fadeIn().delay(messageDelay+500).fadeOut();
		$('#formElem').add( $('#stepsNav') ).delay(messageDelay+2000).fadeIn();
  }else{

    // Form submission failed: Display the failure message,
    // then redisplay the form
		src = 'http://www.egee.me/wp-content/themes/egee/math/securimage_show.php?' + Math.random();
		$('#captcha').attr('src', src);
		$('#failureMessage').fadeIn().delay(messageDelay+500).fadeOut();
		$('#formElem').add( $('#stepsNav') ).delay(messageDelay+2000).fadeIn();
  }
}