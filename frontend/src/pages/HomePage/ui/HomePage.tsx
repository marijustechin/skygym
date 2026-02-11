import { useTranslation } from 'react-i18next';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>
        Sporto klubas Vilniuje – lankymo valandos{' '}
        <span className={styles.red}>NERIBOJAMOS</span>!
      </h1>
      <h2>{t('home_page.title')}</h2>
      <h3>Antraštė 3</h3>
      <h4>Antraštė 4</h4>
      <h5>Antraštė 1</h5>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
        nemo, et facilis omnis ut eveniet quae vitae laborum rerum doloremque
        dolorum quisquam optio quod minus ab quaerat. Esse, dolore nisi? Autem
        ut ex ullam a ipsa! Cumque perferendis modi quod quos nihil eveniet.
        Enim, omnis quis odio voluptatem rem suscipit obcaecati iste veritatis
        maiores deserunt ipsam in est officia incidunt. Repellat sunt atque
        ratione reprehenderit esse magnam aut natus? Deserunt porro esse eaque
        placeat provident mollitia, maxime, aliquam ullam quisquam perferendis
        harum id quaerat. Aperiam fuga fugiat in consectetur similique!
        Consectetur nihil alias facilis? Tenetur assumenda voluptatibus error
        eligendi hic, amet natus asperiores maxime, facilis necessitatibus animi
        distinctio reprehenderit porro mollitia fugiat consequatur ut id
        voluptas, molestiae repudiandae recusandae quos.
      </p>
    </div>
  );
}
