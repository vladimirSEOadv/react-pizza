import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { CATEGORIES } from "../../constants/categories";
import styles from "./SinglePizza.module.scss";

export const SinglePizza = () => {
  const [pizza, setPizza] = useState({});
  const { id } = useParams();

  async function getPizzaById(id) {
    try {
      const res = await axios.get(
        `https://6436dc673e4d2b4a12dda417.mockapi.io/items?id=${id}`
      );
      const { data } = res;
      setPizza(...data);
    } catch (error) {
      const { message, name, code } = error;
      console.log(
        `error in FullPizza component, getPizzaById func message ${message}, name ${name}, code ${code}`
      );
    }
  }

  useEffect(() => {
    getPizzaById(id);
  }, [id]);

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.pizza}>
          {Object.keys(pizza).length && (
            <div>
              <div>{CATEGORIES[pizza?.category]}</div>
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
