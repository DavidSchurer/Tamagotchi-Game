let startTime;
let hunger = 100; // me hungee
let happiness = 100; // im so sad
let health = 100; // where r my crazy pills
let nappyPoo = 100; // A nap taken before impending defecation. Ultimately leading to shitting one's pants

// Once browser finishes loading, start timer and select 'eat' icon by default
window.onload = function() {

  startTime = new Date();
  timerInterval = setInterval(function() {
    let currentTime = new Date();
    let secondsElapsed = Math.floor((currentTime - startTime) / 1000);
    if (secondsElapsed % 30 == 0) { 
      let age = secondsElapsed / 30;
      document.getElementById('age').textContent = age + " years\n"; 
    }
    if (secondsElapsed % 10 == 0) {
      hunger -= 5;
      happiness -= 5;
      health -= 5;
      nappyPoo -= 5;
      // ik this looks ugly format wise but is only here temporarily to see if stats r functioning properly
      document.getElementById('timer').textContent = "\nhunger: " + hunger + 
      "\n| happiness: " + happiness + "\n| health: " + health + 
      "\n| needa hit the shitter: " + nappyPoo;
    }
  }, 1000);
  document.getElementById('eat').classList.add('selected');
};

// stop/clear timer: clearInterval(timerInterval);

// functionality for btn 'A'
/* 
this implementation only works for traversing icons. problems will occur 
in the instance of traversing a menu. e.g. user clicks 'B' on 'eat' icon
which should open a menu of food options to feed our tamagotchi.
user wants to press 'A' to traverse the menu but itll just fuck shit up 
since this implementation only traverses icons lol so we might have to create 
separate functions that handle 'A' btn clicks depending on where the user is at
*/
document.getElementById('A').addEventListener('click', function() {
  // Retrieve icon with 'selected' to use id to traverse to next icon
  let selectedAction = document.querySelector('.btnIcon.selected');
  switch (selectedAction.id) {
    case 'eat':
      // Remove 'selected' from current icon
      selectedAction.classList.remove('selected');
      // Move 'selected' to next icon
      document.getElementById('play').classList.add('selected');
      break;
    case 'play':
      selectedAction.classList.remove('selected');
      document.getElementById('heal').classList.add('selected');
      break;
    case 'heal':
      selectedAction.classList.remove('selected');
      document.getElementById('duck').classList.add('selected');
      break;
    case 'duck':
      selectedAction.classList.remove('selected');
      document.getElementById('health').classList.add('selected');
      break;
    case 'health':
      selectedAction.classList.remove('selected');
      document.getElementById('attend').classList.add('selected');
      break;
    case 'attend':
      selectedAction.classList.remove('selected');
      document.getElementById('eat').classList.add('selected');
      break;
    }
}); 



// functionality for circularBtn 'B'
document.getElementById('B').addEventListener('click', function() {
  // Retrieve icon with 'selected' to perform action based on id
  let selectedAction = document.querySelector('.btnIcon.selected');
  switch (selectedAction.id) {
    case 'eat':
    showFoodMenu();
      // var imgElement = document.getElementById('tamagotchi-character');
      // imgElement.src = 'mimitchi-eating.gif';
      // setTimeout(function() {
      //   imgElement.src = 'mimitchi-bing-chilling.png';
      // }, 1000);
      // hunger += 10;
      break;
    case 'play':
      var imgElement = document.getElementById('tamagotchi-character');
      imgElement.src = 'mimitchi-playing.gif';
      setTimeout(function() {
        imgElement.src = 'mimitchi-bing-chilling.png';
      }, 2000);
      happiness += 10;
      break;
    case 'heal':
      var imgElement = document.getElementById('tamagotchi-character');
      imgElement.src = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExank1bTlpY2Ewb2MwdTJ4dzRlZm5oc29kenhpMWpyZnRudGRpZzdxbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XkxfezUB7Rj4k/giphy.gif';
      setTimeout(function() {
        imgElement.src = 'mimitchi-bing-chilling.png';
      }, 1750);
      health += 10;
      break;
    case 'duck':
      var imgElement = document.getElementById('tamagotchi-character');
      imgElement.src = 'https://c.tenor.com/KOiVAMtwvHgAAAAd/tenor.gif';
      setTimeout(function() {
        imgElement.src = 'mimitchi-bing-chilling.png';
      }, 2500);
      nappyPoo += 10;
      break;
    case 'health':
      var imgElement = document.getElementById('tamagotchi-character');
      imgElement.src = 'mimitchi-angry.png';
      setTimeout(function() {
        imgElement.src = 'mimitchi-bing-chilling.png';
      }, 1000);
      // so this is where we take all of our global stat variables from above and display them
      break;
    case 'attend':
      var imgElement = document.getElementById('tamagotchi-character');
      imgElement.src = 'mimitchi-happy.png';
      setTimeout(function() {
        imgElement.src = 'mimitchi-bing-chilling.png';
      }, 1000);
      happiness += 10;
      break;
    }
}); 

// functionality for circularBtn 'C'
/* 
circularBtn 'C' serves as a cancel btn: e.g. user presses 'B' on the 'eat'
icon, which will open a menu of food options. From there, the user can 
traverse the menu with 'A', select food option to feed tamagotchi with 'B',
or 'C' to go back to main screen.

idk how far our implementations will go, but i'll assume the most we'll do
is like one pop-up per icon so rly we can just make it so 'C' returns user
to the main screen, making it seem like it functions as a back btn.
*/
document.getElementById('C').addEventListener('click', function() {
  let selectedAction = document.querySelector('.btnIcon.selected');

  switch (selectedAction.id) {
    case 'eat':
      hideFoodMenu();
      showDefaultImage();
      break;
    // Handle other actions...
  }
});

function showFoodMenu() {
  let screenContent = document.querySelector('.screen-content');
  let foodMenuDiv = document.createElement('div');
  foodMenuDiv.classList.add('food-menu');

  let foodMenuTitle = document.createElement('h6');
  foodMenuTitle.textContent = 'Food Menu';
  foodMenuDiv.appendChild(foodMenuTitle);

  // Create and append the list of food items
  let foodList = document.createElement('ul');
  foodList.classList.add('food-list');
  foodList.innerHTML = `
    <li class="food-item">Hamburger <img src="./food/burgerImage.png" alt="Hamburger"></li>
    <li class="food-item">Pizza <img src="./food/pizzaImage.png" alt="Pizza"></li>
    <li class="food-item">Hotdog <img src="./food/hotdogImage.png" alt="Hotdog"></li>
    <li class="food-item">Sushi <img src="./food/sushiImage.png" alt="Sushi"></li>
    <li class="food-item">Sandwich <img src="./food/sandwichImage.png" alt="Sandwich"></li>
  `;
  foodMenuDiv.appendChild(foodList);

  // Clear existing content and append the food menu
  screenContent.innerHTML = '';
  screenContent.appendChild(foodMenuDiv);

  let maxHeight = screenContent.clientHeight - foodMenuTitle.clientHeight - 20;
  foodList.style.maxHeight = maxheight + 'px';

  // Set initial focus on the first food item
  let firstFoodItem = document.querySelector('.food-item');
  firstFoodItem.classList.add('selected');
  firstFoodItem.focus();

  // Add event listener for circular A button to cycle through food items
  document.getElementById('A').addEventListener('click', function() {
    let selectedFoodItem = document.querySelector('.food-item.selected');
    let nextFoodItem = selectedFoodItem.nextElementSibling;

    // If there is a next food item, move selection to it
    if (nextFoodItem) {
      selectedFoodItem.classList.remove('selected');
      nextFoodItem.classList.add('selected');
    } else {
      // If at the end, loop back to the first food item
      let firstFoodItem = document.querySelector('.food-item');
      selectedFoodItem.classList.remove('selected');
      firstFoodItem.classList.add('selected');
    }
  });
}

function hideFoodMenu() {
  let screenContent = document.querySelector('.screen-content');
  // Clear screen content
  screenContent.innerHTML = '';
}

function showDefaultImage() {
  let screenContent = document.querySelector('.screen-content');
  // Append default image to screen content
  screenContent.innerHTML = `<img id="tamagotchi-character" class="action" src="mimitchi-bing-chilling.png" alt="action error nooo">`;
}
