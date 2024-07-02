
import Exerciti1 from "./assets/exerciti/Exercise1";
import Exerciti2 from "./assets/exerciti/Exercise2";
import Exercise4 from "./assets/exerciti/Exercise4";
const App = () => {
  const user = {
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com"
};

    return (
        <div>
        <Exerciti1 />
            <Exerciti2 name={user.name} age={user.age} email={user.email} />
            <Exercise4 />
        </div>
    );
};

export default App;
