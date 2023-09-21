import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material';
import { MobileStepper, styled } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const StyledBox = styled(Box)(({ theme }) => ({
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
    p: 4,
}));

interface Props {
    handleOpen: () => void;
    handleClose: () => void;
    open: boolean;
    images: string[];
}

const Gallery = ({ handleClose, handleOpen, open, images }: Props) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? images.length - 1 : prevSlide - 1
        );
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <StyledBox>
                    <div className='flex-row justify-end pointer'>
                        <CloseIcon
                            fontSize='large'
                            onClick={handleClose}
                            color='primary'
                        />
                    </div>
                    <div className='carousel'>
                        <div className='image-container'>
                            <img
                                src={images[currentSlide]}
                                alt={`Slide ${currentSlide}`}
                                className='carousel-image'
                            />
                        </div>
                        <div className='stepper'>
                            <MobileStepper
                                variant='dots'
                                steps={images.length}
                                position='static'
                                activeStep={currentSlide}
                                sx={{
                                    maxWidth: 400,
                                    flexGrow: 1,
                                    backgroundColor: 'transparent',
                                    paddingBottom: '1em',
                                }}
                                nextButton={
                                    <Button
                                        size='small'
                                        onClick={nextSlide}
                                        disabled={
                                            currentSlide === images.length - 1
                                        }
                                    >
                                        <KeyboardArrowRight />
                                    </Button>
                                }
                                backButton={
                                    <Button
                                        size='small'
                                        onClick={prevSlide}
                                        disabled={currentSlide === 0}
                                    >
                                        <KeyboardArrowLeft />
                                    </Button>
                                }
                            />
                        </div>
                    </div>
                </StyledBox>
            </Modal>
        </div>
    );
};

export default Gallery;
