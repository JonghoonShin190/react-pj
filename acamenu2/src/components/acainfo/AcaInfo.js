import React, { useState } from 'react';
import MainHeader from '../main/MainHeader';
import MainFooter from '../main/MainFooter';
import Modal from '../modal/Modal'; // Modal 컴포넌트 파일 import
import AcaInfoHamsu from './AcaInfoHamsu'
import { BodyContainer, InfoText, CustomButton, TableDesign } from './AcaInfo.element'; // 스타일 import

function AcaInfo() {
  const {
    isAllModalOpen,
    isSuheomModalOpen,
    isLicenceModalOpen,
    allButtonClicked,
    suheomButtonClicked,
    licenceButtonClicked,
    suheomClick1,
    suheomClick2,
    suheomClick3,
    licenceClick1,
    licenceClick2,
    licenceClick3,
    openAllModal,
    openSuheomModal,
    openLicenceModal,
    closeAllModal,
    closeSuheomModal,
    closeLicenceModal,
  } = AcaInfoHamsu();
  return (
    <div>
      <MainHeader />
      <BodyContainer>
        <InfoText>검색 옵션</InfoText>
        {/* 각 버튼을 클릭하면 해당 모달이 열리도록 수정합니다. */}
        <CustomButton
          onClick={openAllModal}
          clicked={allButtonClicked}
        >
          전체
        </CustomButton>
        <CustomButton
          onClick={openSuheomModal}
          clicked={suheomButtonClicked}
        >
          수험
        </CustomButton>
        <CustomButton
          onClick={openLicenceModal}
          clicked={licenceButtonClicked}
        >
          자격증
        </CustomButton>

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
            <TableDesign>
              <li>
                <p>전체 검색 옵션 내용</p>
              </li>
              <br />
            </TableDesign>
          </Modal>
        )
      }
      {
        isSuheomModalOpen && (
          <Modal onClose={closeSuheomModal}>
            {/* 모달 내용을 추가하세요 */}
            <h2 style={{ margin: '3px' }}>수험 검색 옵션</h2>
            <TableDesign>
              <li>
                <p onClick={suheomClick1}>수험 검색 옵션 내용1</p>
              </li>
              <li>
                <p onClick={suheomClick2}>수험 검색 옵션 내용2</p>
              </li>
              <li>
                <p onClick={suheomClick3}>수험 검색 옵션 내용3</p>
              </li>
              <br />
            </TableDesign>
          </Modal>
        )
      }
      {
        isLicenceModalOpen && (
          <Modal onClose={closeLicenceModal}>
            {/* 모달 내용을 추가하세요 */}
            <h2 style={{ margin: '3px' }}>자격증 검색 옵션</h2>
            <TableDesign>
              <li>
                <p onClick={licenceClick1}>자격증 검색 옵션 내용1</p>
              </li>
              <li>
                <p onClick={licenceClick2}>자격증 검색 옵션 내용2</p>
              </li>
              <li>
                <p onClick={licenceClick3}>자격증 검색 옵션 내용3</p>
              </li>
              <br />
            </TableDesign>
          </Modal>
        )
      }
      <MainFooter />
    </div >
  );
}

export default AcaInfo;
