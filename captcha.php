<?

require_once dirname(__FILE__) . '/math/securimage.php';
$securimage = new Securimage();
$captcha_code = isset( $_POST['captcha_code'] );

if ($securimage->check($_POST['captcha_code']) == false) 
  echo 'code is:'. $captcha_code;
  //echo $securimage->check($_POST['captcha_code']);
else
  echo "success";

?>