import React, { useEffect, useState } from "react";
import NavigationBar from "../NavigationBar";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../Credenciales";
import "../../styles/EventList.css";
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEventData, setNewEventData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    address: "",
    category: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      if (user) {
        try {
          const eventRef = collection(firestore, "events");
          const querySnapshot = await getDocs(eventRef);
          const eventsList = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setEvents(eventsList);
        } catch (error) {
          console.error("Error al obtener los eventos:", error);
        }
      }
    };

    fetchEvents();
  }, [user]);

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setNewEventData(event);
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteDoc(doc(firestore, "events", id));
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Error al eliminar el evento:", error);
    }
  };

  const handleSaveChanges = async () => {
    if (editingEvent) {
      try {
        await updateDoc(
          doc(firestore, "events", editingEvent.id),
          newEventData
        );
        setEvents(
          events.map((event) =>
            event.id === editingEvent.id ? newEventData : event
          )
        );
        setEditingEvent(null);
      } catch (error) {
        console.error("Error al actualizar el evento:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEventData((prevState) => ({ ...prevState, [name]: value }));
  };

  if (!user) {
    return <p>Por favor, inicia sesión para ver los eventos.</p>;
  }

  return (
    <>
    <NavigationBar />
    <div className="event-list-container">
      <h2>Lista de Eventos</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <h3>{event.name}</h3>
            <p>Fecha: {event.date}</p>
            <p>Hora: {event.time}</p>
            <p>Lugar: {event.location}</p>
            <p>Dirección: {event.address}</p>
            <p>Categoría: {event.category}</p>
            <p>Precio: ${event.price}</p>
            <p>Descripción: {event.description}</p>
            {event.imageUrl && (
              <img
                src={event.imageUrl}
                alt={event.name}
                style={{ maxWidth: "200px" }}
              />
            )}
            <button
              className="route-btn"
              onClick={() => traceRoute(event.address)}
            >
              Trazar Ruta
            </button>
            <button className="edit-btn" onClick={() => handleEditEvent(event)}>
              Editar
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDeleteEvent(event.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      {editingEvent && (
        <div className="edit-event-form">
          <h3>Editar Evento</h3>
          <input
            type="text"
            name="name"
            value={newEventData.name}
            onChange={handleChange}
            placeholder="Nombre del Evento"
          />
          <input
            type="date"
            name="date"
            value={newEventData.date}
            onChange={handleChange}
          />
          <input
            type="time"
            name="time"
            value={newEventData.time}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            value={newEventData.location}
            onChange={handleChange}
            placeholder="Lugar"
          />
          <input
            type="text"
            name="address"
            value={newEventData.address}
            onChange={handleChange}
            placeholder="Dirección"
          />
          <input
            type="text"
            name="category"
            value={newEventData.category}
            onChange={handleChange}
            placeholder="Categoría"
          />
          <input
            type="number"
            name="price"
            value={newEventData.price}
            onChange={handleChange}
            placeholder="Precio"
          />
          <textarea
            name="description"
            value={newEventData.description}
            onChange={handleChange}
            placeholder="Descripción"
          ></textarea>
          <input
            type="text"
            name="imageUrl"
            value={newEventData.imageUrl}
            onChange={handleChange}
            placeholder="URL de la Imagen"
          />
          <button onClick={handleSaveChanges}>Guardar Cambios</button>
          <button onClick={() => setEditingEvent(null)}>Cancelar</button>
        </div>
      )}
    </div>
    </>
  );
};

const traceRoute = (address) => {
  window.open(
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      address
    )}`,
    "_blank"
  );
};

export default EventList;
