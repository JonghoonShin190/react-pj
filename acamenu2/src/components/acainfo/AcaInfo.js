import React, { useState } from 'react';
import MainHeader from '../main/MainHeader';
import MainFooter from '../main/MainFooter';
import Modal from '../modal/Modal'; // Modal 컴포넌트 파일 import
import { BodyContainer, InfoText, CustomButton, TableOfContents } from './AcaInfo.element'; // 스타일 import

function AcaInfo() {
  // 각 버튼에 대한 상태값과 모달 열기/닫기 함수를 각각 정의합니다.
  const [isAllModalOpen, setIsAllModalOpen] = useState(false);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // 각 모달 열기 함수를 정의합니다.
  const openAllModal = () => {
    setIsAllModalOpen(true);
  };

  const openExamModal = () => {
    setIsExamModalOpen(true);
  };

  const openCertModal = () => {
    setIsCertModalOpen(true);
  };

  // 각 모달 닫기 함수를 정의합니다.
  const closeAllModal = () => {
    setIsAllModalOpen(false);
  };

  const closeExamModal = () => {
    setIsExamModalOpen(false);
  };

  const closeCertModal = () => {
    setIsCertModalOpen(false);
  };

  return (
    <div>
      <MainHeader />
      <BodyContainer>
        <InfoText>검색 옵션</InfoText>
        {/* 각 버튼을 클릭하면 해당 모달이 열리도록 수정합니다. */}
        <CustomButton onClick={openAllModal}>전체</CustomButton>
        <CustomButton onClick={openExamModal}>수험</CustomButton>
        <CustomButton onClick={openCertModal}>자격증</CustomButton>
      </BodyContainer>
      <BodyContainer style={{ marginTop: '3px' }}>
        ddd
      </BodyContainer>
      {/* 각 버튼에 대한 모달을 렌더링합니다. */}
      {
        isAllModalOpen && (
          <Modal onClose={closeAllModal}>
            {/* 모달 내용을 추가하세요 */}
            <h2 style={{ margin: '3px' }}>전체 검색 옵션</h2>
            <TableOfContents>
              <li>
                <p>전체 검색 옵션 내용</p>
              </li>
              <br />
            </TableOfContents>
          </Modal>
        )
      }
      {
        isExamModalOpen && (
          <Modal onClose={closeExamModal}>
            {/* 모달 내용을 추가하세요 */}
            <h2 style={{ margin: '3px' }}>수험 검색 옵션</h2>
            <TableOfContents>
              <li>
                <p>수험 검색 옵션 내용</p>
              </li>
              <br />
            </TableOfContents>
          </Modal>
        )
      }
      {
        isCertModalOpen && (
          <Modal onClose={closeCertModal}>
            {/* 모달 내용을 추가하세요 */}
            <h2 style={{ margin: '3px' }}>자격증 검색 옵션</h2>
            <TableOfContents>
              <li>
                <p>자격증 검색 옵션 내용</p>
              </li>
              <br />
            </TableOfContents>
          </Modal>
        )
      }
      <MainFooter />
    </div >
  );
}

export default AcaInfo;
