import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./Skeleton.module.scss";
import { RootState } from "../../../../redux/store";
import { useAppSelector } from "../../../../redux/hooks/hooks";

// TODO добавить типы для state.pagination.itemsPerPage
const Skeleton = () => {
  const count = useAppSelector(
    (state: RootState) => state.pagination.itemsPerPage
  );

  const createArrOfId = (count: number): Array<number> =>
    count ? [...new Array(count)] : [0];
  const arrOfId = createArrOfId(count);

  const skeletonsContent = [...new Array(count)].map((_, index) => {
    return (
      <ContentLoader
        key={arrOfId[index]}
        className="pizza-block"
        speed={1}
        width={366}
        height={480}
        viewBox="0 0 366 480"
        backgroundColor="#e1e0e0"
        foregroundColor="#ecebeb"
      >
        <circle cx="176" cy="127" r="125" />
        <rect x="0" y="272" rx="0" ry="0" width="366" height="30" />
        <rect x="0" y="315" rx="0" ry="0" width="366" height="85" />
        <rect x="0" y="429" rx="0" ry="0" width="90" height="28" />
        <rect x="214" y="421" rx="20" ry="20" width="151" height="44" />
      </ContentLoader>
    );
  });

  return <div className={styles.skeletonWrapper}>{skeletonsContent}</div>;
};

export default Skeleton;
