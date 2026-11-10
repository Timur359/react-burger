import { ConstructorElement, DragIcon } from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { useAppDispatch } from '@services/hooks';
import { moveIngredient, removeIngredient } from '@services/slices/constructor-slice';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TConstructorItemProps = {
  ingredient: TIngredient;
  index: number;
};

type TDragItem = {
  index: number;
  uniqueId: string;
};

type TDragCollectedProps = {
  isDragging: boolean;
};

type TDropCollectedProps = {
  handlerId: string | symbol | null;
};

export const ConstructorItem = ({
  ingredient,
  index,
}: TConstructorItemProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag<TDragItem, unknown, TDragCollectedProps>({
    type: 'constructor-item',
    item: { index, uniqueId: ingredient.uniqueId! },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop<TDragItem, unknown, TDropCollectedProps>({
    accept: 'constructor-item',
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId() as string | symbol | null,
    }),
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      dispatch(moveIngredient({ fromIndex: dragIndex, toIndex: hoverIndex }));

      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={styles.item_wrapper}
      style={{ opacity: isDragging ? 0.3 : 1 }}
      data-handler-id={handlerId}
    >
      <div className={styles.drag_icon}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => dispatch(removeIngredient(ingredient.uniqueId!))}
      />
    </div>
  );
};
