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

interface ReviewDB {
    review_id: string;
    name: string;
    text: string;
    product: string;
    type: string;
    status: string;
    images: string[];
    score: number;
    create_date: string;
    authorId: string;
    tags: TagObject[];
}

interface NewReview {
    name: string;
    productType: string;
    productTitle: string;
    images: string[];
    text: string;
    tags: string[];
    score: number;
}

interface UpdateReview extends NewReview {
    review_id: string;
    authorId: string;
}

interface Tag {
    tag_id: number;
    tag_name: string;
}
interface TagObject {
    tag: Tag;
}

interface ImageFile extends File {
    preview: string;
}
