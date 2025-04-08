export async funcion getCaptchaToken() {
  return new Promise(resolve => {
    grecaptcha.ready(async () => {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

      if(!siteKey) {
        resolve(null);
        return;
      }
      
      const token = await grecaptcha.execute(
        siteKey, 
        { 
          action: 'contact-info',
        });

      resolve(token);
    });
  });
}

function getCaptchaToken() {
  throw new Error("Function not implemented.");
}
