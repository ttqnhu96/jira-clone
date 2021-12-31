import React, { useEffect } from 'react'
import { Popconfirm, Table, Input, Button } from 'antd';
import { FormOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_USER_SAGA, EDIT_USER, GET_LIST_USER_SAGA, OPEN_FORM_CREATE_USER, OPEN_FORM_EDIT_USER } from '../../redux/constants/Cyberbugs/Cyberbugs';
import FormEditUser from '../../components/Forms/FormEditUser/FormEditUser';
import FormCreateUser from '../../components/Forms/FormCreateUser/FormCreateUser';

export default function UserManagement() {
    const userList = useSelector(state => state.UserReducer.userList)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: GET_LIST_USER_SAGA,
            userKeyword: ''
        })
    }, [dispatch])

    const onSearch = (value) => {
        dispatch({
            type: GET_LIST_USER_SAGA,
            userKeyword: value
        })
    }

    const renderSearchBox = () => {
        const { Search } = Input;
        
        return <div className="mt-3 mb-3">
            <Search placeholder="Search..." allowClear enterButton="Search" size="large" onSearch={onSearch} />
        </div>
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'userId',
            key: 'userId',
            sorter: (item2, item1) => {
                return item2.userId - item1.userId;
            },
            sortDirections: ['descend'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (item2, item1) => {
                let email1 = item1.email?.trim().toLowerCase();
                let email2 = item2.email?.trim().toLowerCase();
                if (email1 < email2) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (item2, item1) => {
                let name1 = item1.email?.trim().toLowerCase();
                let name2 = item2.email?.trim().toLowerCase();
                if (name1 < name2) {
                    return -1;
                }
                return 1;
            },
        },

        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            sorter: (item2, item1) => {
                let phoneNumber1 = item1.phoneNumber;
                let phoneNumber2 = item2.phoneNumber;
                if (phoneNumber1 < phoneNumber2) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => {
                return <div>
                    <button className="btn mr-2 btn-primary" onClick={() => {
                        const action = {
                            type: OPEN_FORM_EDIT_USER,
                            Component: <FormEditUser />,
                            title: "Edit user"
                        }
                        dispatch(action);

                        const actionEditUser = {
                            type: EDIT_USER,
                            userEditModel: record
                        }
                        dispatch(actionEditUser);
                    }}>
                        <FormOutlined style={{ fontSize: 17 }} />
                    </button>
                    <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={() => {
                            dispatch({ type: DELETE_USER_SAGA, idUser: record.userId })
                        }}

                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="btn btn-danger">
                            <DeleteOutlined style={{ fontSize: 17 }} />
                        </button>
                    </Popconfirm>

                </div>
            },
        }
    ];

    return (
        <div className="container-fluid m-5">
            <h3>User management</h3>
            <Button shape="round" className="bg-success text-white mt-4" icon={<UserAddOutlined />}
            onClick={()=>{
                const action = {
                    type: OPEN_FORM_CREATE_USER,
                    Component: <FormCreateUser />,
                    title: "Create user"
                }
                dispatch(action);
            }}>Create User</Button>
            {renderSearchBox()}
            <Table columns={columns} rowKey={"userId"} dataSource={userList} onChange={() => { }} />
        </div>
    )
}
