import React from "react";
import "./App.css";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [loaded, setLoaded] = React.useState(false);
  const [person, setPerson] = React.useState({});
  const [infoValue, setInfoValue] = React.useState("random person");

  async function getPerson() {
    const response = await fetch(url);
    const data = await response.json();
    const personAllData = data.results[0];

    const personInfo = {
      picture: personAllData.picture.large,
      name: `${personAllData.name.first} ${personAllData.name.last} `,
      email: personAllData.email,
      age: personAllData.dob.age,
      street: `${personAllData.location.street.number} ${personAllData.location.street.name} `,
      phone: personAllData.phone,
      password: personAllData.login.password,
    };

    setLoaded(true);
    setPerson(personInfo);
    setInfoValue(personInfo.name);
  }

  React.useEffect(() => {
    getPerson();
  }, []);

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={person.picture || defaultImage}
            alt={person.name || "random person"}
          />
          <p className="user-name">My name is</p>
          <p className="user-value">{infoValue}</p>
          <div className="values-list">
            <h2>
              <strong>Age:</strong> {person.age}
            </h2>
            <h2>
              <strong>Street Address:</strong> {person.street}
            </h2>
            <h2>
              <strong>Email:</strong> {person.email}
            </h2>
            <h2>
              <strong>Phone:</strong> {person.phone}
            </h2>
          </div>
          <button type="button" className="btn" onClick={getPerson}>
            {loaded ? "New Random Person" : "loading..."}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
