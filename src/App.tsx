import { useEffect, useState } from "react";
import { User } from "./types/User";
import "./App.css";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [city, setCity] = useState("");
  const [highlight, setHighlight] = useState(false);

  // FETCH USERS
  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data.users);
        setFiltered(data.users);
      });
  }, []);

  // DEBOUNCE SEARCH
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(search);
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  // FILTER LOGIC
  useEffect(() => {
    let data = users.filter(user =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(debounced.toLowerCase())
    );

    if (city) {
      data = data.filter(u => u.address.city === city);
    }

    setFiltered(data);
  }, [debounced, city, users]);

  const cities = [...new Set(users.map(u => u.address.city))];

  return (
    <div style={{ padding: 20 }}>
      <h1>Customer List</h1>

      <input
        placeholder="Search by name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: 8, marginRight: 10 }}
      />

      <select
        value={city}
        onChange={e => setCity(e.target.value)}
        style={{ padding: 8, marginRight: 10 }}
      >
        <option value="">All cities</option>
        {cities.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <label>
        <input
          type="checkbox"
          checked={highlight}
          onChange={e => setHighlight(e.target.checked)}
        />
        {" "}Highlight oldest in each city
      </label>

      <div style={{ marginTop: 20 }}>
        {filtered.map(user => {
          let isOldest = false;

          if (highlight) {
            const sameCity = users.filter(u => u.address.city === user.address.city);
            const oldest = sameCity.reduce((prev, curr) =>
              curr.age > prev.age ? curr : prev
            );
            isOldest = oldest.id === user.id;
          }

          return (
            <div
              key={user.id}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid gray",
                padding: 10,
                marginBottom: 8,
                background: isOldest ? "#d0488cff" : "black"
              }}
            >
              <img
                src={user.image}
                alt=""
                style={{ width: 50, height: 50, borderRadius: "50%", marginRight: 10 }}
              />

              <div>
                <strong>{user.firstName} {user.lastName}</strong>
                <div>{user.address.city}</div>
                <div>{user.age} years old</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
