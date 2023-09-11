import { useState } from 'react';
import NewsForm from './NewsForm';
import Rating from './Rating';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
}

function NewsListItem({ item, onDelete, onEdit }) {
  const handleDeleteClick = () => {
    onDelete(item.aid);
  }
  
  const { title, rating, date, content } = item;  
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
        maxWidth:'300px' // 작은 화면에서 최대 넓이 설정 (예시)
      },
        
     }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>      
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar src="/broken-image.jpg" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" component="div" sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                {rating.toFixed(1)} {/*별 소수점 첫째자리*/}
              </Typography>
              <Rating value={rating} />
            </div>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px' }}>
              {formatDate(date)}
            </Typography>
          </div>
        </Stack>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ fontSize: '8px', fontWeight: 'bold' }}>
              강의력
             </Typography>
            <Rating value={rating} />                      
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ fontSize: '8px', fontWeight: 'bold' }}>
              커리큘럼
             </Typography>
            <Rating value={rating} />                      
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ fontSize: '8px', fontWeight: 'bold' }}>
              서비스
             </Typography>
            <Rating value={rating} />                      
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ fontSize: '8px', fontWeight: 'bold' }}>
              편의성
             </Typography>
            <Rating value={rating} />                      
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ fontSize: '8px', fontWeight: 'bold' }}>
              가성비
             </Typography>
            <Rating value={rating} />                      
          </div>
          </div>                      
           
            <div style={{ flexBasis: '75%' }}>
            <Typography variant="h5" component="div" sx={{ fontSize: '15px', marginBottom: '8px', fontWeight: 'bold' }}>
               {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px' }}>
               {content}
            </Typography>
            </div>            
          </div>
          <Stack direction="row" spacing={1}>
            <button onClick={handleEditClick}>수정</button>
            <button onClick={handleDeleteClick}>삭제</button>              
            </Stack>
        </CardContent>
    </Card>     
   );
}

function NewsList({ items, onUpdate, onUpdateSuccess, onDelete }) {
    const [editingId, setEditingId] = useState(null);
    
    const handleCancel = () => setEditingId(null);

    return (
        <Box sx={{
          width:'100%',
           maxWidth:'1000px',
           margin:'0 auto',
           padding:'0 16 px ',
           border:'1px solid rgba(0 ,0 ,0 , 0.1)',
           
            // 반응형 스타일
      '@media (max-width: 768px)': {
        padding: '0'
      }
    }}>
      {items.map((item) => {
        if (item.aid === editingId) {
          const { aid, img, title, rating, content } = item;
          const initialValues = { title, rating, content };
          const handleSubmit = (formData) => onUpdate(aid, formData);
          const handleSubmitSuccess = (news) => {
            onUpdateSuccess(news);
            setEditingId(null);
          };
          return (
            <div key={item.aid}>
              <NewsForm
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
            <NewsListItem
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

export default NewsList;
