
import styles from "./page.module.css"


type RecipesLayoutProps = {
  children: React.ReactNode;
};

const RecipesLayout = ({ children }: RecipesLayoutProps) => {
  return (
    <section className={styles.background}>
      <div>Recipes Layout</div>;{children}
    </section>
  );
};

export default RecipesLayout;
