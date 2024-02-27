import { useState } from "react";

export default function App() {
  const [prayers, setPrayers] = useState([]);

  function handleAddPrayers(prayer) {
    setPrayers((prayers) => [...prayers, prayer]);
  }

  function handleDeletePrayer(id) {
    setPrayers((prayers) => prayers.filter((prayer) => prayer.id !== id));
  }

  function handleUpdatePrayer(id) {
    setPrayers((prayers) =>
      prayers.map((prayer) =>
        prayer.id === id ? { ...prayer, completed: !prayer.completed } : prayer
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddPrayers={handleAddPrayers} />
      <PrayerList
        prayers={prayers}
        onDeletePrayer={handleDeletePrayer}
        onUpdatePrayer={handleUpdatePrayer}
      />
      <Stats prayers={prayers} />
    </div>
  );
}

function Logo() {
  return (
    <div>
      <h1> 🕌 Catatan Sholat ☪</h1>
    </div>
  );
}

function Form({ onAddPrayers }) {
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newPrayer = { description, completed: false, id: Date.now() };
    console.log(newPrayer); 

   
    onAddPrayers(newPrayer);

    setDescription("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Yuk Checklist Sholat Hari Ini 😁📝</h3>
      <input
        type="text"
        placeholder="Sholat yang mau dilakukan"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Lakukan</button>
    </form>
  );
}

function PrayerList({ prayers, onDeletePrayer, onUpdatePrayer }) {
  return (
    <div className="list">
      <ul>
        {prayers.map((prayer) => (
          <Item
            prayer={prayer}
            key={prayer.id}
            onDeletePrayer={onDeletePrayer}
            onUpdatePrayer={onUpdatePrayer}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ prayer, onDeletePrayer, onUpdatePrayer }) {
  return (
    <li>
      <input
        type="checkbox"
        value={prayer.completed}
        onChange={() => onUpdatePrayer(prayer.id)}
      />
    
      <span style={prayer.completed ? { textDecoration: "line-through" } : {}}>
        {prayer.description}
      </span>
      <button onClick={() => onDeletePrayer(prayer.id)}>❌</button>
    </li>
  );
}

function Stats({ prayers }) {
  if (!prayers.length)
    return (
      <p className="stats">
        <em>Mulai Tambahkan Sholat Hari Ini 😎</em>
      </p>
    );

  const numPrayers = prayers.length;
  const numCompleted = prayers.filter((prayer) => prayer.completed).length;
  const percentage = Math.round((numCompleted / numPrayers) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "Selamat, kamu telah mengerjakan semua sholat hari ini 🎉"
          : `🕌 Kamu punya ${numPrayers} sholat hari ini, dan sudah mengerjakan ${numCompleted} sholat (${percentage}%)`}
      </em>
    </footer>
  );
};