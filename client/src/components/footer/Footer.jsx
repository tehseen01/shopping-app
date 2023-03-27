import { Link } from "react-router-dom";
import "./footer.scss";
import { BsInstagram, BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="top">
        <div className="footerLogo">
          <Link to="/" className="footerLogo">
            codezon.
          </Link>
        </div>
        <div className="footerSocialLink">
          <BsInstagram />
          <BsFacebook />
          <BsTwitter />
          <BsYoutube />
        </div>
        <ul>
          <li>home</li>
          <li>about</li>
          <li>store</li>
          <li>contact</li>
        </ul>
      </div>
      <hr />
      <div className="bottom">
        <div className="left">
          <span className="copyright">
            &copy; 2023 Ishan. All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
