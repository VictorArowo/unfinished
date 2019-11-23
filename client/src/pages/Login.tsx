import React from 'react';
import { withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { loginUser, LoginUserAction } from '../state/actions/userAction';

interface FormValues {
  email: string;
  password: string;
}

interface OtherProps {
  loginUser: (email: string, password: string) => void;
}

interface MyFormProps {
  initialEmail?: string;
  initialPassword?: string;
}

const Login = (props: OtherProps & FormikProps<FormValues>) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = props;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            width={50}
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            width={50}
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
        </div>

        <button
          type="submit"
          disabled={
            isSubmitting ||
            !!(errors.email && touched.email) ||
            !!(errors.password && touched.password)
          }
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

const LoginForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => ({
    email: props.initialEmail || '',
    password: props.initialPassword || ''
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Email not valid')
      .required('Email is required'),
    password: Yup.string().required('Password is required')
  }),

  handleSubmit(
    { email, password }: FormValues,
    { props, setSubmitting, setErrors }
  ) {
    (props as any).loginUser(email, password, (props as any).history);
  }
})(Login as any);

export default connect(
  null,
  { loginUser }
)(LoginForm);
