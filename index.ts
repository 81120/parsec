import { Json } from "./src/Json";

const main = () => {
  const str = ` { "name": "leo", "age": 21, "gender": true, "subject": ["English", "Chinese"], "k": {"v": 321.34}} `;
  const r = Json.parse(str);
  console.log(str);
  console.log(JSON.stringify(r, null, 2));
};

main();
