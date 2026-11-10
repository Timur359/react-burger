import { clearOrderNumber } from '@/services/slices/order-slice';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import { fetchIngredients, setSelectedIngredient } from '@services/slices/ingredients-slice';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { items, isLoading, error, selectedIngredient } = useAppSelector(
    (state) => state.ingredients
  );
  const { orderNumber } = useAppSelector((state) => state.order);

  useEffect(() => {
    void dispatch(fetchIngredients());
  }, [dispatch]);

  const closeIngredientModal = (): void => {
    dispatch(setSelectedIngredient(null));
  };

  const closeOrderModal = (): void => {
    dispatch(clearOrderNumber());
  };

  if (isLoading)
    return (
      <div>
        <Preloader />
      </div>
    );
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients ingredients={items} />
        <BurgerConstructor />

        {selectedIngredient && (
          <Modal title="Детали ингредиента" onClose={closeIngredientModal}>
            <IngredientDetails ingredient={selectedIngredient} />
          </Modal>
        )}

        {orderNumber && (
          <Modal onClose={closeOrderModal}>
            <OrderDetails orderNumber={String(orderNumber)} />
          </Modal>
        )}
      </main>
    </div>
  );
};
