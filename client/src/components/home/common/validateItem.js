export default function validate(values) {
  const errors = {};

  // userId
  if (!values.content) {
    errors.content = '🤦‍♂️ 빈 아이템 추가는 허용되지 않습니다!';
  } else if (values.content.length > 30) {
    errors.content = '아이템은 30자 이내로 입력해주세요.';
  }

  // nickname
  if (!values.nickname) {
    errors.nickname = '입력이 필요합니다.';
  } else if (values.nickname.length < 2 || values.nickname.length > 10) {
    errors.nickname = '닉네임은 2자 ~ 10자로 입력해주세요.';
  } else if (!/^[가-힣a-zA-Z0-9]+$/.test(values.nickname)) {
    errors.nickname = '닉네임에 기호는 사용하실 수 없습니다.';
  }
  return errors;
}
