// ============================= global variables =============================
let startTime;
let age = hunger = happiness = health = bathroom = restroom = 100; // stats
let days = hr = min = sec = 0; // time settings

// Once browser finishes loading, start timer and set 'eat' icon to default
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
      document.getElementById('time').textContent = "Time: 0" + hr + ":0" + min + ":0" + sec;
    }
    else if (min < 10 && sec >= 10) {
      document.getElementById('time').textContent = "Time: 0" + hr + ":0" + min + ":" + sec;
    }
    else if (min >= 10 && sec < 10) {
      document.getElementById('time').textContent = "Time: 0" + hr + ":0" + min + ":0" + sec;      
    }
    else if (min >= 10 && sec >= 10) {
      document.getElementById('time').textContent = "Time: 0" + hr + ":" + min + ":" + sec;
    }
    // ==========================================================================

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
    document.getElementById('timer').textContent = "stats: hunger: " + hunger + 
    " | happiness: " + happiness + " | health: " + health + 
    " | bathroom: " + restroom;

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
// ============================================================================

// ===================== traverse icons (circularBtn 'A') =====================
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
// ============================================================================

// ===================== icon execution (circularBtn 'B') =====================
document.getElementById('B').addEventListener('click', function() {
  // Retrieve icon with 'selected' to perform action based on id
  let selectedAction = document.querySelector('.btnIcon.selected');
  switch (selectedAction.id) {
    case 'eat':
      // Open food menu
      var tamagotchiAction = document.getElementById('action');
      var foodItem1 = document.getElementById('food1');
      var foodItem2 = document.getElementById('food2');
      var foodItem3 = document.getElementById('food3');
      var foodItem4 = document.getElementById('food4');
      var foodItem5 = document.getElementById('food5');
      tamagotchiAction.style.display = 'none';
      foodItem1.style.display = 'flex';
      foodItem2.style.display = 'flex';
      foodItem3.style.display = 'flex';
      foodItem4.style.display = 'flex';
      foodItem5.style.display = 'flex';

      // temporarily get rid of 'selected' icon
      selectedAction.classList.remove('selected');
      // apply selected to hotdog by default
      document.getElementById('food1').classList.add('foodSelected');
      
      // ===================== traverse food icons ('B') ======================
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
      // ======================================================================

      // ========================= select food ('B') ==========================
      document.getElementById('B').addEventListener('click', function() {
        // Choose which food to feed tamagotchi food icon         
        let selectedFood = document.querySelector('.foodItem.foodSelected');
        switch (selectedFood.id) {
          case 'food1':
            // Remove foodSelected icon
            selectedFood.classList.remove('foodSelected');
            var tamagotchiAction = document.getElementById('action');
            tamagotchiAction.style.display = 'flex';
            foodItem1.style.display = 'none';
            foodItem2.style.display = 'none';
            foodItem3.style.display = 'none';
            foodItem4.style.display = 'none';
            foodItem5.style.display = 'none';
            tamagotchiAction.src = 'mametchi-eating.gif';
            setTimeout(function() {
              tamagotchiAction.src = 'mametchi.webp';
            }, 1000);
            hunger += 10;
            // Place 'selected' back on 'eat' icon
            document.getElementById('eat').classList.add('selected');
            break;
          case 'food2':
            selectedFood.classList.remove('foodSelected');
            var tamagotchiAction = document.getElementById('action');
            tamagotchiAction.style.display = 'flex';
            foodItem1.style.display = 'none';
            foodItem2.style.display = 'none';
            foodItem3.style.display = 'none';
            foodItem4.style.display = 'none';
            foodItem5.style.display = 'none';
            tamagotchiAction.src = 'mametchi-eating.gif';
            setTimeout(function() {
              tamagotchiAction.src = 'mametchi.webp';
            }, 1000);
            hunger += 10;
            document.getElementById('eat').classList.add('selected');
            break;
          case 'food3':
            selectedFood.classList.remove('foodSelected');
            var tamagotchiAction = document.getElementById('action');
            tamagotchiAction.style.display = 'flex';
            foodItem1.style.display = 'none';
            foodItem2.style.display = 'none';
            foodItem3.style.display = 'none';
            foodItem4.style.display = 'none';
            foodItem5.style.display = 'none';
            tamagotchiAction.src = 'mametchi-eating.gif';
            setTimeout(function() {
              tamagotchiAction.src = 'mametchi.webp';
            }, 1000);
            hunger += 10;
            document.getElementById('eat').classList.add('selected');
            break;
          case 'food4':
            selectedFood.classList.remove('foodSelected');
            var tamagotchiAction = document.getElementById('action');
            tamagotchiAction.style.display = 'flex';
            foodItem1.style.display = 'none';
            foodItem2.style.display = 'none';
            foodItem3.style.display = 'none';
            foodItem4.style.display = 'none';
            foodItem5.style.display = 'none';
            tamagotchiAction.src = 'mametchi-eating.gif';
            setTimeout(function() {
              tamagotchiAction.src = 'mametchi.webp';
            }, 1000);
            hunger += 10;
            document.getElementById('eat').classList.add('selected');
            break;
          case 'food5':
            selectedFood.classList.remove('foodSelected');
            var tamagotchiAction = document.getElementById('action');
            tamagotchiAction.style.display = 'flex';
            foodItem1.style.display = 'none';
            foodItem2.style.display = 'none';
            foodItem3.style.display = 'none';
            foodItem4.style.display = 'none';
            foodItem5.style.display = 'none';
            tamagotchiAction.src = 'mametchi-eating.gif';
            setTimeout(function() {
              tamagotchiAction.src = 'mametchi.webp';
            }, 1000);
            hunger += 10;
            document.getElementById('eat').classList.add('selected');
            break;      
        }
      });
      break;
    // ======================================================================

    // ============================= play ('B') =============================
    case 'play':
      var tamagotchiAction = document.getElementById('action');
      tamagotchiAction.src = 'mametchi-play.gif';
      setTimeout(function() {
        tamagotchiAction.src = 'mametchi.webp';
      }, 1500);
      happiness += 10;
      break;
    // ======================================================================

    // ============================= heal ('B') =============================
    case 'heal':
      var tamagotchiAction = document.getElementById('action');
      tamagotchiAction.src = 'mametchi-heal.webp';
      setTimeout(function() {
        tamagotchiAction.src = 'mametchi.webp';
      }, 1000);
      health += 10;
      break;
    // ======================================================================
      
    // ============================= duck ('B') =============================     
    case 'duck':
      var tamagotchiAction = document.getElementById('action');
      tamagotchiAction.src = 'mametchi-doing-the-deed.gif';
      setTimeout(function() {
        tamagotchiAction.src = 'mametchi.webp';
      }, 3300);
      restroom += 10;
      break;
    // ======================================================================
      
    // ========================== view stats ('B') ==========================
    case 'health':
      var tamagotchiAction = document.getElementById('action');
      var status = document.getElementById('stats');
      setTimeout(function() {
        status.style.display = 'flex';
        tamagotchiAction.style.display = 'none';
        document.getElementById('stats').textContent = "Stats: hunger: " + hunger + 
        "  happiness: " + happiness + " health: " + health + 
        "  bathroom: " + restroom;
      }, 3000);
      tamagotchiAction.style.display = 'flex';
      status.style.display = 'none';
      break;
    // ======================================================================

    // ========================== view stats ('B') ==========================      
    case 'attend':
      var tamagotchiAction = document.getElementById('action');
      tamagotchiAction.src = 'mametchi-attend.png';
      setTimeout(function() {
        tamagotchiAction.src = 'mametchi.webp';
      }, 1000);
      happiness += 10;
      break;
    // ============================================================================
    }
}); 
// ============================================================================

// functionality for circularBtn 'C'
/* 
circularBtn 'C' serves as a cancel btn: e.g. user presses 'B' on the 'eat'
icon, which will open a menu of food options. From there, the user can 
traverse the menu with 'A', select food option to feed tamagotchi with 'B',
or 'C' to go back to main screen.
*/
