import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './AnimatedInvitation.css'; // Импортируем CSS-файл для стилей
import audioFile from './assets/applause6.mp3';

const AnimatedInvitation = () => {
  const message = "Прривет, Мария! 🌹 Приглашаю тебя на квест в следующую субботу! Обещаю, будет запоминающе!";
  const [displayedText, setDisplayedText] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Состояние для смещения кнопки
  const [responseMessage, setResponseMessage] = useState(''); // Сообщение ответа

  // Звуковой эффект
  const audio = new Audio(audioFile); // Укажите путь к вашему звуковому файлу

  useEffect(() => {
    let i = 0;
    const typingEffect = setInterval(() => {
      setDisplayedText((prev) => prev + message.charAt(i));
      i++;
      if (i === message.length) {
        clearInterval(typingEffect);
        setShowButtons(true); // Показываем кнопки после завершения печати
      }
    }, 150);
    return () => clearInterval(typingEffect);
  }, []);

  const getRandomOffset = () => {
    const directions = [
      { x: -100, y: 0 },   // Влево
      { x: 100, y: 0 },    // Вправо
      { x: 0, y: -100 },   // Вверх
      { x: 0, y: 200 },    // Вниз
      { x: -100, y: -100 }, // Вверх-влево
      { x: 100, y: -100 },  // Вверх-вправо
      { x: -100, y: 100 },  // Вниз-влево
      { x: 100, y: 100 }    // Вниз-вправо
    ];
    return directions[Math.floor(Math.random() * directions.length)];
  };

  const handleTouchStart = () => {
    const randomOffset = getRandomOffset();
    setOffset(randomOffset);
  };

  const handleHover = () => {
    const randomOffset = getRandomOffset();
    setOffset(randomOffset);
  };

  const handleAgreeClick = () => {
    audio.play(); // Воспроизводим звуковой эффект
    setResponseMessage('Ура! 🤩 Теперь пошли в тележку обсуждать детали :)'); // Изменяем текст
  };

  return (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center' }} // Центрируем текст
      >
        <h1>{displayedText}</h1>
        {responseMessage && <h2>{responseMessage}</h2>} {/* Отображаем сообщение ответа */}
        {showButtons && (
            <div className="button-container">
              <button className="icon-button" onClick={handleAgreeClick}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <motion.button
                  className="icon-button"
                  style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }} // Применяем смещение
                  onMouseEnter={handleHover} // Убегание кнопки при наведении
                  onTouchStart={handleTouchStart} // Убегание кнопки при нажатии на мобильных устройствах
                  onClick={(e) => {
                    e.preventDefault(); // Прекращаем всплытие события клика
                    e.stopPropagation(); // Останавливаем клики
                  }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </motion.button>
            </div>
        )}
      </motion.div>
  );
};

export default AnimatedInvitation;