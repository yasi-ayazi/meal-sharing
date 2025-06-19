import { MealsList } from "../MealsList/MealsList";

const HomePage = () => {
    return (
        <div style={{ padding: "2rem" }}>
            <h1>Welcome to Meal Sharing!</h1>
            <p>Find delicious meals shared by others.</p>

            <MealsList />
        </div>
    );
};

export default HomePage;
