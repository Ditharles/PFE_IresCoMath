import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ChevronLeft, Calendar, CheckCircle, Send, AlertCircle, Info } from 'lucide-react';
import FormInput from "../components/FormInput";
import FormCheckbox from "../components/FormCheckbox";
import FormTextarea from "../components/FormTextarea";
import FormSelect from "../components/FormSelect";

interface FormData {
  [key: string]: any;
}

interface FormErrors {
  [key: string]: string;
}

const NouvelleDemande: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({});
  const [materielAutre, setMaterielAutre] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    setForm({});
    setErrors({});
    setMaterielAutre(false);
  }, [type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type: inputType } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setForm({ ...form, [name]: inputType === "checkbox" ? checked : value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    if (type === 'stage' || type === 'mission' || type === 'evenement_scientifique' || type === 'pret_materiel') {
      if (!form.dateDebut) {
        newErrors.dateDebut = 'La date de début est requise';
        isValid = false;
      }
      
      if (!form.dateFin) {
        newErrors.dateFin = 'La date de fin est requise';
        isValid = false;
      } else if (form.dateDebut && form.dateFin && new Date(form.dateFin) < new Date(form.dateDebut)) {
        newErrors.dateFin = 'La date de fin doit être après la date de début';
        isValid = false;
      }
    }
    
    switch (type) {
      case 'stage':
        if (!form.entreprise) {
          newErrors.entreprise = 'Le nom de l\'entreprise est requis';
          isValid = false;
        }
        
        if (!form.mail) {
          newErrors.mail = 'L\'adresse email est requise';
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(form.mail)) {
          newErrors.mail = 'Adresse email invalide';
          isValid = false;
        }
        
        if (!form.responsable) {
          newErrors.responsable = 'Le nom du responsable est requis';
          isValid = false;
        }
        break;
        
      case 'mission':
        if (!form.objectif) {
          newErrors.objectif = 'L\'objectif est requis';
          isValid = false;
        }
        
        if (form.article && !form.titre) {
          newErrors.titre = 'Le titre de l\'article est requis';
          isValid = false;
        }
        
        if (!form.pays) {
          newErrors.pays = 'Le pays est requis';
          isValid = false;
        }
        break;
        
      case 'evenement_scientifique':
        if (!form.conference) {
          newErrors.conference = 'Le nom de la conférence est requis';
          isValid = false;
        }
        
        if (!form.lieu) {
          newErrors.lieu = 'Le lieu est requis';
          isValid = false;
        }
        break;
        
      case 'inscription_article':
        if (!form.objectif) {
          newErrors.objectif = 'L\'objectif est requis';
          isValid = false;
        }
        
        if (!form.lieu) {
          newErrors.lieu = 'Le lieu est requis';
          isValid = false;
        }
        
        if (!form.date) {
          newErrors.date = 'La date est requise';
          isValid = false;
        }
        break;
        
      case 'pret_materiel':
        if (!form.nom) {
          newErrors.nom = 'Le nom du matériel est requis';
          isValid = false;
        }
        
        if (!form.quantite || form.quantite <= 0) {
          newErrors.quantite = 'La quantité doit être supérieure à 0';
          isValid = false;
        }
        break;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs dans le formulaire', {
        icon: <AlertCircle className="text-red-500" />
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token') || 'demo-token';
      await axios.post(`http://localhost:8000/api/demande/${type}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Demande envoyée avec succès!', {
        icon: <CheckCircle className="text-green-500" />
      });
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (err) {
      console.error(err);
      toast.error('Erreur lors de l\'envoi de la demande', {
        icon: <AlertCircle className="text-red-500" />
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFormTitle = () => {
    switch (type) {
      case 'stage': return 'Demande de Stage';
      case 'mission': return 'Demande de Mission';
      case 'evenement_scientifique': return 'Événement Scientifique';
      case 'inscription_article': return 'Inscription d\'Article';
      case 'pret_materiel': return 'Prêt de Matériel';
      default: return 'Nouvelle Demande';
    }
  };

  const renderFields = () => {
    switch (type) {
      case 'stage':
        return (
          <>
            <FormInput
              label="Entreprise"
              name="entreprise"
              value={form.entreprise || ''}
              onChange={handleChange}
              error={errors.entreprise}
              required
            />
            <FormInput
              label="Email"
              name="mail"
              type="email"
              value={form.mail || ''}
              onChange={handleChange}
              error={errors.mail}
              required
            />
            <FormInput
              label="Responsable"
              name="responsable"
              value={form.responsable || ''}
              onChange={handleChange}
              error={errors.responsable}
              required
            />
            <FormInput
              label="Lettre d'affectation"
              name="lettre"
              value={form.lettre || ''}
              onChange={handleChange}
              error={errors.lettre}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Date de début"
                name="dateDebut"
                type="date"
                value={form.dateDebut || ''}
                onChange={handleChange}
                error={errors.dateDebut}
                required
                icon={<Calendar className="h-5 w-5 text-gray-400" />}
              />
              <FormInput
                label="Date de fin"
                name="dateFin"
                type="date"
                value={form.dateFin || ''}
                onChange={handleChange}
                error={errors.dateFin}
                required
                icon={<Calendar className="h-5 w-5 text-gray-400" />}
              />
            </div>
          </>
        );
        
      case 'mission':
        return (
          <>
            <FormTextarea
              label="Objectif"
              name="objectif"
              value={form.objectif || ''}
              onChange={handleChange}
              error={errors.objectif}
              required
            />
            <FormCheckbox
              label="Article accepté"
              name="article"
              checked={form.article || false}
              onChange={handleChange}
            />
            {form.article && (
              <>
                <FormInput
                  label="Titre de l'article"
                  name="titre"
                  value={form.titre || ''}
                  onChange={handleChange}
                  error={errors.titre}
                  required={form.article}
                />
                <FormInput
                  label="Numéro"
                  name="numero"
                  value={form.numero || ''}
                  onChange={handleChange}
                  error={errors.numero}
                />
              </>
            )}
            <FormInput
              label="Pays"
              name="pays"
              value={form.pays || ''}
              onChange={handleChange}
              error={errors.pays}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Date de début"
                name="dateDebut"
                type="date"
                value={form.dateDebut || ''}
                onChange={handleChange}
                error={errors.dateDebut}
                required
                icon={<Calendar className="h-5 w-5 text-gray-400" />}
              />
              <FormInput
                label="Date de fin"
                name="dateFin"
                type="date"
                value={form.dateFin || ''}
                onChange={handleChange}
                error={errors.dateFin}
                required
                icon={<Calendar className="h-5 w-5 text-gray-400" />}
              />
            </div>
          </>
        );
        
      case 'evenement_scientifique':
        return (
          <>
            <FormInput
              label="Conférence"
              name="conference"
              value={form.conference || ''}
              onChange={handleChange}
              error={errors.conference}
              required
            />
            <FormInput
              label="Lieu"
              name="lieu"
              value={form.lieu || ''}
              onChange={handleChange}
              error={errors.lieu}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Date de début"
                name="dateDebut"
                type="date"
                value={form.dateDebut || ''}
                onChange={handleChange}
                error={errors.dateDebut}
                required
                icon={<Calendar className="h-5 w-5 text-gray-400" />}
              />
              <FormInput
                label="Date de fin"
                name="dateFin"
                type="date"
                value={form.dateFin || ''}
                onChange={handleChange}
                error={errors.dateFin}
                required
                icon={<Calendar className="h-5 w-5 text-gray-400" />}
              />
            </div>
          </>
        );
        
      case 'inscription_article':
        return (
          <>
            <FormTextarea
              label="Objectif"
              name="objectif"
              value={form.objectif || ''}
              onChange={handleChange}
              error={errors.objectif}
              required
            />
            <FormInput
              label="Lieu"
              name="lieu"
              value={form.lieu || ''}
              onChange={handleChange}
              error={errors.lieu}
              required
            />
            <FormInput
              label="Date"
              name="date"
              type="date"
              value={form.date || ''}
              onChange={handleChange}
              error={errors.date}
              required
              icon={<Calendar className="h-5 w-5 text-gray-400" />}
            />
          </>
        );
        
      case 'pret_materiel':
        return (
          <>
            <FormSelect
              label="Nom du matériel"
              name="nom"
              value={form.nom || ''}
              onChange={(e) => {
                const value = e.target.value;
                if (value === 'autre') {
                  setMaterielAutre(true);
                  setForm({ ...form, nom: '' });
                } else {
                  setMaterielAutre(false);
                  setForm({ ...form, nom: value });
                }
                
                if (errors.nom) {
                  setErrors({ ...errors, nom: '' });
                }
              }}
              error={errors.nom}
              required
              options={[
                { value: '', label: 'Sélectionner un matériel' },
                { value: 'Ordinateur', label: 'Ordinateur' },
                { value: 'Vidéoprojecteur', label: 'Vidéoprojecteur' },
                { value: 'Imprimante', label: 'Imprimante' },
                { value: 'autre', label: 'Autre...' }
              ]}
            />
            {materielAutre && (
              <FormInput
                label="Nom du matériel (Autre)"
                name="nom"
                value={form.nom || ''}
                onChange={handleChange}
                error={errors.nom}
                required
              />
            )}
            <FormInput
              label="Quantité"
              name="quantite"
              type="number"
              min="1"
              value={form.quantite || ''}
              onChange={handleChange}
              error={errors.quantite}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Date de début"
                name="dateDebut"
                type="date"
                value={form.dateDebut || ''}
                onChange={handleChange}
                error={errors.dateDebut}
                required
                icon={<Calendar className="h-5 w-5 text-gray-400" />}
              />
              <FormInput
                label="Date de fin"
                name="dateFin"
                type="date"
                value={form.dateFin || ''}
                onChange={handleChange}
                error={errors.dateFin}
                required
                icon={<Calendar className="h-5 w-5 text-gray-400" />}
              />
            </div>
            <FormTextarea
              label="Note"
              name="note"
              value={form.note || ''}
              onChange={handleChange}
              error={errors.note}
            />
          </>
        );
        
      default:
        return (
          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-yellow-500 mt-0.5" />
              <p className="ml-3 text-yellow-700 dark:text-yellow-200">
                Formulaire non défini pour le type : {type}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="animate-fadeIn h-full">
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Retour à la liste
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          {getFormTitle()}
        </h2>
        
        <div className="space-y-4 animate-slideIn">
          {renderFields()}
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => navigate('/')}
            className="btn-secondary mr-3"
            disabled={isSubmitting}
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="btn-primary inline-flex items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Traitement...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Soumettre
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NouvelleDemande;