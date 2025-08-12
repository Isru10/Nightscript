import Mybtn from '@/components/Mybtn'
import {screen,render} from '@testing-library/react'
import {userEvent } from '@testing-library/user-event'
test('expect to see button is clicked text' , async()=>{
    render(<Mybtn/>)
    const button = screen.getByRole('button',{name:'click here'})
    await userEvent.click(button)
    expect(screen.getByText('button is clicked')).toBeInTheDocument()
})