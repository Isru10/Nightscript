
import Btn from '@/components/Btn'
import {screen,render} from '@testing-library/react'
test('expect to find my button text in btn component' , () => {
    render(<Btn label='my button text'/>)
    expect(screen.getByText('my button text')).toBeInTheDocument()
})