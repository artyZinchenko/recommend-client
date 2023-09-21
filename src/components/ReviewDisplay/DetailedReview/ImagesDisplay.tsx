import { useState } from 'react';
import './DetailedReview.scss';
import Gallery from './Gallery';

interface Props {
    images: string[];
}

const ImagesDisplay = ({ images }: Props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (!images) return null;

    return (
        <div>
            <div>
                {images.map((image) => {
                    return (
                        <div className='flex-column items-center' key={image}>
                            <div className='preview-image-container pointer'>
                                <img
                                    src={image}
                                    alt={image}
                                    onClick={handleOpen}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            <Gallery
                open={open}
                images={images}
                handleOpen={handleOpen}
                handleClose={handleClose}
            />
        </div>
    );
};

export default ImagesDisplay;
