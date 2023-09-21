import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    List,
    FormControlLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
import { useState } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';

interface LanguageT {
    nativeName: string;
}

interface Languages {
    [key: string]: LanguageT;
}
const lngs: Languages = {
    ['en-US']: { nativeName: 'English' },
    ru: { nativeName: 'Русский' },
};

const Language = () => {
    const { t, i18n } = useTranslation();
    const [value, setValue] = useState(i18n.language);
    const [open, setOpen] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
        i18n.changeLanguage(event.target.value);
    };

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemText>
                    <div className='flex-row items-center gap-3'>
                        {t('drawer.lang')}
                        <ListItemIcon>
                            <LanguageIcon />
                        </ListItemIcon>
                    </div>
                </ListItemText>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <RadioGroup value={value} onChange={handleChange}>
                        {Object.entries(lngs).map(([key, value]) => {
                            return (
                                <ListItemButton sx={{ pl: 4 }} key={key}>
                                    <FormControlLabel
                                        value={key}
                                        control={<Radio />}
                                        label={value.nativeName}
                                    />
                                </ListItemButton>
                            );
                        })}
                    </RadioGroup>
                </List>
            </Collapse>
        </>
    );
};

export default Language;
