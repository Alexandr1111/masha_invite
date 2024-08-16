import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './AnimatedInvitation.css'; // Импортируем CSS-файл для стилей

const AnimatedInvitation = () => {
  const message = "Привет, Мария! 🌹 Как насчет того, чтобы сходить в кино на эти выходные?";
  const [displayedText, setDisplayedText] = useState('');
  const [showButtons, setShowButtons] = useState(false);

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
    const email = 'grachev588@gmail.com'; // Замените на ваш реальный адрес электронной почты
    const subject = 'Ответ на приглашение';
    const body = response === 'agree' ? 'Я согласна на предложение.' : 'Я отказываюсь.';
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
      >
        <h1>{displayedText}</h1>
        {showButtons && (
            <div className="button-container">
              <button className="icon-button" onClick={() => sendEmail('agree')}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button className="icon-button" onClick={() => sendEmail('disagree')}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
        )}
      </motion.div>
  );
};

export default AnimatedInvitation;