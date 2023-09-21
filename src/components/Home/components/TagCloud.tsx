import { useQuery } from '@tanstack/react-query';
import { fetchTags } from '../../../services/review.services/fetchTags';
import '../Home.scss';
import Tags from './Tags';

const TagCloud = () => {
    const { data, isError } = useQuery({
        queryKey: ['home-tag-cloud'],
        queryFn: async () => {
            const data = await fetchTags();
            return data.tags
                .map((t) => {
                    return {
                        id: t.tag_id,
                        value: '#' + t.tag_name,
                        count: t.usage,
                    };
                })
                .slice(0, 12);
        },
        staleTime: 5 * 60 * 1000,
    });

    if (isError) return null;

    return (
        <div className='container-cloud'>
            <Tags data={data} />
        </div>
    );
};

export default TagCloud;
