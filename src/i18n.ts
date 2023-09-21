import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    notification: {
                        error: {
                            whoops: 'Whoops!',
                            notfound: 'Page not found',
                            user_notFound: 'User not found, please relogin',
                            empty: {
                                empty_name: 'Empty name',
                                produt_name: 'Empty product name',
                                empty_product_name: 'Empty product name',
                                empty_text: 'Empty text',
                                empty_type: 'Empty type',
                                empty_username: 'Empty username',
                                empty_email: 'Invalid email format',
                                empty_password:
                                    'Password must be at least 8 characters',
                            },
                            login: {
                                not_found: 'User not found',
                                password: 'Wrong password',
                                blocked: 'User is blocked',
                            },
                        },
                        review: {
                            created: 'Review created',
                            to_reviews: 'My reviews',
                        },
                    },
                    admin: {
                        panel: 'Admin panel',
                        role: 'Role',
                        USER: 'User',
                        ADMIN: 'Admin',
                        status: 'Status',
                        ACTIVE: 'Active',
                        BLOCKED: 'Blocked',
                        numReviews: 'Number of reviews',
                        manage: 'Manage reviews',
                        block: 'Block user',
                        grant: 'Grant admin rights',
                        ok: 'Ok',
                        confirm: 'Confirm',
                        cancel: 'Cancel',
                        confirmBlock: 'Confirm you want to block',
                        confirmGrant:
                            'Confirm you want to grant admin rights to',
                        confirmDelete: 'Confirm delete review',
                    },
                    general: {
                        product: 'Product',
                        product_type: 'Product type',
                        home: 'Home',
                        delete: 'Delete',
                        text: 'Text',
                        email: 'Email',
                        password: 'Password',
                        confirmPassword: 'Confirm password',
                        name: 'Name',
                        mode: 'mode',
                        light: 'Dark',
                        dark: 'Light',
                    },
                    home: {
                        best: 'Best reviews',
                        last: 'Last reviews',
                    },
                    search: {
                        search: 'Search...',
                    },
                    detailed: {
                        edit: 'Edit',
                    },
                    tags: {
                        add: '#add-tags',
                    },
                    feedback: {
                        askSignin: 'Please sign in to like or comment',
                        signin: 'Sign in',
                        useful: 'Useful',
                        rate: 'Rate',
                    },
                    comment: {
                        send: 'Send',
                        comments: 'Comments',
                        placeholder: 'Add comment...',
                    },
                    drawer: {
                        admin: 'Admin panel',
                        my_reviews: 'My reviews',
                        create_review: 'Create review',
                        logout: 'Logout',
                        lang: 'Language',
                    },
                    create: {
                        create: 'Create New Review',
                        edit: 'Edit Review',
                        type: 'Product type',
                        title: 'Review title',
                        product: 'Product title',
                        rate: 'Rate product',
                        imageDrag: 'Drop the image here ...',
                        imageDrop:
                            "Drag 'n' drop some images here, or click to select images",
                        uploaded: 'Uploaded images',
                        existingImg: 'ExistingImg',
                        revert: 'Revet changes',
                        rejectedImages: 'Rejected images',
                        deleteReview: 'Delete review',
                        postEdited: 'Post edited Review',
                        post: 'Post Review',
                        deleted: 'Review',
                    },
                    product: {
                        Book: 'Book',
                        Movie: 'Movie',
                        TV_Series: 'TV Series',
                        Computer_Game: 'Computer Game',
                        Music_Album: 'Music Album',
                        Board_Game: 'Board  Game',
                        Mobile_App: 'Mobile App',
                        Other: 'Other',
                        ['New Option']: 'New Option',
                    },
                    yup: {
                        email: {
                            req: 'Email is required',
                            format: 'Invalid email format',
                        },
                        name: 'Name is required',
                        password: {
                            min: 'Password must be at least 8 characters',
                            req: 'Password is required',
                        },
                        confirmPassword: {
                            oneOf: 'Passwords must match',
                            req: 'Confirm password is required',
                        },
                        review_name: 'Review title required',
                        review_product: 'Product title is required',
                        review_text: 'Review text is required',
                    },
                    registration: {
                        sign_in: 'Sign in',
                        facebook_sign: 'Sign in with Facebook',
                        twitter_sign: 'Sign in with Twitter',
                        create_new: 'Create new account',
                        or: 'or',
                        sign_in_header: 'Sign in',
                        sign_in_q: 'New to Recommend? Create your account',
                        create_acc_header: 'Create Account',
                        create_acc_button: 'Create Account',
                        create_acc_q: 'Already have an account? Sign in',
                        accout_created: 'Account created',
                    },
                    queryPage: {
                        searching: 'Searching',
                    },
                },
            },
            ru: {
                translation: {
                    notification: {
                        error: {
                            whoops: 'Упс!',
                            notfound: 'Страница не найдена',
                            user_notFound:
                                'Пользователь не найден, пожалуйста войдите в аккаунт',
                            empty: {
                                empty_name: 'Введите имя',
                                empty_product_name: 'Введите название продукта',
                                empty_text: 'Введите текст',
                                empty_type: 'Введите тип продукта',
                                empty_username: 'Нет имени пользователя',
                                empty_email: 'Неверный формат email',
                                empty_password:
                                    'Пароль должен иметь более 8 символов',
                            },
                            login: {
                                not_found:
                                    'Пользователь с таким email не найден',
                                password: 'Неверный пароль',
                                blocked: 'Пользователь заблокирован',
                            },
                        },
                        review: {
                            created: 'Обзор создан',
                            to_reviews: 'Мои обзоры',
                        },
                    },
                    admin: {
                        panel: 'Инструменты администратора',
                        role: 'Роль',
                        USER: 'Пользователь',
                        ADMIN: 'Администратор',
                        status: 'Статус',
                        ACTIVE: 'Активный',
                        BLOCKED: 'Заблокированный',
                        numReviews: 'Количество обзоров',
                        manage: 'Управлять обзорами',
                        block: 'Заблокировать',
                        grant: 'Назначить администратором',
                        ok: 'Ок',
                        confirm: 'Подтвердить',
                        cancel: 'Отмена',
                        confirmBlock: 'Подтвердите блокироку пользователя',
                        confirmGrant:
                            'Подтвердите назанчение администратором пользователя',
                        confirmDelete: 'Подтвердите удаление обзора',
                    },
                    general: {
                        product: 'Продукт',
                        product_type: 'Категория',
                        home: 'На Главную',
                        delete: 'Удалить',
                        text: 'Текст',
                        email: 'Email',
                        password: 'Пароль',
                        confirmPassword: 'Подтвердите пароль',
                        name: 'Имя',
                        mode: 'тема',
                        light: 'Темная',
                        dark: 'Светлая',
                    },
                    home: {
                        best: 'Лучшие обзоры',
                        last: 'Последние обзоры',
                    },
                    search: {
                        search: 'Поиск...',
                    },
                    detailed: {
                        edit: 'Править',
                    },
                    tags: {
                        add: '#теги',
                    },
                    feedback: {
                        askSignin: 'Пожалуйста, войдите в аккаунт',
                        signin: 'Войти',
                        useful: 'Полезно',
                        rate: 'Оцените',
                    },
                    comment: {
                        send: 'Отправить',
                        comments: 'Комментарии',
                        placeholder: 'Добавьте комментарий...',
                    },
                    drawer: {
                        admin: 'Панель админа',
                        my_reviews: 'Мои обзоры',
                        create_review: 'Создать обзор',
                        lang: 'Язык',
                        logout: 'Выйти',
                    },
                    product: {
                        Book: 'Книга',
                        Movie: 'Фильм',
                        TV_Series: 'Сериал',
                        Computer_Game: 'Компьютерная игра',
                        Music_Album: 'Музыкальный альбом',
                        Board_Game: 'Настольная игра',
                        Mobile_App: 'Приложение',
                        Other: 'Другое',
                        ['New Option']: 'Новый продукт',
                    },
                    create: {
                        create: 'Создать новый обзор',
                        edit: 'Править обзор',
                        type: 'Продукт',
                        title: 'Название обзора',
                        product: 'Название продукта',
                        rate: 'Ваша оценка',
                        imageDrag: 'Переместите изображение сюда...',
                        imageDrop:
                            'Переместите изображение сюда, или нажмите чтобы выбрать из файлов',
                        uploaded: 'Загруженные изобаржения',
                        existingImg: 'Загруженное изображение',
                        revert: 'Отменить удаление',
                        rejectedImages: 'Неподходящие изоражения',
                        deleteReview: 'Удалить обзор',
                        postEdited: 'Опубликовать',
                        post: 'Опубликовать',
                        deleted: 'Обзор удален',
                    },
                    yup: {
                        email: {
                            req: 'Укажите email',
                            format: 'Неправильный формат email',
                        },
                        name: 'Укажите имя',
                        password: {
                            min: 'Пароль должен быть длиной более 8 символов',
                            req: 'Укажите пароль',
                        },
                        confirmPassword: {
                            oneOf: 'Пароли не совпадают',
                            req: 'Введите пароль повторно',
                        },
                        review_name: 'Укажите назване обзора',
                        review_product: 'Укажите название продукта',
                        review_text: 'Введите текст',
                    },
                    registration: {
                        sign_in: 'Войти',
                        facebook_sign: 'Войти с Facebook',
                        twitter_sign: 'Войти с Twitter',
                        create_new: 'Создать новый аккаунт',
                        or: 'или',
                        sign_in_header: 'Вход в учетную запись',
                        sign_in_q:
                            'Первый раз на Recommend? Создайте учетную запись',
                        create_acc_header: 'Создайте учетную запись',
                        create_acc_button: 'Зарегистрироваться',
                        create_acc_q: 'Уже есть аккаунт? Войти',
                        accout_created: 'Аккаунт создан',
                    },
                    queryPage: {
                        searching: 'Поиск',
                    },
                },
            },
        },
    });

export default i18n;
