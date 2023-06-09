import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { CATEGORIES } from "../../constants/categories";
import styles from "./SinglePizza.module.scss";
import SinglePizzaTypes from "./singlePizzaTypes";
import { AxiosErr } from "../../@types/axiosTypes";

export const SinglePizza: React.FC = () => {
  const [pizza, setPizza] = useState<SinglePizzaTypes | null>(null);
  const { id } = useParams();

  async function getPizzaById(id: string) {
    try {
      const res = await axios.get<SinglePizzaTypes[]>(
        `https://6436dc673e4d2b4a12dda417.mockapi.io/items?id=${id}`
      );

      const { data } = res;
      if (Array.isArray(data) && data.length > 0) {
        const onePizza = data[0];
        setPizza(onePizza);
      }
    } catch (error) {
      const { message, name, code } = error as AxiosError<AxiosErr>;
      console.log(
        `error in FullPizza component, getPizzaById func message ${message}, name ${name}, code ${code}`
      );
    }
  }

  useEffect(() => {
    if (id) {
      getPizzaById(id);
    }
  }, [id]);

  if (pizza === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div>
          {Object.keys(pizza).length > 0 && (
            <div>
              <div>
                Категория: {CATEGORIES[pizza?.category] || "не определена"}
              </div>
              <img
                style={{ width: "300px" }}
                src={pizza?.imageUrl}
                alt=""
                draggable="false"
              />
              <h2>{pizza?.name}</h2>
              <div>Цена {pizza?.price}</div>
              <div>Рейтинг: {pizza?.rating}</div>
              {/*<div>{pizza?.sizes}</div>*/}
              {/*<div>{pizza?.types}</div>*/}
              <button>Заказать</button>
            </div>
          )}
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
            blanditiis culpa dicta enim fuga impedit laudantium magnam magni
            molestiae, necessitatibus officia omnis optio possimus quam
            reprehenderit sint ut. Alias, voluptatibus.
          </p>
        </div>
      </div>
      <div className="link-wrapper">
        <Link
          to={"/"}
          style={{
            display: "inline-block",
            padding: "15px 0",
            fontWeight: "500",
          }}
        >
          Вернуться в каталог
        </Link>
      </div>
    </div>
  );
};
