import { useState } from "react";
// const initialItems = [
//   {id: 1, description: "passports", quantity: 2, packed: false },
//   {id: 2, description: "socks", quantity: 12, packed: true},
//   {id: 3, description: "Power bank", quantity: 1, packed: true}
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function deleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={deleteItem} />
      <Stats />
    </div>
  );
}
         

          function Logo() {
            return <h1>💼 Jalan KUY ✈️</h1>;
          }

          function Form({onAddItems}) {

            const [description, setDescription] = useState("");
            const [quantity, setQuantity] = useState(1);

            function handleSubmit(e) {
              e.preventDefault();

              if (!description) return;

              const newItem = {description, quantity, packed: false, id: Date.now () };
              console.log(newItem);

              onAddItems(newItem);

              setDescription("")
              setQuantity(1);
            }

            return( 
            <form className="add-form" onSubmit={handleSubmit}>
              <h3>Apa aja yang dibawa? 🤔</h3>
              <h3>Yuk cheklist Barang 😁📝</h3>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                >
                {Array.from ({ length: 20 }, (_, i) => i + 1).map((num) =>(
                  <option value={num}>{num}</option>
                ))}
              </select>
              <input type="text" 
              placeholder="Barang yang mau dibawa"
              value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
              <button>Bawa</button>
              </form>
        
            );
          }

          function PackingList({ items, onDeleteItem }) {
            return (
              <div className="list">
                <ul>
                  {items.map((item) => (
                    <Item item={item} key={item.id} onDeleteItem={onDeleteItem} />
                  ))}
                </ul>
              </div>
            );
          }
          
          function Item({ item, onDeleteItem }) {
            return (
              <li>
                <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                  {item.quantity} {item.description}
                </span>
                <button onClick={() => onDeleteItem(item.id)}>❌</button>
              </li>
            );
          }

          function Stats() {
            return(
              <footer className="stats">
                <em>
                  💼 Kamu punya 0 barang di daftar, dan sudah packing 0 barang (0%){" "} 
                </em>
              </footer>
            );
          }
        