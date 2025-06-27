### Dynamic Shopping Cart
Welcome to Trapeatry, a dynamic shopping cart application built with HTML, CSS, and JavaScript. This project simulates core e-commerce functionality such as adding, updating, and removing items from a shopping cart—all through DOM manipulation.


##  Overview
This lab focused on practicing DOM manipulation by creating a responsive and interactive shopping cart. Users can:

Add custom products to the cart

View item name, price, and quantity

Update quantities in real time

Remove items from the cart

See total cost update instantly


## Refecltion 
 How did you dynamically create and append new elements to the DOM?
I used JavaScript’s document.createElement() and innerHTML methods to build new elements such as product listings and cart items, then appended them using appendChild().

 What steps did you take to ensure accurate updates to the total price?
Each time the cart changed (adding, removing, updating quantity), I recalculated the total price using .reduce() and updated the DOM using textContent.

 How did you handle invalid input for product name or price?
I validated inputs using simple if conditions, ensuring the name was not empty and the price was a valid number using isNaN() and parseFloat().

 What challenges did you face when implementing the remove functionality?
The hardest part was understanding how to properly manipulate the DOM when removing elements and ensuring that the cart and total price updated accordingly. It took trial and error to get the logic correct.

 Personal Reflection
DOM manipulation has been difficult for me to understand. I struggled especially with understanding the proper syntax structure and how to efficiently connect HTML elements to JavaScript functions. It took me a while to get everything functioning properly, and while I made good progress, I’m still a bit unsure when it comes to best practices in organizing and updating dynamic content. This lab helped me build confidence through practice.

