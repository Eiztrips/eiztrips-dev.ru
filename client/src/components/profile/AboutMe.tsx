import { useEffect, useState } from 'react';
import { fetchUserProfile } from '../../services/github.service';
import { GithubUser } from '../../types/github.types';

function AboutMe() {
  const [userProfile, setUserProfile] = useState<GithubUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        const profile = await fetchUserProfile('eiztrips');
        setUserProfile(profile);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  return (
    <div className="about-me" style={{ position: 'relative' }}>
      <div className="profile-header">
        {isLoading ? (
          <div className="avatar-loading">Loading profile...</div>
        ) : userProfile?.avatar_url ? (
          <div className="avatar-container">
            <img src={userProfile.avatar_url} alt="GitHub аватар" className="github-avatar" />
          </div>
        ) : null}
      </div>

      <h1 className="header">Eiztrips</h1>

      <blockquote className="java-rant">
        <h3>МЕГА ЗАШКВАР В ПЕТ-ПРОЕКТЕ НА ДЖАВЕ 🔥💀</h3>
        <p>Статус: ФАТАЛИТИ, ВСЁ ЛЕГЛО, СТЕКТРЕЙС КАК ПРОСТЫНЯ! 🆘🆘🆘</p>
        <p>Impact: Рабочий день насмарку, личная жизнь под угрозой, мама спрашивает когда уже начну зарабатывать 😭</p>
        <p>Причина: Забыл закрыть один е**чий Connection в 37 вложенных try-catch блоках, вся память утекла со скоростью зарплаты джуна 🤡</p>
        <p>Решение: Запускаем резервный сервер SPRING-GOVNOKOD-3000 (тот, что на маминой микроволновке с JDK 1.4) 💻🔧</p>
        <p>ETA: ~8 часов (когда Stack Overflow заработает после массового отключения интернета) 🍾🥴</p>
        <p><strong>ХРОНОЛОГИЯ ДЖАВАПАКАЛИПСИСА:</strong></p>
        <p>10:00 - Запустил приложение, консоль взорвалась NPE как праздничный фейерверк</p>
        <p>10:10 - Пытаюсь понять почему @Autowired не работает, хотя аннотации правильные (вроде бы) 📵</p>
        <p>10:15 - Перекомпилировал 47 раз "на всякий случай", получил 38 новых ошибок 💩</p>
        <p>10:20 - Гуглю "как заработать миллион не зная Spring", нахожу курсы по Python 📝</p>
        <p>10:30 - Звоню другу сениору, он ржёт и говорит "это же базовые вещи, что ты не понимаешь?" 🤪</p>
        <p>10:40 - Создал 15 новых классов с суффиксом Factory, Adapter, Provider, теперь не могу найти логику 👊</p>
        <p>10:45 - Решил перезагрузить IDE, она зависла намертво с сообщением "Индексирование..." 🔥</p>
        <p>11:00 - Кот наступил на клавиатуру, случайно исправил 2 бага из 57 существующих 💀</p>
        <p>11:15 - Нашёл в коде комментарий "// FIXME: это вообще-то работать не должно но почему-то работает" 🤦‍♂️</p>
        <p>11:30 - Stackoverflow выдаёт "Вопрос закрыт как дубликат вопроса 2008 года на Java 6" 🏝</p>
        <p>11:45 - Гуглю "сколько зарабатывают таксисты" 🔍</p>
        <p>12:00 - Вылезла OutOfMemoryError, хотя выделил 16GB для Hello World 🥴</p>
        <p>12:30 - Отключил все логи чтобы не видеть ошибки, стало "лучше" 😌</p>
        <p>13:00 - Залил 8-й пакетник Редбулла, код начал казаться осмысленным, это опасный знак 🗺</p>
        <p>14:00 - AbstractSingletonProxyFactoryBean скрестился с TransactionAwarePersistenceManagerFactoryProxyBean и родил новый баг ⏳</p>
        <p><strong>ТЕКУЩИЙ СТАТУС:</strong> ВЫКИНУЛ К Х**М СПРИНГ, ПЕРЕПИСЫВАЮ ВСЁ НА СЕРВЛЕТАХ КАК В 2005, МАМА ПРИГОТОВИЛА СУПЧИК И ГОВОРИТ "МОЖЕТ ТЕБЕ В БУХГАЛТЕРЫ?" 🚕💊</p>
        <p>#JAVA_МОМЕНТ #ENTERPRISE_КАЧЕСТВО #СТЕКТРЕЙС_ДЛИННЕЕ_ЧЕМ_МОЯ_ЖИЗНЬ</p>
      </blockquote>

      <div className="social-icons">
        <a href="mailto:eiztrips.dev@yandex.ru" title="Email: eiztrips.dev@yandex.ru">
          <i className="fi fi-rr-envelope social-icon"></i>
        </a>
        <a href="https://discord.gg/WWfshaCBj7" target="_blank" rel="noopener noreferrer" title="Discord">
          <i className="fi fi-brands-discord social-icon"></i>
        </a>
        <a href="https://github.com/eiztrips" target="_blank" rel="noopener noreferrer" title="GitHub">
          <i className="fi fi-brands-github social-icon"></i>
        </a>
        <a href="https://shield.land/blogs/eiztrips" target="_blank" rel="noopener noreferrer" title="SubShield">
          <i className="fi fi-rr-shield-check social-icon"></i>
        </a>
      </div>
    </div>
  );
}

export default AboutMe;