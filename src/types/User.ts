export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  address: {
    city: string;
  };
  image: string;
}
