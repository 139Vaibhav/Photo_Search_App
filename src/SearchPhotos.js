import React, { useState } from "react";
import Unsplash, { toJson } from "unsplash-js";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import InstagramIcon from '@mui/icons-material/Instagram';
import Like from "./images/like.jpg";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 600,
    // bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: '85%'
};
console.log("The key is ", process.env.REACT_APP_ACCESS_KEY);
const unsplash = new Unsplash({
    accessKey: process.env.REACT_APP_ACCESS_KEY,
});
export default function SearchPhotos() {

    const [query, setQuery] = useState("");
    const [pics, setPics] = useState([]);
    const [open, setOpen] = useState(false);
    const [modalimg, setModalImg] = useState("");
    const [modalchipimg, setModalChipimg] = useState("");
    const [modalname, setModalName] = useState("");
    const [modallikes, setModalLikes] = useState("");
    const [modalinsta, setModalInsta] = useState("");
    const [tags, setTags] = useState([]);


    const searchPhotos = async (e) => {
        e.preventDefault();

        unsplash.search
            .photos(query, 1, 25)
            .then(toJson)
            .then((json) => {
                console.log(json);
                setPics(json.results);
            });

    };

    function handleOpen(val) {
        setModalImg(val.urls.full);
        setModalChipimg(val.user.profile_image.medium);
        setModalName(val.user.name);
        setModalLikes(val.likes);
        setModalInsta(val.user.instagram_username);
        console.log("val tags are ", val.tags);
        setTags(val.tags);
        setOpen(true);

    }
    const handleClose = () => setOpen(false);

    return (
        <>
            <form className="form" onSubmit={searchPhotos}>
                {" "}
                <label className="label" htmlFor="query">
                    {" "}
                    📷
                </label>
                <input
                    type="text"
                    name="query"
                    className="input"
                    placeholder={`Try "cat" or "apple"`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="button">
                    Search
                </button>
            </form>

            <div className="card-list">
                {pics.map((pic) => (
                    <div>
                        <div className="card" key={pic.id} onClick={() => handleOpen(pic)}>
                            <img
                                className="card--image"
                                alt={pic.alt_description}
                                src={pic.urls.full}
                                width="50%"
                                height="50%"
                            ></img>
                        </div>
                        <div className="card-info">
                            <div className="chip">
                                <img src={pic.user.profile_image.medium} alt="Person" width="96" height="96"></img>
                                {pic.user.name}
                            </div>
                            <div className="chip">
                                <img className="mob-img" src={Like} alt="Like" ></img>
                                {pic.likes}
                            </div>
                        </div>
                    </div>
                ))}{" "}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <img
                        className="modal-image"
                        alt="Modal ka chitra"
                        src={modalimg}
                        height='400'
                        width="100%"
                    ></img>
                    <div className="card-info">
                        <div className="chip">
                            <img src={modalchipimg} alt="Person" width="96" height="96"></img>
                            {modalname}
                        </div>
                        <div className="chip">
                            <img className="mob-img" src={Like} alt="Like" ></img>
                            {modallikes}
                        </div>
                        <div className="chip">
                            <InstagramIcon fontSize="large" />
                            {modalinsta}
                        </div>
                    </div>
                    <h2 className="heading2">Related Tags</h2>

                    <div className="modal-outside-tag">
                        {
                            tags.map((tag) => (
                                // console.log("tag is ", tag.title)
                                < div className="chip" >
                                    {tag.title}
                                </div>
                            ))
                        }
                    </div>

                </Box>
            </Modal>
        </>
    );
}
