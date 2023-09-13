import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSingleTank } from '../../managers/TankManager';

export const TankDetails = () => {
    const { tankId } = useParams();
    const [selectedTank, setSelectedTank] = useState([]);

    // Get the profile id of the logged-in user
    const loggedInUserProfileId = parseInt(localStorage.getItem("userProfileId"));

    const getTankDetails = () => {
        getSingleTank({ tankId }).then((TankDetails) => {
            setSelectedTank(TankDetails);
        });
    };

    useEffect(() => {
        if (tankId) {
            getTankDetails();
        }
    }, [tankId]);

    return (
        <div>
            <h1>Tank Details:</h1>
            {selectedTank && (
                <article className="tank-card">
                    <h3>{selectedTank.name}</h3>
                    <p>
                        Profile: {selectedTank?.profile?.full_name}
                    </p>
                    <p>Gallons: {selectedTank?.gallons}</p>
                    <p>Started Date: {selectedTank?.started_date}</p>
                    <p>Plants: {selectedTank?.flora}</p>
                    <p>Stock List: {selectedTank?.fauna}</p>
                    <p>Noteworthy Comments: {selectedTank?.noteworthy_comments}</p>
                    <div className="tag-list">
                        {selectedTank?.tags && Array.isArray(selectedTank.tags) && selectedTank.tags.map((tag) => (
                            <span className="tag" key={tag.id}>{tag.label}</span>
                        ))}
                    </div>
                    <div>
                        <img src={selectedTank?.photo_url} alt={selectedTank?.name} className="tank-img" />
                    </div>
                    {(selectedTank?.profile?.id === loggedInUserProfileId || !selectedTank || !selectedTank.profile) && (
                        <Link to={`/my-tanks/${selectedTank.id}/edit`} key={selectedTank.id}>Edit Tank</Link>
                    )}
                </article>
            )}
        </div>
    );
};
