import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './AnimatedInvitation.css'; // Импортируем CSS-файл для стилей

const AnimatedInvitation = () => {
  const message = "Привет, Мария! 🌹 Как насчет того, чтобы сходить в кино на эти выходные?";
  const [displayedText, setDisplayedText] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Состояние для смещения кнопки

  useEffect(() => {
    let i = 0;
    const typingEffect = setInterval(() => {
      setDisplayedText((prev) => prev + message.charAt(i));
      i++;
      if (i === message.length) {
        clearInterval(typingEffect);
        setShowButtons(true); // Показываем кнопки после завершения печати
      }
    }, 100);
    return () => clearInterval(typingEffect);
  }, []);

  const sendEmail = (response) => {
    const email = 'your_email@example.com'; // Замените на ваш реальный адрес электронной почты
    const subject = 'Ответ на приглашение';
    const body = response === 'agree' ? 'Я согласна на предложение.' : 'Я отказываюсь.';
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const getRandomOffset = () => {
    const directions = [
      { x: -50, y: 0 },   // Влево
      { x: 50, y: 0 },    // Вправо
      { x: 0, y: -50 },   // Вверх
      { x: 0, y: 50 }     // Вниз
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

  return (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center' }} // Центрируем текст
      >
        <h1>{displayedText}</h1>
        {showButtons && (
            <div className="button-container">
              <button className="icon-button" onClick={() => sendEmail('agree')}>
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