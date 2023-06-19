Shopping Cart App :shopping_cart:


## Instructions :open_book:

In the terminal, run
```
https://github.com/teoyouxun/ga_project3.git
```
cd into the folder, then run:
```
npm install
npm run dev
```
Open your browser and type url https://localhost:5173/ (or whichever local server specified on your terminal)

## How to start shopping :basket:

* Sign up for an account using the signup page. 

* Once signed up, you will be prompted to login.

* You will see a list of products available for sale. You can add the items to cart by clicking on the respective button.

* Once done, you can click on your cart on the top right corner of the screen. This will bring you to the checkout payment page.

* You can now adjust the quantity of your item purchase. The price will be reflected in real time as well. You can also delete the items from your cart.

* Once done, hit the payment button!

## For future add-ons and to-dos :notebook_with_decorative_cover:

* Stripe/Paypal or relevant payment API system

* Deployment (reattempt deploying to Firebase, otherwise to look for alternatives e.g. Fly.io)

* Update Readme file with screenshots and wireframe

* Further CSS updates and tweaks



## Hurdles & Challenges :stop_sign:

* Initial difficulties with setting up Firebase for the first time, but resolved it by looking up a lot of available online resources

* Unable to use Firebase Auth for controlling admin rights due to it being a paid feature (for accessing custom user claims). Thus, the add cart link and function still exists as a way to add new products, but this should ideally be limited to admins only.


