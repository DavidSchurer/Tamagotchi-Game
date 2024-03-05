import React, { useState, useEffect, useRef } from 'react';
import swal from 'sweetalert';
import { ProgressBar } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/Game.css';
//icons
import { GrGamepad } from 'react-icons/gr';
import { IoFastFoodOutline } from 'react-icons/io5';
import { MdOutlineHealthAndSafety } from 'react-icons/md';
import { BiTime } from 'react-icons/bi';
import { GiLaurelsTrophy } from 'react-icons/gi';
import { MdOutlineAdsClick } from 'react-icons/md';

// Components
const TamagoshiImage = ({ hunger, happiness, health }) => {
    let tamagoshiImage;
    // if hunger is less than or equal to 30 or happiness is less than or equal to 30 or health is less than or equal to 30
    if (hunger <= 30 || happiness <= 30 || health <= 30) {
        tamagoshiImage = 'https://i.imgur.com/Okh86g4.png';
    }
    // if hunger is equal to 0 or happiness is equal to 0 or health is equal to 0
    else if (hunger === 0 || happiness === 0 || health === 0) {
        tamagoshiImage = 'https://i.imgur.com/29jrgnP.png';
    }
    // if hunger is greater than 90 or happiness is greater than 90 or health is greater than 90
    else if (happiness > 90 && hunger > 95 && health > 90) {
        tamagoshiImage = 'https://i.imgur.com/kQooJxm.png';
    }
    // if hunger is greater than 80 and happiness is greater than 80 and health is greater than 80
    else if (hunger > 80 && happiness > 80 && health > 80) {
        tamagoshiImage = 'https://i.imgur.com/wWoMWxA.png';
    }
    // if hunger is greater than 30 and happiness is greater than 30 and health is greater than 30
    else if (hunger > 30 && happiness > 30 && health > 30) {
        tamagoshiImage = 'https://i.imgur.com/EHOnPps.png';
    }
    return <img src={tamagoshiImage} alt="Tamagoshi" />;
}

export const Game = () => {
    // States for Tamagoshi parameters
    const [hunger, setHunger] = useState(50);
    const [happiness, setHappiness] = useState(50);
    const [age, setAge] = useState(0);
    const [health, setHealth] = useState(100);
    const [record, setRecord] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    // Adds the variable showGif and sets its initial value to false
    const [showGif, setShowGif] = useState(false);
    const [gif, setGif] = useState(null);
    const [selectedAction, setSelectedAction] = useState('eat'); // changed default selectedAction from 'play' to 'eat'

    // Modifies the showGif function to change the value of showGif to true
    // and set a timer to change the value of showGif back to false
    // after 3 seconds
    const displayGif = () => {
        setShowGif(true);
        setTimeout(() => {
            setShowGif(false);
        }, 3000
        );
    };

    // Function to update Tamagoshi's age
    useInterval(() => {
        setAge(age + 1);
        if (age === 99) {
            swal({
                title: 'Kirby has had a long life, Congratulations!',
                text: 'Do you want to reset the game?',
                icon: 'Success',
                buttons: ['Cancel', 'OK'],
                dangerMode: true,
                content: {
                    element: 'div',
                    attributes: {
                        className: 'custom-swal-text, custom-swal'
                    }
                }
            }).then((result) => {
                if (result) {
                    // Restart the game
                    window.location.reload();
                } else {
                    // Close the page
                    window.close();
                }
            });
        }
    }, 30000);
    // Function to update the game time
    useInterval(() => {
        setElapsedTime(elapsedTime + 1);
    }, 1000); // Update every second
    // Function to update Tamagoshi's hunger state
    useInterval(() => {
        setHunger(hunger - 1);
        if (hunger === 0) {
            swal({
                title: 'Kirby died of hunger',
                text: 'Do you want to reset the game?',
                icon: 'warning',
                buttons: ['Cancel', 'OK'],
                dangerMode: true,
                content: {
                    element: 'div',
                    attributes: {
                        className: 'custom-swal-text, custom-swal'
                    }
                }
            }).then((result) => {
                if (result) {
                    // Restart the game
                    window.location.reload();
                } else {
                    // Close the page
                    window.close();
                }
            });
        }
    }, 2000);
    // Function to update Tamagoshi's happiness state
    useInterval(() => {
        setHappiness(happiness - 1);
    }, 4000);
    // Function to update Tamagoshi's health state
    useInterval(() => {
        setHealth(health - 1);
        if (health === 0) {
            swal({
                title: 'Kirby died of illness',
                text: 'Do you want to reset the game?',
                icon: 'warning',
                buttons: ['Cancel', 'OK'],
                dangerMode: true,
                content: {
                    element: 'div',
                    attributes: {
                        className: 'custom-swal-text, custom-swal'
                    }
                }
            }).then((result) => {
                if (result) {
                    // Restart the game
                    window.location.reload();
                } else {
                    // Close the page
                    window.close();
                }
            });
        }
    }, 3000);
    // Function to update the age record
    const updateRecord = () => {
        if (age > record) {
            setRecord(age);
            localStorage.setItem('record', age);
        }
    }
    // Format the game time
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
    // Add a 0 to the left if the number is less than 10
    const elapsedTimeFormatted = `${hours} Hours ${minutes} Minutes ${seconds.toString().padStart(2, '0')} Seconds`;
    // Update the age record when the age changes
    useEffect(updateRecord, [age, record]);
    // Load the age record from localStorage
    useEffect(() => {
        const storedRecord = localStorage.getItem('record');
        if (storedRecord) {
            setRecord(parseInt(storedRecord));
        }
    }, []);

    const handleCircularButtonAction = (action) => {
        switch(action) {
            case 'A':
                switch (selectedAction) {
                    case 'eat':
                        setSelectedAction('play');
                        break;
                    case 'play':
                        setSelectedAction('heal');
                        break;
                    case 'heal':
                        setSelectedAction('duck');
                        break;
                    case 'duck':
                        setSelectedAction('status')
                        break;
                    case 'status':
                        setSelectedAction('attention');
                        break;
                    case 'attention':
                        setSelectedAction('eat');
                        break;
                }
                break;
            case 'B':
                switch (selectedAction) {
                    case 'eat':
                        setHunger(Math.min(hunger + 10, 100));
                        setGif('https://i.giphy.com/media/R6oW8JAJxqRxe/giphy.webp');
                        displayGif();
                        break;
                    case 'play':
                        setHappiness(Math.min(happiness + 10, 100));
                        setGif('https://i.giphy.com/media/uQkKavfX6TER2/giphy.webp');
                        displayGif();
                        break;
                    case 'heal':
                        setHealth(Math.min(health + 10, 100));
                        setGif('https://64.media.tumblr.com/62a6ea40278de0931ad16726b7017e01/tumblr_n0w505oIli1ru09vqo1_500.gifv');
                        displayGif();
                        break;
                    case 'duck':
                        setGif('')
                        displayGif('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExank1bTlpY2Ewb2MwdTJ4dzRlZm5oc29kenhpMWpyZnRudGRpZzdxbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XkxfezUB7Rj4k/giphy.gif');
                        break;                        
                    case 'status':
                        setShowModal(true);
                        break;
                    case 'attention':
                        displayGif('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExank1bTlpY2Ewb2MwdTJ4dzRlZm5oc29kenhpMWpyZnRudGRpZzdxbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XkxfezUB7Rj4k/giphy.gif');
                    default:
                        break;
                }
                break;
            // Change functionality to 'back' button, will not traverse buttons in anyway
            case 'C':
                switch (selectedAction) {
                    case 'eat':
                        setSelectedAction('play');
                        break;
                    case 'play':
                        setSelectedAction('heal');
                        break;
                    case 'heal':
                        setSelectedAction('eat');
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    };

    return (
        <div className="egg">
            <h1 className="character-name">Kirby</h1>
            <h2 className="character-age"> <BiTime /> Age: {age} Years</h2>
            <h2 className="character-age"> <GiLaurelsTrophy /> Record: {record} Years</h2>
            
            <div className="headerButtons">
                    <button className={selectedAction === 'eat' ? 'selected' : ''} onClick={() => handleCircularButtonAction('B')}>
                        <IoFastFoodOutline/> Eat
                    </button>
                    <button className={selectedAction === 'play' ? 'selected' : ''} onClick={() => handleCircularButtonAction('B')}>
                        <GrGamepad/> Play
                    </button>
                    <button className={selectedAction === 'heal' ? 'selected' : ''} onClick={() => handleCircularButtonAction('B')}>
                        <MdOutlineHealthAndSafety/> Heal
                    </button>
            </div>

            <div className="square">
                <div className="square-content">
                    {/* Display the GIF if showGif is true and display the Tamagoshi image if showGif is false */}
                    {showGif ? <img className='gif' src={gif} alt="Gif" /> : <TamagoshiImage hunger={hunger} happiness={happiness} health={health} />}
                </div>
            </div>
            <div className="footerButtons">
                <button className={selectedAction === 'duck' ? 'selected' : ''} onClick={() => handleCircularButtonAction('B')}>
                        <MdOutlineAdsClick/> Duck
                </button>
                <button className={selectedAction === 'status' ? 'selected' : ''} onClick={() => handleCircularButtonAction('B')}>
                        <MdOutlineAdsClick/> Status
                </button>
                <button className={selectedAction === 'attention' ? 'selected' : ''} onClick={() => handleCircularButtonAction('B')}>
                        <MdOutlineAdsClick/> Attend
                </button>
            </div>

            <div>
                <div className = "circularButtons">
                    <button className="circularButton" onClick={() => handleCircularButtonAction('A')}>
                        A
                    </button>

                    <button className="circularButton" onClick={() => handleCircularButtonAction('B')}>
                        B
                    </button>

                    <button className="circularButton" onClick={() => handleCircularButtonAction('C')}>
                        C
                    </button>
                </div>
            </div>


            <h1 id="gameTime">Game Time: {elapsedTimeFormatted} </h1>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Kirby's Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Age: {age} Years
                    <br></br>
                    Hunger: <ProgressBar now={hunger} variant="warning" label={`${hunger}%`} />
                    Happiness: <ProgressBar now={happiness} variant="success" label={`${happiness}%`} />
                    Health: <ProgressBar now={health} variant="info" label={`${health}%`} />
                </Modal.Body>
            </Modal>
        </div>
    )
}

/* The useInterval function takes two arguments:
callback: The function to be executed periodically.
  delay: The time in milliseconds between each execution of the function. */
function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
