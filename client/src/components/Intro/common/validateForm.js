export default function validate(values) {
  const errors = {};

  // userId
  if (!values.userId) {
    errors.userId = '입력이 필요합니다.';
  } else if (values.userId.length < 6 || values.userId.length > 15) {
    errors.userId = 'ID는 6자 이상 ~ 15자 미만으로 입력해주세요.';
  } else if (!/^[A-Za-z0-9+]*$/.test(values.userId)) {
    errors.userId = 'ID는 영문자 / 숫자로만 이루어져야 합니다.';
  }

  // email
  if (!values.email) {
    errors.email = '입력이 필요합니다.';
  } else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(values.email)) {
    errors.email = '이메일 양식에 맞춰 작성해주세요.';
  }

  // password
  if (!values.password) {
    errors.password = '입력이 필요합니다.';
  } else if (values.password.length < 6 || values.password.length > 15) {
    errors.password = '비밀번호는 6자 이상 ~ 15자 미만으로 입력해주세요.';
  }

  // Verifying password
  if (!values.password2) {
    errors.password2 = '입력이 필요합니다.';
  } else if (values.password !== values.password2) {
    errors.password2 = '비밀번호가 불일치합니다. 다시 입력해주세요.';
  }

  if (!values.nickname) {
    errors.nickname = '입력이 필요합니다.';
  } else if (values.nickname.length < 2 || values.nickname.length > 10) {
    errors.nickname = '닉네임은 2자 ~ 10자로 입력해주세요.';
  } else if (!/^[가-힣a-zA-Z0-9]+$/.test(values.nickname)) {
    errors.nickname = '닉네임에 기호는 사용하실 수 없습니다.';
  }
  return errors;
}
