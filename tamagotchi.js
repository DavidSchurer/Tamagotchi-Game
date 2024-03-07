let startTime;
let age = hunger = happiness = health = bathroom = restroom = 100; // tamagotchi stats
let days = hr = min = sec = 0; // time settings

// Once browser finishes loading, start timer and select 'eat' icon by default
window.onload = function() {
  startTime = new Date();
  timerInterval = setInterval(function() {
    let currentTime = new Date();
    secStats = Math.floor((currentTime - startTime) / 1000); // use for stats

    // ============================= visual timer =============================
    sec++; 
    if (sec === 60) {
      sec = 0;
      min++;
    }
    if (min === 60) {
      min = 0;
      hr++;
    }
    if (hr === 24) {
      // congrats on making it to 1 day, here is your reward!!!
      window.close();
    }

    if (min < 10 && sec < 10) {
      document.getElementById('time').textContent = "0" + hr + ":0" + min + ":0" + sec;
    }
    else if (min < 10 && sec >= 10) {
      document.getElementById('time').textContent = "0" + hr + ":0" + min + ":" + sec;
    }
    else if (min >= 10 && sec < 10) {
      document.getElementById('time').textContent = "0" + hr + ":0" + min + ":0" + sec;      
    }
    else if (min >= 10 && sec >= 10) {
      document.getElementById('time').textContent = "0" + hr + ":" + min + ":" + sec;
    }
    // ========================================================================

    // =========================== tamagotchi stats ===========================
    // ================================= age ==================================
    if (secStats % 30 == 0) { 
      age = secStats / 30;
      document.getElementById('age').textContent = "Age: " + age + " yr(s) old"; 
    }

    // ============================== well-being ==============================
    // case #1 of slowly killing our tamagotchi
    if (secStats % 3 == 0) {
      // decrement stats by 1 every 3 sec, lower limit set to 0
      hunger = Math.max(0, hunger - 1);
      happiness = Math.max(0, happiness - 1);
      health = Math.max(0, health - 1);
      restroom = Math.max(0, restroom - 1);

      // upper limit set to 100
      hunger = Math.min(100, hunger);
      happiness = Math.min(100, happiness);
      health = Math.min(100, health);
      restroom = Math.min(100, restroom);
    }
      // ugly format, keeping temporarily for testing purposes
      document.getElementById('timer').textContent = "hunger: " + hunger + 
      " | happiness: " + happiness + " | health: " + health + 
      " | needa hit the shitter: " + restroom;

    // case #2 of slowly killing our tamagotchi
    if (secStats % 10 == 0) {
      // decrease stats accordingly every 10 sec, lower limit set to 0
      hunger = Math.max(0, hunger - 2);
      happiness = Math.max(0, happiness - 1);
      health = Math.max(0, health - 1);
      restroom = Math.max(0, restroom - 3);

      // upper limit set to 100
      hunger = Math.min(100, hunger);
      happiness = Math.min(100, happiness);
      health = Math.min(100, health);
      restroom = Math.min(100, restroom);
    // ========================================================================
    }
  }, 1000);
  document.getElementById('eat').classList.add('selected');
};

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
      // Open food menu
      var imgElement = document.getElementById('action');
      var foodItem1 = document.getElementById('food1');
      var foodItem2 = document.getElementById('food2');
      var foodItem3 = document.getElementById('food3');
      var foodItem4 = document.getElementById('food4');
      var foodItem5 = document.getElementById('food5');
      imgElement.style.display = 'none';
      foodItem1.style.display = 'flex';
      foodItem2.style.display = 'flex';
      foodItem3.style.display = 'flex';
      foodItem4.style.display = 'flex';
      foodItem5.style.display = 'flex';

      // temporarily get rid of 'selected' icon
      selectedAction.classList.remove('selected');
      // apply selected to hotdog by default
      document.getElementById('food1').classList.add('foodSelected');
      
      // handle food menu traversal
      document.getElementById('A').addEventListener('click', function() {
        let selectedFood = document.querySelector('.foodItem.foodSelected');
        switch (selectedFood.id) {
          case 'food1':
            // Remove 'foodSelected' from current food icon
            selectedFood.classList.remove('foodSelected');
            // Move 'foodSelected' to next food icon
            document.getElementById('food2').classList.add('foodSelected');
            break;
          case 'food2':
            selectedFood.classList.remove('foodSelected');
            document.getElementById('food3').classList.add('foodSelected');
            break;
          case 'food3':
            selectedFood.classList.remove('foodSelected');
            document.getElementById('food4').classList.add('foodSelected');
            break;
          case 'food4':
            selectedFood.classList.remove('foodSelected');
            document.getElementById('food5').classList.add('foodSelected');
            break;
          case 'food5':
            selectedFood.classList.remove('foodSelected');
            document.getElementById('food1').classList.add('foodSelected');
            break;
        }
      });
      // handle food selection
      document.getElementById('B').addEventListener('click', function() {
        // Choose which food to feed tamagotchi food icon         
        let selectedFood = document.querySelector('.foodItem.foodSelected');
        switch (selectedFood.id) {
          case 'food1':
            // Remove foodSelected icon
            selectedFood.classList.remove('foodSelected');
            var imgElement = document.getElementById('action');
            imgElement.style.display = 'flex';
            foodItem1.style.display = 'none';
            foodItem2.style.display = 'none';
            foodItem3.style.display = 'none';
            foodItem4.style.display = 'none';
            foodItem5.style.display = 'none';
            imgElement.src = 'mimitchi-eating.gif';
            setTimeout(function() {
              imgElement.src = 'mimitchi-bing-chilling.png';
            }, 1000);
            hunger += 10;
            // Place 'selected' back on 'eat' icon
            document.getElementById('eat').classList.add('selected');
            break;
          case 'food2':
            // Remove foodSelected icon
            selectedFood.classList.remove('foodSelected');
            var imgElement = document.getElementById('action');
            imgElement.style.display = 'flex';
            foodItem1.style.display = 'none';
            foodItem2.style.display = 'none';
            foodItem3.style.display = 'none';
            foodItem4.style.display = 'none';
            foodItem5.style.display = 'none';
            imgElement.src = 'mimitchi-eating.gif';
            setTimeout(function() {
              imgElement.src = 'mimitchi-bing-chilling.png';
            }, 1000);
            hunger += 10;
            document.getElementById('eat').classList.add('selected');
            break;
          case 'food3':
            // Remove foodSelected icon
            selectedFood.classList.remove('foodSelected');
            var imgElement = document.getElementById('action');
            imgElement.style.display = 'flex';
            foodItem1.style.display = 'none';
            foodItem2.style.display = 'none';
            foodItem3.style.display = 'none';
            foodItem4.style.display = 'none';
            foodItem5.style.display = 'none';
            imgElement.src = 'mimitchi-eating.gif';
            setTimeout(function() {
              imgElement.src = 'mimitchi-bing-chilling.png';
            }, 1000);
            hunger += 10;
            document.getElementById('eat').classList.add('selected');
            break;
          case 'food4':
            // Remove foodSelected icon
            selectedFood.classList.remove('foodSelected');
            var imgElement = document.getElementById('action');
            imgElement.style.display = 'flex';
            foodItem1.style.display = 'none';
            foodItem2.style.display = 'none';
            foodItem3.style.display = 'none';
            foodItem4.style.display = 'none';
            foodItem5.style.display = 'none';
            imgElement.src = 'mimitchi-eating.gif';
            setTimeout(function() {
              imgElement.src = 'mimitchi-bing-chilling.png';
            }, 1000);
            hunger += 10;
            document.getElementById('eat').classList.add('selected');
            break;
          case 'food5':
            selectedFood.classList.remove('foodSelected');
            var imgElement = document.getElementById('action');
            imgElement.style.display = 'flex';
            foodItem1.style.display = 'none';
            foodItem2.style.display = 'none';
            foodItem3.style.display = 'none';
            foodItem4.style.display = 'none';
            foodItem5.style.display = 'none';
            imgElement.src = 'mimitchi-eating.gif';
            setTimeout(function() {
              imgElement.src = 'mimitchi-bing-chilling.png';
            }, 1000);
            hunger += 10;
            document.getElementById('eat').classList.add('selected');
            break;      
      }
    });
      break;
    case 'play':
      // handle 'selected' to traverse food menu
      var imgElement = document.getElementById('action');
      imgElement.src = 'mimitchi-playing.gif';
      setTimeout(function() {
        imgElement.src = 'mimitchi-bing-chilling.png';
      }, 2000);
      happiness += 10;
      break;
    case 'heal':
      // handle 'selected' to traverse food menu
      var imgElement = document.getElementById('action');
      imgElement.src = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExank1bTlpY2Ewb2MwdTJ4dzRlZm5oc29kenhpMWpyZnRudGRpZzdxbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XkxfezUB7Rj4k/giphy.gif';
      setTimeout(function() {
        imgElement.src = 'mimitchi-bing-chilling.png';
      }, 1750);
      health += 10;
      break;
    case 'duck':
      var imgElement = document.getElementById('action');
      imgElement.src = 'https://c.tenor.com/KOiVAMtwvHgAAAAd/tenor.gif';
      setTimeout(function() {
        imgElement.src = 'mimitchi-bing-chilling.png';
      }, 2500);
      restroom += 10;
      break;
    case 'health':
      var imgElement = document.getElementById('action');
      imgElement.src = 'mimitchi-angry.png';
      setTimeout(function() {
        imgElement.src = 'mimitchi-bing-chilling.png';
      }, 1000);
      // so this is where we take all of our global stat variables from above and display them
      break;
    case 'attend':
      var imgElement = document.getElementById('action');
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
