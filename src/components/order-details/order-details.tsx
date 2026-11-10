import doneImage from '@/assets/images/done.png';

import styles from './order-details.module.css';

type TOrderDetailsProps = {
  orderNumber: string;
};

export const OrderDetails = ({ orderNumber }: TOrderDetailsProps): React.JSX.Element => {
  return (
    <div className={styles.content}>
      <p className={`text text_type_digits-large ${styles.order_number}`}>{orderNumber}</p>
      <p className="text text_type_main-medium mt-8 mb-10">идентификатор заказа</p>

      <img src={doneImage} alt="Заказ оформлен" width="120" height="120" className="mt-5 mb-10" />

      <p className="text text_type_main-default mt-5">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
