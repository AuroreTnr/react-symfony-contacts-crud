import React, { useState, useEffect } from "react";
import './App.css';

export default function Formulaire({ actualiserListContact, contactToEdit, clearEdit }) {
    // --- actualisationListContact ( = fetchContacts) : actualise l affichage des contacts apres modification et insertion
    // --- contactToEdit ( = contactToEdit) : donne la ligne du contact a modifier
    // --- clearEdit ( = () => setContactToEdit(null)) : met contactToEdit à null donc le ternaire du fetch put est false et execute le post.

        const method = contactToEdit ? "PUT" : "POST";

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");


    // quand on clique sur modifier useEffect s' execute, il prerempli le formulaire
    useEffect(() => {
        if (contactToEdit) {
        setNom(contactToEdit.nom);
        setPrenom(contactToEdit.prenom);
        setEmail(contactToEdit.email);
        }
    }, [contactToEdit]);

    
    // --- avant d envoyer le code on valide côté client(aussi côté back) puis on effectue la requete
    const handleSubmit = (e) => {
        e.preventDefault();

        // --- Validation client
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        const nomPrenomRegex = /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ' -]*$/;

        if (!emailRegex.test(email.trim())) {
            setMessage("Adresse email invalide.");
            return;
        }

        if (!nomPrenomRegex.test(nom.trim()) || nom.trim()?.length < 2) {
            setMessage("Le nom est invalide. Il doit comporter au moins 2 caractères et des lettres.");
            return;
        }

        if (!nomPrenomRegex.test(prenom.trim()) || prenom.trim()?.length < 2) {
            setMessage("Le prénom est invalide. Il doit comporter au moins 2 caractères et des lettres.");
            return;
        }

        const newContact = {
            nom: nom.trim(),
            prenom: prenom.trim(),
            email: email.trim(),
        };

        

        // --- Requete

        // si contactToEdit est true alors je fetch ici le PUT "https://127.0.0.1:8000/api/contacts/${contactToEdit.id}" sinon je fetch ici le POST "https://127.0.0.1:8000/api/contacts"
        const url = contactToEdit
        ? `https://127.0.0.1:8000/api/contacts/${contactToEdit.id}`
        : "https://127.0.0.1:8000/api/contacts";

        const method = contactToEdit ? "PUT" : "POST";

        // ---
        fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact),
        })
        .then(response => {
            if (!response.ok) throw new Error("Erreur de validation ou d' envoi.");
            return response.json();
        })
        .then(() => {
            setMessage(contactToEdit ? "Contact modifié !" : "Contact ajouté avec succès !");
            setTimeout(() => setMessage(""), 3000);

            setNom("");
            setPrenom("");
            setEmail("");
            if (actualiserListContact) actualiserListContact();
            if (clearEdit) clearEdit();
        })
        .catch(error => {
            console.error(error);
            setMessage(contactToEdit ? "Erreur lors de la modification du contact" : "Erreur lors de l'ajout du contact.");
        });
  };

    // --- formulaire, quand on submit handlesubmit se declenche
    return (
        <div className="mt-5">
        <h2>{contactToEdit ? "Modifier un contact" : "Ajouter un contact"}</h2>
        {message && <div className="alert alert-info">{message}setContactToEdit</div>}
        <form onSubmit={handleSubmit} className="mb-5">
            <div className="mb-3">
                
            <label htmlFor="nom" className="form-label">Nom</label>
            <input
                id="nom"
                type="text"
                className="form-control"
                value={nom}
                onChange={e => setNom(e.target.value)}
                required
            />
            </div>
            <div className="mb-3">
            <label htmlFor="prenom" className="form-label">Prénom</label>
            <input
                id="prenom"
                type="text"
                className="form-control"
                value={prenom}
                onChange={e => setPrenom(e.target.value)}
                required
            />
            </div>
            <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            </div>
            <button type="submit" className="btn btn-primary">
            {contactToEdit ? "Modifier" : "Ajouter"}
            </button>
        </form>
        </div>
    );
}
