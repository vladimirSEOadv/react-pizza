import "./scss/app.scss";
import { Header } from "./components/Header";
import { Categories } from "./components/Categories";
import { Sort } from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import { useGetMyPizzas } from "./hooks/useGetMyPizzas";
import { Loader } from "./components/Loader";

function App() {
  const [pizzas, loading, error] = useGetMyPizzas(
    "https://6436dc673e4d2b4a12dda417.mockapi.io/items"
  );

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {(loading || error) && <Loader error={error} />}
            {pizzas.length > 0 &&
              pizzas.map((pizza) => {
                return <PizzaBlock {...pizza} key={pizza.id} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
