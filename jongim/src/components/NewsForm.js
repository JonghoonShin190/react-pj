import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/system';

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
}

const StyledForm = styled('form')`
  max-width: 500px;
  margin: 0 auto;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const StyledDiv = styled('div')`
  display: flex;
  justify-content: center;
`;

const StyledTextarea = styled(TextareaAutosize)`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  outline: none;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #2196f3;
  }
`;

export function handleCreateSuccess(news, setItems) {
  setItems((prevItems) => [news, ...prevItems]);
}

function NewsForm({
  initialValues = INITIAL_VALUES,
  onCancel,
  onSubmit,
  onSubmitSuccess,
  setItems,

}) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);

  const history = useHistory();

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    if (onCancel) {
      // "취소" 버튼 클릭 시 / 경로로 이동
      history.push('/');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);
    if (values.imgFile) {
      formData.append("imgFile", values.imgFile);
    }
    let result;
    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      result = await onSubmit(formData);
    } catch (error) {
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }
    const { news } = result;
    setValues(INITIAL_VALUES);
    onSubmitSuccess(news);
  };

  return (
    <div>
      <div>
        <h2 style={{ textAlign: 'center' }}>후기 작성하기</h2>
      </div>
      <div>
        * 리뷰 제목
      </div>
      <StyledForm className="NewsForm" onSubmit={handleSubmit}>
        <StyledDiv>
          <StyledTextField
            margin="normal"
            name="title"
            label="제목"
            required
            variant="outlined"
            value={values.title}
            onChange={handleInputChange}
          />
        </StyledDiv>

        <div>
          <h4 style={{ color: 'gray', fontSize: '14px' }}>커리큘럼·교재의 우수성</h4>
        </div>
        <div>
          <h4 style={{ color: 'gray', fontSize: '14px' }}>커리큘럼·교재의 우수성</h4>
        </div>
        <div>
          <h4 style={{ color: 'gray', fontSize: '14px' }}>학사·행정관리의 체계성 </h4>
        </div>
        <div>
          <h4 style={{ color: 'gray', fontSize: '14px' }}>시설·환경의 편의성 </h4>
        </div>

        <StyledDiv>
          <StyledTextarea
            minRows={2}
            placeholder="내용을 입력하세요."
            name="content"
            value={values.content}
            onChange={handleInputChange}
          />
        </StyledDiv>

        <div style={{ textAlign: 'center' }}>
          <Button
            fullWidth
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: '1rem',
              mb: '2rem',
              backgroundImage: 'linear-gradient(45deg,#9370DB30%,#0288d190%)',
              color: 'white',
              fontSize: '15px',
              width: 'auto'
            }}
            onClick={handleSubmit}
          >
            확인
          </Button>

          <Button
            onClick={() => {
              handleCancel();
            }}
            fullWidth
            disabled={isSubmitting}
            variant="contained"
            color="primary"
            sx={{
              mt: '1rem',
              mb: '2rem',
              backgroundImage: 'linear-gradient(45deg,#9370DB30%,#0288d190%)',
              color: 'white',
              fontSize: '15px',
              width: 'auto',
            }}
          >
            취소
          </Button>
        </div>

        {submittingError?.message && (
          <div style={{ textAlign: 'center' }}>{submittingError.message}</div>
        )}
      </StyledForm>
    </div>
  )
}

export default NewsForm;
