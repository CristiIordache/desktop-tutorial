
import Exerciti1 from "./assets/exerciti/Exercise1";
import Exerciti2 from "./assets/exerciti/Exercise2";
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
        </div>
    );
};

export default App;
