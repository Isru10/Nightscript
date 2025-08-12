import Func from '@/components/Func'
import {screen,render} from '@testing-library/react'
import {userEvent} from '@testing-library/user-event'
test('expect to call function 1 times',async ()=>{
    const myfunc = jest.fn()
    render(<Func osubmit={myfunc}/>)
    await userEvent.click(screen.getByText('submit') )
    await userEvent.click(screen.getByText('submit') )
    expect(myfunc).toHaveBeenCalledTimes(2)
})