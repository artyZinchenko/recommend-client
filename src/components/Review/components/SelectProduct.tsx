import {
    Autocomplete,
    AutocompleteChangeReason,
    Grid,
    StandardTextFieldProps,
    TextField,
    Typography,
    createFilterOptions,
} from '@mui/material';
import SelectType from './SelectType';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchProducts } from '../../../services/review.services/fetchProducts';
import { useTranslation } from 'react-i18next';

interface Props {
    setProduct: React.Dispatch<React.SetStateAction<ProductToDB>>;
    product: ProductToDB;
}

const filter = createFilterOptions<ProductToDB>();
interface ProductToDB {
    product_id?: number;
    product_name: string;
    type: string;
    key?: string;
}

const SelectProduct = ({ setProduct, product }: Props) => {
    const [text, setText] = useState('');
    const [typeText, setTypeText] = useState('Book');
    const [options, setOptions] = useState<ProductToDB[]>([]);
    const [selected, setSelected] = useState(false);
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    const { isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const data = await fetchProducts();
            setOptions(data.products);
            return data.products;
        },
        staleTime: 5 * 60 * 1000,
    });

    const handleClick = (product: ProductToDB) => {
        setText(product.product_name);
        setOpen(false);
        if ('product_id' in product) {
            setProduct(product);
            setTypeText(product.type);
            setSelected(true);
        } else {
            setProduct({ product_name: product.product_name, type: 'Book' });
            setTypeText('Book');
        }
    };

    const handleTyping = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        e.target.value.length < 1 ? setOpen(false) : setOpen(true);

        setText(e.target.value);
        setSelected(false);
    };

    const handleChange = (
        _event: React.SyntheticEvent<Element, Event>,
        _value: string | ProductToDB | null,
        reason: AutocompleteChangeReason
    ) => {
        if (reason === 'clear') {
            setOpen(false);
            setText('');
        }
    };

    return (
        <>
            <Grid item xs={12}>
                <Autocomplete
                    freeSolo
                    fullWidth
                    value={text}
                    open={open}
                    onClose={() => {
                        setOpen(false);
                    }}
                    onBlur={() => setText(product.product_name)}
                    onChange={handleChange}
                    loading={isLoading}
                    options={options}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params).filter((p) => {
                            return p.product_name
                                .toLowerCase()
                                .includes(text.toLowerCase());
                        });

                        filtered.push({
                            key: 'New-option',
                            type: 'New Option',
                            product_name: text,
                        });

                        return filtered;
                    }}
                    getOptionLabel={(option) => {
                        if (typeof option !== 'string') {
                            return option.product_name;
                        }
                        return option;
                    }}
                    renderOption={(props, option) => (
                        <li
                            {...props}
                            key={
                                option.key || option.product_name + option.type
                            }
                            onClick={() => handleClick(option)}
                        >
                            <div className='flex-row justify-between items-center'>
                                <Typography
                                    variant='body1'
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    {option.product_name}
                                </Typography>
                                <Typography variant='body2'>
                                    {t(`product.${option.type}`)}
                                </Typography>
                            </div>
                        </li>
                    )}
                    renderInput={(params) => {
                        return (
                            <TextField
                                {...(params as StandardTextFieldProps)}
                                label={t('general.product')}
                                onChange={(e) => handleTyping(e)}
                            />
                        );
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <SelectType
                    typeText={typeText}
                    setTypeText={setTypeText}
                    setProduct={setProduct}
                    selected={selected}
                />
            </Grid>
        </>
    );
};
export default SelectProduct;
