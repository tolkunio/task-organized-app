import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, createTheme, IconButton, Stack, TextField, ThemeProvider, Tooltip} from '@mui/material';
import {AddBox, AddOutlined} from '@mui/icons-material';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean,
    fullWidth?: boolean,
    label?: string,
    iconButton?: boolean
}

export const AddItemForm = React.memo(
    function (
        {
            addItem,
            disabled = false,
            fullWidth = false,
            label,
            iconButton = false,
        }: AddItemFormPropsType) {

        let [title, setTitle] = useState('')
        let [error, setError] = useState<string | null>(null)

        const addItemHandler = () => {
            if (title.trim() !== '') {
                addItem(title);
                setTitle('');
            } else {
                setError('Title is required');
            }
        }

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
        }

        const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (error !== null) {
                setError(null);
            }
            if (e.charCode === 13) {
                addItemHandler();
            }
        }

        return <Stack direction='row'>
            <TextField variant="outlined"
                       disabled={disabled}
                       error={!!error}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       label={label}
                       helperText={error}
                       fullWidth={fullWidth}
            />
            {
                iconButton ?
                    <Tooltip title="добавить" arrow>
                        <Button style={{marginLeft: '20px', maxWidth: '200px', width: '100%'}}
                                variant="contained"
                                startIcon={<AddOutlined/>}
                                onClick={addItemHandler}
                                disabled={disabled}>
                            Добавить
                        </Button>
                    </Tooltip>
                    :
                    <Tooltip title="добавить">
                        <IconButton color="primary"
                                    onClick={addItemHandler}
                                    disabled={disabled}>
                            <AddBox/>
                        </IconButton>
                    </Tooltip>


            }
        </Stack>
    })
