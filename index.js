const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  // YOUR CODE STARTS
  //context
  const context = await browser.newContext();

  //page
  const page = await context.newPage();

  //navigate to the page
  await page.goto("https://www.netflix.com")
  await page.click('text=Sign In');

  //check for unregistered user
  await page.fill('input[name="userLoginId"]', 'username111');
  await page.fill('input[name="password"]', 'password111');
  await page.click('button[type="submit"]');
  const errorMessage = await page.waitForSelector('div[class="ui-message-contents"]');
  console.log("errorMessage: " + await errorMessage)

  //check for username error message when phone number is invalid
  await page.fill('input[name="userLoginId"]', '1');
  await page.click('input[name="password"]');
  const phoneErrorMessage = await page.waitForSelector('text=Please enter a valid phone number.');
  console.log("phoneErrorMessage: " + await phoneErrorMessage)

   //check for username error message when email is invalid
   await page.fill('input[name="userLoginId"]', 'a');
   await page.click('input[name="password"]');
   const emailErrorMessage = await page.waitForSelector('text=Please enter a valid email.');
   console.log("emailErrorMessage: " + await emailErrorMessage)

  //check for password length
  await page.fill('input[name="password"]', '1');
  await page.click('input[name="userLoginId"]');
  const passwordErrorMessage = await page.waitForSelector('text=Your password must contain between 4 and 60 characters.');
  console.log("passwordErrorMessage: " + await passwordErrorMessage)

  //take screenshot of work and close the browser
  await page.screenshot({path: `Netflix-${Date.now}.png`});
  await browser.close()

  // YOUR CODE ENDS
})();
