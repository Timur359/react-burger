import { useIngredientsModal } from '@/contexts';

import { Modal } from '@components/modal/modal';

import styles from './ingredient-details.module.css';

export const IngredientDetails = (): React.JSX.Element => {
  const { closeModal, selectedIngredient } = useIngredientsModal();

  if (!selectedIngredient) return <></>;

  return (
    <Modal title="Детали ингредиента" onClose={closeModal}>
      <div className={styles.content}>
        <img
          src={selectedIngredient.image_large}
          alt={selectedIngredient.name}
          className={styles.image}
        />
        <p className={`text text_type_main-medium mt-4 mb-8 ${styles.name}`}>
          {selectedIngredient.name}
        </p>

        <ul className={styles.nutrition_list}>
          <li className={styles.nutrition_item}>
            <span className="text text_type_main-default text_color_inactive">Калории, ккал</span>
            <span className="text text_type_digits-default text_color_inactive">
              {selectedIngredient.calories}
            </span>
          </li>
          <li className={styles.nutrition_item}>
            <span className="text text_type_main-default text_color_inactive">Белки, г</span>
            <span className="text text_type_digits-default text_color_inactive">
              {selectedIngredient.proteins}
            </span>
          </li>
          <li className={styles.nutrition_item}>
            <span className="text text_type_main-default text_color_inactive">Жиры, г</span>
            <span className="text text_type_digits-default text_color_inactive">
              {selectedIngredient.fat}
            </span>
          </li>
          <li className={styles.nutrition_item}>
            <span className="text text_type_main-default text_color_inactive">Углеводы, г</span>
            <span className="text text_type_digits-default text_color_inactive">
              {selectedIngredient.carbohydrates}
            </span>
          </li>
        </ul>
      </div>
    </Modal>
  );
};
