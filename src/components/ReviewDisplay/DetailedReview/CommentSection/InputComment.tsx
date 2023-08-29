import { Button, TextField } from '@mui/material';

interface Props {
    inputText: string;
    setInputText: React.Dispatch<React.SetStateAction<string>>;
    handleSend: () => void;
    disabled: boolean;
}

const InputComment = ({
    inputText,
    setInputText,
    handleSend,
    disabled,
}: Props) => {
    return (
        <div className='flex-row justify-start items-start gap-4'>
            <TextField
                multiline
                maxRows={3}
                value={inputText}
                sx={{ width: '100%' }}
                onChange={(e) => setInputText(e.target.value)}
                placeholder='Add comment...'
            />
            <Button
                variant='contained'
                onClick={handleSend}
                disabled={disabled}
            >
                Send
            </Button>
        </div>
    );
};
export default InputComment;
