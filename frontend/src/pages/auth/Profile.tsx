import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [profile, setProfile] = useState({
    username: '',
    role: '',
    about: '',
    imageUrl: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/profile') // Remplace par ton vrai lien
      .then((res) => setProfile(res.data))
      .catch(() => alert('Erreur lors du chargement du profil'));
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setProfile({ ...profile, imageUrl: URL.createObjectURL(file) });
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setProfile({ ...profile, imageUrl: '' });
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('username', profile.username);
    formData.append('about', profile.about);
    if (selectedImage) formData.append('image', selectedImage);

    try {
      await axios.put('http://localhost:5000/api/profile', formData); // Lien backend
      setEditMode(false);
      alert('Profil mis à jour avec succès');
    } catch (err) {
      alert("Erreur lors de la mise à jour du profil");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-8 px-6 rounded-md shadow">
        <h1 className="text-3xl font-bold mb-2">Mon Profil</h1>
        <p className="text-sm">Gérer vos informations personnelles</p>
      </div>

      <div className="text-center mt-6">
        <div className="relative inline-block">
          <img
            src={
              profile.imageUrl ||
              'https://via.placeholder.com/100?text=No+Image'
            }
            alt="Profil"
            className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow"
          />
          <div className="absolute top-0 right-0 flex flex-col items-center space-y-2">
            <label className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-full cursor-pointer">
              📷
              <input type="file" className="hidden" onChange={handleImageChange} />
            </label>
            <button
              onClick={handleDeleteImage}
              className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-full"
            >
              🗑️
            </button>
          </div>
        </div>

        {editMode ? (
          <input
            type="text"
            className="mt-4 text-xl font-semibold border p-1 rounded"
            value={profile.username}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          />
        ) : (
          <h2 className="mt-4 text-xl font-semibold">{profile.username}</h2>
        )}
        <p className="text-gray-500">{profile.role}</p>
      </div>

      <div className="mt-6 px-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">À propos</label>
          {editMode ? (
            <textarea
              value={profile.about}
              onChange={(e) => setProfile({ ...profile, about: e.target.value })}
              className="mt-1 w-full border p-2 rounded"
            />
          ) : (
            <p className="mt-1 text-gray-700">{profile.about}</p>
          )}
        </div>

        <div className="text-center">
          {editMode ? (
            <button
              onClick={handleSave}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
            >
              Enregistrer
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Modifier le profil
            </button>
          )}
        </div>
      </div>
    </div>
  );
}