import React, { useState, useEffect } from "react";
import Formulaire from "./Formulaire.jsx";
import BarRecherche from "./BarRecherche.jsx";
import './App.css';

function App() {
const [contacts, setContacts] = useState([]);
const [contactToEdit, setContactToEdit] = useState(null);
const [messageDelete, setMessageDelete] = useState("");
const [searchQuery, setSearchQuery] = useState("");


  const handleEdit = (contact) => {
  setContactToEdit(contact);
};


  // Afficher les contacts depuis l'API
  const fetchContacts = () => {
    fetch("https://127.0.0.1:8000/api/contacts")
      .then(response => response.json())
      .then(data => setContacts(data["member"]))
      .catch(error => console.error("Erreur fetch contacts:", error));
  };

  useEffect(() => {
    fetchContacts();
  }, []);





  // Supprimer un contact
  const handleDelete = (id) => {
  if (window.confirm("Voulez-vous vraiment supprimer ce contact ?")) {
    fetch(`https://127.0.0.1:8000/api/contacts/${id}`, {
      method: "DELETE",
    })
    .then((res) => {
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      fetchContacts();
      setMessageDelete("Contact supprimé avec succès !");
      setTimeout(() => setMessageDelete(""), 3000);

    })
    .catch((err) => {
      console.error("Erreur suppression :", err);
    });
  }
};

// ---

// filtre contact
const filtreContact = contacts.filter(contact =>
  (`${contact.prenom} ${contact.nom}`.toLowerCase().includes(searchQuery.toLowerCase()))
);

let content;

  if (contacts?.length > 0){
    content = (

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtreContact.map(contact => (
            <tr key={contact.id}>
              <td>{contact.nom}</td>
              <td>{contact.prenom}</td>
              <td>{contact.email}</td>
              <td>
                <button 
                  className="btn btn-warning btn-sm me-2"
                  onClick={()=> handleEdit(contact)}
                >
                Modifier 
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={()=> handleDelete(contact.id)}
                >
                Supprimer 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>)
  }else if (contacts?.length === 0 || filtreContact.length === 0) {
  content = "Aucun contact trouvé.";
  }

  return (
    <div className="container mt-5">
      <h1>Liste des contacts</h1>

      {messageDelete && <div className="alert alert-info">{messageDelete}</div>}


      <BarRecherche value={searchQuery} onChange={setSearchQuery} />


      {content}
      
      < Formulaire 
        onAjoutContact={fetchContacts}
        contactToEdit={contactToEdit}
        clearEdit={()=> setContactToEdit(null)
        }
      />
      

    </div>
  );
}

export default App;
