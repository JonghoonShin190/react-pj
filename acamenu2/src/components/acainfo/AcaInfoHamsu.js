import { useState, useEffect } from "react";
import { getReview, updateReview, deleteReview } from '../../Api';

function AcaInfoHamsu() {

    const LIMIT = 6; //페이지당 보이는 갯수

    const [order, setOrder] = useState('date');  //정렬 항목
    const [offset, setOffset] = useState(0); //시작위치
    const [hasNext, setHasNext] = useState(false);  //추가페이지 존재여부

    const [items, setItems] = useState([]);
    // console.log(items);
    const sortedItems = [...items].sort((a, b) => b[order] - a[order]);
    // console.log(sortedItems)

    const [isLoading, setIsLoading] = useState(false); //로딩 처리
    const [loadingError, setIsLoadingError] = useState(null);

    const handleNewestClick = () => setOrder('date') //정렬
    const handleBestClick = () => setOrder('avgRating')

    //삭제
    const handleDelete = async (aid) => {
        try {
            await deleteReview(aid);
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
            result = await getReview(options);
        } catch (error) {
            setIsLoadingError(error);
            return;
        } finally {
            setIsLoading(false);  //더보기 버튼 다시 활성화
        }


        const { paging, review } = result;
        setIsLoading(false);

        if (options.offset === 0) {
            setItems(review); // 0, 6
        } else {
            if (Array.isArray(review)) {
                setItems(prevItems => [...prevItems, ...review]);
            } else {
                console.error('Review data is not an array:', review);
            }
        }
        setOffset(options.offset + options.limit);

        let parsePaging = JSON.parse(paging);
        setHasNext(parsePaging.hasNext);

    };


    const handleLoadMore = async () => {
        const newOffset = offset + LIMIT;
        handleLoad({ order, offset: newOffset, limit: LIMIT });
    };


    const handleUpdateSuccess = (review) => {
        setItems((prevItems) => {
            const splitIdx = prevItems.findIndex((item) => item.aid === review.aid);
            return [
                ...prevItems.slice(0, splitIdx),
                review,
                ...prevItems.slice(splitIdx + 1),
            ];
        });
    };

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                setIsLoadingError(null);
                const result = await getReview({ order, offset: 0, limit: LIMIT });
                console.log(result)
                setItems(result.news);
                const { paging } = result;
                setOffset(LIMIT); // 시작 위치 설정
                let parsePaging = JSON.parse(paging);
                setHasNext(parsePaging.hasNext);
            } catch (error) {
                setIsLoadingError(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [order]);


    return {

        handleNewestClick,
        handleBestClick,
        handleDelete,
        handleLoadMore,
        handleUpdateSuccess,
        hasNext,
        sortedItems,
        isLoading,
        loadingError,
        updateReview

    };
}

export default AcaInfoHamsu;