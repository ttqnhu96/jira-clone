import React from 'react'
import { Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_DRAWER } from '../../redux/constants/Cyberbugs/Cyberbugs';



export default function DrawerCyberBugs(props) {
    const { visible, ComponentContentDrawer, callBackSubmit, title } = useSelector(state => state.DrawerCyberbugsReducer);
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch({ type: CLOSE_DRAWER });

    };
    return (
        <>
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}

                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button onClick={callBackSubmit} type="primary">
                            Submit
                        </Button>
                    </div>
                }
            >
                {/* Nội dung thay đổi của drawer */}
                {ComponentContentDrawer}
            </Drawer>
        </>
    )
}