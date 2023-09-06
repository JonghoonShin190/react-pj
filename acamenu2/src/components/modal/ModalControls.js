import React, { useState } from 'react';
import Modal from './Modal'; // 모달 컴포넌트를 가져옵니다.

function AcaInfo() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <MainHeader />
            <BodyContainer>
                <InfoText>검색 옵션</InfoText>
                <CustomButton onClick={openModal}>전체</CustomButton>
                <CustomButton onClick={openModal}>수험</CustomButton>
                <CustomButton onClick={openModal}>자격증</CustomButton>
            </BodyContainer>
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    {/* 모달 내용을 추가하세요 */}
                    <h2>모달 내용</h2>
                    <p>모달 내용을 여기에 추가하세요.</p>
                </Modal>
            )}
            <MainFooter />
        </div>
    );
}

export default AcaInfo;
