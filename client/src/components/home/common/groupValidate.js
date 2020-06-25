export default function validate(values) {
  const errors = {};

  // groupColor
  if (!values.groupColor) {
    errors.groupColor = '색상 선택이 필요합니다.';
  }

  // title
  if (!values.title) {
    errors.title = '입력이 필요합니다.';
  } else if (values.title.length > 15) {
    errors.userId = '그룹명은 15자 안으로 정해주세요.';
  }

  return errors;
}
