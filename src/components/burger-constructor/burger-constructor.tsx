import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { useDrop } from 'react-dnd';

import { useAppDispatch, useAppSelector } from '@services/hooks';
import { selectTotalPrice } from '@services/selectors';
import { addIngredient } from '@services/slices/constructor-slice';
import { sendOrder } from '@services/slices/order-slice';

import { ConstructorItem } from './constructor-item';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TDropCollectedProps = {
  isHover: boolean;
};

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { bun, ingredients } = useAppSelector((state) => state.burgerConstructor);
  const totalPrice = useAppSelector(selectTotalPrice);
  const { isLoading } = useAppSelector((state) => state.order);

  const [{ isHover }, dropTarget] = useDrop<TIngredient, unknown, TDropCollectedProps>({
    accept: 'ingredient',
    drop(item) {
      dispatch(addIngredient(item));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const handleOrder = useCallback((): void => {
    if (!bun) return;

    const ids = [bun._id, ...ingredients.map((i) => i._id), bun._id];

    void dispatch(sendOrder(ids));
  }, [bun, ingredients, dispatch]);

  return (
    <section
      ref={dropTarget}
      className={`${styles.burger_constructor} ${isHover ? styles.hover : ''}`}
    >
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

      <div className={`${styles.fillings_scroll} custom-scroll`}>
        {ingredients.length > 0 ? (
          ingredients.map((item, index) => (
            <ConstructorItem key={item.uniqueId} ingredient={item} index={index} />
          ))
        ) : (
          <div className={`${styles.empty_ingredients} text text_type_main-default`}>
            <p>Начинки и соусы</p>
            <p>не выбраны</p>
          </div>
        )}
      </div>

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

      <div className={styles.order_info}>
        <div className={styles.total_price}>
          <span className="text text_type_digits-medium">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          disabled={!bun || ingredients.length === 0 || isLoading}
          onClick={handleOrder}
        >
          {isLoading ? 'Загрузка...' : 'Оформить заказ'}
        </Button>
      </div>
    </section>
  );
};
