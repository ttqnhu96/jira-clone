import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ContentMain from '../../components/Cyberbugs/Main/ContentMain'
import HeaderMain from '../../components/Cyberbugs/Main/HeaderMain'
import InfoMain from '../../components/Cyberbugs/Main/InfoMain'
import { GET_PROJECT_DETAIL_SAGA } from '../../redux/constants/Cyberbugs/Cyberbugs';

export default function ProjectDetail(props) {
    let { projectDetail } = useSelector(state => state.ProjectReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        const { projectId } = props.match.params;
        dispatch({
            type: GET_PROJECT_DETAIL_SAGA,
            projectId: projectId
        })
    }, [dispatch, props.match.params])

    return (
        <div className="main">
            <HeaderMain projectDetail={projectDetail} />
            <InfoMain projectDetail={projectDetail} />
            <ContentMain projectDetail={projectDetail} />
        </div>
    )
}