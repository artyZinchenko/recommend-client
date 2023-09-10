import { useQuery } from '@tanstack/react-query';
import { TagCloud as MyTagCloud } from 'react-tagcloud';
import { fetchTags } from '../../../services/review.services/fetchTags';
import '../Home.scss';
import Tags from './Tags';

const TagCloud = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['home-tag-cloud'],
        queryFn: async () => {
            const data = await fetchTags();
            console.log('fetch tags', data);
            return data.tags
                .map((t) => {
                    return {
                        id: t.tag_id,
                        value: '#' + t.tag_name,
                        count: t.usage,
                    };
                })
                .slice(0, 20);
        },
        staleTime: 5 * 60 * 1000,
    });

    if (isError) return null;

    if (isLoading) return null;

    return (
        <div className='container-cloud'>
            <div className='tag-cloud'>
                <Tags data={data} />
            </div>
        </div>
    );
};

export default TagCloud;
