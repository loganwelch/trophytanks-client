import React, { useState } from 'react';
import { createTank } from '../../managers/TankManager';
import { useNavigate } from 'react-router-dom';

export const TankForm = ({ tags, token }) => {
    const [tankName, setTankName] = useState('')
    const [tankGallons, setTankGallons] = useState('')
    const [tankStartedDate, setTankStartedDate] = useState('')
    const [tankFlora, setTankFlora] = useState('')
    const [tankFauna, setTankFauna] = useState('')
    const [tankComments, setTankComments] = useState('')
    const [tankPhoto, setTankPhoto] = useState('')
    const [selectedTags, setSelectedTags] = useState([])
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const newTank = {
            user_id: token,
            name: tankName,
            gallons: tankGallons,
            started_date: tankStartedDate,
            flora: tankFlora,
            fauna: tankFauna,
            noteworthy_comments: tankComments,
            photo_url: tankPhoto,
            tags: selectedTags
        }
        createTank(newTank)
            .then(response => response.json())
            .then((data) => {
                const createdTankId = data.id;
                navigate(`/my-tanks/${createdTankId}`)
            })
    }

    return (
        <div className="tank-form-container">
            <h2>Add a New Tank</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="tankName">Name:</label>
                <input
                    type="text"
                    id="tankName"
                    value={tankName}
                    onChange={(e) => setTankName(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="tankGallons">Gallons:</label>
                <input
                    type="number"
                    id="tankGallons"
                    value={tankGallons}
                    onChange={(e) => setTankGallons(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="tankStartedDate">Started Date:</label>
                <input
                    type="text"
                    id="tankStartedDate"
                    value={tankStartedDate}
                    onChange={(e) => setTankStartedDate(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="tankFlora">Tank Flora:</label>
                <textarea
                    id="tankFlora"
                    value={tankFlora}
                    onChange={(e) => setTankFlora(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="tankFauna">Tank Fauna:</label>
                <textarea
                    id="tankFauna"
                    value={tankFauna}
                    onChange={(e) => setTankFauna(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="tankComments">What should we know about this tank?</label>
                <textarea
                    id="tankComments"
                    value={tankComments}
                    onChange={(e) => setTankComments(e.target.value)}
                    required
                />
                <label htmlFor="tankPhoto">Photo Url:</label>
                <input
                    type="url"
                    id="tankPhoto"
                    value={tankPhoto}
                    onChange={(e) => setTankPhoto(e.target.value)}
                    required
                />
                <br />
                <label>Tags:</label>
                {tags.map((tag) => (
                    <label key={tag.id}>
                        <input
                            type="checkbox"
                            value={tag.id}
                            checked={selectedTags.includes(tag.id)}
                            onChange={(e) =>
                                e.target.checked
                                    ? setSelectedTags([...selectedTags, tag.id])
                                    : setSelectedTags(selectedTags.filter((id) => id !== tag.id))
                            }
                        />
                        {tag.label}
                    </label>
                ))}
                <br />
                <button type="submit">Add This Tank</button>
            </form>
        </div>
    )
}