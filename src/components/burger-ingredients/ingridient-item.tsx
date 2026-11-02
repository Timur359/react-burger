import { useIngredientsModal } from '@/contexts';
import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@/utils';

import styles from './ingredient-item.module.css';

type TIngredientItemProps = {
  ingredient: TIngredient;
  count?: number;
};

export const IngredientItem = ({
  ingredient,
  count = 0,
}: TIngredientItemProps): React.JSX.Element => {
  const { openIngredientsModal } = useIngredientsModal();

  return (
    <div className={styles.card} onClick={() => openIngredientsModal(ingredient)}>
      {count > 0 && (
        <div className={styles.counter}>
          <Counter count={count} size="default" />
        </div>
      )}
      <img src={ingredient.image} alt={ingredient.name} className={styles.image} />
      <div className={styles.price}>
        <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${styles.name}`}>{ingredient.name}</p>
    </div>
  );
};
