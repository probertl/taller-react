// src/components/AddEvent.jsx
import { useState } from "react";

const INITIAL_FORM = {
  title: '',
  city: '',
  date: '',
  venue: '',
  image: '',
  description: ''
};

{/*Per tant, per poder fer aquest apartat et caldrà un altra prop que enviï el mètode */}
export default function AddEvent({ onAdd }) {
    const [formState, setFormState] = useState(INITIAL_FORM);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formState.title || !formState.city || !formState.date|| !formState.venue || !formState.image || !formState.description) return;
        
        onAdd && onAdd(formState); // El pare s'encarrega d'afegir-lo a l'array amb un id correcte
        setFormState(INITIAL_FORM); // Es buida
        setIsFormVisible(false); // S'amaga
    };



    const handleReset = () => setFormState(INITIAL_FORM);

    return (
        <>
        {/* Botón para mostrar/ocultar formulario */}
        <button className="btn btn-info mb-2 justify-content-end" onClick={() => setIsFormVisible(!isFormVisible)}>
            {isFormVisible ? 'Amagar formulari' : 'Afegir esdeveniment'}
        </button>

        {isFormVisible && (
            <div className="card mb-4">
                {/* Boto de tancar */}
                <div className="card-header d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Nou esdeveniment</span>
                    <button className="btn btn-sm btn-secondary" onClick={() => setIsFormVisible(false)} >
                    Tancar
                    </button>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* Fila 1: Títol | Ciutat | Data */}
                        <div className="row mb-2">
                            <div className="col-md-6">
                                {/* 
                                    Input de text per al títol de l'esdeveniment.
                                    
                                    value={formState.title} 
                                        -> Estableix el valor del camp d'entrada segons l'estat actual 'formState'.
                                        -> formState és un objecte de l'estat creat amb useState, que conté totes les dades del formulari.
                                        -> Aquí accedim a la propietat 'title' de formState per mostrar-la al camp.
                                    
                                    onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                                        -> Quan l'usuari escriu al camp, es crida aquesta funció.
                                        -> e.target.value conté el nou text escrit.
                                        -> setFormState crea un **nou objecte** copiant tot formState amb l'operador spread (...formState) i sobreescrivint només 'title' amb el nou valor.
                                        -> Això actualitza l'estat de manera immutabilitat, fent que React redibuixi el formulari amb el nou valor.
                                    
                                    className="form-control"
                                        -> Classe de Bootstrap que aplica estil d'input.
                                    
                                    required
                                    -> Marca el camp com obligatori per enviar el formulari.
                                */}
                                <label>Títol</label>                                
                                <input type="text" placeholder="Títol" value={formState.title} onChange={(e) => setFormState({ ...formState, title: e.target.value })} className="form-control" required />
                            </div>
                            <div className="col-md-3">
                                <label>Ciutat</label>
                                <input type="text" placeholder="Ciutat" value={formState.city} onChange={(e) => setFormState({ ...formState, city: e.target.value })} className="form-control" required />
                            </div>
                            <div className="col-md-3">
                                <label>Data</label>
                                <input type="date" value={formState.date} onChange={(e) => setFormState({ ...formState, date: e.target.value })} className="form-control" required />
                            </div>
                        </div>

                        {/* Fila 2: Espai/Sala | URL Imatge */}
                        <div className="row mb-2">
                            <div className="col-md-6">
                                <label>Espai / Sala</label>
                                <input type="text" placeholder="Espai / Sala" value={formState.venue} onChange={(e) => setFormState({ ...formState, venue: e.target.value })} className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label>URL Imatge</label>
                                <input type="text" placeholder="URL imatge" value={formState.image} onChange={(e) => setFormState({ ...formState, image: e.target.value })} className="form-control" />
                            </div>
                        </div>

                        {/* Descripció */}
                        <div className="mb-2">
                            <label>Descripcio</label>
                            <textarea paceholder="Descripció" value={formState.description} onChange={(e) => setFormState({ ...formState, description: e.target.value })} className="form-control"/>
                        </div>

                        {/* Botons a la dreta */}
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-secondary me-2" onClick={handleReset}>
                                Netejar
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={!formState.title || !formState.city || !formState.date}>
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
        </>
    );
}
