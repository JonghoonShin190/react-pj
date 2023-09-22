import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/system';

const INITIAL_VALUES = {
  title: "",
  logo: "",
  content: "",
};

const StyledForm = styled('form')`
  max-width: 500px;
  margin: 0 auto;
  font-size: 14px;
  font-weight: bold;
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

const StyledDivv = styled('div')`
  /* 스타일 모듈을 사용하여 스타일 정의 */
  input[type="file"] {
    display: none; /* 기본 파일 선택 버튼 숨기기 */
  }

  label.custom-file-upload {
    background: linear-gradient(45deg, #9370DB 30%, #0288d1 90%); // 배경색 설정
    color: white;
    font-size: 14px;
    padding: 8px;
    border: none; // 테두리 제거
    border-radius: 4px;
    cursor: pointer;
    width: auto;
    display: inline-block; // 레이블을 인라인 블록으로 설정
    transition: background 0.3s ease-in-out; // 배경색 변경 시 애니메이션 효과 추가
  }

  label.custom-file-upload:hover {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1); // 마우스 오버 시 그림자 효과 강화
  }
`;

export function handleCreateSuccess(review, setItems) {
  setItems((prevItems) => [review, ...prevItems]);
}

export default function ReviewForm({
  initialValues = INITIAL_VALUES,
  onCancel,
  onSubmit,
  onSubmitSuccess,
}) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('파일을 선택하세요.'); // 초기값 설정


  const history = useHistory();

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      window.location.reload();
    } else {
      history.push('/');
      window.location.reload();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // 선택한 이미지 파일

    // FormData 객체를 생성하여 이미지 파일을 담습니다.
    const formData = new FormData();
    formData.append("image", file);

    try {
      // 서버로 이미지 업로드 요청을 보냅니다.
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // 이미지 업로드가 성공한 경우
        const imageUrl = await response.json(); // 서버에서 반환된 이미지 URL
        // imageURL을 상태에 저장하거나 필요한 작업을 수행합니다.
        handleChange("logo", imageUrl); // imageURL을 logo 속성에 저장합니다.
      } else {
        // 이미지 업로드 실패 처리
        console.error("Image upload failed.");
      }
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);

    formData.append("logo", values.logo);

    console.log(values);

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

    const { review } = result;
    setValues(INITIAL_VALUES);
    onSubmitSuccess(review);

  };


  return (
    <div>
      <div>
        <h2 style={{ textAlign: 'center' }}>학원 등록하기</h2>
      </div>
      <StyledForm className="ReviewForm" onSubmit={handleSubmit}>
        * 학원명
        <StyledDiv>
          <TextField
            margin="normal"
            name="title"
            label="학원명"
            required
            variant="outlined"
            value={values.title}
            onChange={handleInputChange}
            multiline
            style={{ width: '100%' }}
          />
        </StyledDiv>
        <br />
        <br />
        <div> * 학원 로고 등록하기</div>
        <br />
        <StyledDivv>
          &nbsp;
          <label className="custom-file-upload">
            파일 선택
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const fileName = e.target.files[0]?.name || '파일을 선택하세요.';
                setSelectedFileName(fileName);
                handleImageUpload(e);
              }}
            />
          </label>
          <span style={{ color: "grey", fontWeight: 300 }}>&nbsp;&nbsp;{selectedFileName}</span>
        </StyledDivv>
        <br />
        <br />
        <div>* 학원 정보 등록하기</div>

        <StyledDiv>
          <StyledTextarea
            style={{ marginTop: '16px' }}
            minRows={4}
            placeholder="* 학원에 대한 자세한 정보를 남겨주세요."
            name="content"
            value={values.content}
            onChange={handleInputChange}
          />
        </StyledDiv>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={() => {
              handleCancel();
            }}
            fullWidth
            disabled={isSubmitting}
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundImage: 'linear-gradient(45deg, #9370DB 30%, #0288d1 90%)',
              color: 'white',
              fontSize: '15px',
              width: 'auto'
            }}
          >
            🡰 뒤로가기
          </Button>

          <div style={{ textAlign: 'right' }}>
            <Button
              fullWidth
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              color="primary"
              className="button"
              sx={{
                mt: 3,
                mb: 2,
                backgroundImage: 'linear-gradient(45deg, #9370DB 30%, #0288d1 90%)',
                color: 'white',
                fontSize: '15px',
                width: 'auto'
              }}
              onClick={async (event) => {
                event.preventDefault();
                await handleSubmit(event);
                handleCancel();
              }}
            >
              제출하기
            </Button>
          </div>
        </div>

        {submittingError?.message && (
          <div style={{ textAlign: 'center' }}>{submittingError.message}</div>
        )}
        <div style={{ backgroundColor: '#dff1f9', borderRadius: '4px', padding: '10px', fontSize: '5px', color: 'gray' }}>
          <p>
            • 해당 정보는 학뷰 운영팀의 검수를 거쳐 게시됩니다.
            <br />
            &nbsp; 다른 사용자들에게 도움이 되는 정보를 작성했는지 충분히 검토 후 제출해주세요.
          </p>
          <p>
            • 검수 과정에서 허위, 조작, 비방, 욕설, 무의미한 내용 등으로 작성된 후기는 반려처리되며,<br />
            &nbsp; 검수 과정을 방해할 목적으로 판단되는 악의적인 작성자에 대해서는 사안에 따라 <br />
            &nbsp; 학뷰 운영팀에서 계정 정지 또는 영업방해, 명예훼손 등의 건으로 법적인 조치를 취할 수 있습니다.
          </p>
        </div>
      </StyledForm>
    </div>
  );
}
