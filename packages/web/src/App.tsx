import Spinner from "./components/animations/Spinner";
import RestaurantCard from "./components/cards/RestaurantCard";
import useAllRestaurantDetails from "./hooks/useAllRestaurant";

function App() {
  const restaurantIds = [567051, 227018];
  const { restaurants, loading, error } =
    useAllRestaurantDetails(restaurantIds);

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="max-w-3xl w-full p-3 flex flex-col items-center justify-center
        gap-y-9 py-5"
      >
        <h1 className="font-extrabold text-4xl my-3">Pick a restaurant</h1>
        {loading && <Spinner />}
        {restaurants.map((restaurant, index) => (
          <RestaurantCard key={index} {...restaurant} />
        ))}
      </div>
    </div>
  );
}

export default App;
