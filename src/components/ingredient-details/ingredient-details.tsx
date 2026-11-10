import type { TIngredient } from '@utils/types';

import styles from './ingredient-details.module.css';

type TIngredientDetailsProps = {
  ingredient: TIngredient;
};

export const IngredientDetails = ({ ingredient }: TIngredientDetailsProps): React.JSX.Element => {
  return (
    <div className={styles.content}>
      <img src={ingredient.image_large} alt={ingredient.name} className={styles.image} />
      <p className={`text text_type_main-medium mt-4 mb-8 ${styles.name}`}>{ingredient.name}</p>

      <ul className={styles.nutrition_list}>
        <li className={styles.nutrition_item}>
          <span className="text text_type_main-default text_color_inactive">Калории, ккал</span>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </span>
        </li>
        <li className={styles.nutrition_item}>
          <span className="text text_type_main-default text_color_inactive">Белки, г</span>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </span>
        </li>
        <li className={styles.nutrition_item}>
          <span className="text text_type_main-default text_color_inactive">Жиры, г</span>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </span>
        </li>
        <li className={styles.nutrition_item}>
          <span className="text text_type_main-default text_color_inactive">Углеводы, г</span>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
};
