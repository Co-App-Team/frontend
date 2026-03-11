import styles from '../styling/common/CardContainer.module.css';

const CardContainer = ({ children }) => {
  return <div className={styles['card-container']}>{children}</div>;
};

export default CardContainer;
