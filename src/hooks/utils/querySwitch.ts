import { fetchByTag } from '../../services/review.services/fetchByTag';
import { fulltext } from '../../services/review.services/fulltext';

export async function querySwitch(type: string | null, query: string | null) {
    if (!query || !type) throw new Error('Incorrect type or query');

    switch (type) {
        case 'tag': {
            return await fetchByTag(query);
        }
        case 'fulltext': {
            return await fulltext(query);
        }
    }
}
