/// <reference types="react-scripts" />

interface RegistrationData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface SignInData {
    email: string;
    password: string;
}

interface Credentials {
    name?: string;
    email: string;
    password: string;
}

enum UserStatus {
    ACTIVE = 'ACTIVE',
    BLOCKED = 'BLOCKED',
}

interface User {
    id_user: string;
    email: string;
    password: string;
    user_status: UserStatus;
    user_name: string;
}

enum ReviewStatus {
    ACTIVE = 'ACTIVE',
    DELETED = 'DELETED',
}

interface AnotherUser {
    id_user: string;
    email: string;
    user_status: UserStatus;
    user_name: string;
}

interface Comment {
    comment_id: string;
    text: string;
    date: string;
    user: AnotherUser;
}

interface Review {
    id: string;
    name: string;
    text: string;
    group: string[];
    tags: string[];
    likes: number;
    status: ReviewStatus;
    images: string;
    score: number;
    rating: number;
    create_date: string;
    user: AnotherUser;
    comments: Comment[];
}

interface NewReview {
    name: string;
    productType: string;
    productTitle: string;
    images: string[];
    text: string;
    tags: string[];
    rating: number;
}

interface Tag {
    id: number;
    tag_name: string;
}

interface ImageFile extends File {
    preview: string;
}
