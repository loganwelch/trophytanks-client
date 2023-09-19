import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { editTank, getSingleTank } from '../../managers/TankManager'
import { getAllTags } from '../../managers/TagManager'
import "./EditTank.css";

export const EditTankForm = () => {
    const navigate = useNavigate()
    const { tankId } = useParams()

    // Default state of all tag options on form
    const [tagList, setTagList] = useState([])
    // Tracking the tags previously on the tank
    const [previousTankTags, setPreviousTankTags] = useState([])
    // Track the state for new tags on tank
    const [tagsOnTank, updateTagsOnTank] = useState([])
    const [tagObject, setTagObject] = useState({
        id: 0,
        label: ""
    })


    const [tank, updateTank] = useState({
        name: "",
        gallons: 0,
        flora: "",
        fauna: "",
        started_date: "",
        noteworthy_comments: "",
        photo_url: "",
        profile: 0,
        tags: []
    })

    const [tankFetched, updateTankFetched] = useState(false)

    useEffect(() => {
        if (tankId) {
            getSingleTank({ tankId }).then((tankData) => {
                updateTank(tankData)
                updateTankFetched(true)
            })
        }
    }, [tankId])

    useEffect(() => {
        getAllTags().then(tagData => setTagList(tagData))
    }, [])

    useEffect(() => {
        if (tankFetched === true) {
            const data = tagList.filter(tag => tank.tags.some(tankTag => tankTag.id === tag.id))
            updateTagsOnTank(data)
            setPreviousTankTags(data)
        }
    }, [tankFetched, tagList]) //added tagList to this array

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        let editedTank = { ...tank }
        const editedTags = [...tagsOnTank]
        editedTank.tags = editedTags.map(tag => tag.id)
        editedTank.profile = editedTank.profile.id

        editTank(tankId, editedTank).then(() => {
            getSingleTank({ tankId }).then((tankData) => {
                updateTank(tankData);
                navigate(`/my-tanks/${tankId}`);
            });
        });
    }

    const handleEditTags = (evt) => {
        const newTag = { ...tagObject }
        newTag.id = parseInt(evt.target.value)
        newTag.label = tagList.find(tag => tag.id === newTag.id)?.label || ''
        const copy = [...tagsOnTank]
        const updatedTag = copy.findIndex((previousTag) => previousTag.id === newTag.id)
        if (updatedTag !== -1) {
            copy.splice(updatedTag, 1)
        } else {
            copy.push(newTag)
        }
        updateTagsOnTank(copy)
    }

    tagList.sort((a, b) => a.id - b.id);

    return (
        <div className="edit-form-container">
            <h2 className="edit-form-header">Edit Your Tank</h2>
            <form className="tank-edit-Form">
                <label htmlFor="tankHTML" className="tankName">Name:</label>
                <input
                    required autoFocus
                    type="text"
                    className="edit-tank-name"
                    placeholder="Give your tank a fitting name!"
                    value={tank.name || ''}
                    onChange={(evt) => {
                        const copy = { ...tank }
                        copy.name = evt.target.value
                        updateTank(copy)
                    }}
                />
                <br />                
                <label htmlFor="gallons" className="label-bold">Gallons:</label>
                <input
                    required autoFocus
                    type="number"
                    className="form-control"
                    placeholder="How many gallons?"
                    value={tank.gallons || ''}
                    onChange={(evt) => {
                        const copy = { ...tank }
                        copy.gallons = evt.target.value
                        updateTank(copy)
                    }}
                />
                <br />
                <label htmlFor="flora" className="tankFlora">Flora:</label>
                <input
                    required autoFocus
                    type="text"
                    className="edit-tank-flora"
                    placeholder="What you got growin?"
                    value={tank.flora || ''}
                    onChange={(evt) => {
                        const copy = { ...tank }
                        copy.flora = evt.target.value
                        updateTank(copy)
                    }}
                />
                <br />
                <label htmlFor="fauna" className="tankFauna">Fauna:</label>
                <input
                    required autoFocus
                    type="text"
                    className="edit-tank-fauna"
                    placeholder="What you got livin in there?"
                    value={tank.fauna || ''}
                    onChange={(evt) => {
                        const copy = { ...tank }
                        copy.fauna = evt.target.value
                        updateTank(copy)
                    }}
                />
                <br />
                <label htmlFor="dateStarted" className="tankStartDate">Date Started:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="When did you start this masterpiece?"
                    value={tank.started_date || ''}
                    onChange={(evt) => {
                        const copy = { ...tank }
                        copy.started_date = evt.target.value
                        updateTank(copy)
                    }}
                />
                <br />
                <label htmlFor="comments" className="tankComments">Noteworthy Comments:</label>
                <input
                    required autoFocus
                    type="text"
                    className="edit-tank-comments"
                    placeholder="What should we know about this set-up?"
                    value={tank.noteworthy_comments || ''}
                    onChange={(evt) => {
                        const copy = { ...tank }
                        copy.noteworthy_comments = evt.target.value
                        updateTank(copy)
                    }}
                />
                <br />
                <label htmlFor="tankPhoto" className="tankPhoto">Photo Url:</label>
                <input
                    required autoFocus
                    type="url"
                    className="form-control"
                    placeholder="Copy and paste the url of a photo for this tank"
                    value={tank.photo_url || ''}
                    onChange={(evt) => {
                        const copy = { ...tank }
                        copy.photo_url = evt.target.value
                        updateTank(copy)
                    }}
                />
                <br />
                <label>Tags:</label>
                <section className="edit-tank-tags-list">
                    {
                        tagList.length > 0 &&
                        tagList.map((tag) => {
                            const tagOnTank = tagsOnTank.find((tagOnTank) => tagOnTank.id === tag.id)
                            const checked = tagOnTank ? true : false
                            return <div key={`tagEditCheck--${tag.id}`}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={tag.id || ''}
                                        checked={checked}
                                        onChange={(e) => handleEditTags(e)}
                                    />
                                    {tag.label}
                                </label>
                            </div>
                        })
                    }
                </section>
                <br />
                <div className="edit-tank-footer-buttons">
                    <button
                        onClick={(clickEvent) => { handleSaveButtonClick(clickEvent) }}
                        className="btn btn-primary"
                    >
                        Save Changes
                    </button>
                    <button onClick={() => (navigate(`/my-tanks`))}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

// return (
//     <div className="edit-form-container">
//         <form className="tank-edit-Form">
//             <h2 className="edit-tank-FormHeader">Edit Your Tank</h2>

//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="tankHTML" className="tankName">Name:</label>
//                     <input
//                         required autoFocus
//                         type="text"
//                         className="edit-tank-name"
//                         placeholder="Give your tank a fitting name!"
//                         value={tank.name || ''}
//                         onChange={(evt) => {
//                             const copy = { ...tank }
//                             copy.name = evt.target.value
//                             updateTank(copy)
//                         }}
//                     />
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="gallons" className="label-bold">Gallons:</label>
//                     <input
//                         required autoFocus
//                         type="number"
//                         className="form-control"
//                         placeholder="How many gallons?"
//                         value={tank.gallons || ''}
//                         onChange={(evt) => {
//                             const copy = { ...tank }
//                             copy.gallons = evt.target.value
//                             updateTank(copy)
//                         }}
//                     />
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="flora" className="tankFlora">Flora:</label>
//                     <input
//                         required autoFocus
//                         type="text"
//                         className="edit-tank-flora"
//                         placeholder="What you got growin?"
//                         value={tank.flora || ''}
//                         onChange={(evt) => {
//                             const copy = { ...tank }
//                             copy.flora = evt.target.value
//                             updateTank(copy)
//                         }}
//                     />
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="fauna" className="tankFauna">Fauna:</label>
//                     <input
//                         required autoFocus
//                         type="text"
//                         className="edit-tank-fauna"
//                         placeholder="What you got livin in there?"
//                         value={tank.fauna || ''}
//                         onChange={(evt) => {
//                             const copy = { ...tank }
//                             copy.fauna = evt.target.value
//                             updateTank(copy)
//                         }}
//                     />
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="dateStarted" className="tankStartDate">Date Started:</label>
//                     <input
//                         required autoFocus
//                         type="text"
//                         className="form-control"
//                         placeholder="When did you start this masterpiece?"
//                         value={tank.started_date || ''}
//                         onChange={(evt) => {
//                             const copy = { ...tank }
//                             copy.started_date = evt.target.value
//                             updateTank(copy)
//                         }}
//                     />
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="comments" className="tankComments">Noteworthy Comments:</label>
//                     <input
//                         required autoFocus
//                         type="text"
//                         className="edit-tank-comments"
//                         placeholder="What should we know about this set-up?"
//                         value={tank.noteworthy_comments || ''}
//                         onChange={(evt) => {
//                             const copy = { ...tank }
//                             copy.noteworthy_comments = evt.target.value
//                             updateTank(copy)
//                         }}
//                     />
//                 </div>
//             </fieldset>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="tankPhoto" className="tankPhoto">Photo Url:</label>
//                     <input
//                         required autoFocus
//                         type="url"
//                         className="form-control"
//                         placeholder="Copy and paste the url of a photo for this tank"
//                         value={tank.photo_url || ''}
//                         onChange={(evt) => {
//                             const copy = { ...tank }
//                             copy.photo_url = evt.target.value
//                             updateTank(copy)
//                         }}
//                     />
//                 </div>
//             </fieldset>

//             <fieldset>
//                 <h3 className="edit-tank-tags-header">Add Tags for your Tank's Status</h3>
//                 <section className="edit-tank-tags-list">
//                     {
//                         tagList.length > 0 &&
//                         tagList.map((tag) => {
//                             const tagOnTank = tagsOnTank.find((tagOnTank) => tagOnTank.id === tag.id)
//                             const checked = tagOnTank ? true : false
//                             return <div key={`tagEditCheck--${tag.id}`}>
//                                 <label>
//                                     <input
//                                         type="checkbox"
//                                         value={tag.id || ''}
//                                         checked={checked}
//                                         onChange={(e) => handleEditTags(e)}
//                                     />
//                                     {tag.label}
//                                 </label>
//                             </div>
//                         })
//                     }
//                 </section>
//             </fieldset>
//             <div className="edit-tank-footer-buttons">
//                 <button
//                     onClick={(clickEvent) => { handleSaveButtonClick(clickEvent) }}
//                     className="btn btn-primary"
//                 >
//                     Save Changes
//                 </button>
//                 <button onClick={() => (navigate(`/my-tanks`))}>
//                     Cancel
//                 </button>
//             </div>
//         </form>
//     </div>
// )