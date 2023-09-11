import { useEffect, useState } from 'react';
import NewsList from './NewsList';
import { getNews, updateNews, deleteNews } from '../api';
import Button from '@mui/material/Button';
import ModeIcon from '@mui/icons-material/Mode';
import AverageStringBar from './AverageStringBar';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import NewsForm, { handleCreateSuccess } from './NewsForm';
import React from 'react';
import { createNews } from '../api';



const LIMIT = 6; //페이지당 보이는 갯수

function App() {

  const [order, setOrder] = useState('date');  //정렬 항목
  const [offset, setOffset] = useState(0); //시작위치
  const [hasNext, setHasNext] = useState(false);  //추가페이지 존재여부

  const [items, setItems] = useState([]);
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const [isLoading, setIsLoading] = useState(false); //로딩 처리
  const [loadingError, setIsLoadingError] = useState(null);

  const handleNewestClick = () => setOrder('date') //정렬
  const handleBestClick = () => setOrder('rating')


  //삭제
  const handleDelete = async (aid) => {
    try {
      deleteNews(aid);
      const nextItems = items.filter((item) => item.aid !== aid);
      setItems(nextItems);
    } catch (error) {
      setIsLoadingError(error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleLoad = async (options) => {
    let result;

    try {
      setIsLoading(true); //로딩중을 패치전 disabled (true)
      setIsLoadingError(null);
      result = await getNews(options);
    } catch (error) {
      setIsLoadingError(error);
      return;
    } finally {
      setIsLoading(false);  //더보기 버튼 다시 활성화
    }


    const { paging, news } = result;
    setIsLoading(false);

    if (options.offset === 0) {
      setItems(news); // 0, 6
    } else {
      setItems(prevItems => [...prevItems, ...news]);

    }
    setOffset(options.offset + options.limit);  //시작위치 변경

    let parsePaging = JSON.parse(paging);
    setHasNext(parsePaging.hasNext);

  };


  const handleLoadMore = async () => {
    handleLoad({ order, offset, limit: LIMIT });
  };


  const handleUpdateSuccess = (news) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.aid === news.aid);
      return [
        ...prevItems.slice(0, splitIdx),
        news,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {/* Main Page */}
          <div>
            {/* ... other code */}
            <div>
              <Box sx={{
                width: '100%',
                maxWidth: '700px',
                margin: '0 auto',
                padding: '0 16px',
                border: '0px solid rgba(0 ,0 ,0 , 0.1)',

                // 반응형 스타일
                '@media (max-width: 768px)': {
                  padding: '0'
                }
              }}>
                <div>
                  <h2>학원 후기</h2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4>학원 후기를 작성해주세요!</h4>
                  <Link to="/write" style={{ textDecoration: 'none' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      className="button"
                      sx={{
                        mt: 3, mb: 4,
                        backgroundImage: 'linear-gradient(45deg, #9370DB 30%, #0288d1 90%)',
                        color: 'white',
                        fontSize: '15px',
                        width: 'auto'
                      }}>
                      <div style={{ marginRight: '5px' }}><ModeIcon /></div>
                      후기 작성 하기
                    </Button>
                  </Link>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <StarIcon style={{ color: "gold", fontSize: 50 }} />
                      <Typography variant="h6" component="div" sx={{ fontSize: '40px', fontWeight: 'bold', marginLeft: '10px' }}>
                        4.4
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1" component="p">
                        추천율 100.0%
                      </Typography>
                    </div>
                  </div>
                  <AverageStringBar rating={4} />
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNewestClick}
                    className="button"
                    sx={{
                      mt: 3,
                      mb: 2,
                      marginRight: '20px',
                      backgroundImage: 'linear-gradient(45deg, #9370DB 30%, #0288d1 90%)',
                      color: 'white',
                      fontSize: '12px',
                      width: 'auto'
                    }}>
                    최신순
                  </Button>
                  <Button fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleBestClick}
                    className="button"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundImage: 'linear-gradient(45deg, #9370DB 30%, #0288d1 90%)',
                      color: 'white',
                      fontSize: '12px',
                      width: 'auto'
                    }}>
                    평점 높은순
                  </Button>

                </div>
              </Box>

              <NewsList
                items={sortedItems}
                onUpdate={updateNews}
                onUpdateSuccess={handleUpdateSuccess}
                onDelete={handleDelete}
              />
              {hasNext && (
                <Button fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                  onClick={handleLoadMore}
                  className="button"
                  sx={{
                    mt: 3,
                    mb: 2,
                    ml: '440px',
                    backgroundImage: 'linear-gradient(45deg, #9370DB 30%, #0288d1 90%)',
                    color: 'white',
                    fontSize: '12px',
                    width: 'auto'
                  }}>
                  더보기
                </Button>

              )}
              {loadingError?.message && <span>{loadingError.message}</span>}
            </div>
            {/* ... other code */}
          </div>
        </Route>
        <Route path="/write">
          {/* Write Review Page */}
          {/* NewsForm.js 컴포넌트가 여기에 들어갑니다. */}
          <NewsForm onSubmit={createNews} onSubmitSuccess={handleCreateSuccess} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
