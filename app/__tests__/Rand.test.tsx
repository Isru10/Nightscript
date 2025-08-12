import Rand from '@/components/Rand'
import {screen,render} from '@testing-library/react'
import {userEvent} from '@testing-library/user-event'
test('expect the rand component to update and display name input', async ()=>{
    render(<Rand label='namecomponent' /> )
    const inputform = screen.getByPlaceholderText('name')
    await userEvent.type(inputform,'isru man')
    expect(screen.getByTestId('display_name')).toHaveTextContent('isru man')
    


})