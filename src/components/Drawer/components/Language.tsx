import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    List,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';

interface Lngs {}
const lngs = {
    en: { nativeName: 'English' },
    ru: { nativeName: 'Русский' },
};

interface Props {}
const Language = (props: Props) => {
    const [open, setOpen] = useState(true);
    const { t, i18n } = useTranslation();

    const handleClick = () => {
        setOpen(!open);
    };

    console.log(i18n.language);

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary='Language' />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    {Object.keys(lngs).map((lng) => {
                        return (
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText>
                                    <Typography></Typography>
                                </ListItemText>
                            </ListItemButton>
                        );
                    })}

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText>
                            <Typography>Русский</Typography>
                        </ListItemText>
                    </ListItemButton>
                </List>
            </Collapse>
        </>
    );
};
export default Language;
