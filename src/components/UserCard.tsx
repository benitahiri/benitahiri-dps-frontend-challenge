import { User } from "../types/User";

export default function UserCard({
  user,
  users,
  highlight
}: {
  user: User;
  users: User[];
  highlight: boolean;
}) {
  let isOldest = false;

  if (highlight) {
    const sameCity = users.filter(u => u.address.city === user.address.city);
    const oldest = sameCity.reduce((prev, curr) =>
      curr.age > prev.age ? curr : prev
    );
    isOldest = oldest.id === user.id;
  }

  return (
    <div style={{
      border: "1px solid gray",
      margin: 5,
      padding: 10,
      background: isOldest ? "#1a1917ff" : "white"
    }}>
      <img src={user.image} width={50} />
      <b>{user.firstName} {user.lastName}</b>
      <div>{user.address.city}</div>
      <div>{user.age} years old</div>
    </div>
  );
}
