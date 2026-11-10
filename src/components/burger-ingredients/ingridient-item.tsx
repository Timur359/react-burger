import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import type { TIngredient } from '@utils/types';

import styles from './ingredient-item.module.css';

type TIngredientItemProps = {
  ingredient: TIngredient;
  count: number;
  onClick: () => void;
};

type TDragCollectedProps = {
  isDragging: boolean;
};

export const IngredientItem = ({
  ingredient,
  count,
  onClick,
}: TIngredientItemProps): React.JSX.Element => {
  const [{ isDragging }, dragRef] = useDrag<TIngredient, unknown, TDragCollectedProps>({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      className={styles.card}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={onClick}
    >
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
