import NavigationBar from "../components/NavigationBar";
import styles from "./styles/ProductPage.module.css";

export default function ProductPage() {
  return (
    <main className={styles.product}>
      <NavigationBar />
      <section>
        <img
          src={`${import.meta.env.BASE_URL}logo.png`}
          alt="WorldWise logo"
          className={styles.logo}
        />
        <div>
          <h2>About WorldWise.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
            dicta illum vero culpa cum quaerat architecto sapiente eius non
            soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
            perspiciatis?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
            doloribus libero sunt expedita ratione iusto, magni, id sapiente
            sequi officiis et.
          </p>
        </div>
      </section>
    </main>
  );
}
