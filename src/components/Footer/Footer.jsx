import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-columns">
        <div className="footer-column">
          <h4>Компания</h4>
          <ul>
            <li><a href="#">О Last.fm</a></li>
            <li><a href="#">Связаться с нами</a></li>
            <li><a href="#">Вакансии</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Справка</h4>
          <ul>
            <li><a href="#">Отслеживай музыку</a></li>
            <li><a href="#">Поддержка сообщества</a></li>
            <li><a href="#">Правила Сообщества</a></li>
            <li><a href="#">Справка</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Фишки</h4>
          <ul>
            <li><a href="#">Загрузить Скробблер</a></li>
            <li><a href="#">API для разработчиков</a></li>
            <li><a href="#">Бесплатная загрузка музыки</a></li>
            <li><a href="#">Товары</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Аккаунт</h4>
          <ul>
            <li><a href="#">Входящие</a></li>
            <li><a href="#">Настройки</a></li>
            <li><a href="#">Last.fm Pro</a></li>
            <li><a href="#">Выйти</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Мы в соцсетях</h4>
          <ul className="social-links">
            <li><a href="#"><i className="fab fa-facebook"></i> Facebook</a></li>
            <li><a href="#"><i className="fab fa-twitter"></i> Twitter</a></li>
            <li><a href="#"><i className="fab fa-instagram"></i> Instagram</a></li>
            <li><a href="#"><i className="fab fa-youtube"></i> YouTube</a></li>
          </ul>
        </div>
      </div>
      <div className="language-selector">
        <ul className="language-list">
          <li><a href="#">English</a></li>
          <li><a href="#">Deutsch</a></li>
          <li><a href="#">Español</a></li>
          <li><a href="#">Français</a></li>
          <li><a href="#">Italiano</a></li>
          <li><a href="#">日本語</a></li>
          <li><a href="#">Polski</a></li>
          <li><a href="#">Português</a></li>
          <li><a href="#">Русский</a></li>
          <li><a href="#">Svenska</a></li>
          <li><a href="#">Türkçe</a></li>
          <li><a href="#">简体中文</a></li>
        </ul>
      </div>
      <div className="footer-info">
        <p>Часовой пояс: Europe/Mexico</p>
        <span>© 2022 Doom LastFm spotifai. Все права защищены.</span>
        <span>
          <a href="#">Условия использования</a> | 
          <a href="#">Политика конфиденциальности</a> | 
          <a href="#">Правовые положения</a> | 
          <a href="#">Cookies Policy</a> | 
          <a href="#">Карьера в Paramount</a>
          <a href="#">Last.fm Music</a>
        </span>
        <p>Version 0.85 - DOOMLast.fmMusic</p>
      </div>
    </footer>
  );
}

export default Footer;