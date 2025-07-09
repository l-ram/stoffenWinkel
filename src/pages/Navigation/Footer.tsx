import "./footer.scss";
import { Instagram, Facebook, X, Language } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer>
      <section className="footerSectionOne">
        <div className="content-area">
          <div className="footerSectionOne__footer">
            <div className="footerSectionOne__links">
              <h3>Shop</h3>
              <ul>
                <li>
                  <a href="#">Gift cards</a>
                </li>
                <li>
                  <a href="#">Returns</a>
                </li>
                <li>
                  <a href="#">Deliveries</a>
                </li>
              </ul>
            </div>
            <div className="footerSectionOne__links">
              <h3>About</h3>
              <ul>
                <li>
                  <a href="#">LR, Inc.</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
            </div>
            <div className="footerSectionOne__links">
              <h3>Help</h3>
              <ul>
                <li>
                  <a href="#">Customer Service</a>
                </li>
                <li>
                  <a href="#">Privacy settings</a>
                </li>
                <li>
                  <a href="#">Sitemap</a>
                </li>
              </ul>
              <button> Signup for Newsletter</button>
              <div className="footerSectionOne__social">
                <Instagram />
                <Facebook />
                <X />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="footerSectionTwo">
        <div className="content-area">
          <div className="footerSectionTwo__copyright">
            <div className="footerSectionTwo__footerLeft">
              <Language />
              <p></p>België | Engels | €(EUR)
            </div>
            <div className="footerSectionTwo__footerRight">
              <p>© 2024 LR, Inc.</p>
              <a href="#">Terms of Use</a>
              <a href="#">Privacy</a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
