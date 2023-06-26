import { Button, styled as muistyled } from '@mui/material'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Input = styled.input`
    height: 30px;
    width: ${props => props.form ? '100%' : '60%'};
    border: ${props => props.from ? '3px solid #d9d9d9' : '2px solid #d9d9d9'};
    border-radius: 0.8rem;
    padding: 5px 10px;
    font-size: 1rem;
    -moz-appearance: textfield;

    &:focus {
        outline: none;
    }
`

export const CustomInput = styled.input`
    height: 30px;
    width: ${props => props.form ? '100%' : '60%'};
    border: ${props => props.from ? '3px solid #d9d9d9' : '2px solid #d9d9d9'};
    border-top-left-radius: 0.8rem;
    border-bottom-left-radius: 0.8rem;
    padding: 5px 10px;
    font-size: 1rem;
    -moz-appearance: textfield;

    &:focus {
        outline: none;
    }
`

export const ProfileImg = styled.div`
    height: 250px;
    width: 250px;
    cursor: pointer;
    background: url('${props => props.src}') center center/cover;
    border-radius: 50%;

    @media (max-width: 768px) {
    height: 150px;
    }
`

export const StyledButton = muistyled(Button)({
    background: '#6EA96B',
    width: 'fit-content',
    '&:hover': {
        background: '#6EA96B'
    }
})

