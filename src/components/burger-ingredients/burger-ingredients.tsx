import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useMemo, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@services/hooks';
import { selectCounters } from '@services/selectors';
import { setSelectedIngredient } from '@services/slices/ingredients-slice';

import { TAB_LIST } from './constants';
import { IngredientItem } from './ingridient-item';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({ ingredients }: TBurgerIngredientsProps): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>(TAB_LIST.BUN);
  const dispatch = useAppDispatch();
  const counters = useAppSelector(selectCounters);

  const bunsRef = useRef<HTMLHeadingElement>(null);
  const saucesRef = useRef<HTMLHeadingElement>(null);
  const mainsRef = useRef<HTMLHeadingElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const groupedIngredients = useMemo(() => {
    return {
      [TAB_LIST.BUN]: ingredients.filter((item) => item.type === 'bun'),
      [TAB_LIST.MAIN]: ingredients.filter((item) => item.type === 'main'),
      [TAB_LIST.SAUCE]: ingredients.filter((item) => item.type === 'sauce'),
    };
  }, [ingredients]);

  const onChangeActiveTab = (tab: string): void => {
    setActiveTab(tab);

    const refs = {
      [TAB_LIST.BUN]: bunsRef,
      [TAB_LIST.SAUCE]: saucesRef,
      [TAB_LIST.MAIN]: mainsRef,
    };
    const targetRef = refs[tab as keyof typeof refs];
    if (targetRef?.current && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: targetRef.current.offsetTop - scrollContainerRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = (): void => {
    if (!scrollContainerRef.current) return;

    const containerTop = scrollContainerRef.current.getBoundingClientRect().top;
    const refs = [
      { tab: TAB_LIST.BUN, ref: bunsRef },
      { tab: TAB_LIST.SAUCE, ref: saucesRef },
      { tab: TAB_LIST.MAIN, ref: mainsRef },
    ];

    const closest = refs.reduce((prev, curr) => {
      const prevDistance = Math.abs(prev.ref.current!.getBoundingClientRect().top - containerTop);
      const currDistance = Math.abs(curr.ref.current!.getBoundingClientRect().top - containerTop);
      return currDistance < prevDistance ? curr : prev;
    });

    if (closest.tab !== activeTab) {
      setActiveTab(closest.tab);
    }
  };

  const handleIngredientClick = (ingredient: TIngredient): void => {
    dispatch(setSelectedIngredient(ingredient));
  };

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab value={TAB_LIST.BUN} active={activeTab === TAB_LIST.BUN} onClick={onChangeActiveTab}>
            Булки
          </Tab>
          <Tab
            value={TAB_LIST.MAIN}
            active={activeTab === TAB_LIST.MAIN}
            onClick={onChangeActiveTab}
          >
            Начинки
          </Tab>
          <Tab
            value={TAB_LIST.SAUCE}
            active={activeTab === TAB_LIST.SAUCE}
            onClick={onChangeActiveTab}
          >
            Соусы
          </Tab>
        </ul>
      </nav>

      <div
        className={`${styles.ingredients_scroll} custom-scroll`}
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        <h2 ref={bunsRef} className="text text_type_main-medium mt-10 mb-6">
          Булки
        </h2>
        <div className={styles.cards_grid}>
          {groupedIngredients[TAB_LIST.BUN].map((item) => (
            <IngredientItem
              key={item._id}
              ingredient={item}
              count={counters[item._id] || 0}
              onClick={() => handleIngredientClick(item)}
            />
          ))}
        </div>

        <h2 ref={mainsRef} className="text text_type_main-medium mt-10 mb-6">
          Начинки
        </h2>
        <div className={styles.cards_grid}>
          {groupedIngredients[TAB_LIST.MAIN].map((item) => (
            <IngredientItem
              key={item._id}
              ingredient={item}
              count={counters[item._id] || 0}
              onClick={() => handleIngredientClick(item)}
            />
          ))}
        </div>

        <h2 ref={saucesRef} className="text text_type_main-medium mt-10 mb-6">
          Соусы
        </h2>
        <div className={styles.cards_grid}>
          {groupedIngredients[TAB_LIST.SAUCE].map((item) => (
            <IngredientItem
              key={item._id}
              ingredient={item}
              count={counters[item._id] || 0}
              onClick={() => handleIngredientClick(item)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
