import {
    Box,
    Button,
    ImageList,
    ImageListItem,
    List,
    ListItem,
    Paper,
    Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { FileError, useDropzone } from 'react-dropzone';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import '../Review.scss';

interface Props {
    setImages: React.Dispatch<React.SetStateAction<ImageFile[]>>;
    images: ImageFile[];
    imagesEdit: string[];
    setImagesEdit: React.Dispatch<React.SetStateAction<string[]>>;
    reviewImages: string[] | undefined;
}

interface RejecedFile {
    file: File;
    errors: FileError[];
}

const ImageDropzone = ({
    images,
    setImages,
    imagesEdit,
    setImagesEdit,
    reviewImages,
}: Props) => {
    const [rejected, setRejected] = useState<RejecedFile[]>([]);
    const [cancelDeleteButton, setCancelDeleteButton] = useState(false);

    const onDrop = useCallback((acceptedFiles: any, rejectedFiles: any) => {
        if (acceptedFiles?.length) {
            console.log(acceptedFiles);
            setImages((previousImages) => [
                ...previousImages,
                ...acceptedFiles.map((file: File) => {
                    return Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    });
                }),
            ]);
        }
        if (rejectedFiles?.length) {
            console.log(rejectedFiles);
            setRejected((previousFiles) => [
                ...previousFiles,
                ...rejectedFiles,
            ]);
        }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
        },
        maxSize: 1024 * 1000,
    });

    const removeFile = (name: string) => {
        setImages(
            images.filter((image) => {
                return image.name !== name;
            })
        );
    };

    const removeRejected = (name: string) => {
        setRejected(
            rejected.filter((r) => {
                return r.file.name !== name;
            })
        );
    };

    const removeExistingImage = (existingImage: string) => {
        setCancelDeleteButton(true);
        setImagesEdit(
            imagesEdit.filter((image) => {
                return image !== existingImage;
            })
        );
    };

    const revertChanges = () => {
        if (reviewImages) setImagesEdit(reviewImages);
        setCancelDeleteButton(false);
    };

    return (
        <Box className='dropzone'>
            <Paper
                variant='elevation'
                elevation={3}
                className='pointer flex items-center gap-1 p-4'
                {...getRootProps()}
            >
                <InsertPhotoIcon fontSize='large' color='primary' />
                <input {...getInputProps()} />
                {isDragActive ? (
                    <Typography>Drop the image here ...</Typography>
                ) : (
                    <Typography>
                        Drag 'n' drop some images here, or click to select
                        images
                    </Typography>
                )}
            </Paper>
            {(images.length > 0 || imagesEdit.length > 0) && (
                <div className='uploaded-container'>
                    <div className='flex justify-center pt-1'>
                        <Typography variant='h6'>Uploaded Images</Typography>
                    </div>
                    <div className='images-container'>
                        <ImageList
                            cols={2}
                            sx={{
                                paddingTop: '1em',
                                gap: '0',
                                width: '100%',
                                overflow: 'visible',
                            }}
                        >
                            {imagesEdit.map((image) => {
                                return (
                                    <ImageListItem
                                        key={image}
                                        className='image-box'
                                    >
                                        <img
                                            src={image}
                                            alt='existing'
                                            loading='lazy'
                                        />
                                        <CancelRoundedIcon
                                            sx={{ color: '#F533A4' }}
                                            className='delete-image'
                                            onClick={() =>
                                                removeExistingImage(image)
                                            }
                                        />
                                        <Typography variant='subtitle2'>
                                            Existing image
                                        </Typography>
                                    </ImageListItem>
                                );
                            })}
                            {cancelDeleteButton && (
                                <Button onClick={revertChanges} color='info'>
                                    Revert changes
                                </Button>
                            )}
                            {images.map((item) => {
                                return (
                                    <ImageListItem
                                        key={item.preview}
                                        className='image-box'
                                    >
                                        <img
                                            src={item.preview}
                                            alt=''
                                            loading='lazy'
                                        />
                                        <CancelRoundedIcon
                                            sx={{ color: '#F533A4' }}
                                            className='delete-image'
                                            onClick={() =>
                                                removeFile(item.name)
                                            }
                                        />
                                        <Typography variant='subtitle2'>
                                            {item.name}
                                        </Typography>
                                    </ImageListItem>
                                );
                            })}
                        </ImageList>
                    </div>
                </div>
            )}
            {rejected.length > 0 && (
                <>
                    <Typography variant='h6'>Rejected images</Typography>
                    <List>
                        {rejected.map(({ file, errors }) => {
                            return (
                                <ListItem className='flex gap-1'>
                                    <Typography>{file.name}</Typography>
                                    {errors.map((err) => {
                                        return (
                                            <li className='flex gap-1'>
                                                <Typography color='error'>
                                                    {err.message}
                                                </Typography>
                                            </li>
                                        );
                                    })}
                                    <Button
                                        variant='outlined'
                                        color='error'
                                        onClick={() =>
                                            removeRejected(file.name)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </ListItem>
                            );
                        })}
                    </List>
                </>
            )}
        </Box>
    );
};

export default ImageDropzone;
