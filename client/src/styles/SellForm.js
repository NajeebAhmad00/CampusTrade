import styled from 'styled-components'

export const TextArea = styled.textarea`
    width: 100%;
    height: 150px;
    min-height: 150px;
    max-height: 150px;
    border: 3px solid #d9d9d9;
    border-radius: 0.8rem;
    padding: 5px 10px;
    font-size: 1rem;

    &:focus {
        outline: none;
    }
`

export const Label = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 40px;
    background: #50AB64;
    color: #fff;
    cursor: pointer;
`