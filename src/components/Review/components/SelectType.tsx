import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    SelectChangeEvent,
} from '@mui/material';
import { ProductType, productTypes } from '../../../data/productTypes';
import { useState } from 'react';
import { useFormikContext } from 'formik';

interface Props {
    setProductType: React.Dispatch<React.SetStateAction<ProductType>>;
    productType: ProductType;
}

const SelectType = ({ productType, setProductType }: Props) => {
    const [localValue, setLocalValue] = useState('Book');

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        setLocalValue(value);
        const product = productTypes.find((p) => p.type === value);
        if (product) {
            console.log(product);
            setProductType(product);
        }
    };

    return (
        <FormControl fullWidth>
            <InputLabel>Product type</InputLabel>
            <Select
                fullWidth
                label='Product type'
                value={localValue}
                displayEmpty
                onChange={handleChange}
                //  sx={{
                //      '& legend': { display: 'none' },
                //      '& fieldset': { top: 0 },
                //  }}
            >
                {productTypes.map((el) => {
                    return (
                        <MenuItem value={el.type} key={el.type}>
                            {el.name}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default SelectType;
