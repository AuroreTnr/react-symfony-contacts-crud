import React, { useState, useEffect } from "react";
import Formulaire from "./Formulaire.jsx";
import BarRecherche from "./BarRecherche.jsx";
import './App.css';

function App() {
const [contacts, setContacts] = useState([]);
const [contactToEdit, setContactToEdit] = useState(null);
const [messageDelete, setMessageDelete] = useState("");
const [searchQuery, setSearchQuery] = useState("");


// --- On set le state de contactToEdit afin de récuperer la ligne du contact à éditer
  const handleEdit = (contact) => {
  setContactToEdit(contact);
};


  // Afficher les contacts depuis l'API
  const fetchContacts = () => {
    fetch("https://127.0.0.1:8000/api/contacts")
      .then(response => {
        if (!response.ok) throw new Error("Erreur réseau");
        return response.json();
      })
      .then(data => setContacts(data["member"]))
      .catch(error => {
        setMessageDelete("Impossible de charger les contacts. Veuillez réessayer")
        console.error("Erreur fetch contacts:", error)
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);





  // Supprimer un contact
  const handleDelete = (id) => {
  if (window.confirm("Voulez-vous vraiment supprimer ce contact ?")) {
    fetch(`https://127.0.0.1:8000/api/contacts/${id}`, {
      method: "DELETE"
    })
    .then(response => {
      if (!response.ok) throw new Error("Erreur lors de la suppression");
      fetchContacts();
      setMessageDelete("Contact supprimé avec succès !");
      setTimeout(() => setMessageDelete(""), 3000);

    })
    .catch((error) => {
      console.error("Erreur suppression :", error);
      setMessageDelete("Une erreur est survenue lors de la suppression du contact. Veuillez réessayer.");
      setTimeout(() => setMessageDelete(""), 3000);
    });
  }
};

// ---

// filtre contact ( filtre sur le client ) parcours tous les contacts(prenom, nom) et compare avec la recherche utilisateur
const filtreContact = contacts.filter(contact =>
  (`${contact.nom} ${contact.prenom} `.toLowerCase().includes(searchQuery.toLowerCase()))
);

// --- On gere le contenu de content qui sera different selon les conditions
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
          {/* ici affiche selon filterContact car on à fait une bar de recherche */}
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


      {/* ici on passe au composant BarRecherche les props(le state searchQuery, et  setSearchQuery)*/}
      <BarRecherche value={searchQuery} onChange={setSearchQuery} />


      {content}
      
      < Formulaire 
        actualiserListContact={fetchContacts}
        contactToEdit={contactToEdit}
        clearEdit={()=> setContactToEdit(null)}
      />
      

    </div>
  );
}

export default App;
