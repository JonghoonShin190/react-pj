import React from 'react';
import { Link } from 'react-router-dom';

import MainHeader, { sections } from '../main/MainHeader';
import MainFooter from '../main/MainFooter';
import AcaInfoHamsu from './AcaInfoHamsu'
import AcaList from './AcaList';

import ModalTest from '../AcaInfoModal/Modal';
import ModalHamsu from '../AcaInfoModal/ModalHamsu';

import Button from '@mui/material/Button';
import { BodyContainer, InfoText, CustomButton, TableDesign } from './AcaInfo.element'; // 스타일 import
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Container from "@mui/material/Container";

function AcaInfo() {
  const {
    handleNewestClick,
    handleBestClick,
    handleDelete,
    handleLoadMore,
    handleUpdateSuccess,
    hasNext,
    sortedItems,
    isLoading,
    updateReview
  } = AcaInfoHamsu();

  const {
    allButtonClicked,
    suheomButtonClicked,
    licenceButtonClicked,
    openAllModal,
    openSuheomModal,
    openLicenceModal,
    isAllModalOpen,
    isSuheomModalOpen,

    isLicenceModalOpen,
    suheomClick1,
    suheomClick2,
    suheomClick3,
    licenceClick1,
    licenceClick2,
    licenceClick3,
    closeAllModal,
    closeSuheomModal,
    closeLicenceModal,
  } = ModalHamsu();

  const defaultTheme = createTheme();

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Container maxWidth="lg">
          <MainHeader title="Main" sections={sections} />

          <BodyContainer>
            <InfoText>학원 리스트</InfoText>

            <CustomButton
              onClick={openAllModal}
              clicked={allButtonClicked}>
              전체
            </CustomButton>


            <CustomButton
              onClick={openSuheomModal}
              clicked={suheomButtonClicked}>
              수험
            </CustomButton>

            <CustomButton
              onClick={openLicenceModal}
              clicked={licenceButtonClicked}>
              자격증
            </CustomButton>

          </BodyContainer>
          <BodyContainer style={{ marginTop: '3px' }}>
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
            <AcaList
              items={sortedItems}
              onUpdate={updateReview}
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
                  ml: '350px',
                  backgroundImage: 'linear-gradient(45deg, #9370DB 30%, #0288d1 90%)',
                  color: 'white',
                  fontSize: '12px',
                  width: 'auto'
                }}>
                더보기
              </Button>
            )}
          </BodyContainer>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link to="/AcaWriteForm" style={{ textDecoration: 'none' }}>
              <CustomButton>학원 등록</CustomButton>
            </Link>
          </div>
          {
            isAllModalOpen && (
              <ModalTest onClose={closeAllModal}>
                <h2 style={{ margin: '3px' }}>전체 검색 옵션</h2>
                <TableDesign>
                  <li>
                    <p>전체 검색 옵션 내용</p>
                  </li>
                  <br />
                </TableDesign>
              </ModalTest>
            )
          }
          {
            isSuheomModalOpen && (
              <ModalTest onClose={closeSuheomModal}>
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
              </ModalTest>
            )
          }
          {
            isLicenceModalOpen && (
              <ModalTest onClose={closeLicenceModal}>
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
              </ModalTest>
            )
          }
        </Container>
      </ThemeProvider>
      <MainFooter />
    </div >
  );
}

export default AcaInfo;
