import { ThemeProvider, Textarea } from '@primer/react';
import { InlineAutocomplete } from '@primer/react/drafts';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchTags } from '../../../services/review.services';

interface Props {
    setTagInput: React.Dispatch<React.SetStateAction<string>>;
    tagInput: string;
}

const AddTags = ({ setTagInput, tagInput }: Props) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const { data } = useQuery<Tag[]>({
        queryKey: ['tags'],
        queryFn: async () => {
            const data = await fetchTags();
            return data.tags;
        },
    });

    return (
        <ThemeProvider>
            <div>
                <InlineAutocomplete
                    triggers={[{ triggerChar: '#' }]}
                    suggestions={suggestions}
                    onShowSuggestions={({ query }) => {
                        if (!data) {
                            setSuggestions([]);
                        } else {
                            setSuggestions(
                                data
                                    .filter((tag) =>
                                        tag.tag_name.startsWith(query)
                                    )
                                    .map((t) => t.tag_name)
                            );
                        }
                    }}
                    onHideSuggestions={() => setSuggestions([])}
                >
                    <Textarea
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        block={true}
                        cols={100}
                        style={{ fontSize: '1.3em', resize: 'none' }}
                    />
                </InlineAutocomplete>
            </div>
        </ThemeProvider>
    );
};

export default AddTags;
