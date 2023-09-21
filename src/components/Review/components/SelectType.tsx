import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    SelectChangeEvent,
} from '@mui/material';
import { productTypes } from '../../../data/productTypes';
import { useTranslation } from 'react-i18next';

interface Props {
    setTypeText: React.Dispatch<React.SetStateAction<string>>;
    typeText: string;
    setProduct: React.Dispatch<React.SetStateAction<ProductDB | NewProduct>>;
    selected: boolean;
}

const SelectType = ({ typeText, setTypeText, setProduct, selected }: Props) => {
    const { t } = useTranslation();

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;

        setTypeText(value);
        const productType = productTypes.find((p) => p.type === value);
        if (productType) {
            setProduct((prev) => ({
                ...prev,
                type: productType.type,
            }));
        }
    };

    return (
        <FormControl fullWidth>
            <InputLabel>{t('create.type')}</InputLabel>
            <Select
                fullWidth
                label='Product type'
                value={typeText}
                onChange={handleChange}
                readOnly={selected}
            >
                {productTypes.map((el) => {
                    return (
                        <MenuItem value={el.type} key={el.type}>
                            {t(`product.${el.type}`)}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default SelectType;
