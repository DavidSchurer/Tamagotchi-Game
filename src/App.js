import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Game } from './Components/Game';

const TamagoshiGame = () => {
  return (
    <>
      <div className='fondo'>
        {/* Tamagotchi */}
        {/* <Egg /> */}
        <Game />
      </div>
      </>
  );
};

export default TamagoshiGame;