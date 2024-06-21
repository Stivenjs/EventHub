import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import firebaseApp from "../Credenciales";
import NavigationBar from "../NavigationBar";
import "../../styles/Eventos.css";
import axios from "axios";

const firestore = getFirestore(firebaseApp);

const Eventos = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAddEvent = async () => {
    if (
      name &&
      date &&
      time &&
      location &&
      address &&
      category &&
      price &&
      description &&
      imageUrl
    ) {
      try {
        await axios.post("http://localhost:3000/nuevo-evento", {
          name,
          date,
          time,
          location,
          address,
          category,
          price,
          description,
          imageUrl,
        });

        console.log("Evento agregado correctamente");
        setName("");
        setDate("");
        setTime("");
        setLocation("");
        setAddress("");
        setCategory("");
        setPrice("");
        setDescription("");
        setImageUrl("");
      } catch (error) {
        console.error("Error al agregar el evento:", error);
      }
    } else {
      console.error("Todos los campos son obligatorios");
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="add-event-container">
        <h2>Agregar Evento</h2>
        <input
          type="text"
          placeholder="Nombre del evento"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Fecha del evento"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          placeholder="Hora del evento"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Lugar del evento"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dirección del evento"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Categoría del evento"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Precio del evento"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción del evento"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL de la imagen del evento"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button className="add-event-btn" onClick={handleAddEvent}>
          Agregar Evento
        </button>
      </div>
    </>
  );
};

export default Eventos;
