import { useMutation } from '@apollo/client';
import React, { SetStateAction } from 'react';
import { Button, Container, Divider, Form, FormProps, TextArea, DropdownProps, TextAreaProps } from 'semantic-ui-react';
import { DEPOSIT, SPEND } from '../../graphql/queries';


interface Iprops {
    toggleTransaction: () => void
    id: any
}


const TransactionForm: React.FC<Iprops> = ({ toggleTransaction, id }) => {
    const [deposit] = useMutation(DEPOSIT)
    const [spend] = useMutation(SPEND)
    const [transactionType, setTransactionType] = React.useState('')
    const [memo, setMemo] = React.useState('')
    const [amount, setAmount] = React.useState(0)


    const options = [
        { key: 'd', text: 'Deposit', value: 'deposit' },
        { key: 's', text: 'Spend', value: 'spend' },
    ]

    const buttonStyle = {
        marginBottom: "10px"
    }

    const handleTransactionType = (e: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
        e.preventDefault();
        setTransactionType(data?.value as string);

    }

    const handleMemo = (e: React.FormEvent<HTMLTextAreaElement>, data: TextAreaProps): void | undefined => {
        e.preventDefault();
        setMemo(data?.value as string);

    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        switch (transactionType) {
            case 'deposit':
                deposit({ variables: { id, amount, memo } });
                toggleTransaction()
                break;
            case 'spend':
                spend({ variables: { id, amount, memo } });
                toggleTransaction()
                break;
            default:
                break;
        }
    }


    return (
        <Container textAlign='left'>
            <Divider />
            <Form>
                <Form.Group widths={8}>
                    <Form.Input
                        fluid label='Amount'
                        placeholder='Amount'
                        onChange={({ target }) => setAmount(parseFloat(target.value))} />
                    <Form.Select
                        fluid
                        label='Type'
                        options={options}
                        placeholder='Type'
                        onChange={handleTransactionType}

                    />
                </Form.Group>
                <TextArea
                    style={{ width: "300px" }}
                    rows={2}
                    placeholder='Memo (optional)'
                    onChange={handleMemo}
                />
            </Form>
            <Divider />
            <Button type="submit" color="green" onClick={handleSubmit}>Submit</Button>
            <Button style={buttonStyle} type="submit" color="red" onClick={toggleTransaction}>Cancel</Button>
        </Container>
    )
}

export default TransactionForm;