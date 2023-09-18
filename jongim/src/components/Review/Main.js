import React from 'react';

function Main(props) {
    // App 컴포넌트에서 전달받은 props 값은 아래와 같이 받아온다.
    const isLogin = props.isLogin

    return (
        <div>
            <div>
                <h2>Main 페이지</h2>
            </div>
            <div>
                <button>Logout</button>
            </div>
        </div>
    )
}

export default Main;