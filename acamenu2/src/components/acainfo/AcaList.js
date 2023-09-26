import { useState } from 'react';
import AcaInfo from './AcaInfo';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import StarIcon from '@mui/icons-material/Star';

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
        <div>
            <Card key={item.id} sx={{
                width: '520px', // 원하는 크기로 수정
                margin: 'auto', // 가운데 정렬
                marginBottom: '16px',
                marginTop: '16px',

                // 반응형 스타일
                '@media (max-width: 768px)': {
                    width: '100%', // 작은 화면에서는 전체 너비 차지
                    maxWidth: '300px' // 작은 화면에서 최대 넓이 설정 (예시)
                },

            }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ marginBottom: '15px' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 180 }}
                            image="/logo.png"
                            alt="logo"
                        />

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Typography component="div" variant="h5">
                                    {title}
                                </Typography>
                            </div>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '14px', width: '100%' }} >
                                {content}
                            </Typography>
                            <Typography variant="h6" component="div" sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                                <StarIcon
                                    style={{ color: 'gold', fontSize: 18, marginTop: '15px' }}
                                />
                                {avgRating.toFixed(1)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '14px' }}>
                                {formatDate(date)}
                            </Typography>
                        </div>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ marginTop: '12px', justifyContent: 'flex-end' }}>
                        <Button variant="text" onClick={handleEditClick} sx={{ fontSize: '13px', fontWeight: 'bold' }}>수정</Button>
                        <Button variant="text" onClick={() => {
                            handleDeleteClick();
                            window.location.reload();
                        }} sx={{ fontSize: '13px', fontWeight: 'bold' }}>삭제</Button>
                    </Stack>
                </CardContent>
            </Card>
        </div>
    );
}

function AcaList({ items, onUpdate, onUpdateSuccess, onDelete }) {
    const [editingId, setEditingId] = useState(null);

    const handleCancel = () => setEditingId(null);

    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap', // 아이템들을 자동으로 줄바꿈
            gap: '16px', // 아이템 간격
            justifyContent: 'space-between', // 아이템들을 가로 방향으로 공간을 균등하게 배치

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