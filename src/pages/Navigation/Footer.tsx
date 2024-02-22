import { } "@mui/icons-material"

const Footer = () => {
  return (
    <footer>
      <section className="footer-section-one">
        <div className="content-area ">
          <div className="footer">
            <div className="links">
              <h3>Shop</h3>
              <ul>
                <li>
                  <a href="#">Gift cards</a>
                </li>
                <li>
                  <a href="#">Etsy blog</a>
                </li>
              </ul>
            </div>
            <div className="links">
              <h3>Sell</h3>
              <ul>
                <li>
                  <a href="#">Sell on Etsy</a>
                </li>
                <li>
                  <a href="#">Teams</a>
                </li>
                <li>
                  <a href="#">Forums</a>
                </li>
                <li>
                  <a href="#">Affiliates</a>
                </li>
              </ul>
            </div>
            <div className="links">
              <h3>About</h3>
              <ul>
                <li>
                  <a href="#">Etsy, Inc.</a>
                </li>
                <li>
                  <a href="#">Policies</a>
                </li>
                <li>
                  <a href="#">Investors</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Press</a>
                </li>
                <li>
                  <a href="#">Impact</a>
                </li>
              </ul>
            </div>
            <div className="links">
              <h3>Help</h3>
              <ul>
                <li>
                  <a href="#">Help Centre</a>
                </li>
                <li>
                  <a href="#">Privacy settings</a>
                </li>
              </ul>
              <button> Download the Etsy App</button>
              <div className="social">
                <ion-icon name="logo-instagram"></ion-icon>
                <ion-icon name="logo-facebook"></ion-icon>
                <ion-icon name="logo-pinterest"></ion-icon>
                <ion-icon name="logo-twitter"></ion-icon>
                <ion-icon name="logo-youtube"></ion-icon>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="footer-section-two">
        <div className="content-area">
          <div className="copyright">
            <div className="footer-left">
              <ion-icon name="globe-outline"></ion-icon>
              <p></p>Jamaica | English(UK) | $(USD)
            </div>
            <div className="footer-right">
              <p>© 2020 Etsy, Inc.</p>
              <a href="#">Terms of Use</a>
              <a href="#">Privacy</a>
              <a href="#">Interest-based ads</a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
