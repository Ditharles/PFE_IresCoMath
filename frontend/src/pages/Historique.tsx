import { useParams } from 'react-router-dom';
import Requests from '../components/dashboard/requests/Requests';
import { RequestStatus } from '../types/request';
import { useState, useEffect } from 'react';

const Historique = () => {
    const { status } = useParams();
    const [filterStatuses, setFilterStatuses] = useState<RequestStatus[] | undefined>();

    useEffect(() => {
        if (status) {
            switch (status) {
                case "en-attente":
                    setFilterStatuses([RequestStatus.PENDING]);
                    break;
                case "validees":
                    setFilterStatuses([
                        RequestStatus.APPROVED,
                        RequestStatus.APPROVED_BY_SUPERVISOR,
                        RequestStatus.APPROVED_BY_DIRECTOR
                    ]);
                    break;
                case "rejetees":
                    setFilterStatuses([
                        RequestStatus.REJECTED,
                        RequestStatus.REJECTED_BY_SUPERVISOR,
                        RequestStatus.REJECTED_BY_DIRECTOR
                    ]);
                    break;
                case "closes":
                    setFilterStatuses([RequestStatus.COMPLETED]);
                    break;
                default:
                    setFilterStatuses(undefined);
            }
        } else {
            setFilterStatuses(undefined);
        }
    }, [status]);

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Requests filterStatuses={filterStatuses} />
        </div>
    );
};

export default Historique;