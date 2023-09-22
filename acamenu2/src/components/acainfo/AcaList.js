import { useState } from 'react';
import AcaInfo from './AcaInfo';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function formatDate(value) {
    const date = new Date(value);
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
}

function AcaListItem({ item, onDelete, onEdit }) {
    const handleDeleteClick = () => {
        onDelete(item.aid);
    }

    const { title, img, date, content, avgRating } = item;
    const handleEditClick = () => {
        onEdit(item.aid)
    };

    return (
        <Card sx={{
            width: '800px', // 원하는 크기로 수정
            margin: 'auto', // 가운데 정렬
            marginBottom: '16px',
            marginTop: '16px',

            // 반응형 스타일
            '@media (max-width: 768px)': {
                width: '100%', // 작은 화면에서는 전체 너비 차지
                maxWidth: '300px' // 작은 화면에서 최대 넓이 설정 (예시)
            },

        }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ marginBottom: '15px' }}>
                    <Avatar src="/broken-image.jpg" />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Typography variant="h6" component="div" sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                                {avgRating.toFixed(1)}
                            </Typography>


                        </div>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '14px' }}>
                            {formatDate(date)}
                        </Typography>
                    </div>
                </Stack>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* 로고 들어갈 위치*/}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexBasis: '100%', marginLeft: '20px' }}>
                        <Typography variant="h5" component="div" sx={{ fontSize: '15px', marginBottom: '10px', fontWeight: 'bold', width: '100%' }}>
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '14px', width: '100%' }} >
                            {content}
                        </Typography>
                    </div>
                </div>
                <Stack direction="row" spacing={1} sx={{ marginTop: '12px' }}>
                    <Button variant="text" onClick={handleEditClick} sx={{ fontSize: '13px', fontWeight: 'bold' }}>수정</Button>
                    <Button variant="text" onClick={() => {
                        handleDeleteClick();
                        window.location.reload();
                    }} sx={{ fontSize: '13px', fontWeight: 'bold' }}>삭제</Button>
                </Stack>
            </CardContent>
        </Card>
    );
}

function AcaList({ items, onUpdate, onUpdateSuccess, onDelete }) {
    const [editingId, setEditingId] = useState(null);

    const handleCancel = () => setEditingId(null);

    return (
        <Box sx={{
            width: '100%',
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '0 16 px ',
            border: '1px solid rgba(0 ,0 ,0 , 0.1)',

            // 반응형 스타일
            '@media (max-width: 768px)': {
                padding: '0'
            }
        }}>
            {items.map((item) => {
                if (item.aid === editingId) {
                    const { aid, img, title, content, avgRating } = item;
                    const initialValues = { title, avgRating, content };
                    const handleSubmit = (formData) => onUpdate(aid, formData);
                    const handleSubmitSuccess = (review) => {
                        onUpdateSuccess(review);
                        setEditingId(null);
                    };
                    return (
                        <div key={item.aid}>
                            <AcaInfo
                                initialValues={initialValues}
                                initialPreview={img}
                                onSubmit={handleSubmit}
                                onSubmitSuccess={handleSubmitSuccess}
                                onCancel={handleCancel}
                            />
                        </div>
                    );
                }
                return (
                    <div key={item.aid}>
                        <AcaListItem
                            item={item}
                            onDelete={onDelete}
                            onEdit={() => setEditingId(item.aid)}
                        />
                    </div>
                );
            })}
        </Box>
    );
}

export default AcaList;