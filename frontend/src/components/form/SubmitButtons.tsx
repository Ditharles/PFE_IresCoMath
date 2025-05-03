interface SubmitButtonsProps {
    loading: boolean;
    resetForm: () => void;
}

const SubmitButtons = ({ loading, resetForm }: SubmitButtonsProps) => (
    <div className="flex gap-4 justify-center mt-6">
        <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
        >
            {loading ? "Traitement en cours..." : "S'inscrire"}
        </button>
        <button
            type="button"
            onClick={() => {
                resetForm();
            }}
            className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
            Réinitialiser
        </button>
    </div>
);

export default SubmitButtons;  