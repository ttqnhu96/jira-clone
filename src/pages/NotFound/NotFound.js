import React from 'react'
import { Result, Button } from 'antd';
import { history } from '../../util/history';

export default function NotFound() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={() => { history.push('/projectmanagement'); }}>Back Home</Button>}
        />
    )
}