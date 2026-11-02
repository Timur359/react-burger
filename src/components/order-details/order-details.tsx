import { useOrderModal } from '@/contexts';
import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';

import styles from './order-details.module.css';

export const OrderDetails = (): React.JSX.Element => {
  const { closeOrderModal, orderNumber } = useOrderModal();

  return createPortal(
    <div className={styles.overlay} onClick={closeOrderModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close_button} onClick={closeOrderModal} type="button">
          <CloseIcon type="primary" />
        </button>

        <div className={styles.content}>
          <p className={`text text_type_digits-large ${styles.order_number}`}>{orderNumber}</p>
          <p className="text text_type_main-medium mt-8 mb-10">идентификатор заказа</p>

          <img
            src="/assets/done.png"
            alt="Логотип"
            width="120"
            height="120"
            className="mt-5 mb-10"
          />

          <p className="text text_type_main-default mt-5">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive mt-2">
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};
