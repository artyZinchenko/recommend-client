import { Rating, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridRowParams,
    GridToolbar,
    GridTreeNodeWithRender,
} from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
    data: ReviewDB[] | undefined;
}

function renderRating(
    params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
) {
    return <Rating readOnly value={params.row.product.average_rating} />;
}

function renderImages(
    params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
) {
    const imgs = params.row.images;
    return (
        <Box className='flex-column'>
            {imgs.map((img: string, i: number) => {
                return (
                    <Link to={img} target='#blank' key={img}>
                        image {i + 1}
                    </Link>
                );
            })}
        </Box>
    );
}

const Table = ({ data }: Props) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const { i18n } = useTranslation();
    if (!data) return null;

    const handleClick = (params: GridRowParams) => {
        navigate(`${params.row.review_id}`);
    };

    const columns: GridColDef[] = [
        {
            field: 'product',
            headerName: i18n.language === 'ru' ? 'Продукт' : 'Product',
            minWidth: 150,
            valueGetter: (params) => params.row.product.product_name,
        },
        {
            field: 'product_rating',
            headerName: i18n.language === 'ru' ? 'Рейтинг' : 'Rating',
            minWidth: 160,
            type: 'number',
            renderCell: renderRating,
        },
        {
            field: 'name',
            headerName: i18n.language === 'ru' ? 'Название' : 'Name',
            minWidth: 170,
        },
        {
            field: 'score',
            headerName: i18n.language === 'ru' ? 'Оценка' : 'Score',
            type: 'number',
            minWidth: 160,
            valueFormatter: (params) => `${params.value}/10`,
        },
        {
            field: 'likes',
            headerName: i18n.language === 'ru' ? 'Лайки' : 'Likes',
            type: 'number',
            minWidth: 150,
            valueGetter: (params) => params.row.likes.length,
        },
        {
            field: 'images',
            headerName: i18n.language === 'ru' ? 'Изображения' : 'Images',
            sortable: false,
            minWidth: 150,
            renderCell: renderImages,
        },
    ];

    const localizedTextMap = {
        toolbarFilters: i18n.language === 'ru' ? 'Фильтр' : 'Filter',
        toolbarQuickFilterPlaceholder:
            i18n.language === 'ru' ? 'Поиск...' : 'Search...',
        columnMenuSortAsc:
            i18n.language === 'ru'
                ? 'Сортировать по-возрастанию'
                : 'Sort ascending',
        columnMenuSortDesc:
            i18n.language === 'ru'
                ? 'Сортировать по-убыванию'
                : 'Sort descending',
        columnMenuFilter: i18n.language === 'ru' ? 'Фильтр' : 'Filter',
        filterPanelOperator: i18n.language === 'ru' ? 'Оператор' : 'Operator',
        filterPanelColumns: i18n.language === 'ru' ? 'Колонки' : 'Column',
        filterPanelInputLabel: i18n.language === 'ru' ? 'Значение' : 'Value',
    };

    return (
        <DataGrid
            sx={{
                '& .MuiDataGrid-row:hover': {
                    cursor: 'pointer',
                },
            }}
            rows={data}
            onRowClick={handleClick}
            columns={columns}
            localeText={localizedTextMap}
            disableColumnSelector
            disableDensitySelector
            disableColumnFilter={matches ? true : false}
            getRowId={(row) => row.review_id}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
                toolbar: {
                    showQuickFilter: true,
                    printOptions: { disableToolbarButton: true },
                    csvOptions: { disableToolbarButton: true },
                },
            }}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 10,
                    },
                },
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
        />
    );
};

export default Table;
