import React from 'react'
import Promotions from '../components/promotions'


const Page3 = () => {

    const messages = ["This is message One", "Another message"]
    return (
        <div>
            <p> Page 3</p>

                <Promotions messages={messages} bgColor={"#e8b32e"} />
        </div>
    )

}
export default Page3