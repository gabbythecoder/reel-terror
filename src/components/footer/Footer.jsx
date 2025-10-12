import "./Footer.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer-container">
      <p className="footer-text">
        &copy; Gabby French | Made with ❤️ in the UK
      </p>

      <div className="social-icons">
        <a
          href="https://github.com/gabbythecoder"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github"
        >
          <FaGithub size={24}/>
        </a>

        <a
          href="https://www.linkedin.com/in/gabbyy-frenchh/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={24}/>
        </a>
      </div>
    </footer>
  );
}
