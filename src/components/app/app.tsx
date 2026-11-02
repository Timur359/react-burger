import { useIngredientsModal, useOrderModal } from '@/contexts';
import { getIngredients, type TIngredient } from '@/utils';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const { selectedIngredient } = useIngredientsModal();
  const { isOrderModalOpen } = useOrderModal();

  useEffect(() => {
    const fetchIngredients = async (): Promise<void> => {
      try {
        const data = await getIngredients();
        setIngredients(data);
      } catch (error) {
        console.error('Ошибка при загрузке ингредиентов:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIngredients().catch((error) => {
      console.error('Непредвиденная ошибка:', error);
    });
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        {isLoading ? (
          <div className={`${styles.preloader_wrapper}`}>
            <Preloader />
          </div>
        ) : hasError ? (
          <div className={`${styles.preloader_wrapper} text text_type_main-default`}>
            Не удалось загрузить ингредиенты. Попробуйте обновить страницу.
          </div>
        ) : (
          <>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
          </>
        )}

        {isOrderModalOpen && <OrderDetails />}
        {selectedIngredient && <IngredientDetails />}
      </main>
    </div>
  );
};

export default App;
