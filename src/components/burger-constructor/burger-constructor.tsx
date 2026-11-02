import { useOrderModal } from '@/contexts';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@/utils';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({ ingredients }: TBurgerConstructorProps): React.JSX.Element => {
  const bun = ingredients.find((item) => item.type === 'bun') ?? null;
  const fillings = ingredients.filter((item) => item.type !== 'bun');

  const totalPrice =
    (bun ? bun.price * 2 : 0) + fillings.reduce((sum, item) => sum + item.price, 0);
  const { openOrderModal } = useOrderModal();

  return (
    <section className={styles.burger_constructor}>
      {/* Контейнер для скролла, чтобы список не растягивал страницу */}
      <div className={`${styles.list} custom-scroll`}>
        {/* Верхняя булка */}
        {bun ? (
          <div className={styles.bun_wrapper}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        ) : (
          <div className={`${styles.empty_bun} text text_type_main-default`}>Выберите булку</div>
        )}

        {/* Список начинок и соусов */}
        <div className={styles.fillings}>
          {fillings.length > 0 ? (
            fillings.map((item, index) => (
              <div key={`${item._id}-${index}`} className={styles.item_wrapper}>
                <div className={styles.drag_icon}>
                  <DragIcon type="primary" />
                </div>
                <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
              </div>
            ))
          ) : (
            <div className={`${styles.empty_ingredients} text text_type_main-default`}>
              <p>Начинки и соусы</p>
              <p>не выбраны</p>
            </div>
          )}
        </div>

        {/* Нижняя булка */}
        {bun ? (
          <div className={styles.bun_wrapper}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        ) : (
          <div className={`${styles.empty_bun} text text_type_main-default`}>Выберите булку</div>
        )}
      </div>

      {/* Блок с итоговой суммой и кнопкой */}
      <div className={styles.order_info}>
        <div className={styles.total_price}>
          <span className="text text_type_digits-medium">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          disabled={!bun || fillings.length === 0}
          onClick={openOrderModal}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
