import React, { useState } from 'react'
import { Avatar, Layout, Menu } from 'antd';
import {
    BarsOutlined,
    SearchOutlined,
    LogoutOutlined,
    LoginOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { OPEN_FORM_CREATE_TASK } from '../../redux/constants/Cyberbugs/Cyberbugs';
import FormCreateTask from '../Forms/FormCreateTask/FormCreateTask';
import { useDispatch } from 'react-redux';
import { history } from '../../util/history';
import { TOKEN, USER_LOGIN } from '../../util/constants/settingSystem';
import { UserOutlined } from '@ant-design/icons';

const { Sider } = Layout;
export default function SidebarCyberbugs() {
    let dispatch = useDispatch();
    const [state, setState] = useState({
        collapsed: false,
    })
    const toggle = () => {
        setState({
            collapsed: !state.collapsed,
        });
    };

    const renderAuthenticationItem = () => {
        if (localStorage.getItem(USER_LOGIN) && localStorage.getItem(TOKEN)) {
            return <Menu.Item key="3" icon={<LogoutOutlined style={{ fontSize: 20 }} />}
                onClick={() => {
                    localStorage.removeItem(USER_LOGIN);
                    localStorage.removeItem(TOKEN);
                    history.push('/login');
                }}>
                Logout
            </Menu.Item>
        }
        else {
            return <Menu.Item key="3" icon={<LoginOutlined style={{ fontSize: 20 }} />}
                onClick={() => { history.push('/login'); }}>
                Login
            </Menu.Item>
        }
    }
    return (
        <div>
            <Sider trigger={null} collapsible collapsed={state.collapsed} style={{ height: '133vh' }}>
                <div className="text-right pr-2" onClick={toggle} ><BarsOutlined style={{ cursor: 'pointer', color: '#fff', fontSize: 25 }} /></div>
                <div className="ml-2 mb-3">
                    {localStorage.getItem(USER_LOGIN) ?
                        <Avatar src={JSON.parse(localStorage.getItem(USER_LOGIN))?.avatar} alt='avatar' />
                        : <Avatar icon={<UserOutlined />} />}

                    <span className="ml-2" style={{ fontWeight: 'bold', color: 'white' }}>{JSON.parse(localStorage.getItem(USER_LOGIN))?.name}</span>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<PlusOutlined style={{ fontSize: 20 }} />}
                        onClick={() => {
                            if (localStorage.getItem(USER_LOGIN) && localStorage.getItem(TOKEN)) {
                                dispatch({
                                    type: OPEN_FORM_CREATE_TASK,
                                    Component: <FormCreateTask />,
                                    title: 'Create task'
                                })
                            } else {
                                history.push('/login');
                            }
                        }}>
                        <span className="mb-2">Create issue</span>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<SearchOutlined style={{ fontSize: 20 }} />}>
                        Search
                    </Menu.Item>
                    {renderAuthenticationItem()}
                </Menu>
            </Sider>
        </div>
    )
}