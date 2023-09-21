import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getSingleTank, deleteTank } from '../../managers/TankManager';
import "./TankDetails.css";

export const TankDetails = () => {
    const { tankId } = useParams();
    const [selectedTank, setSelectedTank] = useState([]);
    const navigate = useNavigate()

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


    const deleteTankButton = (tankId) => {
        if (selectedTank?.profile?.id === loggedInUserProfileId) {
            return (
                <button
                    onClick={() => {
                        const shouldDelete = window.confirm('Are you sure you want to delete this tank?')
                        if (shouldDelete) {
                            deleteTank(tankId).then(() => {
                                navigate(`/my-tanks`)
                            })
                        }
                    }}
                    className="submission__delete small-button"
                >
                    Delete
                </button>
            )
        }
        // If the tank's profile ID doesn't match the logged-in user's profile ID, return null (no button)
        return null;
    }

    return (
        <div className="tank-detail-card">
            <h1>Tank Details:</h1>
            {selectedTank && (
                <article className="tank-details">
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
                    <div className="tank-detail-footer-buttons">
                        <div className="tank-detail-edit-button">
                            {(selectedTank?.profile?.id === loggedInUserProfileId || !selectedTank || !selectedTank.profile) && (
                                <Link to={`/my-tanks/${selectedTank.id}/edit`} key={selectedTank.id}>Edit Tank</Link>
                            )}
                        </div>
                        <div className="tank-detail-delete-button">{deleteTankButton(selectedTank.id)}</div>
                    </div>
                </article>
            )}
        </div> 
    );
};
