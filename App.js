import { useState } from "react";
import "./styles.css";

const App = () => {
  const [data, setData] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("https://reqres.in/api/users?page=1", {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log("result is: ", JSON.stringify(result, null, 4));

      setData(result);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(data);

  return (
    <div>
      {err && <h2>{err}</h2>}
      <h1>Welcome to Data Page</h1>

      <button onClick={handleClick}>Fetch data</button>

      {isLoading && <h2>Loading...</h2>}

      {data.data.map((person) => {
        return (
          <div key={person.id}>
            <ul>
              <li>
                <p>
                  <strong>First Name:</strong> {person.first_name}
                </p>
                <p>
                  <strong>Last Name:</strong> {person.last_name}
                </p>
                <br />
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default App;
