import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Equipments from "../../components/dashboard/equipments/Equipments";

const EquipmentsPage = () => {
    const { status } = useParams();
    const [pendingDelivery, setPendingDelivery] = useState<boolean>(false);

    useEffect(() => {
        if (status === "en-cours") {
            setPendingDelivery(true);
        } else {
            setPendingDelivery(false);
        }
    }, [status]);

    return (
        <div className="min-h-screen flex flex-col ">
            <Equipments
                isCategoryPage={false}
                pendingDelivery={pendingDelivery}
                key={status}
            />
        </div>
    );
};

export default EquipmentsPage;