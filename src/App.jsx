import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import "./App.css";

// ---------- SEPARACIONES AJUSTABLES ----------
const SPACE_AFTER_PORTADA = 80;
const SPACE_AFTER_FECHA = 50;
const SPACE_AFTER_AGENDAR = 60;
const SPACE_AFTER_PERFIL = 60;

// ---------- ANIMACIONES ----------
const fadeSlide = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55 },
};

const fadeScale = {
  initial: { opacity: 0, scale: 0.85 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};

// ---------------------------------------------
export default function App() {

  // RUTA BASE CORRECTA PARA GITHUB PAGES
  const base = "/Invitaci-n-cumple-Juliana/images";

  // Imágenes
  const portadaImg = `${base}/portada.png`;
  const portada2Img = `${base}/portada-2.png`;
  const portada3Img = `${base}/portada-3.png`;
  const fechaImg = `${base}/fecha.png`;
  const fecha2Img = `${base}/fecha-2.png`;
  const perfilImg = `${base}/perfil.png`;
  const perfil2Img = `${base}/perfil-2.png`;
  const infoImg = `${base}/info.png`;
  const info2Img = `${base}/info-2.png`;
  const confirmarImg = `${base}/confirmar.png`;
  const confirmar2Img = `${base}/confirmar-2.png`;
  const fotoFinalImg = `${base}/foto-final.png`;
  const footerImg = `${base}/footer.png`;
  const footer2Img = `${base}/footer-2.png`;

  // Botón sonido
  const sonidoOn = `${base}/sonido-on.png`;
  const sonidoOff = `${base}/sonido-off.png`;

  const eventoISO = "2025-12-06T17:00:00";
  const eventTitle = "Cumple de Juliana";
  const eventDetails = "¡Te esperamos a celebrar!";
  const eventLocation = "Salón de Fiestas, Calle Mitre 1234, Buenos Aires";
  const whatsappPhone = "5491122233344";

  // ---------------- AUDIO ----------------
  const audioRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const audio = new Audio("/Invitaci-n-cumple-Juliana/musica.mp3");
    audio.loop = true;
    audioRef.current = audio;

    audio.play().catch(() => {
      console.log("Autoplay bloqueado hasta interacción");
    });

    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (soundOn) audioRef.current.play().catch(() => {});
    else audioRef.current.pause();
  }, [soundOn]);


  // ---------------- CONTADOR ----------------
  const [timeLeft, setTimeLeft] = useState({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
  });

  const [showPortada2, setShowPortada2] = useState(false);
  const [showPortada3, setShowPortada3] = useState(false);
  const [showFecha2, setShowFecha2] = useState(false);
  const [showPerfil2, setShowPerfil2] = useState(false);
  const [showInfo2, setShowInfo2] = useState(false);
  const [showConfirmar2, setShowConfirmar2] = useState(false);
  const [showFooter2, setShowFooter2] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowPortada2(true), 2000);
    setTimeout(() => setShowPortada3(true), 2000);
    setTimeout(() => setShowFecha2(true), 2000);
    setTimeout(() => setShowPerfil2(true), 2000);
    setTimeout(() => setShowInfo2(true), 2000);
    setTimeout(() => setShowConfirmar2(true), 2000);
    setTimeout(() => setShowFooter2(true), 2000);
  }, []);

  useEffect(() => {
    const target = new Date(eventoISO).getTime();

    function tick() {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // --------- URLs ---------
  const gcUrl = (() => {
    const s = new Date(eventoISO);
    const e = new Date(s.getTime() + 2 * 3600000);
    const fmt = (d) =>
      d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventTitle
    )}&details=${encodeURIComponent(
      eventDetails
    )}&location=${encodeURIComponent(
      eventLocation
    )}&dates=${fmt(s)}/${fmt(e)}`;
  })();

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    eventLocation
  )}`;

  const waUrl = `https://wa.me/${whatsappPhone.replace(
    /\D/g,
    ""
  )}?text=${encodeURIComponent(
    `Hola! Confirmo asistencia al evento: ${eventTitle} - ${eventoISO}`
  )}`;

  // ---------------- RENDER ----------------
  return (
    <div style={styles.page}>

      {/* Fondo inferior */}
      <div style={styles.bgFull} />

      {/* Fondo superior */}
      <div style={styles.bgTop}>
        <img
          src={`${base}/fondo-superior.png`}
          style={styles.bgTopImg}
          alt=""
        />
      </div>

      {/* Portada */}
      <div style={{ ...styles.wrap, position: "relative" }}>
        <button
          onClick={() => setSoundOn(!soundOn)}
          style={styles.soundButton}
        >
          <img
            src={soundOn ? sonidoOn : sonidoOff}
            style={{ width: "70px" }}
            alt="sound"
          />
        </button>

        <motion.img {...fadeSlide} src={portadaImg} style={styles.full} />

        {showPortada2 && (
          <motion.img
            {...fadeSlide}
            src={portada2Img}
            style={{ ...styles.full, position: "absolute", top: 0, left: 0 }}
          />
        )}

        {showPortada3 && (
          <motion.img
            {...fadeSlide}
            src={portada3Img}
            style={{ ...styles.full, position: "absolute", top: 0, left: 0 }}
          />
        )}
      </div>

      <div style={{ height: SPACE_AFTER_PORTADA }} />

      {/* Contador */}
      <motion.section {...fadeSlide} style={styles.section}>
        <h2 style={styles.h2}>Faltan</h2>

        <div style={styles.counterRow}>
          {[
            ["días", timeLeft.days],
            ["hs", timeLeft.hours],
            ["min", timeLeft.minutes],
            ["seg", timeLeft.seconds],
          ].map(([t, v]) => (
            <div key={t} style={styles.counterBox}>
              <div style={styles.counterNum}>{v}</div>
              <div style={styles.counterLabel}>{t}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Fecha */}
      <motion.div {...fadeSlide} style={{ ...styles.section, position: "relative" }}>
        <motion.img src={fechaImg} style={styles.full} {...fadeScale} />

        {showFecha2 && (
          <motion.img
            {...fadeSlide}
            src={fecha2Img}
            style={{ ...styles.full, position: "absolute", top: 0, left: 0 }}
          />
        )}
      </motion.div>

      <div style={{ height: SPACE_AFTER_FECHA }} />

      {/* Agendar */}
      <motion.div {...fadeSlide} style={styles.section}>
        <motion.a
          href={gcUrl}
          target="_blank"
          rel="noreferrer"
          style={styles.btn}
          whileTap={{ scale: 0.97 }}
        >
          Agendar
        </motion.a>
      </motion.div>

      <div style={{ height: SPACE_AFTER_AGENDAR }} />

      {/* Perfil */}
      <motion.div
        {...fadeScale}
        style={{ ...styles.section, position: "relative" }}
      >
        <img src={perfilImg} style={styles.full} />

        {showPerfil2 && (
          <motion.img
            {...fadeSlide}
            src={perfil2Img}
            style={{ ...styles.full, position: "absolute", top: 0, left: 0 }}
          />
        )}
      </motion.div>

      <div style={{ height: SPACE_AFTER_PERFIL }} />

      {/* Info */}
      <motion.div
        {...fadeSlide}
        style={{ ...styles.section, position: "relative" }}
      >
        <img src={infoImg} style={styles.full} />

        {showInfo2 && (
          <motion.img
            {...fadeSlide}
            src={info2Img}
            style={{ ...styles.full, position: "absolute", top: 0, left: 0 }}
          />
        )}

        <motion.a
          href={mapUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            ...styles.btn,
            position: "absolute",
            bottom: "190px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          whileTap={{ filter: "brightness(0.9)" }}
        >
          Mapa
        </motion.a>
      </motion.div>

      {/* Confirmar */}
      <motion.div
        {...fadeSlide}
        style={{ ...styles.section, position: "relative" }}
      >
        <img src={confirmarImg} style={styles.full} />

        {showConfirmar2 && (
          <motion.img
            {...fadeSlide}
            src={confirmar2Img}
            style={{ ...styles.full, position: "absolute", top: 0, left: 0 }}
          />
        )}

        <motion.a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            ...styles.btn,
            position: "absolute",
            top: "500px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          whileTap={{ filter: "brightness(0.9)" }}
        >
          WhatsApp
        </motion.a>
      </motion.div>

      {/* Foto final */}
      <motion.div {...fadeSlide} style={styles.section}>
        <img src={fotoFinalImg} style={styles.full} />
      </motion.div>

      {/* Footer */}
      <motion.div {...fadeSlide} style={{ ...styles.section, position: "relative" }}>
        <img src={footerImg} style={styles.full} />

        {showFooter2 && (
          <motion.img
            {...fadeSlide}
            src={footer2Img}
            style={{ ...styles.full, position: "absolute", top: 0, left: 0 }}
          />
        )}
      </motion.div>
    </div>
  );
}

// ------------ ESTILOS ------------
const styles = {
  page: {
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowX: "hidden",
    position: "relative",
  },

  bgFull: {
    position: "fixed",
    inset: 0,
    backgroundImage: `url("${base}/fondo-base.png")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    zIndex: -30,
  },

  bgTop: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "1080px",
    zIndex: -10,
  },

  bgTopImg: {
    width: "100%",
  },

  wrap: {
    width: "1080px",
    position: "relative",
  },

  full: {
    width: "1080px",
    display: "block",
  },

  section: {
    width: "1080px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  // ---------- BOTÓN DE SONIDO ----------
  soundButton: {
    position: "absolute",
    top: "28px",
    right: "32px",
    background: "rgba(255,255,255,0.8)",
    border: "none",
    outline: "none",
    padding: "18px",
    borderRadius: "50%",
    cursor: "pointer",
    zIndex: 80,
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },

  // contador
  h2: {
    fontSize: 68,
    margin: 0,
    color: "#89C0E9",
  },

  counterRow: {
    marginTop: 16,
    display: "flex",
    gap: 20,
    justifyContent: "center",
    flexWrap: "wrap",
  },

  counterBox: {
    textAlign: "center",
  },

  counterNum: {
    fontSize: 70,
    color: "#89C0E9",
    lineHeight: 1,
  },

  counterLabel: {
    fontSize: 40,
    color: "#89C0E9",
  },

  btn: {
    width: 310,
    height: 85,
    background: "#FFA1BF",
    borderRadius: 35,
    color: "#fff",
    textDecoration: "none",
    fontSize: 55,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 0 26px rgba(255, 150, 200, 0.65)",
    transition: "0.2s ease",
  },
};
