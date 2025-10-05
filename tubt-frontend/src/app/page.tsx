'use client';

import { useState, useEffect } from 'react';
import styles from "./page.module.css";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [particles, setParticles] = useState<Array<{
    id: number;
    left: number;
    top: number;
    animationDelay: number;
    animationDuration: number;
  }>>([]);

  useEffect(() => {
    // Generate particles only on client side
    const generatedParticles = [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 6,
      animationDuration: 6 + Math.random() * 4
    }));
    setParticles(generatedParticles);
  }, []);

  useEffect(() => {
    // Set launch date (example: 30 days from now)
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.gradient}></div>
        <div className={styles.particles}>
          {particles.map((particle) => (
            <div 
              key={particle.id} 
              className={styles.particle}
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.animationDelay}s`,
                animationDuration: `${particle.animationDuration}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <main className={styles.main}>
        <div className={styles.logo}>
          <h1 className={styles.title}>TUBT</h1>
          <p className={styles.subtitle}>The Ultimate Betting Tool</p>
        </div>

        <div className={styles.content}>
          <h2 className={styles.comingSoon}>Coming Soon</h2>
          <p className={styles.description}>
            La herramienta definitiva para apostadores profesionales. 
            Análisis avanzado, estadísticas en tiempo real y estrategias ganadoras.
          </p>

          <div className={styles.countdown}>
            <div className={styles.timeUnit}>
              <span className={styles.number}>{timeLeft.days}</span>
              <span className={styles.label}>Días</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.number}>{timeLeft.hours}</span>
              <span className={styles.label}>Horas</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.number}>{timeLeft.minutes}</span>
              <span className={styles.label}>Minutos</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.number}>{timeLeft.seconds}</span>
              <span className={styles.label}>Segundos</span>
            </div>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📊</div>
              <h3>Análisis Avanzado</h3>
              <p>Estadísticas detalladas y predicciones precisas</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>⚡</div>
              <h3>Tiempo Real</h3>
              <p>Datos actualizados al instante</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🎯</div>
              <h3>Estrategias</h3>
              <p>Métodos probados para maximizar ganancias</p>
            </div>
          </div>

          <div className={styles.notify}>
            <h3>¡Sé el primero en saberlo!</h3>
            <div className={styles.emailForm}>
              <input 
                type="email" 
                placeholder="Tu email aquí..." 
                className={styles.emailInput}
              />
              <button className={styles.notifyButton}>
                Notificarme
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 The Ultimate Betting Tool. Todos los derechos reservados.</p>
        <div className={styles.social}>
          <a href="#" className={styles.socialLink}>Twitter</a>
          <a href="#" className={styles.socialLink}>Discord</a>
          <a href="#" className={styles.socialLink}>Telegram</a>
        </div>
      </footer>
    </div>
  );
}
